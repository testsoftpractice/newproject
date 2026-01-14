'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { ArrowLeft, Home, FileText } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function CreateRecordPage() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    router.push('/dashboard/student')
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-background">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/dashboard/student" className="flex items-center gap-2">
              <FileText className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl">Create Record</span>
            </Link>
            <Button variant="ghost" asChild>
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 flex items-center justify-center">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle>Create Professional Record</CardTitle>
            <CardDescription>
              Professional record creation has been temporarily moved to settings
            </CardDescription>
          </CardHeader>
          <CardContent className="p-12 text-center space-y-4">
            <div>
              <h2 className="text-xl font-bold mb-4">Record Creation Simplified</h2>
              <p className="text-muted-foreground mb-6">
                For now, please navigate to your dashboard to create professional records through the settings interface.
              </p>
              <div className="space-y-4">
                <Button onClick={() => router.push('/dashboard/student')} className="w-full">
                  <FileText className="mr-2 h-4 w-4" />
                  Go to Dashboard
                </Button>
                <Button variant="outline" onClick={() => router.push('/')} className="w-full">
                  <Home className="mr-2 h-4 w-4" />
                  Back to Home
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
