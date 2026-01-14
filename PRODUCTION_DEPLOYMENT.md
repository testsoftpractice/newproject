# Applied Execution Platform

A governed ecosystem where students operate real organizations, build verifiable careers from university onward, and transition seamlessly into industry or entrepreneurship.

## 🚀 Production Deployment Guide

This platform is built with **Next.js 15**, **TypeScript**, **Prisma ORM**, and **SQLite** (can be migrated to PostgreSQL). It supports separate frontend and backend deployment.

---

## 📋 Prerequisites

### Development Environment
- Node.js 18+ / Bun
- pnpm / npm / yarn
- Git

### Production Deployment
- Vercel account (for frontend)
- DigitalOcean / AWS / Railway (for backend)
- Domain name (optional)

---

## 🛠️ Production Configuration

### 1. Environment Variables

Copy `.env.example` to `.env` and update all variables:

```bash
# Database
DATABASE_URL=file:./db/custom.db  # Change to PostgreSQL URL in production

# Authentication
JWT_SECRET=your-super-secret-jwt-key-min-32-chars
JWT_EXPIRES_IN=7d

# Environment
NODE_ENV=production

# API Configuration
API_RATE_LIMIT=100
API_RATE_WINDOW=15

# Security
BCRYPT_ROUNDS=12

# CORS (comma-separated origins)
CORS_ORIGINS=https://your-frontend-domain.com

# Feature Flags
ENABLE_EMAIL_NOTIFICATIONS=true
ENABLE_PAYMENT_PROCESSING=true
ENABLE_FILE_UPLOADS=true

# Monitoring (optional)
# SENTRY_DSN=your-sentry-dsn
# LOGTAIL_SOURCE_TOKEN=your-logtail-token
```

**Important:** Generate a strong `JWT_SECRET` for production:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 2. Database Migration (SQLite → PostgreSQL)

The platform uses SQLite for development. For production, migrate to PostgreSQL:

#### A. Set Up PostgreSQL Database

```bash
# Create database on your hosting provider
# Get connection string: postgresql://user:password@host:port/database
```

#### B. Update Environment Variables

Update `.env`:

```bash
DATABASE_URL=postgresql://user:password@host:port/database
```

#### C. Generate Prisma Client

```bash
cd backend
bun install
bun run db:generate
bun run db:push  # Migrate schema to PostgreSQL
```

#### D. Verify Migration

```bash
bun run db:studio  # Open Prisma Studio to verify
```

---

## 🚢 Deploy to Production

### Option 1: Monolith Deployment (Single Vercel App)

Deploy the entire application to Vercel:

```bash
# 1. Push to Git
git add .
git commit -m "Production deployment"
git push origin main

# 2. Connect to Vercel
# - Go to vercel.com
# - Import your Git repository
# - Configure build settings:
#   Framework Preset: Next.js
#   Root Directory: ./
#   Build Command: bun run build
#   Output Directory: .next/standalone

# 3. Add Environment Variables
# - Go to Settings → Environment Variables
# - Add all variables from .env (except DATABASE_URL)
# - Add DATABASE_URL pointing to your PostgreSQL instance

# 4. Deploy
# - Click "Deploy"
# - Vercel will build and deploy automatically
```

### Option 2: Separate Frontend & Backend (Recommended)

#### A. Deploy Backend (API + Database)

1. **Prepare Backend Directory:**

```bash
# Copy API routes and lib files to a separate backend folder
mkdir -p backend
cp -r src/app/api backend/
cp -r src/lib backend/
cp -r prisma backend/
cp package.json backend/
```

2. **Deploy to DigitalOcean (or similar):**

```bash
# Using DigitalOcean App Platform
# 1. Create new App
# 2. Connect your GitHub repository
# 3. Configure build:
#    Build Command: bun install && bun run db:generate
#    Run Command: bun run start
#    HTTP Port: 3000
# 4. Add environment variables
#    DATABASE_URL: your PostgreSQL connection string
#    JWT_SECRET: your secret key
#    NODE_ENV: production

# 5. Deploy
# DigitalOcean will clone, build, and deploy
```

3. **Get Backend URL:**
   - DigitalOcean will provide: `https://your-backend-name.ondigitalocean.app`
   - Configure your custom domain if needed

#### B. Deploy Frontend (Next.js)

1. **Update API Base URL in Frontend:**

Create `.env.local` for frontend:
```bash
NEXT_PUBLIC_API_URL=https://your-backend-name.ondigitalocean.app
```

2. **Deploy to Vercel:**

```bash
# 1. Push to Git
git add .env.local
git commit -m "Configure API URL"

# 2. Connect to Vercel
# - Go to vercel.com
# - Import repository
# - Configure:
#   Framework: Next.js
#   Build Command: bun run build
#   Environment Variables:
#     NEXT_PUBLIC_API_URL=https://your-backend-name.ondigitalocean.app

# 3. Deploy
```

---

## 🔒 Security Checklist

### Must-Do Before Production

- [ ] **Generate strong JWT_SECRET** (min 32 characters)
- [ ] **Enable HTTPS** (automatic on Vercel, configure on backend)
- [ ] **Set NODE_ENV=production**
- [ ] **Implement CORS properly**
- [ ] **Add rate limiting to API routes**
- [ ] **Enable password hashing** (bcrypt, already implemented)
- [ ] **Remove test data from database**
- [ ] **Review and remove any console.log statements**
- [ ] **Enable Prisma query logging** for debugging only
- [ ] **Configure CORS origins** to allow only your frontend domain
- [ ] **Set appropriate BCRYPT_ROUNDS** (12 recommended)

### Optional Security Enhancements

- [ ] **Add Helmet.js** (security headers)
- [ ] **Implement request size limits**
- [ ] **Add XSS protection**
- [ ] **Enable CSRF protection** for form submissions
- [ ] **Add input sanitization**
- [ ] **Implement IP whitelisting for admin routes**
- [ ] **Add Two-Factor Authentication (2FA)**

---

## 📊 Monitoring & Observability

### 1. Error Tracking (Sentry - Optional)

```bash
# Install Sentry
bun add @sentry/nextjs

# Configure in sentry.client.config.ts and sentry.server.config.ts
# Add SENTRY_DSN to environment variables
```

### 2. Performance Monitoring (Vercel Analytics - Free)

Vercel provides built-in analytics. Enable in dashboard.

### 3. Uptime Monitoring (UptimeRobot - Free)

- Create account at uptimerobot.com
- Add monitors for your frontend and backend URLs
- Configure alert notifications

### 4. Log Management (Optional)

```bash
# Add Logtail or similar service
# Install SDK
# Configure log forwarding
```

---

## 🔄 Database Backup Strategy

### SQLite Development
```bash
# Manual backup
cp db/custom.db backups/$(date +%Y%m%d_%H%M%S).db
```

### PostgreSQL Production

#### Automated Backups

Most hosting providers offer automated backups:
- **DigitalOcean**: Enable automated backups (daily, weekly, monthly)
- **AWS RDS**: Automated snapshots
- **Railway**: Automatic backups included

#### Manual Backup

```bash
# Using pg_dump
pg_dump -h host -U user -d database > backup_$(date +%Y%m%d).sql

# Using Prisma (export data)
bun prisma db seed --schema-only
```

#### Restore from Backup

```bash
# Using psql
psql -h host -U user -d database < backup.sql

# Or use Prisma to restore
bun prisma db push --force-reset
```

---

## 🧪 Testing Before Production

### 1. Manual Testing Checklist

- [ ] Test signup flow with all user roles
- [ ] Test login with valid credentials
- [ ] Test login with invalid credentials
- [ ] Test password reset flow
- [ ] Test all API routes with valid data
- [ ] Test all API routes with invalid data
- [ ] Test project creation workflow
- [ ] Test task assignment and completion
- [ ] Test rating submission
- [ ] Test verification request and approval
- [ ] Test investment interest and approval
- [ ] Test file upload (if enabled)
- [ ] Test pagination on list endpoints
- [ ] Test filter and sort functionality
- [ ] Test error handling with invalid inputs
- [ ] Test rate limiting (if implemented)

### 2. Automated Testing (Optional)

```bash
# Install testing dependencies
bun add -d @playwright/test @playwright/test

# Create test files in tests/ directory
# Run tests
bun test
```

---

## 📈 Performance Optimization

### 1. Next.js Optimizations

- [ ] **Enable Image Optimization**: Already using Next.js Image component
- [ ] **Enable Server-Side Rendering**: Already using Next.js App Router
- [ ] **Configure Cache Headers**: Add to API routes for static data
- [ ] **Enable Static Exports**: Consider for some routes

### 2. Database Optimizations

- [ ] **Add indexes** to frequently queried fields (already in schema)
- [ ] **Enable connection pooling** for PostgreSQL
- [ ] **Use database replication** for high-traffic scenarios
- [ ] **Consider read replicas** for read-heavy queries

### 3. API Response Optimization

- [ ] **Implement pagination** on all list endpoints (already implemented)
- [ ] **Add response compression** (automatic in production)
- [ ] **Use selective field queries** with Prisma include
- [ ] **Implement caching** for frequently accessed data

---

## 🔧 Maintenance & Updates

### 1. Code Updates

```bash
# Pull latest changes
git pull origin main

# Install dependencies
bun install

# Run database migrations
bun run db:generate
bun run db:push

# Build and test
bun run build
bun run lint

# Deploy
git push origin main
```

### 2. Database Schema Updates

```bash
# When modifying schema.prisma

# 1. Generate migration
bun prisma db migrate dev --name describe_migration

# 2. Create production migration
bun prisma db migrate dev --create-only

# 3. Deploy migration to production
# Run on production server:
bun prisma migrate deploy
```

### 3. Dependency Updates

```bash
# Check for updates
bun outdated

# Update major versions (test thoroughly)
bun update <package-name>

# Update all
bun update
```

---

## 📚 API Documentation

### Base URL
```
Development: http://localhost:3000/api
Production: https://your-backend-domain.com/api
```

### Authentication

All authenticated requests must include:
```
Authorization: Bearer <token>
```

### Response Format

Success:
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

Error:
```json
{
  "success": false,
  "error": "Error message",
  "errors": [ ... ]
}
```

### Rate Limiting

Default: 100 requests per 15 minutes per IP
Response headers:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1699999999
```

---

## 🚨 Troubleshooting

### Common Issues

#### 1. CORS Errors
**Problem**: Frontend can't access backend
**Solution**: Configure CORS_ORIGINS in backend to include frontend domain

#### 2. Database Connection Errors
**Problem**: Can't connect to PostgreSQL
**Solution**:
- Verify DATABASE_URL is correct
- Check firewall settings
- Verify database is accepting connections
- Check SSL certificates

#### 3. JWT Verification Errors
**Problem**: Tokens are invalid
**Solution**:
- Ensure JWT_SECRET matches between frontend and backend
- Check token expiration (7 days default)
- Verify token is sent in Authorization header

#### 4. Build Failures
**Problem**: Production build fails
**Solution**:
- Check Node.js version compatibility
- Run `bun install` to refresh dependencies
- Check TypeScript errors: `bun run lint`
- Clear Next.js cache: `rm -rf .next`

#### 5. Deployment Failures
**Problem**: Deployment fails or crashes
**Solution**:
- Check Vercel/DigitalOcean logs
- Verify environment variables are set
- Check database migrations ran successfully
- Verify database connection string

---

## 📞 Support & Resources

### Documentation
- Next.js: https://nextjs.org/docs
- Prisma: https://www.prisma.io/docs
- shadcn/ui: https://ui.shadcn.com

### Community
- Next.js Discord: https://discord.gg/nextjs
- Prisma Discord: https://discord.gg/prisma

### Platform Support
- Create GitHub issues for bugs
- Check existing issues before creating new ones
- Provide reproduction steps for bugs

---

## 🎯 Post-Deployment Checklist

After deploying to production, complete these tasks:

### Immediately
- [ ] Verify all pages load correctly
- [ ] Test signup and login flows
- [ ] Verify database connection
- [ ] Check console for errors
- [ ] Test API endpoints with Postman/curl
- [ ] Verify JWT tokens are generated and validated
- [ ] Test file uploads (if enabled)
- [ ] Check HTTPS is working
- [ ] Verify CORS is configured correctly

### Within 24 Hours
- [ ] Set up monitoring and alerts
- [ ] Configure error tracking
- [ ] Set up database backup schedule
- [ ] Verify rate limiting is working
- [ ] Test all user flows end-to-end
- [ ] Check for performance issues
- [ ] Review security logs
- [ ] Verify email notifications (if enabled)
- [ ] Test payment integration (if enabled)

### Within First Week
- [ ] Monitor uptime and performance
- [ ] Review error logs and fix any issues
- [ ] Gather feedback from early users
- [ ] Optimize slow API endpoints
- [ ] Add any missing error handling
- [ ] Verify backups are running successfully
- [ ] Update dependencies if updates available
- [ ] Document any custom configurations
- [ ] Train support team on common issues

---

## 📝 Notes

### Development vs Production Differences

| Feature | Development | Production |
|----------|-------------|-------------|
| Database | SQLite | PostgreSQL |
| Auth | Any password | Hashed passwords |
| API Rate Limiting | Disabled | 100 req/15min |
| Error Logging | Console | Sentry/Logtail |
| Email Notifications | Console | SendGrid/Mailgun |
| File Storage | Local | S3/R2 |

### Scaling Considerations

1. **Database**: PostgreSQL scales better than SQLite
2. **API**: Consider API Gateway for rate limiting and caching
3. **Storage**: Use object storage (S3, R2) for files
4. **Email**: Use transactional email service
5. **Background Jobs**: Consider Bull/BullMQ for job queues
6. **Caching**: Add Redis for session and rate limiting
7. **CDN**: Use CDN for static assets
8. **Load Balancer**: Add for high-traffic scenarios

---

## 📄 License

This project is proprietary software. All rights reserved.

---

## 🎉 Success Criteria

Your platform is production-ready when:

- ✅ All tests pass
- ✅ Database migrations are successful
- ✅ Authentication flow works end-to-end
- ✅ All API endpoints respond correctly
- ✅ Frontend loads without errors
- ✅ HTTPS is configured
- ✅ CORS is properly configured
- ✅ Monitoring is set up
- ✅ Backups are configured
- ✅ Error tracking is enabled
- ✅ Rate limiting is active
- ✅ Security headers are configured

---

**Congratulations!** 🚀 Your Applied Execution Platform is now production-ready.
