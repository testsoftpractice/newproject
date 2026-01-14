'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Briefcase,
  Users,
  Calendar,
  Target,
  Plus,
  Settings,
  CheckCircle2,
  Clock,
  AlertCircle,
  UserPlus,
  Filter,
  Search,
  ChevronRight,
  Star,
  Shield,
} from 'lucide-react'
import Link from 'next/link'

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState('overview')
  const [showAddMember, setShowAddMember] = useState(false)
  const [showCreateTask, setShowCreateTask] = useState(false)

  // Mock data for demonstration
  const project = {
    id: params.id,
    title: 'University News Channel',
    description: 'A student-led news platform covering campus events, achievements, and stories',
    category: 'News & Media',
    status: 'Active',
    completionRate: 68,
    startDate: '2024-01-15',
    seekingInvestment: false,
  }

  const projectLead = {
    name: 'Sarah Johnson',
    avatar: '',
    email: 'sarah@mit.edu',
  }

  const hrLead = {
    name: 'Michael Chen',
    avatar: '',
    email: 'michael@mit.edu',
  }

  const departments = [
    {
      id: 1,
      name: 'Editorial',
      head: 'Emily Davis',
      members: 4,
      tasks: 12,
    },
    {
      id: 2,
      name: 'Media Production',
      head: 'James Wilson',
      members: 3,
      tasks: 8,
    },
    {
      id: 3,
      name: 'Marketing',
      head: 'Lisa Anderson',
      members: 3,
      tasks: 6,
    },
    {
      id: 4,
      name: 'Design',
      head: 'David Brown',
      members: 2,
      tasks: 4,
    },
  ]

  const teamMembers = [
    { id: 1, name: 'Emily Davis', role: 'Department Head', department: 'Editorial', avatar: '', status: 'Active' },
    { id: 2, name: 'James Wilson', role: 'Department Head', department: 'Media Production', avatar: '', status: 'Active' },
    { id: 3, name: 'Lisa Anderson', role: 'Department Head', department: 'Marketing', avatar: '', status: 'Active' },
    { id: 4, name: 'David Brown', role: 'Department Head', department: 'Design', avatar: '', status: 'Active' },
    { id: 5, name: 'Jennifer Lee', role: 'Team Lead', department: 'Editorial', avatar: '', status: 'Active' },
    { id: 6, name: 'Robert Taylor', role: 'Senior Contributor', department: 'Media Production', avatar: '', status: 'Active' },
    { id: 7, name: 'Amanda White', role: 'Contributor', department: 'Editorial', avatar: '', status: 'Active' },
    { id: 8, name: 'Christopher Martinez', role: 'Contributor', department: 'Marketing', avatar: '', status: 'Active' },
    { id: 9, name: 'Sarah Johnson', role: 'Project Lead', department: '-', avatar: '', status: 'Active' },
    { id: 10, name: 'Michael Chen', role: 'HR Lead', department: '-', avatar: '', status: 'Active' },
    { id: 11, name: 'Daniel Garcia', role: 'Contributor', department: 'Design', avatar: '', status: 'Active' },
    { id: 12, name: 'Michelle Kim', role: 'Contributor', department: 'Media Production', avatar: '', status: 'Active' },
  ]

  const tasks = [
    { id: 1, title: 'Write weekly newsletter', assignee: 'Emily Davis', department: 'Editorial', status: 'In Progress', priority: 'High', dueDate: '2024-12-20' },
    { id: 2, title: 'Edit video content', assignee: 'Robert Taylor', department: 'Media Production', status: 'In Progress', priority: 'High', dueDate: '2024-12-18' },
    { id: 3, title: 'Design social media graphics', assignee: 'Daniel Garcia', department: 'Design', status: 'Pending', priority: 'Medium', dueDate: '2024-12-22' },
    { id: 4, title: 'Schedule social posts', assignee: 'Christopher Martinez', department: 'Marketing', status: 'In Progress', priority: 'Medium', dueDate: '2024-12-21' },
    { id: 5, title: 'Review article submissions', assignee: 'Jennifer Lee', department: 'Editorial', status: 'Pending', priority: 'High', dueDate: '2024-12-19' },
    { id: 6, title: 'Film campus event', assignee: 'Michelle Kim', department: 'Media Production', status: 'In Progress', priority: 'Urgent', dueDate: '2024-12-17' },
    { id: 7, title: 'Create promotional video', assignee: 'James Wilson', department: 'Media Production', status: 'Pending', priority: 'High', dueDate: '2024-12-25' },
    { id: 8, title: 'Update website content', assignee: 'Amanda White', department: 'Editorial', status: 'Completed', priority: 'Medium', dueDate: '2024-12-15' },
  ]

  const milestones = [
    { id: 1, title: 'Launch Beta Version', status: 'Completed', targetDate: '2024-03-01', achievedAt: '2024-02-28' },
    { id: 2, title: 'Reach 50% Completion', status: 'Completed', targetDate: '2024-06-01', achievedAt: '2024-05-15' },
    { id: 3, title: 'Launch Full Platform', status: 'In Progress', targetDate: '2024-12-31', achievedAt: null },
    { id: 4, title: '100 Articles Published', status: 'In Progress', targetDate: '2024-12-20', achievedAt: null },
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Urgent': return 'bg-red-500/10 text-red-500 border-red-500/20'
      case 'High': return 'bg-orange-500/10 text-orange-500 border-orange-500/20'
      case 'Medium': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
      case 'Low': return 'bg-blue-500/10 text-blue-500 border-blue-500/20'
      default: return 'bg-gray-500/10 text-gray-500 border-gray-500/20'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed': return <CheckCircle2 className="h-4 w-4 text-green-500" />
      case 'In Progress': return <Clock className="h-4 w-4 text-yellow-500" />
      case 'Pending': return <AlertCircle className="h-4 w-4 text-blue-500" />
      default: return <AlertCircle className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/dashboard/student" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                <Briefcase className="h-5 w-5" />
                <span className="font-semibold">Back to Dashboard</span>
              </Link>
              <div className="h-6 w-px bg-border" />
              <div>
                <h1 className="text-xl font-bold">{project.title}</h1>
                <p className="text-sm text-muted-foreground">{project.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={project.status === 'Active' ? 'default' : 'secondary'}>
                {project.status}
              </Badge>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Project Overview Cards */}
        <div className="grid gap-6 mb-8 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Progress</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{project.completionRate}%</div>
              <Progress value={project.completionRate} className="mt-2 h-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Team Size</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{teamMembers.length}</div>
              <p className="text-xs text-muted-foreground mt-1">4 departments</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Tasks</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{tasks.filter(t => t.status !== 'Completed').length}</div>
              <p className="text-xs text-muted-foreground mt-1">{tasks.length} total tasks</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Milestones</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{milestones.filter(m => m.status === 'Completed').length}</div>
              <p className="text-xs text-muted-foreground mt-1">{milestones.length} total milestones</p>
            </CardContent>
          </Card>
        </div>

        {/* Leadership Info */}
        <Card className="mb-8 border-primary/50 bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Project Leadership
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="flex items-start gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarFallback>SJ</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{projectLead.name}</div>
                  <div className="text-sm text-muted-foreground">Project Lead</div>
                  <div className="text-xs text-muted-foreground mt-1">{projectLead.email}</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarFallback>MC</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{hrLead.name}</div>
                  <div className="text-sm text-muted-foreground">HR Lead</div>
                  <div className="text-xs text-muted-foreground mt-1">{hrLead.email}</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full max-w-4xl grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            <TabsTrigger value="departments">Departments</TabsTrigger>
            <TabsTrigger value="milestones">Milestones</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>About This Project</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Category</div>
                    <div className="font-medium">{project.category}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Start Date</div>
                    <div className="font-medium">{new Date(project.startDate).toLocaleDateString()}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Status</div>
                    <Badge variant={project.status === 'Active' ? 'default' : 'secondary'}>
                      {project.status}
                    </Badge>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Completion</div>
                    <Progress value={project.completionRate} className="mt-2 h-2" />
                    <div className="text-sm font-medium mt-1">{project.completionRate}%</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full" onClick={() => setShowCreateTask(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Create New Task
                  </Button>
                  <Button className="w-full" variant="outline" onClick={() => setShowAddMember(true)}>
                    <UserPlus className="mr-2 h-4 w-4" />
                    Add Team Member
                  </Button>
                  <Button className="w-full" variant="outline">
                    <Calendar className="mr-2 h-4 w-4" />
                    Create Milestone
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Milestone Progress</CardTitle>
                <CardDescription>Track key project achievements</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {milestones.map((milestone) => (
                  <div key={milestone.id} className="flex items-center gap-4 p-3 rounded-lg border">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-full ${
                      milestone.status === 'Completed' ? 'bg-green-500 text-white' : 'bg-muted'
                    }`}>
                      {milestone.status === 'Completed' ? (
                        <CheckCircle2 className="h-5 w-5" />
                      ) : (
                        <Clock className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{milestone.title}</div>
                      <div className="text-sm text-muted-foreground">
                        Target: {new Date(milestone.targetDate).toLocaleDateString()}
                        {milestone.achievedAt && ` • Achieved: ${new Date(milestone.achievedAt).toLocaleDateString()}`}
                      </div>
                    </div>
                    <Badge variant={milestone.status === 'Completed' ? 'default' : 'secondary'}>
                      {milestone.status}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Team Tab */}
          <TabsContent value="team" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Team Members</h2>
                <p className="text-muted-foreground">Manage your project team</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
                <Button onClick={() => setShowAddMember(true)}>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Add Member
                </Button>
              </div>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Member</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {teamMembers.map((member) => (
                      <TableRow key={member.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{member.name}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{member.role}</Badge>
                        </TableCell>
                        <TableCell>{member.department}</TableCell>
                        <TableCell>
                          <Badge variant={member.status === 'Active' ? 'default' : 'secondary'}>
                            {member.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tasks Tab */}
          <TabsContent value="tasks" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Project Tasks</h2>
                <p className="text-muted-foreground">Track and manage all project tasks</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Search className="mr-2 h-4 w-4" />
                  Search
                </Button>
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
                <Button onClick={() => setShowCreateTask(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Task
                </Button>
              </div>
            </div>

            <div className="grid gap-4">
              {tasks.map((task) => (
                <Card key={task.id} className="hover:border-primary/50 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="mt-1">
                        {getStatusIcon(task.status)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-medium">{task.title}</h3>
                            <div className="text-sm text-muted-foreground mt-1">
                              {task.department} Department
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className={getPriorityColor(task.priority)}>
                              {task.priority}
                            </Badge>
                            <Badge variant="outline">{task.status}</Badge>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <span>Assigned to:</span>
                            <span className="font-medium">{task.assignee}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Departments Tab */}
          <TabsContent value="departments" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Departments</h2>
                <p className="text-muted-foreground">HR-first organizational structure</p>
              </div>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Department
              </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {departments.map((dept) => (
                <Card key={dept.id}>
                  <CardHeader>
                    <CardTitle className="text-lg">{dept.name}</CardTitle>
                    <CardDescription>
                      Led by <span className="font-medium">{dept.head}</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Users className="h-4 w-4" />
                        <span>{dept.members} members</span>
                      </div>
                      <div className="font-medium">{dept.tasks} tasks</div>
                    </div>
                    <Button variant="outline" className="w-full" size="sm">
                      View Department <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Milestones Tab */}
          <TabsContent value="milestones" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Milestones</h2>
                <p className="text-muted-foreground">Track key project achievements</p>
              </div>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Milestone
              </Button>
            </div>

            <div className="space-y-4">
              {milestones.map((milestone) => (
                <Card key={milestone.id} className={
                  milestone.status === 'Completed' ? 'border-green-500/50 bg-green-500/5' : ''
                }>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className={`flex h-12 w-12 items-center justify-center rounded-full ${
                        milestone.status === 'Completed' ? 'bg-green-500 text-white' : 'bg-muted'
                      }`}>
                        {milestone.status === 'Completed' ? (
                          <CheckCircle2 className="h-6 w-6" />
                        ) : (
                          <Clock className="h-6 w-6 text-muted-foreground" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-medium text-lg">{milestone.title}</h3>
                          <Badge variant={milestone.status === 'Completed' ? 'default' : 'secondary'}>
                            {milestone.status}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          <div>Target Date: {new Date(milestone.targetDate).toLocaleDateString()}</div>
                          {milestone.achievedAt && (
                            <div className="text-green-600 mt-1">
                              Achieved: {new Date(milestone.achievedAt).toLocaleDateString()}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
