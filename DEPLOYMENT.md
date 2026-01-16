# Innovation Platform - Deployment Guide

Complete deployment documentation for the Applied Execution & Venture Platform including PostgreSQL database, mini-services, and internal communication systems.

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Prerequisites](#prerequisites)
3. [Database Setup (PostgreSQL)](#database-setup-postgresql)
4. [Mini-Services Setup](#mini-services-setup)
5. [Integrated Architecture (Merged Services)](#integrated-architecture-merged-services)
6. [Environment Configuration](#environment-configuration)
7. [Development Setup](#development-setup)
8. [Production Deployment](#production-deployment)
9. [Troubleshooting](#troubleshooting)

---

## Architecture Overview

### System Components

```
┌─────────────────────────────────────────────────────────────────────┐
│                     Application Layer                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │  Next.js     │  │  Team        │  │ Notification  │  │
│  │  Main App    │  │  Service     │  │  Service     │  │
│  │  (Port 3000) │  │  (Port 3001) │  │  (Port 3002) │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
│         │                  │                  │            │
│         └──────────────────┴──────────────────┴────────────┤
│                            │                          │
│                     ┌────────────────────────────┐          │
│                     │  PostgreSQL Database       │          │
│                     │  (Port 5432)             │          │
│                     └────────────────────────────┘          │
└─────────────────────────────────────────────────────────────────────┘
```

### Technology Stack

| Component | Technology | Version | Purpose |
|-----------|-------------|----------|---------|
| Frontend Framework | Next.js | 15.3.5 | React-based framework with App Router |
| Language | TypeScript | 5+ | Type-safe development |
| Database | PostgreSQL | 14+ | Production-ready relational database |
| ORM | Prisma | 6.11+ | Type-safe database toolkit |
| Team Chat | Socket.IO | 4.7.5 | Real-time WebSocket communication |
| Notifications | WebSocket API | Native | Push notification system |
| Styling | Tailwind CSS | 4 | Utility-first CSS framework |
| UI Components | shadcn/ui | Latest | Accessible component library |
| State Management | Zustand, TanStack Query | Latest | Client and server state |
| Runtime | Bun | Latest | Fast JavaScript runtime |

### Mini-Services

#### 1. Team Collaboration Service (Port 3001)

**Purpose**: Real-time team chat and collaboration

**Features**:
- Real-time messaging via Socket.IO
- Room-based communication (one room per project)
- @mentions support with notifications
- Typing indicators
- User online/offline presence
- Message history per room
- User activity tracking

**API Events**:
- `room:join` - Join a project room
- `room:leave` - Leave current room
- `room:update` - Get updated room user list
- `message:send` - Send a message
- `message:received` - Receive a message
- `typing:start` - Start typing indicator
- `typing:stop` - Stop typing indicator
- `user:typing` - Receive typing indicator
- `user:joined` - User joined notification
- `user:left` - User left notification
- `mention:user` - Send @mention notification
- `notification:mention` - Receive mention notification
- `users:online` - Get all online users
- `room:users` - Get users in current room
- `user:info` - Get user information
- `user:status` - Update user status
- `user:activity` - Broadcast user activity

#### 2. Notification Service (Port 3002)

**Purpose**: Push and email notification management

**Features**:
- WebSocket-based real-time notifications
- User preference management
- Notification types (TASK_ASSIGNED, PROJECT_UPDATE, SYSTEM)
- Mark as read functionality
- Broadcast to all users
- Mock notification history

**API Events**:
- `authenticate` - Authenticate user connection
- `notification:send` - Send notification to user
- `notification:mark_read` - Mark notification as read
- `preferences:update` - Update notification preferences
- `get:notifications` - Get user notification history

**Notification Types**:
- TASK_ASSIGNED - New task assigned to user
- PROJECT_UPDATE - Project status/phase changes
- SYSTEM - Platform-wide notifications (welcome, maintenance, etc.)

### Core Features

#### Marketplace CRUD Operations

1. **Needs Marketplace**
   - Create: `POST /api/needs` - Post project needs
   - List: `GET /api/needs` - Browse all needs
   - Detail: `GET /api/needs/[id]` - View need details
   - Apply: `POST /api/needs/[id]/apply` - Apply to need

2. **Jobs Marketplace**
   - Create: `POST /api/jobs` - Post job listings
   - List: `GET /api/jobs` - Browse all jobs
   - Detail: `GET /api/jobs/[id]` - View job details
   - Apply: `POST /api/jobs/[id]/apply` - Submit job application

3. **Suppliers Marketplace**
   - Create: `POST /api/suppliers` - List your business
   - List: `GET /api/suppliers` - Browse suppliers
   - Detail: `GET /api/suppliers/[id]` - View supplier profile
   - Contact: `POST /api/suppliers/[id]/contact` - Send contact request

4. **Investment Marketplace**
   - List: `GET /api/marketplace/projects` - Browse investable projects
   - Invest: `POST /api/marketplace/projects/[id]/invest` - Express interest

#### Internal Communication

- **Team Chat Component**: Integrated into project detail pages
  - Location: `/projects/[id]` → Chat tab
  - Auto-joins project-specific room
  - Real-time message sync
  - Online user list
  - Typing indicators

#### Dashboard Features

All role-based dashboards include:
- Profile management (5 tabs: personal, academic, professional, skills, settings)
- Settings management (preferences, notifications, security, privacy, account)
- Quick actions for marketplace access
- Real-time notifications

---

## Prerequisites

### Required Software

| Software | Version | Installation |
|----------|---------|--------------|
| PostgreSQL | 14+ | `sudo apt-get install postgresql` (Ubuntu) |
| Bun | Latest | `curl -fsSL https://bun.sh/install | bash` |
| Node.js | 18+ (for compatibility) | `curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -` |
| Git | Latest | `sudo apt-get install git` |

### System Requirements

- **OS**: Linux (Ubuntu 20.04+ recommended), macOS, or Windows with WSL2
- **RAM**: Minimum 4GB, Recommended 8GB+
- **Storage**: Minimum 20GB free space
- **Network**: Stable internet connection

---

## Database Setup (PostgreSQL)

### 1. Install PostgreSQL

#### Ubuntu/Debian:
```bash
# Install PostgreSQL
sudo apt-get update
sudo apt-get install postgresql postgresql-contrib

# Start PostgreSQL service
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Verify installation
sudo -u postgres psql --version
```

#### macOS:
```bash
# Using Homebrew
brew install postgresql@14
brew services start postgresql@14
```

### 2. Create Database and User

```bash
# Switch to postgres user
sudo -u postgres psql

# Create database
CREATE DATABASE innovation_platform;

# Create user with password
CREATE USER innovation_user WITH PASSWORD 'your_secure_password';

# Grant privileges
GRANT ALL PRIVILEGES ON DATABASE innovation_platform TO innovation_user;

# Exit
\q
```

### 3. Configure PostgreSQL for Production

Edit PostgreSQL configuration (`/etc/postgresql/14/main/postgresql.conf`):

```ini
# Connection Settings
listen_addresses = '*'
max_connections = 100

# Memory Settings (adjust based on available RAM)
shared_buffers = 256MB
effective_cache_size = 1GB
maintenance_work_mem = 64MB
checkpoint_completion_target = 0.9

# WAL Settings
wal_buffers = 16MB
max_wal_size = 1GB
```

Edit `pg_hba.conf` for remote access:

```ini
# TYPE  DATABASE        USER            ADDRESS                 METHOD
host    all             all             0.0.0.0/0              md5
host    all             all             ::/0                     md5
```

### 4. Environment Configuration

Update `.env` file:

```env
# PostgreSQL Connection
DATABASE_URL="postgresql://innovation_user:your_secure_password@localhost:5432/innovation_platform?schema=public"

# App Configuration
NEXT_PUBLIC_APP_URL="http://your-domain.com"
NEXT_PUBLIC_API_URL="http://your-domain.com/api"

# Mini-Services
NEXT_PUBLIC_TEAM_SERVICE_URL="http://localhost:3001"
NEXT_PUBLIC_NOTIFICATION_SERVICE_URL="http://localhost:3002"

# Authentication (if using NextAuth)
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"
```

### 5. Run Database Migrations

```bash
# Install dependencies
bun install

# Generate Prisma client
bun run db:generate

# Push schema to PostgreSQL
bun run db:push

# Or create migration
bun run db:migrate
```

### 6. Verify Database Connection

```bash
# Test connection
bunx psql postgresql://innovation_user:your_secure_password@localhost:5432/innovation_platform

# Or use Prisma
npx prisma db pull
npx prisma studio  # Opens Prisma Studio for visual inspection
```

---

## Mini-Services Setup

### 1. Team Service (Socket.IO)

**Location**: `/mini-services/team-service/`

**Installation**:
```bash
cd mini-services/team-service
bun install
```

**Dependencies** (`package.json`):
```json
{
  "name": "team-service",
  "version": "1.0.0",
  "type": "module",
  "main": "index.ts",
  "scripts": {
    "start": "bun index.ts",
    "dev": "bun index.ts"
  },
  "dependencies": {
    "socket.io": "^4.7.5"
  }
}
```

**Running**:
```bash
# Manual start
cd mini-services/team-service
bun run dev

# Using startup script
bash start-services.sh

# Background with logging
nohup bun run dev > /tmp/team-service.log 2>&1 &
```

**Verify**:
```bash
# Check if service is running
curl http://localhost:3001

# Check logs
tail -f /tmp/team-service.log
```

### 2. Notification Service (WebSocket)

**Location**: `/mini-services/notification-service/`

**Installation**:
```bash
cd mini-services/notification-service
bun install
```

**Dependencies** (`package.json`):
```json
{
  "name": "notification-service",
  "version": "1.0.0",
  "type": "module",
  "main": "index.ts",
  "scripts": {
    "start": "bun index.ts",
    "dev": "bun index.ts"
  },
  "dependencies": {
    "ws": "^8.16.0"
  }
}
```

**Running**:
```bash
# Manual start
cd mini-services/notification-service
bun run dev

# Using startup script
bash start-services.sh

# Background with logging
nohup bun run dev > /tmp/notification-service.log 2>&1 &
```

**Verify**:
```bash
# Check if service is running
curl -I http://localhost:3002

# Check logs
tail -f /tmp/notification-service.log
```

### 3. Startup Script

**Location**: `/start-services.sh`

```bash
#!/bin/bash

# Start all mini-services in background
echo "Starting mini-services..."

# Team Collaboration Service (Port 3001)
cd /home/z/my-project/mini-services/team-service
nohup bun run dev > /tmp/team-service.log 2>&1 &
echo "✓ Team Service started on port 3001"

# Notification Service (Port 3002)
cd /home/z/my-project/mini-services/notification-service
nohup bun run dev > /tmp/notification-service.log 2>&1 &
echo "✓ Notification Service started on port 3002"

echo ""
echo "All mini-services started:"
echo "  - Team Service: http://localhost:3001"
echo "  - Notification Service: http://localhost:3002"
echo ""
echo "Service logs:"
echo "  Team Service: tail -f /tmp/team-service.log"
echo "  Notification Service: tail -f /tmp/notification-service.log"
```

**Make executable**:
```bash
chmod +x start-services.sh
```

---

## Environment Configuration

### Development Environment

`.env.example`:

```env
# Database (PostgreSQL)
DATABASE_URL="postgresql://innovation_user:password@localhost:5432/innovation_platform?schema=public"

# Application
NODE_ENV="development"
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Mini-Services
NEXT_PUBLIC_TEAM_SERVICE_PORT="3001"
NEXT_PUBLIC_NOTIFICATION_SERVICE_PORT="3002"

# Authentication
NEXTAUTH_SECRET="dev-secret-change-in-production"
NEXTAUTH_URL="http://localhost:3000"

# Email (for notifications)
SMTP_HOST="smtp.example.com"
SMTP_PORT="587"
SMTP_USER="noreply@example.com"
SMTP_PASSWORD="your-smtp-password"
SMTP_FROM="Innovation Platform <noreply@example.com>"
```

### Production Environment

```env
# Database (PostgreSQL with SSL)
DATABASE_URL="postgresql://innovation_user:secure_password@prod-db.example.com:5432/innovation_platform?sslmode=require"

# Application
NODE_ENV="production"
NEXT_PUBLIC_APP_URL="https://platform.example.com"

# Mini-Services
NEXT_PUBLIC_TEAM_SERVICE_URL="https://chat.platform.example.com"
NEXT_PUBLIC_NOTIFICATION_SERVICE_URL="https://notifications.platform.example.com"

# Authentication (strong secret)
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"

# Email (production SMTP)
SMTP_HOST="smtp-relay.example.com"
SMTP_PORT="465"
SMTP_SECURE="true"
SMTP_USER="platform@example.com"
SMTP_PASSWORD="your-production-password"
SMTP_FROM="Innovation Platform <platform@example.com>"

# Monitoring (optional)
SENTRY_DSN="your-sentry-dsn"
LOG_LEVEL="info"
```

### Environment Variables Reference

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `NODE_ENV` | Environment (development/production) | No (defaults to development) |
| `NEXT_PUBLIC_APP_URL` | Base URL for the application | Yes |
| `NEXTAUTH_SECRET` | Secret key for authentication | Yes |
| `SMTP_*` | Email server configuration | Optional (for email notifications) |

---

## Development Setup

### 1. Clone Repository

```bash
git clone <repository-url>
cd my-project
```

### 2. Install Dependencies

```bash
# Install main app dependencies
bun install

# Install mini-service dependencies
cd mini-services/team-service && bun install
cd ../notification-service && bun install
```

### 3. Database Setup

```bash
# Start PostgreSQL
sudo systemctl start postgresql

# Create database (if not exists)
sudo -u postgres psql -c "CREATE DATABASE innovation_platform;"

# Configure .env
cp .env.example .env
# Edit .env with your PostgreSQL credentials
nano .env

# Run migrations
bun run db:generate
bun run db:push
```

### 4. Start Services

```bash
# Terminal 1: Start mini-services
bash start-services.sh

# Terminal 2: Start Next.js development server
bun run dev
```

### 5. Verify Setup

```bash
# Check Next.js app
curl http://localhost:3000

# Check team service
curl http://localhost:3001

# Check notification service
curl http://localhost:3002

# Check PostgreSQL
sudo -u postgres psql -c "\l"
```

### Development Workflow

1. **Code changes**: Edit files, hot reload automatically
2. **Database changes**:
   ```bash
   bun run db:generate  # Regenerate client after schema changes
   bun run db:push     # Push changes to database
   ```
3. **Service changes**: Services auto-restart with `bun --hot`
4. **View logs**:
   ```bash
   tail -f dev.log          # Next.js logs
   tail -f /tmp/team-service.log     # Team service logs
   tail -f /tmp/notification-service.log  # Notification service logs
   ```

---

## Production Deployment

### Deployment Options

#### Option 1: Traditional VPS (Ubuntu 20.04+)

**Recommended for**: Cost-effective, full control

**Steps**:

1. **Server Setup**
   ```bash
   # Update system
   sudo apt update && sudo apt upgrade -y

   # Install dependencies
   sudo apt install -y postgresql postgresql-contrib nginx certbot python3-certbot-nginx

   # Install Bun
   curl -fsSL https://bun.sh/install | bash

   # Create user
   sudo useradd -m -s /bin/bash innovation
   sudo usermod -aG sudo,docker,www-data innovation
   ```

2. **Configure PostgreSQL**
   ```bash
   # Setup database (see Database Setup section)
   sudo -u postgres createdb innovation_platform
   sudo -u postgres createuser innovation_user
   sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE innovation_platform TO innovation_user;"

   # Configure for remote access
   sudo nano /etc/postgresql/14/main/pg_hba.conf
   # Add: host    all    all    0.0.0.0/0    md5
   sudo systemctl restart postgresql
   ```

3. **Deploy Application**
   ```bash
   # Clone repository
   sudo -u innovation -i git clone <repo-url> /home/innovation/app

   # Install dependencies
   cd /home/innovation/app
   sudo -u innovation bun install

   # Build application
   sudo -u innovation bun run build

   # Setup environment
   sudo -u innovation cp .env.production .env

   # Run database migrations
   sudo -u innovation bun run db:push
   ```

4. **Configure Nginx**

   Create `/etc/nginx/sites-available/innovation-platform.conf`:

   ```nginx
   # Main application
   server {
       listen 80;
       server_name platform.example.com;

       # Redirect to HTTPS
       return 301 https://$server_name$request_uri;
   }

   server {
       listen 443 ssl http2;
       server_name platform.example.com;

       ssl_certificate /etc/letsencrypt/live/platform.example.com/fullchain.pem;
       ssl_certificate_key /etc/letsencrypt/live/platform.example.com/privkey.pem;

       # Next.js
       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection "upgrade";
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
       }

       # Team service (via query parameter for Caddy)
       location /api/team {
           proxy_pass http://localhost:3001;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection "upgrade";
       }

       # Notification service (via query parameter for Caddy)
       location /api/notifications {
           proxy_pass http://localhost:3002;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection "upgrade";
       }
   }

   # Upstreams for services
   upstream team_service {
       server localhost:3001;
   }

   upstream notification_service {
       server localhost:3002;
   }
   ```

   Enable site:
   ```bash
   sudo ln -s /etc/nginx/sites-available/innovation-platform.conf /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl reload nginx
   ```

5. **Setup SSL with Let's Encrypt**
   ```bash
   sudo certbot --nginx -d platform.example.com --email admin@example.com --agree-tos --redirect
   ```

6. **Setup Systemd Services**

   Create `/etc/systemd/system/innovation-platform.service`:
   ```ini
   [Unit]
   Description=Innovation Platform - Next.js Application
   After=network.target postgresql.service

   [Service]
   Type=simple
   User=innovation
   WorkingDirectory=/home/innovation/app
   Environment="NODE_ENV=production"
   ExecStart=/home/innovation/.bun/bin/bun start
   Restart=on-failure
   RestartSec=10

   [Install]
   WantedBy=multi-user.target
   ```

   Create `/etc/systemd/system/team-service.service`:
   ```ini
   [Unit]
   Description=Team Collaboration Service
   After=network.target

   [Service]
   Type=simple
   User=innovation
   WorkingDirectory=/home/innovation/mini-services/team-service
   ExecStart=/home/innovation/.bun/bin/bun index.ts
   Restart=on-failure
   RestartSec=10

   [Install]
   WantedBy=multi-user.target
   ```

   Create `/etc/systemd/system/notification-service.service`:
   ```ini
   [Unit]
   Description=Notification Service
   After=network.target

   [Service]
   Type=simple
   User=innovation
   WorkingDirectory=/home/innovation/mini-services/notification-service
   ExecStart=/home/innovation/.bun/bin/bun index.ts
   Restart=on-failure
   RestartSec=10

   [Install]
   WantedBy=multi-user.target
   ```

   Enable services:
   ```bash
   sudo systemctl daemon-reload
   sudo systemctl enable innovation-platform.service
   sudo systemctl enable team-service.service
   sudo systemctl enable notification-service.service

   sudo systemctl start innovation-platform.service
   sudo systemctl start team-service.service
   sudo systemctl start notification-service.service
   ```

7. **Monitor Services**
   ```bash
   # Check status
   sudo systemctl status innovation-platform
   sudo systemctl status team-service
   sudo systemctl status notification-service
   sudo systemctl status postgresql
   sudo systemctl status nginx

   # View logs
   sudo journalctl -u innovation -f
   sudo journalctl -u team-service -f
   sudo journalctl -u notification-service -f
   ```

#### Option 2: Docker Deployment

**Recommended for**: Containerized deployment, easy scaling

**Dockerfile** (create at project root):

```dockerfile
# Build stage
FROM oven/bun:1 AS base
WORKDIR /app

# Install dependencies
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile

# Copy application
COPY . .

# Generate Prisma client
RUN bunx prisma generate

# Build Next.js
RUN bun run build

# Production stage
FROM oven/bun:1-alpine AS runner
WORKDIR /app

# Install production dependencies
RUN bun install --frozen-lockfile --production

# Copy build artifacts
COPY --from=base /app/public ./public
COPY --from=base /app/.next/standalone ./.next/standalone
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/package.json ./package.json

# Expose port
EXPOSE 3000

# Start application
CMD ["bun", "start"]
```

**docker-compose.yml**:

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:14-alpine
    container_name: innovation-db
    environment:
      POSTGRES_DB: innovation_platform
      POSTGRES_USER: innovation_user
      POSTGRES_PASSWORD: ${DB_PASSWORD:-changeme}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"
    restart: unless-stopped

  app:
    build: .
    container_name: innovation-app
    environment:
      DATABASE_URL: postgresql://innovation_user:${DB_PASSWORD:-changeme}@postgres:5432/innovation_platform
      NODE_ENV: production
      NEXT_PUBLIC_APP_URL: ${APP_URL:-http://localhost:3000}
    depends_on:
      - postgres
    ports:
      - "3000:3000"
    restart: unless-stopped

  team-service:
    build: ./mini-services/team-service
    container_name: team-service
    ports:
      - "3001:3001"
    restart: unless-stopped

  notification-service:
    build: ./mini-services/notification-service
    container_name: notification-service
    ports:
      - "3002:3002"
    restart: unless-stopped

  nginx:
    image: nginx:alpine
    container_name: nginx-proxy
    volumes:
      - ./nginx.conf:/etc/nginx/conf.d
      - ./certs:/etc/nginx/certs
    ports:
      - "80:80"
      - "443:443"
    depends_on:
      - app
      - team-service
      - notification-service
    restart: unless-stopped

volumes:
  postgres_data:
```

**Deploy**:
```bash
# Build and start all services
docker-compose up -d --build

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Scale (if needed)
docker-compose up -d --scale app=3
```

#### Option 3: Cloud Platforms

**Vercel** (Recommended for Next.js):
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod

# Environment variables (set in Vercel dashboard):
# - DATABASE_URL (PostgreSQL connection from managed service)
# - NEXTAUTH_SECRET
```

**AWS EC2 + RDS**:
1. Launch EC2 instance with Ubuntu
2. Create RDS PostgreSQL instance
3. Follow VPS setup guide above
4. Use RDS connection string in DATABASE_URL

**Google Cloud Platform**:
1. Create Cloud SQL PostgreSQL instance
2. Deploy to Cloud Run
3. Connect services with Cloud SQL proxy

**Azure**:
1. Create Azure Database for PostgreSQL
2. Deploy to Azure App Service
3. Configure managed identity

---

## Troubleshooting

### Database Issues

**Problem**: Connection refused to PostgreSQL

**Solution**:
```bash
# Check if PostgreSQL is running
sudo systemctl status postgresql

# Check port
sudo netstat -tlnp | grep 5432

# Check logs
sudo tail -f /var/log/postgresql/postgresql-14-main.log
```

**Problem**: Prisma migration fails

**Solution**:
```bash
# Regenerate client
bun run db:generate

# Push with debug output
DEBUG=* bun run db:push

# Or reset database (CAUTION: deletes data)
bun run db:reset
```

### Mini-Services Issues

**Problem**: Service won't start (port in use)

**Solution**:
```bash
# Find process using port
lsof -i :3001  # Team service
lsof -i :3002  # Notification service

# Kill process
kill -9 <PID>

# Or use different ports in service files
```

**Problem**: Socket connection fails

**Solution**:
1. Check if service is running: `curl http://localhost:3001`
2. Check firewall settings
3. Verify CORS configuration
4. Check browser console for WebSocket errors

### Application Issues

**Problem**: Next.js build fails

**Solution**:
```bash
# Clear cache
rm -rf .next
rm -rf node_modules

# Reinstall
bun install

# Try building with detailed output
NODE_OPTIONS="--max-old-space-size=4096" bun run build
```

**Problem**: API routes return 404

**Solution**:
1. Check that files are in `app/api/` directory
2. Verify file names use `route.ts`
3. Check Next.js dev logs for errors
4. Restart dev server

### Performance Issues

**Problem**: Slow page loads

**Solution**:
1. Enable Next.js image optimization
2. Use `next/image` for images
3. Implement caching strategies
4. Use PostgreSQL indexing (already in schema)
5. Consider CDN for static assets

**Problem**: Database queries slow

**Solution**:
1. Run Prisma analyze: `npx prisma db pull --schema-only`
2. Add missing indexes in schema
3. Use `select` instead of `include` when possible
4. Enable PostgreSQL query logging: `log_statement = 'all'`

### Monitoring

**Health Check Endpoint**:

Create `/api/health`:

```typescript
// app/api/health/route.ts
import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    // Check database
    await db.user.count()

    return NextResponse.json({
      status: 'healthy',
      database: 'connected',
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json({
      status: 'unhealthy',
      database: 'disconnected',
      error: error instanceof Error ? error.message : 'Unknown',
      timestamp: new Date().toISOString(),
    }, { status: 503 })
  }
}
```

**Check health**:
```bash
curl http://localhost:3000/api/health
```

---

## Security Best Practices

### 1. Database Security

- Use strong passwords
- Enable SSL for production connections
- Restrict PostgreSQL user permissions
- Regular backups: `pg_dump innovation_platform > backup.sql`
- Use prepared statements (Prisma handles this)

### 2. Application Security

```env
# Never commit secrets to Git
# Use .env.local for local overrides
# Rotate secrets regularly
NEXTAUTH_SECRET="use-openssl-rand-base64-32-to-generate"
```

### 3. Network Security

- Enable HTTPS in production
- Configure CORS properly
- Use rate limiting
- Implement request validation
- Sanitize user inputs (Prisma handles SQL injection)

### 4. WebSocket Security

- Validate user connections
- Rate limit WebSocket connections
- Use secure socket.io configuration
- Implement message size limits

---

## Backup and Recovery

### Database Backups

**Automated Backups** (Cron):
```bash
# Edit crontab
crontab -e

# Daily backup at 2 AM
0 2 * * * pg_dump -U innovation_user innovation_platform > /backups/db_$(date +\%Y\%m\%d).sql
```

**Manual Backup**:
```bash
# Full backup
pg_dump -U innovation_user innovation_platform > full_backup.sql

# Schema only
pg_dump -U innovation_user --schema-only innovation_platform > schema_backup.sql

# Data only
pg_dump -U innovation_user --data-only innovation_platform > data_backup.sql
```

**Restore**:
```bash
# Restore from backup
psql -U innovation_user innovation_platform < backup.sql

# Or use Prisma
bunx prisma db execute --file backup.sql
```

### Application Backups

```bash
# Backup environment variables
cp .env .env.backup.$(date +%Y%m%d)

# Backup built application
tar -czf app_backup.tar.gz .next/ public/ package.json

# Backup PostgreSQL database
pg_dump -U innovation_user innovation_platform > db_backup.sql
```

---

## Monitoring and Logging

### Application Logging

Configure structured logging:

```typescript
// lib/logger.ts
export const logger = {
  info: (message: string, meta?: any) => {
    console.log(JSON.stringify({
      level: 'info',
      message,
      meta,
      timestamp: new Date().toISOString(),
    }))
  },
  error: (message: string, error?: any) => {
    console.error(JSON.stringify({
      level: 'error',
      message,
      error: error?.stack,
      timestamp: new Date().toISOString(),
    }))
  },
}
```

### Monitoring Services

**Recommended Tools**:
1. **Sentry** - Error tracking
2. **Datadog** - Application monitoring
3. **PostgreSQL Logs** - Built-in monitoring
4. **Nginx Logs** - Access and error logs
5. **Uptime Monitoring** - UptimeRobot, Pingdom

---

## Scaling Considerations

### Database Scaling

- **Read Replicas**: Set up read replicas for query scaling
- **Connection Pooling**: Prisma uses connection pooling
- **Index Optimization**: Regular review of query patterns
- **Partitioning**: For large tables (consider for 100M+ rows)

### Application Scaling

- **Horizontal Scaling**: Deploy multiple instances behind load balancer
- **Vertical Scaling**: Increase server resources (CPU, RAM)
- **CDN**: Use CDN for static assets
- **Caching**: Implement Redis for session/cache

### Mini-Service Scaling

Team Service:
- Multiple instances with sticky sessions
- Redis for state sharing across instances

Notification Service:
- Queue-based notifications (Redis + Bull)
- Separate websocket service per region

---

## Contact & Support

### Documentation

- Prisma: https://www.prisma.io/docs
- Next.js: https://nextjs.org/docs
- PostgreSQL: https://www.postgresql.org/docs
- Socket.IO: https://socket.io/docs

### Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Prisma connection fails | Check DATABASE_URL, verify PostgreSQL is running |
| Socket.IO won't connect | Check port, CORS, firewall settings |
| Build fails | Clear .next cache, check TypeScript errors |
| Migrations fail | Check schema syntax, database permissions |

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2025-01-15 | Initial PostgreSQL migration with mini-services |

---

## Quick Reference

### Start All Services (Development)
```bash
bash start-services.sh
bun run dev
```

### Start All Services (Production)
```bash
sudo systemctl start postgresql
sudo systemctl start team-service
sudo systemctl start notification-service
sudo systemctl start innovation-platform
```

### Run Migrations
```bash
bun run db:generate
bun run db:push
```

### View Logs
```bash
# Next.js
tail -f dev.log

# Team service
tail -f /tmp/team-service.log

# Notification service
tail -f /tmp/notification-service.log
```

### Check Service Status
```bash
sudo systemctl status innovation-platform
sudo systemctl status team-service
sudo systemctl status notification-service
sudo systemctl status postgresql
```

---

## Integrated Architecture (Merged Services)

### Overview

For simplified deployment and management, the messaging (Team Chat) and notification services have been merged into the main Next.js application. This integrated approach:

- **Reduces complexity** - Single application instance instead of multiple services
- **Easier deployment** - One build, one deploy process
- **Simplified networking** - No need for inter-service communication
- **Unified monitoring** - Single log stream and metrics
- **Better for scaling** - Scale horizontally with ease

### Architecture Diagram (Integrated)

```
┌─────────────────────────────────────────────────────────────────────┐
│                  Integrated Application Layer                    │
│  ┌───────────────────────────────────────────────────────────┐    │
│  │              Next.js Custom Server (Port 3000)            │    │
│  │  ┌──────────────┐  ┌──────────────────────────────────┐  │    │
│  │  │   Next.js    │  │      Integrated Socket.IO        │  │    │
│  │  │   App        │  │      Server (/api/socket)        │  │    │
│  │  │             │  │  - Team Chat                    │  │    │
│  │  │  Pages      │  │  - Notifications                 │  │    │
│  │  │  API Routes │  │  - Real-time Features            │  │    │
│  │  └──────────────┘  └──────────────────────────────────┘  │    │
│  └───────────────────────────────────────────────────────────┘    │
│                            │                                      │
│                     ┌────────────────────────────┐                │
│                     │  PostgreSQL Database       │                │
│                     │  (Port 5432)             │                │
│                     └────────────────────────────┘                │
└─────────────────────────────────────────────────────────────────────┘
```

### Integrated Features

#### 1. Socket.IO Server Integration

**Location**: `/server.ts` (Custom Next.js server)

The integrated Socket.IO server provides:

- **Team Chat Functionality**
  - Real-time messaging via WebSocket
  - Room-based communication (one room per project)
  - @mentions support with notifications
  - Typing indicators
  - User online/offline presence
  - Message history per room

- **Notification System**
  - WebSocket-based real-time notifications
  - User preference management
  - Notification types (TASK_ASSIGNED, PROJECT_UPDATE, SYSTEM)
  - Mark as read functionality
  - Broadcast to all users

- **Connection Path**: `/api/socket`

#### 2. Notification REST APIs

**Location**: `/src/app/api/notifications/`

Available endpoints:

- `GET /api/notifications?userId={id}` - Get user notifications
- `POST /api/notifications` - Create notification
- `PATCH /api/notifications/{id}` - Update notification (mark as read)
- `DELETE /api/notifications/{id}?userId={id}` - Delete notification

#### 3. Team Chat Component

**Location**: `/src/components/team-chat.tsx`

Features:
- Auto-connects to integrated Socket.IO server
- Project-specific room joining
- Real-time message sync
- Online user list
- Typing indicators
- @mentions support

### Running the Integrated Application

#### Development Mode

```bash
# Install dependencies (includes socket.io and socket.io-client)
bun install

# Run the integrated server (includes Socket.IO)
bun run dev

# Or run Next.js without Socket.IO (dev:next)
bun run dev:next
```

**What happens**:
- Custom Next.js server starts on port 3000
- Socket.IO server is automatically initialized
- All Next.js routes work normally
- WebSocket connections handled at `/api/socket`

#### Production Mode

```bash
# Build the application
bun run build

# Start production server with Socket.IO
bun run start

# Or start without custom server
bun run start:next
```

### Environment Configuration (Integrated)

`.env` file for integrated architecture:

```env
# Database (PostgreSQL)
DATABASE_URL="postgresql://innovation_user:password@localhost:5432/innovation_platform?schema=public"

# Application
NODE_ENV="development"
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Authentication
NEXTAUTH_SECRET="dev-secret-change-in-production"
NEXTAUTH_URL="http://localhost:3000"

# Email (for notifications)
SMTP_HOST="smtp.example.com"
SMTP_PORT="587"
SMTP_USER="noreply@example.com"
SMTP_PASSWORD="your-smtp-password"
SMTP_FROM="Innovation Platform <noreply@example.com>"
```

**Note**: No separate service URLs needed - everything runs on port 3000.

### Client-Side Integration

#### Connecting to Socket.IO

```typescript
import { io } from 'socket.io-client'

// Connect to integrated server
const socket = io('/', {
  path: '/api/socket',
  transports: ['websocket', 'polling'],
})

// Join project room
socket.emit('room:join', {
  roomId: 'project-123',
  userId: 'user-456',
  userName: 'John Doe',
})

// Send message
socket.emit('message:send', {
  roomId: 'project-123',
  message: 'Hello team!',
})

// Receive messages
socket.on('message:received', (message) => {
  console.log('New message:', message)
})
```

#### Using Notification APIs

```typescript
// Get notifications
const response = await fetch('/api/notifications?userId=user-123')
const { data, unreadCount } = await response.json()

// Create notification
await fetch('/api/notifications', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    userId: 'user-123',
    type: 'TASK_ASSIGNED',
    title: 'New Task',
    message: 'You have been assigned a new task',
    link: '/tasks/123',
  }),
})

// Mark as read
await fetch('/api/notifications/notification-456', {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    userId: 'user-123',
    action: 'mark_read',
  }),
})
```

### Benefits of Integrated Architecture

1. **Simplified Development**
   - No need to manage multiple processes
   - Single codebase for all features
   - Easier debugging

2. **Easier Deployment**
   - Single build artifact
   - One deployment command
   - No service orchestration needed

3. **Reduced Infrastructure**
   - One server instance
   - Lower resource usage
   - Simpler monitoring

4. **Better Performance**
   - In-process communication
   - No network latency between services
   - Shared memory access

5. **Cost Effective**
   - Fewer server resources
   - Simpler architecture
   - Lower maintenance overhead

### Migration from Mini-Services (If Applicable)

If you were previously using separate mini-services:

1. **Update package.json scripts** - Already updated to use integrated server
2. **Update Socket.IO client connections** - Change from `XTransformPort=3001` to `path='/api/socket'`
3. **Remove mini-service startup scripts** - No longer needed
4. **Update environment variables** - Remove service-specific URLs
5. **Test all features** - Ensure chat and notifications work correctly

### When to Separate Services Again

Consider separating services again when:

- **Scale Requirements**: You need to scale chat/notifications independently
- **Team Structure**: Different teams manage different services
- **Resource Isolation**: Services need dedicated resources
- **Deployment Frequency**: Services have different release cycles
- **Technology Changes**: Need different technology stacks

The mini-services code remains in `/mini-services/` directory for future reference and can be reactivated if needed.

