# API Testing Guide

This guide provides comprehensive instructions for testing all API endpoints in the Applied Execution Platform.

## Table of Contents

1. [Authentication Setup](#authentication-setup)
2. [Testing Tools](#testing-tools)
3. [API Endpoint Reference](#api-endpoint-reference)
4. [Testing Workflows](#testing-workflows)
5. [Common Issues & Solutions](#common-issues--solutions)

---

## Authentication Setup

All API routes require authentication except for public endpoints. Authentication is handled via JWT tokens.

### Getting a JWT Token

1. **Sign Up (New User)**
   ```bash
   POST /api/auth/signup
   Content-Type: application/json

   {
     "email": "test@example.com",
     "password": "Password123!",
     "name": "Test User",
     "role": "STUDENT"
   }
   ```

2. **Login (Existing User)**
   ```bash
   POST /api/auth/login
   Content-Type: application/json

   {
     "email": "test@example.com",
     "password": "Password123!"
   }

   Response:
   {
     "success": true,
     "user": { ... },
     "token": "eyJhbGciOiJIUzI1NiIs..."
   }
   ```

3. **Using the Token**
   ```bash
   # In headers
   Authorization: Bearer eyJhbGciOiJIUzI1NiIs...

   # Or stored in localStorage (frontend)
   localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIs...')
   ```

---

## Testing Tools

### 1. Using Browser DevTools

```javascript
// Get token from localStorage
const token = localStorage.getItem('token')

// Make API call
fetch('/api/projects', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
})
  .then(res => res.json())
  .then(data => console.log(data))
```

### 2. Using curl

```bash
# Without auth
curl http://localhost:3000/api/projects

# With auth
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:3000/api/projects
```

### 3. Using Postman/Thunder Client

1. Import environment variables
2. Set `Authorization` header to `Bearer {{token}}`
3. Save requests in collections

---

## API Endpoint Reference

### Authentication

#### POST /api/auth/signup
Create a new user account.

**Request Body:**
```json
{
  "email": "string (required, unique)",
  "password": "string (required, min 8 chars)",
  "name": "string (required)",
  "role": "STUDENT | UNIVERSITY_ADMIN | EMPLOYER | INVESTOR | PLATFORM_ADMIN",
  "universityId": "string (optional, for students)"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "user": { "id": "...", "email": "...", "name": "...", "role": "..." },
  "token": "jwt_token_string"
}
```

**Error Response (400/409):**
```json
{
  "success": false,
  "error": "Email already exists"
}
```

---

#### POST /api/auth/login
Authenticate user and get JWT token.

**Request Body:**
```json
{
  "email": "string (required)",
  "password": "string (required)"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "user": { ... },
  "token": "jwt_token_string"
}
```

**Error Response (401/423/429):**
- 401: Invalid credentials
- 423: Account locked (too many failed attempts)
- 429: Too many attempts (rate limited)

---

### Projects

#### GET /api/projects
List projects with filters.

**Query Parameters:**
- `projectLeadId`: string - Filter by project lead
- `seekingInvestment`: boolean - Filter by investment status
- `status`: string - Filter by project status
- `universityId`: string - Filter by university

**Example:**
```bash
GET /api/projects?projectLeadId=userId&status=ACTIVE
```

**Success Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "cuid_string",
      "title": "Project Title",
      "description": "Project description",
      "category": "TECH_STARTUP",
      "status": "ACTIVE",
      "seekingInvestment": true,
      "investmentGoal": 100000,
      "projectLeadId": "userId",
      "universityId": "universityId"
    }
  ]
}
```

#### POST /api/projects
Create a new project (requires authentication).

**Request Body:**
```json
{
  "title": "string (required)",
  "description": "string (required)",
  "category": "TECH_STARTUP | E_COMMERCE | ... (required)",
  "projectLeadId": "string (required)",
  "universityId": "string (optional)",
  "investmentGoal": 100000,
  "seekingInvestment": true
}
```

**Success Response (201):**
```json
{
  "success": true,
  "data": { "id": "...", "title": "...", ... }
}
```

---

### Marketplace

#### GET /api/marketplace/projects
Search and filter marketplace projects.

**Query Parameters:**
- `search`: string - Search in title/description
- `category`: string - Filter by category
- `status`: string - Filter by status
- `sort`: "recent" | "funding" | "rating"
- `page`: number - Page number (default: 1)
- `limit`: number - Items per page (default: 20)

**Example:**
```bash
GET /api/marketplace/projects?search=tech&category=TECH_STARTUP&page=1&limit=20
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "projects": [
      {
        "id": "cuid_string",
        "title": "Project Title",
        "description": "...",
        "category": "TECH_STARTUP",
        "university": "University Name",
        "status": "ACTIVE",
        "investmentGoal": 100000,
        "currentRaised": 25000,
        "seekingInvestment": true,
        "teamReputation": 4.5,
        "teamSize": 5
      }
    ],
    "totalCount": 50,
    "currentPage": 1,
    "totalPages": 3
  }
}
```

---

### Investments

#### GET /api/investments
List investments with filters.

**Query Parameters:**
- `projectId`: string - Filter by project
- `investorId`: string - Filter by investor
- `status`: "INTERESTED" | "UNDER_REVIEW" | "AGREED" | "FUNDED" | ...
- `type`: "EQUITY" | "REVENUE_SHARE" | "CONVERTIBLE_NOTE" | ...

**Example:**
```bash
GET /api/investments?investorId=userId&status=FUNDED
```

**Success Response (200):**
```json
{
  "investments": [
    {
      "id": "cuid_string",
      "projectId": "projectId",
      "project": { ... },
      "investorId": "investorId",
      "investor": { ... },
      "type": "EQUITY",
      "status": "FUNDED",
      "amount": 50000,
      "equity": 10,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "fundedAt": "2024-01-15T00:00:00.000Z"
    }
  ]
}
```

#### POST /api/investments
Create a new investment interest (requires authentication).

**Request Body:**
```json
{
  "projectId": "string (required)",
  "investorId": "string (required)",
  "type": "EQUITY | REVENUE_SHARE | CONVERTIBLE_NOTE | GRANT | PARTNERSHIP",
  "amount": 50000,
  "equity": 10,
  "terms": { "custom": "terms object" }
}
```

**Success Response (201):**
```json
{
  "message": "Investment interest created successfully",
  "investment": { ... }
}
```

**Error Responses:**
- 404: Project not found
- 400: Project not seeking investment
- 400: Already invested in this project

---

### Dashboard Stats

#### GET /api/dashboard/student/stats
Get student dashboard statistics.

**Query Parameters:**
- `userId`: string (required)

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "totalProjects": 5,
    "activeProjects": 3,
    "completedProjects": 2,
    "overallProgress": 75,
    "overallRating": 4.5,
    "breakdown": {
      "execution": 4.3,
      "collaboration": 4.6,
      "leadership": 4.4,
      "ethics": 4.7,
      "reliability": 4.5
    },
    "recentActivityCount": 12
  }
}
```

#### GET /api/dashboard/investor/stats
Get investor dashboard statistics.

**Query Parameters:**
- `userId`: string (required)

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "totalInvestments": 10,
    "totalEquity": 25,
    "averageReturn": 18.5,
    "portfolioCount": 5,
    "opportunitiesCount": 15
  }
}
```

#### GET /api/dashboard/university/stats
Get university dashboard statistics.

**Query Parameters:**
- `userId`: string (required)
- `universityId`: string (optional)

---

### Tasks

#### GET /api/tasks
List tasks with filters.

**Query Parameters:**
- `assigneeId`: string - Filter by assignee
- `projectId`: string - Filter by project
- `status`: "PENDING" | "ASSIGNED" | "IN_PROGRESS" | "COMPLETED"
- `priority`: "LOW" | "MEDIUM" | "HIGH" | "URGENT"

**Example:**
```bash
GET /api/tasks?assigneeId=userId&status=IN_PROGRESS
```

#### POST /api/tasks
Create a new task (requires authentication).

**Request Body:**
```json
{
  "title": "string (required)",
  "description": "string (optional)",
  "projectId": "string (required)",
  "assigneeId": "string (optional)",
  "creatorId": "string (required)",
  "priority": "MEDIUM",
  "dueDate": "2024-12-31T23:59:59.000Z"
}
```

---

### Records

#### GET /api/records
Get professional records for a user.

**Query Parameters:**
- `userId`: string (required)

#### POST /api/records
Create a new professional record.

**Request Body:**
```json
{
  "userId": "string (required)",
  "type": "PROJECT_ROLE | LEADERSHIP_POSITION | TASK_COMPLETION | ...",
  "title": "string (required)",
  "description": "string (optional)",
  "projectId": "string (optional)",
  "roleName": "string (optional)",
  "startDate": "2024-01-01T00:00:00.000Z",
  "endDate": "2024-12-31T23:59:59.000Z"
}
```

---

### University Analytics

#### GET /api/students/[id]/tags
Get tags for a student.

**Request Body:**
```json
{
  "department": "string (optional)",
  "yearLevel": "number (optional)",
  "major": "string (optional)",
  "skillTags": ["string array (optional)"]
}
```

#### GET /api/dashboard/university/analytics
Get university analytics data.

---

---

## Testing Workflows

### Workflow 1: Student Creates Project and Seeks Investment

1. **Login as Student**
   ```bash
   POST /api/auth/signup
   {
     "email": "student@example.com",
     "password": "Student123!",
     "name": "John Student",
     "role": "STUDENT"
   }
   ```

2. **Create a Project**
   ```bash
   POST /api/projects
   Authorization: Bearer {token}
   {
     "title": "AI-Powered Learning Platform",
     "description": "An innovative platform using AI...",
     "category": "TECH_STARTUP",
     "projectLeadId": "{userId}",
     "seekingInvestment": true,
     "investmentGoal": 100000
   }
   ```

3. **Verify Project in Marketplace**
   ```bash
   GET /api/marketplace/projects?category=TECH_STARTUP
   ```

### Workflow 2: Investor Browses and Expresses Interest

1. **Login as Investor**
   ```bash
   POST /api/auth/login
   {
     "email": "investor@example.com",
     "password": "Investor123!"
   }
   ```

2. **Browse Marketplace**
   ```bash
   GET /api/marketplace/projects
   ```

3. **Express Interest in a Project**
   ```bash
   POST /api/investments
   Authorization: Bearer {token}
   {
     "projectId": "{projectId}",
     "investorId": "{investorId}",
     "type": "EQUITY",
     "amount": 25000,
     "equity": 15
   }
   ```

4. **Check Investor Dashboard**
   ```bash
   GET /api/investments?investorId={investorId}
   GET /api/dashboard/investor/stats?userId={investorId}
   ```

### Workflow 3: Student Checks Tasks and Progress

1. **Get Student Dashboard Stats**
   ```bash
   GET /api/dashboard/student/stats?userId={userId}
   ```

2. **Get Assigned Tasks**
   ```bash
   GET /api/tasks?assigneeId={userId}
   ```

3. **Update Task Status** (if endpoint available)
   ```bash
   PUT /api/tasks/{taskId}
   ```

### Workflow 4: University Admin Views Analytics

1. **Login as University Admin**
   ```bash
   POST /api/auth/login
   {
     "email": "admin@university.edu",
     "password": "Admin123!"
   }
   ```

2. **Get University Stats**
   ```bash
   GET /api/dashboard/university/stats?userId={userId}
   ```

3. **Tag Students**
   ```bash
   POST /api/students/{studentId}/tags
   Authorization: Bearer {token}
   {
     "department": "Computer Science",
     "yearLevel": 3,
     "major": "Software Engineering",
     "skillTags": ["Python", "React", "Machine Learning"]
   }
   ```

---

## Common Issues & Solutions

### Issue 1: "Authentication Required" Error

**Cause:** Missing or invalid JWT token in headers.

**Solution:**
```javascript
// Make sure token is included in headers
headers: {
  'Authorization': `Bearer ${token}`
}

// Check token validity
fetch('/api/auth/login', {
  method: 'POST',
  body: JSON.stringify({ email, password })
})
  .then(res => res.json())
  .then(data => localStorage.setItem('token', data.token))
```

---

### Issue 2: 429 Too Many Requests

**Cause:** Rate limiting on login/signup endpoints (5 attempts per 5 minutes).

**Solution:** Wait 5 minutes before trying again.

---

### Issue 3: 423 Account Locked

**Cause:** 5 consecutive failed login attempts.

**Solution:**
1. Account locks for 15 minutes
2. Reset via password reset flow (if implemented)
3. Contact platform admin

---

### Issue 4: CORS Errors

**Cause:** Browser blocking cross-origin requests.

**Solution:** Ensure all API calls use relative paths:
```javascript
// ✅ Correct
fetch('/api/projects')

// ❌ Wrong
fetch('http://localhost:3000/api/projects')
```

---

### Issue 5: "Project Not Found"

**Cause:** Invalid project ID or project doesn't exist.

**Solution:**
1. Verify project ID is correct
2. Check if project exists in database
3. Ensure user has permission to access project

---

### Issue 6: Database Connection Errors

**Cause:** Database not initialized or migration pending.

**Solution:**
```bash
# Push schema to database
bun run db:push

# Regenerate Prisma client
bun run db:generate
```

---

## Quick Test Checklist

### Authentication
- [ ] Sign up new user
- [ ] Login with correct credentials
- [ ] Login with wrong credentials (should fail)
- [ ] Use JWT token in subsequent requests

### Projects
- [ ] Create project as student
- [ ] List all projects
- [ ] Filter projects by status
- [ ] Filter projects by category
- [ ] Get project by ID

### Marketplace
- [ ] Browse marketplace projects
- [ ] Search projects by keyword
- [ ] Filter by category
- [ ] Filter by funding stage
- [ ] Sort by recent/funding/rating

### Investments
- [ ] Express interest in project
- [ ] List investor's investments
- [ ] Filter investments by status
- [ ] Verify notification created for project lead

### Dashboards
- [ ] Get student dashboard stats
- [ ] Get investor dashboard stats
- [ ] Get university dashboard stats
- [ ] Verify stats are calculated correctly

### Tasks
- [ ] Create new task
- [ ] List assigned tasks
- [ ] Filter tasks by status
- [ ] Filter tasks by priority

---

## API Status Codes

| Code | Meaning | Common Cause |
|------|---------|--------------|
| 200 | OK | Successful GET/PUT/DELETE |
| 201 | Created | Successful POST |
| 400 | Bad Request | Invalid input data |
| 401 | Unauthorized | Missing or invalid token |
| 403 | Forbidden | Insufficient permissions |
| 404 | Not Found | Resource doesn't exist |
| 409 | Conflict | Duplicate resource (email exists) |
| 423 | Locked | Account locked |
| 429 | Too Many Requests | Rate limit exceeded |
| 500 | Internal Server Error | Server error |

---

## Production Considerations

1. **Security**
   - Use HTTPS in production
   - Store JWT in httpOnly cookies (not localStorage)
   - Implement CSRF protection
   - Sanitize all input data

2. **Performance**
   - Implement pagination for all list endpoints
   - Add caching for frequently accessed data
   - Use database indexes properly

3. **Monitoring**
   - Log all API errors
   - Track API response times
   - Monitor failed authentication attempts
   - Set up alerts for 500 errors

---

## Additional Resources

- [Next.js API Routes Documentation](https://nextjs.org/docs/api-routes/introduction)
- [Prisma Documentation](https://www.prisma.io/docs)
- [JWT Best Practices](https://tools.ietf.org/html/rfc8725)
- [REST API Best Practices](https://restfulapi.net/)

---

Last Updated: 2024
