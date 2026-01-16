import { createServer } from 'http'
import { Server } from 'socket.io'
import next from 'next/server'

const PORT = 3001

// Initialize Socket.IO server
const io = new Server(PORT, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: false,
  },
})

// Store active users and their data
const users = new Map()
const typingUsers = new Set()
const userSockets = new Map()

// User data structure
interface User {
  id: string
  name: string
  socket: any
  room: string | null
  isTyping: boolean
}

io.on('connection', (socket) => {
  const userId = socket.id
  const user = {
    id: userId,
    name: `User ${userId.slice(0, 8)}`,
    socket,
    room: null,
    isTyping: false,
  }
  
  users.set(userId, user)
  userSockets.set(userId, socket)
  
  console.log(`User connected: ${user.name}`)
  
  // Send user joined notification
  socket.emit('user:joined', {
    id: user.id,
    name: user.name,
    onlineCount: users.size,
  })
})

io.on('disconnect', (socket) => {
  const user = users.get(socket.id)
  if (user) {
    console.log(`User disconnected: ${user.name}`)
    users.delete(socket.id)
    userSockets.delete(socket.id)
    
    // Send user left notification
    socket.broadcast.emit('user:left', {
      id: user.id,
      name: user.name,
      onlineCount: users.size,
      room: user.room,
    })
    
    // Stop typing timeout if exists
    if (user.typingTimeout) {
      clearTimeout(user.typingTimeout)
    }
  }
})

// Join room functionality
io.on('room:join', ({ userId, roomId, userName, socket: callback }) => {
  const user = users.get(userId)
  if (!user) return
  
  // Leave current room if any
  if (user.room && user.room !== roomId) {
    socket.leave(user.room)
    io.to(user.room).emit('user:left', {
      id: user.id,
      name: user.name,
      room: user.room,
    })
  }
  
  user.room = roomId
  socket.join(roomId)
  
  // Emit room update
  io.to(roomId).emit('room:update', {
    roomId,
    users: Array.from(users.values()).filter(u => u.room === roomId),
  })
  
  callback({ success: true, roomId, usersInRoom: users.size })
})

// Leave room functionality
io.on('room:leave', ({ userId, roomId, callback }) => {
  const user = users.get(userId)
  if (!user) return
  
  if (user.room) {
    socket.leave(user.room)
    
    io.to(user.room).emit('room:user:leave', {
      userId: user.id,
      userName: user.name,
      room: user.room,
    })
    
    user.room = null
  }
  
  callback({ success: true })
})

// Chat functionality
io.on('message:send', ({ userId, roomId, message, socket }) => {
  const user = users.get(userId)
  if (!user) return
  
  console.log(`Message from ${user.name} in room ${roomId}:`, message)
  
  // Broadcast to room
  if (user.room === roomId) {
    const chatMessage = {
      id: Date.now(),
      userId: user.id,
      userName: user.name,
      roomId,
      content: message,
      timestamp: new Date().toISOString(),
    }
    
    io.to(roomId).emit('message:received', chatMessage)
  }
})

// Typing indicators
io.on('typing:start', ({ userId, roomId }) => {
  const user = users.get(userId)
  if (!user) return
  
  user.isTyping = true
  
  if (user.room === roomId) {
    io.to(roomId).emit('user:typing', {
      userId: user.id,
      userName: user.name,
      isTyping: true,
    })
  }
})

io.on('typing:stop', ({ userId, roomId }) => {
  const user = users.get(userId)
  if (!user) return
  
  user.isTyping = false
  
  if (user.room === roomId) {
    io.to(roomId).emit('user:typing', {
      userId: user.id,
      userName: user.name,
      isTyping: false,
    })
  }
})

// @mentions
io.on('mention:user', ({ userId, mentionedUserId, content, socket }) => {
  const user = users.get(userId)
  const mentionedUser = users.get(mentionedUserId)
  
  if (user && mentionedUser) {
    console.log(`${mentionedUser?.name} mentioned ${user?.name}`)
    
    // Send mention notification to mentioned user
    const userSocket = userSockets.get(mentionedUserId)
    if (userSocket) {
      userSocket.emit('notification:mention', {
        from: user.name,
        content,
        content,
      })
    }
  }
})

// Notification system
io.on('notification:send', ({ userId, type, title, message, link, socket }) => {
  const user = users.get(userId)
  if (!user) return
  
  console.log(`Sending notification to ${user.name}:`, title, message)
  
  const notification = {
    id: Date.now(),
    userId: user.id,
    type,
    title,
    message,
    link,
    timestamp: new Date().toISOString(),
    read: false,
  }
  
  // Send to user
  io.to(socket.id).emit('notification:receive', notification)
})

io.on('notification:mark_read', ({ notificationId, userId }) => {
  const user = users.get(userId)
  if (!user) return
  
  io.to(socket.id).emit('notification:marked_read', { notificationId })
})

// Presence indicators
io.on('user:status', ({ userId, status, socket }) => {
  const user = users.get(userId)
  if (!user) return
  
  console.log(`${user.name} status changed to: ${status}`)
  
  // Broadcast presence update to all users
  socket.broadcast.emit('user:presence', {
    id: user.id,
    name: user.name,
    status,
    onlineCount: users.size,
  })
})

// User activity
io.on('user:activity', ({ userId, activity, data, socket }) => {
  const user = users.get(userId)
  if (!user) return
  
  console.log(`${user.name} performed:`, activity)
  
  // Broadcast activity
  socket.broadcast.emit('user:activity', {
    id: user.id,
    name: user.name,
    activity,
    data,
    timestamp: new Date().toISOString(),
  })
})

// Get online users
io.on('users:online', ({ socket, callback }) => {
  const onlineUsers = Array.from(users.values()).map(u => ({
    id: u.id,
    name: u.name,
    room: u.room,
    isTyping: u.isTyping,
    status: 'online',
  }))
  
  callback(onlineUsers)
})

// Get room users
io.on('room:users', ({ roomId, callback }) => {
  const roomUsers = Array.from(users.values())
    .filter(u => u.room === roomId)
    .map(u => ({
    id: u.id,
    name: u.name,
      room: u.room,
      isTyping: u.isTyping,
      status: 'online',
    }))
  
  callback(roomUsers)
})

// Get user info
io.on('user:info', ({ userId, callback }) => {
  const user = users.get(userId)
  if (!user) return
  
  callback({
    id: user.id,
    name: user.name,
    room: user.room,
    isTyping: user.isTyping,
    status: 'online',
  })
})

// Error handling
io.on('error', (error) => {
  console.error('Socket.IO error:', error)
})

// Health check for Next.js route
io.on('connection_error', (error) => {
  console.error('Socket connection error:', error)
})

console.log(`Team Service starting on port ${PORT}`)
