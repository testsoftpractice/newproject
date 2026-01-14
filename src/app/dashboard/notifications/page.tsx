'use client'
import { useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function NotificationsPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-background">
        <div className="container mx-auto px-4 py-4">
          <Link href="/dashboard/student">Notifications</Link>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <div className="p-12 text-center">
          <h1>Notifications Coming Soon</h1>
          <p>Notification center with dynamic data is being implemented.</p>
        </div>
      </main>
    </div>
  )
}
