import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const projectId = params.id
    
    const members = await db.projectMember.findMany({
      where: { projectId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            avatarUrl: true,
            role: true,
            reputation: true,
          }
        }
      },
      orderBy: {
        createdAt: "desc"
      },
    })

    return NextResponse.json({
      success: true,
      data: members.map(m => ({
        id: m.id,
        userId: m.userId,
        user: m.user,
        role: m.role,
        joinedAt: m.createdAt.toISOString(),
        status: m.status,
      })),
    })
  } catch (error: any) {
    console.error("Get project members error:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch project members" }, { status: 500 })
  }
}
