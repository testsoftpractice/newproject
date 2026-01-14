'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Clock,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Target,
  Users,
  Award,
  Briefcase,
  Calendar,
  Star,
  ChevronRight,
  Plus,
  Search,
  Filter,
  Shield,
} from 'lucide-react'
import Link from 'next/link'
import { useAuth } from '@/contexts/auth-context'
import { toast } from '@/hooks/use-toast'

export default function StudentDashboard() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('overview')

  // Data states (fetched from API)
  const [stats, setStats] = useState({
    totalProjects: 0,
    activeProjects: 0,
    completedProjects: 0,
    overallProgress: 0,
    overallRating: 0,
    breakdown: {
      execution: 0,
      collaboration: 0,
      leadership: 0,
      ethics: 0,
      reliability: 0,
    },
    recentActivityCount: 0,
  })

  const [projects, setProjects] = useState<any[]>([])
  const [tasks, setTasks] = useState<any[]>([])
  const [records, setRecords] = useState<any[]>([])
  const [verifications, setVerifications] = useState<any[]>([])

  const [loading, setLoading] = useState({
    stats: false,
    projects: false,
    tasks: false,
    records: false,
    verifications: false,
  })

  // Fetch stats from API
  useEffect(() => {
    const fetchStats = async () => {
      if (!user) return
      
      try {
        setLoading(prev => ({ ...prev, stats: true }))
        const response = await fetch(`/api/dashboard/student/stats?userId=${user.id}`)
        const data = await response.json()
        if (data.success) {
          setStats(data.data)
        }
      } catch (error) {
        console.error('Fetch stats error:', error)
        toast({ title: 'Error', description: 'Failed to fetch statistics', variant: 'destructive' })
      } finally {
        setLoading(prev => ({ ...prev, stats: false }))
      }
    }

    if (activeTab === 'overview') {
      fetchStats()
    }
  }, [activeTab, user])

  // Fetch projects from API
  useEffect(() => {
    const fetchProjects = async () => {
      if (!user) return
      
      try {
        setLoading(prev => ({ ...prev, projects: true }))
        const response = await fetch(`/api/projects?projectLeadId=${user.id}`)
        const data = await response.json()
        if (data.success) {
          setProjects(data.data || [])
        }
      } catch (error) {
        console.error('Fetch projects error:', error)
      } finally {
        setLoading(prev => ({ ...prev, projects: false }))
      }
    }

    if (activeTab === 'projects') {
      fetchProjects()
    }
  }, [activeTab, user])

  // Fetch tasks from API
  useEffect(() => {
    const fetchTasks = async () => {
      if (!user) return
      
      try {
        setLoading(prev => ({ ...prev, tasks: true }))
        const response = await fetch(`/api/tasks?assigneeId=${user.id}`)
        const data = await response.json()
        if (data.success) {
          setTasks(data.data || [])
        }
      } catch (error) {
        console.error('Fetch tasks error:', error)
      } finally {
        setLoading(prev => ({ ...prev, tasks: false }))
      }
    }

    if (activeTab === 'tasks') {
      fetchTasks()
    }
  }, [activeTab, user])

  // Fetch records from API
  useEffect(() => {
    const fetchRecords = async () => {
      if (!user) return
      
      try {
        setLoading(prev => ({ ...prev, records: true }))
        const response = await fetch(`/api/records?userId=${user.id}`)
        const data = await response.json()
        if (data.success) {
          setRecords(data.data || [])
        }
      } catch (error) {
        console.error('Fetch records error:', error)
      } finally {
        setLoading(prev => ({ ...prev, records: false }))
      }
    }

    if (activeTab === 'records') {
      fetchRecords()
    }
  }, [activeTab, user])

  // Fetch verifications from API
  useEffect(() => {
    const fetchVerifications = async () => {
      if (!user) return
      
      try {
        setLoading(prev => ({ ...prev, verifications: true }))
        const response = await fetch(`/api/verification?studentId=${user.id}`)
        const data = await response.json()
        if (data.success) {
          setVerifications(data.data || [])
        }
      } catch (error) {
        console.error('Fetch verifications error:', error)
      } finally {
        setLoading(prev => ({ ...prev, verifications: false }))
      }
    }

    if (activeTab === 'verifications') {
      fetchVerifications()
    }
  }, [activeTab, user])

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-background">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-primary" />
              <h1 className="text-2xl font-bold">Student Dashboard</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">{user?.name || 'Student'}</span>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/">Home</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto space-y-6">
          {activeTab === 'overview' && (
            <div className="grid gap-6 lg:grid-cols-4">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Overview</CardTitle>
                  <CardDescription>Your academic and project performance</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {loading.stats ? (
                    <div className="animate-pulse text-center py-8">
                      <div className="h-6 w-6 border-4 border-t-blue-500 border-r-transparent rounded-full animate-spin mx-auto" />
                      <p className="text-sm text-muted-foreground mt-2">Loading metrics...</p>
                    </div>
                  ) : (
                    <>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div className="text-3xl font-bold">{stats.totalProjects}</div>
                          <div className="text-sm text-muted-foreground">Total Projects</div>
                        </div>
                        <div className="space-y-2">
                          <div className="text-3xl font-bold">{stats.activeProjects}</div>
                          <div className="text-sm text-muted-foreground">Active Projects</div>
                        </div>
                        <div className="space-y-2">
                          <div className="text-3xl font-bold">{stats.completedProjects}</div>
                          <div className="text-sm text-muted-foreground">Completed Projects</div>
                        </div>
                        <div className="space-y-2">
                          <div className="text-3xl font-bold">{stats.overallProgress}%</div>
                          <div className="text-sm text-muted-foreground">Overall Progress</div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                        <div className="space-y-2">
                          <div className="text-3xl font-bold">{stats.tasksCompleted}</div>
                          <div className="text-sm text-muted-foreground">Tasks Completed</div>
                        </div>
                        <div className="space-y-2">
                          <div className="text-3xl font-bold text-blue-500">{stats.recentActivityCount}</div>
                          <div className="text-sm text-muted-foreground">Recent Activity</div>
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Reputation Breakdown</CardTitle>
                  <CardDescription>Your multi-dimensional performance scores</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {loading.stats ? (
                    <div className="animate-pulse text-center py-8">
                      <div className="h-6 w-6 border-4 border-t-blue-500 border-r-transparent rounded-full animate-spin mx-auto" />
                      <p className="text-sm text-muted-foreground mt-2">Loading reputation...</p>
                    </div>
                  ) : (
                    <>
                      <div className="space-y-4">
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium">Execution</span>
                            <Badge variant="outline">Weighted: 25%</Badge>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex-1">
                              <Progress value={stats.breakdown.execution} max={5} className="h-3" />
                            </div>
                            <span className="font-semibold">{stats.breakdown.execution.toFixed(1)}/5</span>
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium">Collaboration</span>
                            <Badge variant="outline">Weighted: 25%</Badge>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex-1">
                              <Progress value={stats.breakdown.collaboration} max={5} className="h-3" />
                            </div>
                            <span className="font-semibold">{stats.breakdown.collaboration.toFixed(1)}/5</span>
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium">Leadership</span>
                            <Badge variant="outline">Weighted: 25%</Badge>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex-1">
                              <Progress value={stats.breakdown.leadership} max={5} className="h-3" />
                            </div>
                            <span className="font-semibold">{stats.breakdown.leadership.toFixed(1)}/5</span>
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium">Ethics</span>
                            <Badge variant="outline">Weighted: 25%</Badge>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex-1">
                              <Progress value={stats.breakdown.ethics} max={5} className="h-3" />
                            </div>
                            <span className="font-semibold">{stats.breakdown.ethics.toFixed(1)}/5</span>
                          </div>
                        </div>
                      </div>
                      <div className="pt-4 border-t">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">Reliability</span>
                          <div className="flex items-center gap-2">
                            <div className="flex-1">
                              <Progress value={stats.breakdown.reliability} max={5} className="h-3" />
                            </div>
                            <span className="font-semibold">{stats.breakdown.reliability.toFixed(1)}/5</span>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Overall Reputation</CardTitle>
                  <CardDescription>Your cumulative performance score</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {loading.stats ? (
                    <div className="animate-pulse text-center py-8">
                      <div className="h-6 w-6 border-4 border-t-blue-500 border-r-transparent rounded-full animate-spin mx-auto" />
                      <p className="text-sm text-muted-foreground mt-2">Loading...</p>
                    </div>
                  ) : (
                    <div className="text-center space-y-4">
                      <div>
                        <div className="text-6xl font-bold">{stats.overallRating.toFixed(1)}</div>
                        <div className="text-sm text-muted-foreground">Out of 5</div>
                      </div>
                      <div className="flex justify-center gap-1">
                        {[1, 2, 3, 4, 5].map(star => (
                          <Star
                            key={star}
                            className={`h-8 w-8 ${
                              star <= Math.round(stats.overallRating)
                                ? 'text-yellow-500 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                        <div className="flex items-start gap-2">
                          <TrendingUp className="h-5 w-5 text-blue-500 mt-0.5" />
                          <div className="text-sm text-muted-foreground">
                            <div className="font-medium mb-1">Reputation Guide</div>
                            <div>Build strong reputation through project leadership, task execution, and ethical conduct.</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'projects' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">My Projects</h2>
                  <p className="text-muted-foreground">Manage your project portfolio</p>
                </div>
                <Button asChild>
                  <Link href="/projects/create">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Project
                  </Link>
                </Button>
              </div>

              {loading.projects ? (
                <div className="animate-pulse text-center py-8">
                  <div className="h-12 w-12 border-4 border-t-blue-500 border-r-transparent rounded-full animate-spin mx-auto" />
                  <p className="text-sm text-muted-foreground mt-2">Loading projects...</p>
                </div>
              ) : projects.length > 0 ? (
                <div className="grid gap-6 lg:grid-cols-2">
                  {projects.map((project) => (
                    <Card key={project.id}>
                      <CardHeader>
                        <CardTitle>{project.title}</CardTitle>
                        <CardDescription>Lead your project to success</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-start gap-3">
                          <Avatar className="h-12 w-12 rounded-full">
                            <AvatarFallback className="text-xl">
                              {project.lead?.name?.charAt(0) || 'P'}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="font-semibold">{project.lead?.name || 'Project Lead'}</div>
                            <div className="text-sm text-muted-foreground">
                              {project.project?.university?.name || 'No university'}
                            </div>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div>
                            <div className="text-sm font-medium">Status</div>
                            <Badge
                              variant={project.status === 'ACTIVE' ? 'default' : 'secondary'}
                            >
                              {project.status}
                            </Badge>
                          </div>
                          <div className="text-sm font-medium">Progress</div>
                          <div className="flex items-center gap-2">
                            <Progress value={project.progress || 0} max={100} className="flex-1" />
                            <span className="text-sm">{project.progress || 0}%</span>
                          </div>
                        </div>
                        <div className="pt-3 flex gap-3">
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/projects/${project.id}`}>
                              <Briefcase className="h-4 w-4" />
                              View Project
                            </Link>
                          </Button>
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/projects/${project.id}/tasks`}>
                              <CheckCircle2 className="h-4 w-4" />
                              View Tasks
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="p-12 text-center">
                    <Briefcase className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground mb-2">No projects yet</p>
                    <p className="text-sm text-muted-foreground mb-6">
                      Start by creating your first project and build your professional portfolio
                    </p>
                    <Button asChild>
                      <Link href="/projects/create">
                        <Plus className="h-4 w-4 mr-2" />
                        Create Your First Project
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {activeTab === 'tasks' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">My Tasks</h2>
                  <p className="text-muted-foreground">Track your assignments and deliverables</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/projects/create">
                      <Briefcase className="h-4 w-4" />
                      View Projects
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/records/create">
                      <Plus className="h-4 w-4" />
                      Create Record
                    </Link>
                  </Button>
                </div>
              </div>

              {loading.tasks ? (
                <div className="animate-pulse text-center py-8">
                  <div className="h-12 w-12 border-4 border-t-blue-500 border-r-transparent rounded-full animate-spin mx-auto" />
                  <p className="text-sm text-muted-foreground mt-2">Loading tasks...</p>
                </div>
              ) : tasks.length > 0 ? (
                <Card>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Task</TableHead>
                        <TableHead>Project</TableHead>
                        <TableHead>Priority</TableHead>
                        <TableHead>Due Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {tasks.map((task) => (
                        <TableRow key={task.id}>
                          <TableCell className="font-medium">{task.title}</TableCell>
                          <TableCell>{task.project?.title || 'No project'}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                task.priority === 'HIGH' ? 'destructive' :
                                task.priority === 'URGENT' ? 'destructive' :
                                task.priority === 'MEDIUM' ? 'default' : 'secondary'
                              }
                            >
                              {task.priority}
                            </Badge>
                          </TableCell>
                          <TableCell>{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No due date'}</TableCell>
                          <TableCell>
                            <Badge variant={task.status === 'COMPLETED' ? 'default' : 'secondary'}>
                              {task.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm" asChild>
                                <Link href={`/projects/${task.projectId}/tasks/${task.id}`}>
                                  <Eye className="h-4 w-4" />
                                </Link>
                              </Button>
                              {task.status !== 'COMPLETED' && (
                                <Button variant="ghost" size="sm" asChild>
                                  <Link href={`/projects/${task.projectId}/tasks/${task.id}/submit`}>
                                    <CheckCircle2 className="h-4 w-4" />
                                  </Link>
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Card>
              ) : (
                <Card>
                  <CardContent className="p-12 text-center">
                    <CheckCircle2 className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground mb-2">No tasks assigned</p>
                    <p className="text-sm text-muted-foreground mb-6">
                      You don't have any tasks yet. Check your project task boards or ask your project lead for assignments.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {activeTab === 'records' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Professional Records</h2>
                  <p className="text-muted-foreground">Build your verifiable professional portfolio</p>
                </div>
                <Button asChild>
                  <Link href="/records/create">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Record
                  </Link>
                </Button>
              </div>

              {loading.records ? (
                <div className="animate-pulse text-center py-8">
                  <div className="h-12 w-12 border-4 border-t-blue-500 border-r-transparent rounded-full animate-spin mx-auto" />
                  <p className="text-sm text-muted-foreground mt-2">Loading records...</p>
                </div>
              ) : records.length > 0 ? (
                <div className="grid gap-6 lg:grid-cols-2">
                  {records.map((record) => (
                    <Card key={record.id}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <CardTitle>{record.title}</CardTitle>
                          <Badge variant={record.verified ? 'default' : 'secondary'}>
                            {record.verified ? 'Verified' : 'Unverified'}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div>
                          <div className="text-sm font-medium">Type</div>
                          <Badge variant="outline">{record.type}</Badge>
                        </div>
                        <div>
                          <div className="text-sm font-medium">Description</div>
                          <div className="text-sm text-muted-foreground">{record.description}</div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 pt-3">
                          <div>
                            <div className="text-sm font-medium">Start Date</div>
                            <div className="text-sm">{record.startDate ? new Date(record.startDate).toLocaleDateString() : 'Not specified'}</div>
                          </div>
                          <div>
                            <div className="text-sm font-medium">End Date</div>
                            <div className="text-sm">{record.endDate ? new Date(record.endDate).toLocaleDateString() : 'Not specified'}</div>
                          </div>
                        </div>
                        <div className="pt-3 flex gap-3">
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/records/${record.id}/share`}>
                              <Share className="h-4 w-4" />
                              Share Record
                            </Link>
                          </Button>
                          {!record.verified && (
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/records/${record.id}/verify`}>
                                <Shield className="h-4 w-4" />
                                Request Verification
                              </Link>
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="p-12 text-center">
                    <Target className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground mb-2">No professional records yet</p>
                    <p className="text-sm text-muted-foreground mb-6">
                      Create professional records to build your verifiable portfolio and enhance your career opportunities.
                    </p>
                    <Button asChild>
                      <Link href="/records/create">
                        <Plus className="h-4 w-4 mr-2" />
                        Create Your First Record
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {activeTab === 'verifications' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Verification Requests</h2>
                  <p className="text-muted-foreground">Manage employer verification requests</p>
                </div>
              </div>

              {loading.verifications ? (
                <div className="animate-pulse text-center py-8">
                  <div className="h-12 w-12 border-4 border-t-blue-500 border-r-transparent rounded-full animate-spin mx-auto" />
                  <p className="text-sm text-muted-foreground mt-2">Loading verifications...</p>
                </div>
              ) : verifications.length > 0 ? (
                <div className="space-y-4">
                  {verifications.map((verification) => (
                    <Card key={verification.id}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <CardTitle>{verification.employer?.name || 'Employer'}</CardTitle>
                          <Badge
                            variant={
                              verification.status === 'APPROVED' ? 'default' :
                              verification.status === 'REJECTED' ? 'destructive' : 'secondary'
                            }
                          >
                            {verification.status}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="space-y-2">
                          <div>
                            <div className="text-sm font-medium">Type</div>
                            <Badge variant="outline">{verification.type}</Badge>
                          </div>
                          <div>
                            <div className="text-sm font-medium">Purpose</div>
                            <div className="text-sm text-muted-foreground">{verification.purpose}</div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div>
                            <div className="text-sm font-medium">Requested</div>
                            <div className="text-sm">{new Date(verification.createdAt).toLocaleDateString()}</div>
                          </div>
                          <div>
                            <div className="text-sm font-medium">Expires</div>
                            <div className="text-sm">{new Date(verification.expiresAt).toLocaleDateString()}</div>
                          </div>
                        </div>
                        <div className="pt-3 flex gap-3">
                          {verification.status === 'PENDING' && (
                            <Button variant="default" size="sm" asChild>
                              <Link href={`/dashboard/student/verifications/${verification.id}`}>
                                <Shield className="h-4 w-4" />
                                Manage Access
                              </Link>
                            </Button>
                          )}
                          {verification.status === 'APPROVED' && (
                            <Badge variant="outline">Access Granted</Badge>
                          )}
                          {verification.status === 'REJECTED' && (
                            <Badge variant="destructive">Access Rejected</Badge>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="p-12 text-center">
                    <Shield className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground mb-2">No verification requests</p>
                    <p className="text-sm text-muted-foreground mb-6">
                      When employers request to verify your professional records, they'll appear here.
                      You can approve or reject access requests.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          <Card>
            <CardContent className="p-6">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="projects">Projects</TabsTrigger>
                  <TabsTrigger value="tasks">Tasks</TabsTrigger>
                  <TabsTrigger value="records">Records</TabsTrigger>
                  <TabsTrigger value="verifications">Verifications</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="mt-4">
                  <div className="text-center text-muted-foreground">
                    Click on a tab to view more details
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
