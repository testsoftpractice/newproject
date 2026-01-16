import { createServer } from 'http'
import { parse } from 'url'
import next from 'next'
import { Server as SocketIOServer } from 'socket.io'

const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const port = parseInt(process.env.PORT || '3000', 10)

// Create Next.js app
const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

// Store connected users and their data
interface User {
  id: string
  name: string
  socket: any
  room: string | null
  isTyping: boolean
  userId?: string
  preferences?: any
}

const users = new Map<string, User>()
const userSockets = new Map<string, any>()

app.prepare().then(() => {
  const httpServer = createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url!, true)
      await handle(req, res, parsedUrl)
    } catch (err) {
      console.error('Error occurred handling', req.url, err)
      res.statusCode = 500
      res.end('internal server error')
    }
  })

  // Initialize Socket.IO
  const io = new SocketIOServer(httpServer, {
    path: '/api/socket',
    addTrailingSlash: false,
    cors: {
      origin: dev ? 'http://localhost:3000' : process.env.NEXT_PUBLIC_APP_URL,
      methods: ['GET', 'POST'],
      credentials: true,
    },
  })

  // Socket.IO connection handling
  io.on('connection', (socket) => {
    const socketId = socket.id
    const user: User = {
      id: socketId,
      name: `User ${socketId.slice(0, 8)}`,
      socket,
      room: null,
      isTyping: false,
      preferences: {
        email: true,
        push: true,
        taskReminders: true,
        projectUpdates: true,
        weeklyDigest: true,
      },
    }

    users.set(socketId, user)
    userSockets.set(socketId, socket)

    console.log(`User connected: ${user.name}`)

    // Send user joined notification
    socket.emit('user:joined', {
      id: user.id,
      name: user.name,
      onlineCount: users.size,
    })

    // Join room
    socket.on('room:join', ({ roomId, userId, userName }, callback) => {
      console.log(`User ${user.name} joining room: ${roomId}`)

      // Leave current room if any
      if (user.room && user.room !== roomId) {
        socket.leave(user.room)
        io.to(user.room).emit('user:left', {
          id: user.id,
          name: user.name,
          room: user.room,
        })
      }

      // Update user data
      user.room = roomId
      if (userId) user.userId = userId
      if (userName) user.name = userName

      socket.join(roomId)

      // Get room users
      const roomUsers = Array.from(users.values())
        .filter(u => u.room === roomId)
        .map(u => ({
          id: u.id,
          name: u.name,
          userId: u.userId,
          room: u.room,
          isTyping: u.isTyping,
          status: 'online',
        }))

      // Emit room update
      io.to(roomId).emit('room:update', {
        roomId,
        users: roomUsers,
      })

      callback?.({ success: true, roomId, usersInRoom: roomUsers.length })
    })

    // Leave room
    socket.on('room:leave', ({ roomId }, callback) => {
      if (user.room) {
        socket.leave(user.room)

        io.to(user.room).emit('room:user:leave', {
          userId: user.id,
          userName: user.name,
          room: user.room,
        })

        user.room = null
      }

      callback?.({ success: true })
    })

    // Send message
    socket.on('message:send', ({ message, roomId }) => {
      if (!user.room || user.room !== roomId) return

      console.log(`Message from ${user.name} in room ${roomId}:`, message)

      const chatMessage = {
        id: Date.now(),
        userId: user.id,
        userName: user.name,
        roomId,
        content: message,
        timestamp: new Date().toISOString(),
      }

      io.to(roomId).emit('message:received', chatMessage)
    })

    // Typing start
    socket.on('typing:start', ({ roomId }) => {
      if (!user.room || user.room !== roomId) return

      user.isTyping = true

      io.to(roomId).emit('user:typing', {
        userId: user.id,
        userName: user.name,
        isTyping: true,
      })
    })

    // Typing stop
    socket.on('typing:stop', ({ roomId }) => {
      if (!user.room || user.room !== roomId) return

      user.isTyping = false

      io.to(roomId).emit('user:typing', {
        userId: user.id,
        userName: user.name,
        isTyping: false,
      })
    })

    // @mentions
    socket.on('mention:user', ({ mentionedUserId, content }) => {
      const mentionedUser = Array.from(users.values()).find(
        u => u.userId === mentionedUserId || u.id === mentionedUserId
      )

      if (mentionedUser) {
        const mentionedSocket = userSockets.get(mentionedUser.id)
        if (mentionedSocket) {
          mentionedSocket.emit('notification:mention', {
            from: user.name,
            content,
            timestamp: new Date().toISOString(),
          })
        }
      }
    })

    // Send notification
    socket.on('notification:send', ({ type, title, message, link }) => {
      const notification = {
        id: Date.now().toString(),
        userId: user.userId || user.id,
        type,
        title,
        message,
        link,
        timestamp: new Date().toISOString(),
        read: false,
      }

      // Send to the user
      socket.emit('notification:receive', notification)

      console.log(`Notification sent to ${user.name}:`, title)
    })

    // Mark notification as read
    socket.on('notification:mark_read', ({ notificationId }) => {
      socket.emit('notification:marked_read', { notificationId })
    })

    // Update user status
    socket.on('user:status', ({ status }) => {
      console.log(`${user.name} status changed to: ${status}`)

      socket.broadcast.emit('user:presence', {
        id: user.id,
        name: user.name,
        status,
        onlineCount: users.size,
      })
    })

    // User activity
    socket.on('user:activity', ({ activity, data }) => {
      console.log(`${user.name} performed:`, activity)

      socket.broadcast.emit('user:activity', {
        id: user.id,
        name: user.name,
        activity,
        data,
        timestamp: new Date().toISOString(),
      })
    })

    // Get online users
    socket.on('users:online', (callback) => {
      const onlineUsers = Array.from(users.values()).map(u => ({
        id: u.id,
        name: u.name,
        room: u.room,
        isTyping: u.isTyping,
        status: 'online',
      }))

      callback?.(onlineUsers)
    })

    // Get room users
    socket.on('room:users', ({ roomId }, callback) => {
      const roomUsers = Array.from(users.values())
        .filter(u => u.room === roomId)
        .map(u => ({
          id: u.id,
          name: u.name,
          userId: u.userId,
          room: u.room,
          isTyping: u.isTyping,
          status: 'online',
        }))

      callback?.(roomUsers)
    })

    // Get user info
    socket.on('user:info', ({ userId }, callback) => {
      const targetUser = Array.from(users.values()).find(
        u => u.id === userId || u.userId === userId
      )

      if (targetUser) {
        callback?.({
          id: targetUser.id,
          name: targetUser.name,
          room: targetUser.room,
          isTyping: targetUser.isTyping,
          status: 'online',
        })
      }
    })

    // Authenticate user
    socket.on('authenticate', ({ userId, userName }) => {
      if (userId) user.userId = userId
      if (userName) user.name = userName

      socket.emit('authentication:success', {
        userId: user.userId,
        userName: user.name,
      })

      console.log(`User authenticated: ${user.name}`)
    })

    // Update preferences
    socket.on('preferences:update', (preferences) => {
      if (preferences) {
        user.preferences = { ...user.preferences, ...preferences }
      }

      socket.emit('preferences:updated', {
        preferences: user.preferences,
      })
    })

    // Disconnect
    socket.on('disconnect', () => {
      console.log(`User disconnected: ${user.name}`)

      // Notify current room
      if (user.room) {
        io.to(user.room).emit('user:left', {
          id: user.id,
          name: user.name,
          room: user.room,
          onlineCount: users.size - 1,
        })
      }

      users.delete(socketId)
      userSockets.delete(socketId)
    })

    // Error handling
    socket.on('error', (error) => {
      console.error('Socket.IO error:', error)
    })
  })

  // Broadcast notification to specific user
  const sendNotificationToUser = (userId: string, notification: any) => {
    const user = Array.from(users.values()).find(u => u.userId === userId)
    if (user) {
      user.socket.emit('notification:receive', notification)
    }
  }

  // Broadcast to all users
  const broadcastNotification = (notification: any) => {
    io.emit('notification:broadcast', notification)
  }

  // Make functions available globally for API routes
  ;(global as any).socketIO = {
    io,
    sendNotificationToUser,
    broadcastNotification,
    users,
  }

  httpServer
    .once('error', (err) => {
      console.error(err)
      process.exit(1)
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`)
      console.log(`> Socket.IO integrated with Next.js`)
    })
})
