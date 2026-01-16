'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, CheckCircle2, XCircle, MoreHorizontal, Search, Filter, Briefcase, TrendingUp, Users, Calendar, AlertTriangle, RefreshCw } from 'lucide-react'
import Link from 'next/link'
import { toast } from '@/hooks/use-toast'

interface Project {
  id: string
  title: string
  category: string
  university: string
  projectLead: string
  status: string
  riskLevel: string
  description: string
  submittedDate: string
  teamSize: number
}

export default function AdminProjectsPage() {
  const [activeTab, setActiveTab] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(false)

  // Mock projects data
  const mockProjects: Project[] = [
    {
      id: '1',
      title: 'Tech Innovation Hub',
      category: 'Startup',
      university: 'MIT',
      projectLead: 'Sarah Johnson',
      status: 'Pending Review',
      riskLevel: 'Low',
      description: 'Student-led innovation hub supporting tech startups',
      submittedDate: '2024-12-15',
      teamSize: 12,
    },
    {
      id: '2',
      title: 'Campus Media Network',
      category: 'News & Media',
      university: 'Harvard',
      projectLead: 'Michael Chen',
      status: 'Approved',
      riskLevel: 'Low',
      description: 'Cross-campus media network for 5 universities',
      submittedDate: '2024-12-14',
      teamSize: 8,
    },
    {
      id: '3',
      title: 'Financial Services Platform',
      category: 'Consulting',
      university: 'Stanford',
      projectLead: 'Emily Davis',
      status: 'Awaiting Info',
      riskLevel: 'Medium',
      description: 'Student-run financial consulting for small businesses',
      submittedDate: '2024-12-13',
      teamSize: 5,
    },
    {
      id: '4',
      title: 'Sustainability Initiative',
      category: 'Other',
      university: 'Berkeley',
      projectLead: 'James Wilson',
      status: 'Approved',
      riskLevel: 'Low',
      description: 'Campus sustainability and environmental awareness program',
      submittedDate: '2024-12-12',
      teamSize: 15,
    },
    {
      id: '5',
      title: 'Data Analytics Platform',
      category: 'Research',
      university: 'Yale',
      projectLead: 'David Lee',
      status: 'Pending Review',
      riskLevel: 'Medium',
      description: 'University-wide data analytics and visualization platform',
      submittedDate: '2024-12-16',
      teamSize: 10,
    },
  ]

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true)
      await new Promise(resolve => setTimeout(resolve, 500))
      setProjects(mockProjects)
      setLoading(false)
    }
    fetchProjects()
  }, [])

  const filteredProjects = projects.filter(project => {
    const matchesSearch = !searchQuery ||
      project.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter
    const matchesTab = activeTab === 'all' ||
      (activeTab === 'pending' && (project.status === 'Pending Review' || project.status === 'Awaiting Info')) ||
      (activeTab === 'approved' && project.status === 'Approved')
    return matchesSearch && matchesStatus && matchesTab
  })

  const handleApprove = async (project: Project) => {
    toast({
      title: 'Project Approved',
      description: `Project "${project.title}" has been approved.`,
    })
  }

  const handleReject = async (project: Project) => {
    toast({
      title: 'Project Rejected',
      description: `Project "${project.title}" has been rejected.`,
      variant: 'destructive',
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-primary text-primary-foreground sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0">
            <div className="flex items-center gap-2">
              <Briefcase className="h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0" />
              <h1 className="text-xl sm:text-2xl font-bold truncate">Manage Projects</h1>
            </div>
            <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
              <Button variant="ghost" size="sm" asChild className="text-primary-foreground hover:bg-primary/80">
                <Link href="/admin/governance">
                  <ArrowLeft className="h-4 w-4" />
                  <span className="hidden sm:inline ml-2">Back to Admin</span>
                  <span className="sm:hidden">Back</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Search & Filter</CardTitle>
              <CardDescription>Find projects to manage</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex-1 relative min-w-0">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Search projects by title, university, or lead..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 sm:py-3 border rounded-md text-sm sm:text-base"
                />
              </div>
              <div className="flex gap-2 sm:gap-3 flex-wrap">
                <Button
                  variant={statusFilter === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setStatusFilter('all')}
                >
                  All
                </Button>
                <Button
                  variant={statusFilter === 'Pending Review' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setStatusFilter('Pending Review')}
                >
                  Pending
                </Button>
                <Button
                  variant={statusFilter === 'Approved' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setStatusFilter('Approved')}
                >
                  Approved
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-2 mb-4 sm:mb-6 flex-wrap">
            <Button
              variant={activeTab === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveTab('all')}
            >
              All Projects
            </Button>
            <Button
              variant={activeTab === 'pending' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveTab('pending')}
            >
              Pending Review
            </Button>
            <Button
              variant={activeTab === 'approved' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveTab('approved')}
            >
              Approved
            </Button>
          </div>

          {loading ? (
            <div className="animate-pulse text-center py-8 sm:py-12">
              <div className="h-10 w-10 sm:h-12 sm:w-12 border-4 border-t-blue-500 border-r-transparent rounded-full animate-spin mx-auto" />
              <p className="text-sm text-muted-foreground mt-2">Loading projects...</p>
            </div>
          ) : filteredProjects.length > 0 ? (
            <Card>
              <CardContent className="p-8 sm:p-12 text-center">
                <Briefcase className="h-16 w-16 sm:h-20 sm:w-20 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg sm:text-xl font-semibold mb-2">No Projects Found</h3>
                <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">
                  No projects match your search and filter criteria.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2">
              {filteredProjects.map((project) => (
                <Card key={project.id}>
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <CardTitle className="text-base sm:text-lg truncate">{project.title}</CardTitle>
                        <CardDescription className="text-xs sm:text-sm line-clamp-2 truncate">
                          {project.description}
                        </CardDescription>
                        <div className="flex items-center gap-2 mt-2 flex-wrap">
                          <Badge variant="outline" className="text-xs">{project.category}</Badge>
                          <Badge variant="outline" className="text-xs">{project.university}</Badge>
                          <Badge variant="outline" className="text-xs">{project.projectLead}</Badge>
                        </div>
                      </div>
                      <Badge
                        variant={project.status === 'Approved' ? 'default' : project.status === 'Pending Review' ? 'secondary' : 'destructive'}
                        className="text-xs w-fit"
                      >
                        {project.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3 sm:space-y-4">
                    <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-3">
                      <div className="space-y-1 sm:space-y-2 text-center">
                        <div className="text-xs sm:text-sm text-muted-foreground mb-1">Team Size</div>
                        <div className="text-2xl sm:text-3xl font-bold break-words">{project.teamSize}</div>
                      </div>
                      <div className="space-y-1 sm:space-y-2 text-center">
                        <div className="text-xs sm:text-sm text-muted-foreground mb-1">Risk Level</div>
                        <Badge
                          variant={project.riskLevel === 'High' ? 'destructive' : project.riskLevel === 'Medium' ? 'default' : 'secondary'}
                          className="text-sm sm:text-base w-fit"
                        >
                          {project.riskLevel}
                        </Badge>
                      </div>
                      <div className="space-y-1 sm:space-y-2 text-center">
                        <div className="text-xs sm:text-sm text-muted-foreground mb-1">Submitted</div>
                        <div className="text-xs sm:text-sm font-medium break-words">{new Date(project.submittedDate).toLocaleDateString()}</div>
                      </div>
                    </div>

                    <div className="pt-3 sm:pt-4 border-t flex items-center justify-between">
                      <div className="text-xs sm:text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 flex-shrink-0" />
                          <span>Created on {new Date(project.submittedDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <div className="px-4 sm:px-6 py-3 sm:py-4 border-t flex items-center justify-between gap-2 sm:gap-4">
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => handleApprove(project)}
                      className="flex-1 text-xs sm:text-sm"
                    >
                      <CheckCircle2 className="h-4 w-4 mr-1 sm:mr-2" />
                      <span className="hidden sm:inline">Approve Project</span>
                      <span className="sm:hidden">Approve</span>
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleReject(project)}
                      className="flex-1 text-xs sm:text-sm"
                    >
                      <XCircle className="h-4 w-4 mr-1 sm:mr-2" />
                      <span className="hidden sm:inline">Reject Project</span>
                      <span className="sm:hidden">Reject</span>
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}

          <div className="text-center pt-6 sm:pt-8">
            <Button variant="outline" className="text-sm sm:text-base" asChild>
              <Link href="/admin/governance">
                Back to Admin Dashboard
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
