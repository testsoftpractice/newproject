import { NextRequest, NextResponse } from 'next/server'
import { getTokenFromHeaders, verifyToken } from '@/lib/auth/jwt'

// Public paths that don't require authentication
const publicPaths = ['/', '/auth', '/terms', '/privacy', '/forgot-password']

export function middleware(request: NextRequest) {
  const { pathname } = new URL(request.url)

  // Allow public paths
  if (publicPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.next()
  }

  // Verify JWT token
  const token = getTokenFromHeaders(request.headers)

  if (!token) {
    return NextResponse.redirect(new URL('/auth', request.url))
  }

  const decoded = verifyToken(token)

  if (!decoded) {
    // Token is invalid, redirect to login
    return NextResponse.redirect(new URL('/auth', request.url))
  }

  // Token is valid, proceed to protected route
  // Add user info to headers for use in API routes
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-user-id', decoded.userId)
  requestHeaders.set('x-user-email', decoded.email)
  requestHeaders.set('x-user-role', decoded.role)

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
}
