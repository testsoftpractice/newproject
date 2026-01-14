'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, TrendingUp, Search } from 'lucide-react'
import Link from 'next/link'
import { useAuth } from '@/contexts/auth-context'

export default function MarketplacePage() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('browse')
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchProjects = async () => {
      if (!user) return
      try {
        setLoading(true)
        const response = await fetch('/api/projects')
        const data = await response.json()
        if (data.success) {
          setProjects(data.data || [])
        }
      } catch (error) {
        console.error('Fetch projects error:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchProjects()
  }, [user])

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-background">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-blue-500" />
              <h1 className="text-2xl font-bold">Investment Marketplace</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                {projects.length} project{projects.length === 1 ? '' : 's'}
              </span>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/">Back to Home</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold">Browse Projects</h2>
              <p className="text-muted-foreground">
                Discover student-led projects seeking investment and talent
              </p>
            </div>
          </div>

          {loading ? (
            <div className="animate-pulse text-center py-12">
              <div className="h-12 w-12 border-4 border-t-blue-500 border-r-transparent rounded-full animate-spin mx-auto" />
              <p className="text-sm text-muted-foreground mt-2">Loading projects...</p>
            </div>
          ) : projects.length > 0 ? (
            <div className="grid gap-6 lg:grid-cols-2">
              {projects.map((project) => (
                <Card key={project.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle>{project.title}</CardTitle>
                      <Badge variant="outline">{project.category || 'Startup'}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="text-sm text-muted-foreground">Description</div>
                      <div className="text-sm">{project.description || 'No description'}</div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-sm text-muted-foreground">Team</div>
                      <div className="text-sm">{project.team?.length || 1} team members</div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-sm text-muted-foreground">Status</div>
                      <Badge variant={project.status === 'ACTIVE' ? 'default' : 'secondary'}>
                        {project.status || 'Pending'}
                      </Badge>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-3 flex gap-2">
                    <Button variant="outline" className="flex-1" asChild>
                      <Link href={`/projects/${project.id}`}>
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        View Details
                      </Link>
                    </Button>
                    <Button className="flex-1" asChild>
                      <Link href={`/projects/${project.id}/invest`}>
                        Express Interest
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <TrendingUp className="h-20 w-20 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold mb-2">No Projects Found</h3>
                <p className="text-muted-foreground mb-6">
                  There are no projects currently seeking investment or funding.
                  Check back later or browse all projects.
                </p>
                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1" asChild>
                    <Link href="/projects">Browse All Projects</Link>
                  </Button>
                  <Button className="flex-1" asChild>
                    <Link href="/projects/create">Create Project</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="text-center pt-8">
            <Button variant="outline" asChild>
              <Link href="/dashboard/student">
                Back to Dashboard
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
