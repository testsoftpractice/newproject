#!/bin/bash

# Start all mini-services in background
echo "Starting mini-services..."

# Team Collaboration Service (Port 3001)
cd /home/z/my-project/mini-services/team-service
nohup bun run dev > /tmp/team-service.log 2>&1 &
echo "✓ Team Service started on port 3001" &

# Notification Service (Port 3002)
cd /home/z/my-project/mini-services/notification-service
nohup bun run dev > /tmp/notification-service.log 2>&1 &
echo "✓ Notification Service started on port 3002" &

echo ""
echo "All mini-services started:"
echo "  - Team Service: http://localhost:3001"
echo "  - Notification Service: http://localhost:3002"
echo ""
echo "Service logs:"
echo "  Team Service: tail -f /tmp/team-service.log"
echo "  Notification Service: tail -f /tmp/notification-service.log"
