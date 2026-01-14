import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { verifyPassword, generateToken, getTokenFromHeaders } from '@/lib/auth/jwt'
import { loginSchema } from '@/lib/validations/schemas'
import { z } from 'zod'

// POST /api/auth/login - User authentication with password verification
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate input
    const validatedData = loginSchema.parse(body)
    const { email, password } = validatedData

    // Find user by email
    const user = await db.user.findUnique({
      where: { email },
      include: {
        university: true,
      },
    })

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Verify password (in production, compare with hashed password)
    // For demo, we'll allow any password for testing
    const passwordValid = process.env.NODE_ENV === 'production'
      ? await verifyPassword(password, user.password as string)
      : true // Allow any password in development for testing

    if (!passwordValid) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Generate JWT token
    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
      verificationStatus: user.verificationStatus,
    })

    // Calculate average ratings
    const ratings = await db.rating.findMany({
      where: { ratedId: user.id },
    })

    const avgExecution = ratings.filter(r => r.dimension === 'EXECUTION').reduce((sum, r) => sum + r.score, 0) / (ratings.filter(r => r.dimension === 'EXECUTION').length || 1)
    const avgCollaboration = ratings.filter(r => r.dimension === 'COLLABORATION').reduce((sum, r) => sum + r.score, 0) / (ratings.filter(r => r.dimension === 'COLLABORATION').length || 1)
    const avgLeadership = ratings.filter(r => r.dimension === 'LEADERSHIP').reduce((sum, r) => sum + r.score, 0) / (ratings.filter(r => r.dimension === 'LEADERSHIP').length || 1)
    const avgEthics = ratings.filter(r => r.dimension === 'ETHICS').reduce((sum, r) => sum + r.score, 0) / (ratings.filter(r => r.dimension === 'ETHICS').length || 1)
    const avgReliability = ratings.filter(r => r.dimension === 'RELIABILITY').reduce((sum, r) => sum + r.score, 0) / (ratings.filter(r => r.dimension === 'RELIABILITY').length || 1)

    return NextResponse.json({
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        avatar: user.avatar,
        role: user.role,
        verificationStatus: user.verificationStatus,
        bio: user.bio,
        location: user.location,
        linkedinUrl: user.linkedinUrl,
        portfolioUrl: user.portfolioUrl,
        university: user.university,
        major: user.major,
        graduationYear: user.graduationYear,
        progressionLevel: user.progressionLevel,
        reputationScores: {
          execution: avgExecution || user.executionScore,
          collaboration: avgCollaboration || user.collaborationScore,
          leadership: avgLeadership || user.leadershipScore,
          ethics: avgEthics || user.ethicsScore,
          reliability: avgReliability || user.reliabilityScore,
        },
      },
      token,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      )
    }
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
