import { createServer } from 'http'
import { WebSocketServer, WebSocket } from 'ws'

const PORT = 3002

// Create WebSocket server
const wss = new WebSocketServer({ port: PORT })

// Store connected clients
const clients = new Map<string, WebSocket>()

interface Client {
  ws: WebSocket
  id: string
  userId: string
  userName: string
  preferences: any
}

wss.on('connection', (ws: WebSocket, req) => {
  const clientId = `${Date.now()}-${Math.random().toString(36).substring(2)}`

  const client: Client = {
    ws,
    id: clientId,
    userId: clientId, // Will be updated after auth
    userName: `User ${clientId.slice(0, 8)}`,
    preferences: {
      email: true,
      push: true,
      taskReminders: true,
      projectUpdates: true,
      weeklyDigest: true,
    },
  }

  clients.set(clientId, client)

  console.log(`Notification service client connected: ${client.id}`)

  // Send connected confirmation
  ws.send(JSON.stringify({
    type: 'connection:established',
    clientId,
    timestamp: new Date().toISOString(),
  }))
})

wss.on('message', (message: string) => {
  const clientId = Array.from(clients.entries()).find(([, client]) => client.ws.readyState === WebSocket.OPEN && client.ws === message)?.[0]

  if (!clientId) return

  const client = clients.get(clientId)
  if (!client) return

  try {
    const data = JSON.parse(message)

    console.log(`Received message from ${client.id}:`, data.type)

    switch (data.type) {
      case 'authenticate':
        // Authenticate user
        if (data.userId && data.userName) {
          client.userId = data.userId
          client.userName = data.userName

          client.ws.send(JSON.stringify({
            type: 'authentication:success',
            userId: client.userId,
            userName: client.userName,
          }))

          console.log(`User authenticated: ${client.userName}`)
        }
        break

      case 'notification:send':
        // Send notification to user
        if (client.preferences[data.notificationType]) {
          const notification = {
            id: Date.now().toString(),
            type: data.notificationType,
            title: data.title,
            message: data.message,
            link: data.link,
            timestamp: new Date().toISOString(),
            read: false,
            userId: client.userId,
          }

          client.ws.send(JSON.stringify({
            type: 'notification:receive',
            notification,
          }))

          console.log(`Notification sent to ${client.userName}:`, data.title)
        }
        break

      case 'notification:mark_read':
        // Mark notification as read
        client.ws.send(JSON.stringify({
          type: 'notification:marked_read',
          notificationId: data.notificationId,
        }))
        break

      case 'preferences:update':
        // Update user preferences
        if (data.preferences) {
          client.preferences = { ...client.preferences, ...data.preferences }
        }
        client.ws.send(JSON.stringify({
          type: 'preferences:updated',
          preferences: client.preferences,
        }))
        break

      case 'get:notifications':
        // Get all notifications for user
        const mockNotifications = [
          {
            id: '1',
            type: 'TASK_ASSIGNED',
            title: 'New Task Assigned',
            message: 'You have been assigned to "Website Redesign"',
            link: '/projects/1',
            timestamp: '2025-01-15T10:30:00Z',
            read: false,
            userId: client.userId,
          },
          {
            id: '2',
            type: 'PROJECT_UPDATE',
            title: 'Project Update',
            message: 'Project "Website Redesign" stage changed to In Progress',
            link: '/projects/1',
            timestamp: '2025-01-16T14:00:00Z',
            read: false,
            userId: client.userId,
          },
          {
            id: '3',
            type: 'SYSTEM',
            title: 'Welcome to Platform',
            message: 'Your account has been created successfully',
            link: '/dashboard/student',
            timestamp: '2025-01-10T09:00:00Z',
            read: true,
            userId: client.userId,
          },
        ]

        client.ws.send(JSON.stringify({
          type: 'notifications:list',
          notifications: mockNotifications,
          count: mockNotifications.length,
        }))
        break

      default:
        client.ws.send(JSON.stringify({
          type: 'error',
          message: `Unknown message type: ${data.type}`,
        }))
    }
  } catch (error) {
    console.error('Error processing message:', error)
    client.ws.send(JSON.stringify({
      type: 'error',
      message: 'Error processing your request',
    }))
  }
})

wss.on('close', () => {
  for (const [id, client] of clients.entries()) {
    if (client.ws.readyState !== WebSocket.OPEN) {
      const clientData = clients.get(id)
      console.log(`Notification service client disconnected: ${clientData?.userName || id}`)
      clients.delete(id)
    }
  }
})

// Broadcast notification to all users
const broadcastNotification = (notification: any) => {
  const message = JSON.stringify({
    type: 'notification:broadcast',
    notification,
    timestamp: new Date().toISOString(),
  })

  clients.forEach(([, client]) => {
    if (client && client.ws.readyState === WebSocket.OPEN) {
      if (client.preferences[notification.type]) {
        try {
          client.ws.send(message)
        } catch (error) {
          console.error('Error broadcasting to client:', error)
        }
      }
    }
  })
}

console.log(`Notification Service starting on port ${PORT}`)
