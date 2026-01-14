import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const projectId = params.id
    
    const tasks = await db.task.findMany({
      where: { projectId },
      include: {
        assignee: {
          select: {
            id: true,
            name: true,
            email: true,
            avatarUrl: true,
          }
        },
        project: {
          select: {
            title: true,
          }
        }
      },
      orderBy: {
        dueDate: "asc",
        createdAt: "desc",
      },
    })

    return NextResponse.json({
      success: true,
      data: tasks.map(t => ({
        id: t.id,
        title: t.title,
        description: t.description,
        priority: t.priority,
        status: t.status,
        dueDate: t.dueDate?.toISOString() || null,
        createdAt: t.createdAt.toISOString(),
        assignee: t.assignee || null,
        projectTitle: t.project?.title || null,
        projectId: t.projectId,
      })),
    })
  } catch (error: any) {
    console.error("Get project tasks error:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch project tasks" }, { status: 500 })
  }
}
