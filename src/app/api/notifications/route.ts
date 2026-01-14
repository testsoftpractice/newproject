import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const userId = request.nextUrl.searchParams.get("userId")
    
    if (!userId) {
      return NextResponse.json({ success: false, error: "User ID is required" }, { status: 400 })
    }

    const notifications = await db.notification.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 50,
    })

    return NextResponse.json({
      success: true,
      data: {
        notifications: notifications.map(n => ({
          id: n.id,
          type: n.type,
          title: n.title,
          message: n.message,
          link: n.link || "",
          read: n.read,
          createdAt: n.createdAt.toISOString(),
        })),
        totalCount: notifications.length,
      },
    })
  } catch (error: any) {
    console.error("Get notifications error:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch notifications" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, type, title, message, link } = body

    if (!userId) {
      return NextResponse.json({ success: false, error: "User ID is required" }, { status: 400 })
    }

    const notification = await db.notification.create({
      data: { userId, type, title, message, link, read: false },
    })

    return NextResponse.json({
      success: true,
      data: notification,
    })
  } catch (error: any) {
    console.error("Create notification error:", error)
    return NextResponse.json({ success: false, error: "Failed to create notification" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const notificationId = params.id
    const body = await request.json()
    const updates: any = {}

    if (body.read !== undefined) updates.read = body.read

    const notification = await db.notification.update({
      where: { id: notificationId },
      data: updates,
    })

    return NextResponse.json({
      success: true,
      data: notification,
    })
  } catch (error: any) {
    console.error("Update notification error:", error)
    return NextResponse.json({ success: false, error: "Failed to update notification" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const notificationId = params.id

    await db.notification.delete({
      where: { id: notificationId },
    })

    return NextResponse.json({
      success: true,
      message: "Notification deleted successfully",
    })
  } catch (error: any) {
    console.error("Delete notification error:", error)
    return NextResponse.json({ success: false, error: "Failed to delete notification" }, { status: 500 })
  }
}

export async function PATCH_MARK_ALL_READ(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId } = body

    if (!userId) {
      return NextResponse.json({ success: false, error: "User ID is required" }, { status: 400 })
    }

    const result = await db.notification.updateMany({
      where: { userId, read: false },
      data: { read: true },
    })

    return NextResponse.json({
      success: true,
      data: {
        markedAsRead: result.count,
        message: result.count + " notifications marked as read",
      },
    })
  } catch (error: any) {
    console.error("Mark all notifications read error:", error)
    return NextResponse.json({ success: false, error: "Failed to mark notifications as read" }, { status: 500 })
  }
}
