'use client'

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Shield,
  CheckCircle2,
  AlertTriangle,
  Clock,
  FileText,
  Users,
  Briefcase,
  TrendingUp,
  Search,
  Filter,
  Eye,
  MoreHorizontal,
  Settings,
  Activity,
  Flag,
  Scale,
  Download,
  Calendar,
} from "lucide-react"
import Link from "next/link"
import { toast } from "@/hooks/use-toast"

export default function GovernancePage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(false)

  // Mock data
  const stats = {
    totalProjects: 124,
    pendingApprovals: 8,
    activeProjects: 98,
    completedProjects: 18,
    totalUsers: 1456,
    verifiedUsers: 1389,
    pendingVerifications: 67,
    disputeRequests: 3,
    complianceIssues: 2,
  }

  const pendingProjects = [
    {
      id: 1,
      title: "Tech Innovation Hub",
      category: "Startup",
      university: "MIT",
      projectLead: "Sarah Johnson",
      submittedDate: "2024-12-15",
      status: "Pending Review",
      riskLevel: "Low",
      description: "Student-led innovation hub supporting tech startups",
    },
    {
      id: 2,
      title: "Campus Media Network",
      category: "News & Media",
      university: "Harvard",
      projectLead: "Michael Chen",
      submittedDate: "2024-12-14",
      status: "Pending Review",
      riskLevel: "Low",
      description: "Cross-campus media network for 5 universities",
    },
    {
      id: 3,
      title: "Financial Services Platform",
      category: "Consulting",
      university: "Stanford",
      projectLead: "Emily Davis",
      submittedDate: "2024-12-13",
      status: "Awaiting Info",
      riskLevel: "Medium",
      description: "Student-run financial consulting for small businesses",
    },
    {
      id: 4,
      title: "Sustainability Initiative",
      category: "Other",
      university: "Berkeley",
      projectLead: "James Wilson",
      submittedDate: "2024-12-12",
      status: "Pending Review",
      riskLevel: "Low",
      description: "Campus sustainability and environmental awareness program",
    },
  ]

  const auditLogs = [
    {
      id: 1,
      action: "Admin login",
      user: "admin@appliedexecution.com",
      timestamp: "2024-01-13T14:32:15Z",
      ip: "192.168.1.100",
      status: "Success",
    },
    {
      id: 2,
      action: "Approved project p1",
      user: "admin@appliedexecution.com",
      timestamp: "2024-01-13T15:35:22Z",
      ip: "192.168.1.100",
      status: "Success",
    },
    {
      id: 3,
      action: "Rejected project p4",
      user: "admin@appliedexecution.com",
      timestamp: "2024-01-13T15:40:10Z",
      ip: "192.168.1.100",
      status: "Success",
    },
    {
      id: 4,
      action: "Suspended user u5",
      user: "admin@appliedexecution.com",
      timestamp: "2024-01-13T15:45:33Z",
      ip: "192.168.1.100",
      status: "Success",
    },
    {
      id: 5,
      action: "Flagged content r12",
      user: "admin@appliedexecution.com",
      timestamp: "2024-01-13T15:50:00Z",
      ip: "192.168.1.100",
      status: "Success",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6" />
              <h1 className="text-2xl font-bold">Applied Execution - Governance</h1>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/admin">Back to Admin Dashboard</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-6 lg:grid-cols-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-blue-500" />
                Overview
              </CardTitle>
              <CardDescription>Platform-wide metrics and quick actions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="text-3xl font-bold">{stats.totalUsers}</div>
                  <div className="text-sm text-muted-foreground">Total Users</div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold">{stats.totalProjects}</div>
                  <div className="text-sm text-muted-foreground">Total Projects</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-green-500">{stats.activeProjects}</div>
                  <div className="text-sm text-muted-foreground">Active Projects</div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-blue-500">{stats.pendingProjects}</div>
                  <div className="text-sm text-muted-foreground">Pending Projects</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="text-3xl font-bold">{stats.totalUsers}</div>
                  <div className="text-sm text-muted-foreground">Total Projects</div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-orange-500">{stats.flaggedContent}</div>
                  <div className="text-sm text-muted-foreground">Flagged Content</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="text-3xl font-bold">{stats.pendingApprovals}</div>
                  <div className="text-sm text-muted-foreground">Pending Approvals</div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold">{stats.disputeRequests}</div>
                  <div className="text-sm text-muted-foreground">Dispute Requests</div>
                </div>
              </div>
              <div className="flex gap-2 pt-4 border-t">
                <Button className="flex-1" variant="outline" asChild>
                  <Link href="/admin/users">
                    <Users className="h-4 w-4 mr-2" />
                    Manage Users
                  </Link>
                </Button>
                <Button className="flex-1" variant="outline" asChild>
                  <Link href="/admin/projects">
                    <Briefcase className="h-4 w-4 mr-2" />
                    Manage Projects
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-500" />
                Pending Projects
              </CardTitle>
              <CardDescription>Approve or reject all project submissions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm text-muted-foreground mb-4">
                Review projects awaiting approval and manage platform-wide project visibility
              </div>
              {pendingProjects.slice(0, 5).map((project) => (
                <div key={project.id} className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-start gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                        {project.title.charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold">{project.title}</div>
                        <div className="text-sm text-muted-foreground">
                          <Badge variant="outline">{project.category}</Badge>
                          {" • "}
                          {project.university}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {project.lead} • Submitted {project.submittedDate}
                        </div>
                      </div>
                    </div>
                    <Badge
                      variant={project.status === "Completed" ? "default" : project.status === "Pending Review" ? "secondary" : "outline"}
                    >
                      {project.status}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm font-medium mb-2">Risk Level</div>
                    <Badge variant={project.riskLevel === "High" ? "destructive" : project.riskLevel === "Medium" ? "default" : "secondary"}>
                      {project.riskLevel}
                    </Badge>
                    <div className="text-sm text-muted-foreground mt-1">{project.description}</div>
                  </div>
                  <div className="flex items-center gap-3 mt-2 pt-3 border-t">
                    <Button variant="default" size="sm">
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                      Approve
                    </Button>
                    <Button variant="destructive" size="sm">
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      Reject
                    </Button>
                  </div>
                </div>
              ))}
              <div className="pt-4 border-t flex justify-center">
                <Button variant="outline" asChild>
                  <Link href="/admin/projects">
                    View All Projects
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-green-500" />
                System Health
              </CardTitle>
              <CardDescription>Real-time platform metrics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <div className="text-3xl font-bold text-green-500">Healthy</div>
                  <div className="text-sm text-muted-foreground">Server Status</div>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="text-3xl font-bold text-green-500">99.8%</div>
                  <div className="text-sm text-muted-foreground">Database</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <div className="text-3xl font-bold text-green-500">142ms</div>
                  <div className="text-sm text-muted-foreground">API Response</div>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="text-3xl font-bold text-green-500">Active</div>
                  <div className="text-sm text-muted-foreground">Redis Cache</div>
                </div>
              </div>
              <div className="pt-4 border-t text-center">
                <p className="text-sm text-muted-foreground">
                  Last check: 2 hours ago
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-orange-500" />
                Audit Logs
              </CardTitle>
              <CardDescription>Track all administrative actions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm text-muted-foreground mb-4">
                View all system actions, user modifications, and content changes
              </div>
              {auditLogs.slice(0, 5).map((log) => (
                <div key={log.id} className="flex items-start gap-3 p-3 border rounded-lg">
                  <div>
                    <div className="font-semibold">{log.action}</div>
                    <div className="text-sm text-muted-foreground">
                      {log.user} • {log.timestamp}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {log.ip} • {log.status}
                    </div>
                  </div>
                  <Badge
                    variant={log.status === "Success" ? "default" : "secondary"}
                  >
                    {log.status}
                  </Badge>
                </div>
              ))}
              <div className="pt-4 border-t flex justify-center">
                <Button variant="outline" asChild>
                  <Link href="/admin/audit">
                    View All Logs
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-blue-500" />
                Quick Actions
              </CardTitle>
              <CardDescription>Common administrative tasks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 lg:grid-cols-2">
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/admin/content">
                    <Flag className="h-4 w-4 mr-2" />
                    Content Moderation
                  </Link>
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/admin/compliance">
                    <Scale className="h-4 w-4 mr-2" />
                    Compliance Tools
                  </Link>
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/admin/governance">
                    <FileText className="h-4 w-4 mr-2" />
                    View Governance
                  </Link>
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/leaderboards">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    View Leaderboards
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
