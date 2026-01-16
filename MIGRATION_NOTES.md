# Migration to PostgreSQL - Important Notes

## Current Status

The database schema has been successfully migrated from SQLite to PostgreSQL in the Prisma configuration.

### Changes Made:

1. **Prisma Schema** (`prisma/schema.prisma`):
   - Changed provider from `"sqlite"` to `"postgresql"`
   - No schema changes required (same models work with PostgreSQL)

2. **Package Dependencies** (`package.json`):
   - Added `@prisma/adapter-pg` for PostgreSQL support

3. **Environment Configuration** (`.env` and `.env.example`):
   - Updated DATABASE_URL to PostgreSQL connection format
   - Added all environment variable references

## To Complete Migration

### Option 1: Install PostgreSQL Locally

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql

# Create database and user
sudo -u postgres psql <<EOF
CREATE DATABASE innovation_platform;
CREATE USER innovation_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE innovation_platform TO innovation_user;
\q

# Run migrations
bun run db:generate
bun run db:push
```

### Option 2: Use Cloud PostgreSQL (Recommended for Development)

Free PostgreSQL services:
- **Supabase**: https://supabase.com (PostgreSQL + auth + storage)
- **Neon**: https://neon.tech (Serverless PostgreSQL)
- **Render**: https://render.com (Managed PostgreSQL)
- **Railway**: https://railway.app

**Setup Example (Neon)**:

1. Sign up at https://neon.tech
2. Create a new project
3. Get connection string
4. Update `.env`:
   ```env
   DATABASE_URL="postgresql://username:password@ep-cool-neon-xxx.us-east-2.aws.neon.tech/innovation_platform?sslmode=require"
   ```

### Option 3: Docker with PostgreSQL

See full Docker setup in [DEPLOYMENT.md](./DEPLOYMENT.md)

```bash
# Start PostgreSQL in Docker
docker run -d --name innovation-db \
  -e POSTGRES_PASSWORD=your_password \
  -e POSTGRES_USER=innovation_user \
  -e POSTGRES_DB=innovation_platform \
  -p 5432:5432 \
  postgres:14-alpine

# Run migrations
bun run db:push
```

## Reverting to SQLite (If Needed)

If you need to switch back to SQLite (for local development without PostgreSQL):

```bash
# Revert schema.prisma provider
# Change: provider = "postgresql"
# To:      provider = "sqlite"

# Update .env DATABASE_URL
# Change to: DATABASE_URL="file:./db/custom.db"

# Reinstall Prisma
rm -rf node_modules prisma/node_modules
bun install

# Regenerate and push
bun run db:generate
bun run db:push
```

## PostgreSQL vs SQLite Comparison

| Feature | SQLite | PostgreSQL |
|---------|---------|-------------|
| Setup | Simple (file-based) | Requires server installation |
| Performance | Good for single-user, small datasets | Better for concurrent access, large datasets |
| Concurrency | Limited (write locks) | Excellent (MVCC) |
| Scalability | Limited (single file) | Excellent (replication, partitioning) |
| Full-text search | FTS extension available | Native support, pg_trgm |
| JSON support | Limited | Excellent (JSONB) |
| Production-ready | Yes | Yes, designed for production |

## Internal Communication System

Both mini-services have been integrated:

### Team Chat Service (Port 3001)
- **Tech Stack**: Socket.IO + Bun
- **Location**: `/mini-services/team-service/`
- **Frontend Integration**: `/components/team-chat.tsx`
- **Usage**: Integrated into project pages via "Chat" tab

### Notification Service (Port 3002)
- **Tech Stack**: WebSocket API + Bun
- **Location**: `/mini-services/notification-service/`
- **Features**: Real-time notifications, preferences management

### Starting Mini-Services

```bash
# Start all services
bash start-services.sh

# Check logs
tail -f /tmp/team-service.log
tail -f /tmp/notification-service.log
```

## Documentation

- **Full Deployment Guide**: See [DEPLOYMENT.md](./DEPLOYMENT.md)
- **Environment Variables**: See [.env.example](./.env.example)
- **Prisma Documentation**: https://www.prisma.io/docs
- **PostgreSQL Documentation**: https://www.postgresql.org/docs

## Quick Start Commands

```bash
# 1. Install dependencies
bun install

# 2. Setup PostgreSQL (choose one option)
# - Option A: Install locally (see above)
# - Option B: Use cloud service (see above)
# - Option C: Use Docker (see above)

# 3. Configure environment
cp .env.example .env
# Edit .env with your DATABASE_URL

# 4. Run migrations
bun run db:generate
bun run db:push

# 5. Start services
bash start-services.sh
bun run dev
```

## Troubleshooting

### Prisma PostgreSQL Issues

**Error**: "Can't reach database server"

**Solutions**:
1. Verify PostgreSQL is running: `sudo systemctl status postgresql`
2. Check connection string in `.env`
3. Test connection: `psql $DATABASE_URL`
4. Check firewall settings (port 5432)

**Error**: "Permission denied"

**Solutions**:
1. Check database user permissions: `GRANT ALL PRIVILEGES`
2. Verify username/password in connection string
3. Check pg_hba.conf settings

### Migration Issues

**Error**: "No migrations found" or "Failed to push"

**Solutions**:
1. Regenerate Prisma client: `bun run db:generate`
2. Check schema syntax: `bunx prisma validate`
3. Reset database (careful - deletes data): `bunx prisma migrate reset`
4. Use `--force-reset` if needed

---

**Last Updated**: 2025-01-15
**Migration Status**: ✅ Schema Updated, Awaiting PostgreSQL Installation
