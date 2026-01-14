import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const userId = request.nextUrl.searchParams.get("userId")

    if (!userId) {
      return NextResponse.json({ success: false, error: "User ID required" }, { status: 400 })
    }

    const [totalCandidates, activeCandidates, verificationRequests, pendingRatings, averageRating] = await Promise.all([
      db.user.count({ where: { role: "STUDENT", status: "ACTIVE" } }),
      db.verificationRequest.count({ where: { employerId: userId, status: "PENDING" } }),
      db.rating.count({ where: { sourceId: userId } }),
      db.rating.aggregate({
        where: { sourceId: userId },
        _avg: { execution: true, collaboration: true, leadership: true, ethics: true, reliability: true },
      }),
    ])

    const avgOverallRating = averageRating._avg ? Math.round((averageRating._avg.execution + averageRating._avg.collaboration + averageRating._avg.leadership + averageRating._avg.ethics + averageRating._avg.reliability) * 10 / 5 / 10) : 0

    return NextResponse.json({
      success: true,
      data: {
        totalCandidates,
        activeCandidates,
        verificationRequests,
        pendingRatings,
        averageRating: avgOverallRating,
      },
    })
  } catch (error: any) {
    console.error("Get employer stats error:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch employer statistics" }, { status: 500 })
  }
}
