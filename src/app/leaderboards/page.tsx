'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
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
  GraduationCap,
  Building2,
  Briefcase,
  Trophy,
  Medal,
  Award,
  TrendingUp,
  Users,
  Star,
  Filter,
  Download,
  ChevronRight,
} from 'lucide-react'
import Link from 'next/link'

export default function LeaderboardsPage() {
  const [activeTab, setActiveTab] = useState('students')
  const [timePeriod, setTimePeriod] = useState('all-time')

  // Mock data for demonstration
  const studentLeaderboard = [
    { rank: 1, name: 'Sarah Johnson', university: 'MIT', score: 4.6, projects: 5, level: 'Department Head' },
    { rank: 2, name: 'Michael Chen', university: 'Stanford', score: 4.5, projects: 4, level: 'Team Lead' },
    { rank: 3, name: 'James Wilson', university: 'MIT', score: 4.4, projects: 6, level: 'Senior Contributor' },
    { rank: 4, name: 'Emily Davis', university: 'Harvard', score: 4.3, projects: 3, level: 'Contributor' },
    { rank: 5, name: 'Lisa Anderson', university: 'MIT', score: 4.2, projects: 4, level: 'Senior Contributor' },
    { rank: 6, name: 'David Brown', university: 'Stanford', score: 4.1, projects: 5, level: 'Team Lead' },
    { rank: 7, name: 'Jennifer Lee', university: 'Berkeley', score: 4.0, projects: 3, level: 'Contributor' },
    { rank: 8, name: 'Robert Taylor', university: 'MIT', score: 3.9, projects: 4, level: 'Senior Contributor' },
    { rank: 9, name: 'Amanda White', university: 'Harvard', score: 3.8, projects: 2, level: 'Contributor' },
    { rank: 10, name: 'Christopher Martinez', university: 'Stanford', score: 3.7, projects: 5, level: 'Department Head' },
  ]

  const universityLeaderboard = [
    { rank: 1, name: 'Stanford University', code: 'STAN', students: 142, projects: 38, score: 4.4, trend: 'up' },
    { rank: 2, name: 'Harvard University', code: 'HARV', students: 138, projects: 41, score: 4.3, trend: 'same' },
    { rank: 3, name: 'Massachusetts Institute of Technology', code: 'MIT', students: 156, projects: 42, score: 4.2, trend: 'up' },
    { rank: 4, name: 'University of California, Berkeley', code: 'UCB', students: 189, projects: 45, score: 4.1, trend: 'down' },
    { rank: 5, name: 'Carnegie Mellon University', code: 'CMU', students: 124, projects: 36, score: 4.0, trend: 'same' },
    { rank: 6, name: 'University of Pennsylvania', code: 'UPENN', students: 116, projects: 32, score: 3.9, trend: 'up' },
    { rank: 7, name: 'University of Michigan', code: 'UMICH', students: 198, projects: 48, score: 3.8, trend: 'same' },
    { rank: 8, name: 'Georgia Institute of Technology', code: 'GT', students: 165, projects: 39, score: 3.7, trend: 'down' },
    { rank: 9, name: 'University of Texas at Austin', code: 'UT', students: 174, projects: 41, score: 3.6, trend: 'up' },
    { rank: 10, name: 'University of Illinois Urbana-Champaign', code: 'UIUC', students: 156, projects: 37, score: 3.5, trend: 'same' },
  ]

  const projectLeaderboard = [
    { rank: 1, name: 'Tech Startup Incubator', university: 'Stanford', category: 'Startup', score: 4.5, teamSize: 8, completion: 85 },
    { rank: 2, name: 'Campus News Network', university: 'Harvard', category: 'News & Media', score: 4.4, teamSize: 15, completion: 78 },
    { rank: 3, name: 'Student E-Commerce Platform', university: 'MIT', category: 'E-Commerce', score: 4.3, teamSize: 12, completion: 92 },
    { rank: 4, name: 'Financial Consulting Hub', university: 'MIT', category: 'Consulting', score: 4.2, teamSize: 6, completion: 81 },
    { rank: 5, name: 'Digital Marketing Agency', university: 'Berkeley', category: 'Marketing', score: 4.1, teamSize: 10, completion: 67 },
  ]

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="h-5 w-5 text-yellow-500" />
    if (rank === 2) return <Medal className="h-5 w-5 text-gray-400" />
    if (rank === 3) return <Award className="h-5 w-5 text-amber-600" />
    return null
  }

  const getTrendIcon = (trend: string) => {
    if (trend === 'up') return <TrendingUp className="h-4 w-4 text-green-500" />
    if (trend === 'down') return <TrendingUp className="h-4 w-4 text-red-500 rotate-180" />
    return <span className="text-muted-foreground">-</span>
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Trophy className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl">Leaderboards</span>
            </Link>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Period:</span>
                <select
                  value={timePeriod}
                  onChange={(e) => setTimePeriod(e.target.value)}
                  className="rounded-md border px-3 py-1.5 text-sm"
                >
                  <option value="all-time">All Time</option>
                  <option value="monthly">This Month</option>
                  <option value="weekly">This Week</option>
                </select>
              </div>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2">Platform Rankings</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Track top performers across students, universities, and projects based on execution, collaboration, and real-world impact
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full max-w-2xl grid-cols-3">
            <TabsTrigger value="students" className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              Students
            </TabsTrigger>
            <TabsTrigger value="universities" className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              Universities
            </TabsTrigger>
            <TabsTrigger value="projects" className="flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              Projects
            </TabsTrigger>
          </TabsList>

          {/* Students Tab */}
          <TabsContent value="students" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Top Students</h2>
                <p className="text-muted-foreground">Ranked by multi-dimensional reputation scores</p>
              </div>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
            </div>

            {/* Top 3 Podium */}
            <div className="grid gap-6 md:grid-cols-3">
              {studentLeaderboard.slice(0, 3).map((student, index) => (
                <Card
                  key={student.rank}
                  className={`relative overflow-hidden ${
                    student.rank === 1 ? 'border-yellow-500 bg-gradient-to-br from-yellow-500/10 to-background' :
                    student.rank === 2 ? 'border-gray-400 bg-gradient-to-br from-gray-400/10 to-background' :
                    student.rank === 3 ? 'border-amber-600 bg-gradient-to-br from-amber-600/10 to-background' :
                    ''
                  }`}
                >
                  {student.rank === 1 && (
                    <div className="absolute top-0 right-0">
                      <Trophy className="h-12 w-12 text-yellow-500" />
                    </div>
                  )}
                  <CardHeader className="text-center pb-4">
                    <Avatar className="h-24 w-24 mx-auto mb-4 border-4">
                      <AvatarFallback className="text-2xl">
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Badge className="text-lg px-3 py-1">
                        #{student.rank}
                      </Badge>
                      {getRankIcon(student.rank)}
                    </div>
                    <CardTitle className="text-xl">{student.name}</CardTitle>
                    <CardDescription>
                      {student.university} • {student.level}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-center space-y-4">
                    <div className="flex items-center justify-center gap-1 text-3xl font-bold">
                      <Star className="h-8 w-8 text-yellow-500 fill-yellow-500" />
                      {student.score}
                    </div>
                    <div className="flex justify-center gap-6 text-sm">
                      <div>
                        <div className="font-medium">{student.projects}</div>
                        <div className="text-muted-foreground">Projects</div>
                      </div>
                      <div>
                        <div className="font-medium">{student.level}</div>
                        <div className="text-muted-foreground">Level</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Full Ranking Table */}
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-16">Rank</TableHead>
                      <TableHead>Student</TableHead>
                      <TableHead>University</TableHead>
                      <TableHead>Level</TableHead>
                      <TableHead>Projects</TableHead>
                      <TableHead>Score</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {studentLeaderboard.map((student) => (
                      <TableRow key={student.rank}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span className={`text-lg font-bold ${
                              student.rank <= 3 ? 'text-primary' : ''
                            }`}>
                              #{student.rank}
                            </span>
                            {getRankIcon(student.rank)}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarFallback>
                                {student.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{student.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{student.university}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{student.level}</Badge>
                        </TableCell>
                        <TableCell>{student.projects}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1 font-bold">
                            <Star className="h-4 w-4 text-yellow-500" />
                            {student.score}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            View <ChevronRight className="ml-1 h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Universities Tab */}
          <TabsContent value="universities" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Top Universities</h2>
                <p className="text-muted-foreground">Ranked by student outcomes and execution</p>
              </div>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
            </div>

            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5" />
                    University Rankings
                  </CardTitle>
                  <span className="text-sm text-muted-foreground">Based on average student reputation</span>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-20">Rank</TableHead>
                      <TableHead>University</TableHead>
                      <TableHead>Code</TableHead>
                      <TableHead>Students</TableHead>
                      <TableHead>Projects</TableHead>
                      <TableHead>Avg Score</TableHead>
                      <TableHead>Trend</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {universityLeaderboard.map((uni) => (
                      <TableRow key={uni.rank}>
                        <TableCell>
                          <div className={`flex items-center gap-2 text-lg font-bold ${
                            uni.rank <= 3 ? 'text-primary' : ''
                          }`}>
                            #{uni.rank}
                            {getRankIcon(uni.rank)}
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">{uni.name}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{uni.code}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            {uni.students}
                          </div>
                        </TableCell>
                        <TableCell>{uni.projects}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1 font-bold">
                            <Star className="h-4 w-4 text-yellow-500" />
                            {uni.score}
                          </div>
                        </TableCell>
                        <TableCell>{getTrendIcon(uni.trend)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Top Projects</h2>
                <p className="text-muted-foreground">Ranked by completion rate and team performance</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  Filters
                </Button>
                <Button>
                  <Briefcase className="mr-2 h-4 w-4" />
                  Browse All Projects
                </Button>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projectLeaderboard.map((project) => (
                <Card key={project.rank} className="hover:border-primary/50 transition-all">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <div className={`flex items-center gap-2 text-2xl font-bold ${
                        project.rank <= 3 ? 'text-primary' : ''
                      }`}>
                        #{project.rank}
                        {getRankIcon(project.rank)}
                      </div>
                      <Badge variant="outline">{project.category}</Badge>
                    </div>
                    <CardTitle className="text-lg">{project.name}</CardTitle>
                    <CardDescription>
                      <div className="flex items-center gap-1">
                        <Building2 className="h-3 w-3" />
                        {project.university}
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span>Completion</span>
                        <span className="font-medium">{project.completion}%</span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary transition-all"
                          style={{ width: `${project.completion}%` }}
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Users className="h-4 w-4" />
                        {project.teamSize} team members
                      </div>
                      <div className="flex items-center gap-1 font-bold">
                        <Star className="h-4 w-4 text-yellow-500" />
                        {project.score}
                      </div>
                    </div>
                    <Button variant="outline" className="w-full" size="sm" asChild>
                      <Link href="#">
                        View Project <ChevronRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
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
