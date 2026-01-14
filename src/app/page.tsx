'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  GraduationCap,
  Building2,
  Briefcase,
  TrendingUp,
  Shield,
  ArrowRight,
  Zap,
  Database,
  Lock,
  Globe,
  Users,
  Target,
  BarChart3,
  Award,
  CheckCircle2,
  FileText,
  BookOpen,
  HelpCircle,
  Mail,
} from 'lucide-react'
import Link from 'next/link'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function Home() {
  const [activeStakeholder, setActiveStakeholder] = useState('students')

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-4 py-20 md:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <Badge variant="outline" className="mb-6 text-sm">
              <Zap className="mr-2 h-4 w-4" />
              Applied Execution Platform
            </Badge>
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Where Education Meets{' '}
              <span className="text-primary">Real-World Execution</span>
            </h1>
            <p className="mb-8 text-lg text-muted-foreground md:text-xl max-w-2xl mx-auto">
              A governed ecosystem where students operate real organizations, build verifiable careers from university onward, and transition seamlessly into industry or entrepreneurship.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" className="text-base" asChild>
                <Link href="/auth">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-base" asChild>
                <Link href="#learn-more">
                  Learn More
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stakeholders Section */}
      <section id="learn-more" className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
              Built for Every Stakeholder
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground md:text-xl">
              A multi-sided platform connecting students, universities, employers, and investors in a governed ecosystem of real work and shared ownership.
            </p>
          </div>

          <Tabs value={activeStakeholder} onValueChange={setActiveStakeholder} className="mx-auto max-w-6xl">
            <TabsList className="grid w-full grid-cols-5 mx-auto mb-8">
              <TabsTrigger value="students">
                <GraduationCap className="mr-2 h-4 w-4" />
                Students
              </TabsTrigger>
              <TabsTrigger value="universities">
                <Building2 className="mr-2 h-4 w-4" />
                Universities
              </TabsTrigger>
              <TabsTrigger value="employers">
                <Briefcase className="mr-2 h-4 w-4" />
                Employers
              </TabsTrigger>
              <TabsTrigger value="investors">
                <TrendingUp className="mr-2 h-4 w-4" />
                Investors
              </TabsTrigger>
              <TabsTrigger value="admins">
                <Shield className="mr-2 h-4 w-4" />
                Admins
              </TabsTrigger>
            </TabsList>

            <TabsContent value="students" className="mt-8">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Real Roles, Real Impact</CardTitle>
                    <CardDescription>Step beyond theory into actual execution</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                        <span>Hold real roles: HR, Marketing, Finance, CEO, and more</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                        <span>Progress from contributor → team lead → department head → CEO</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                        <span>Build verified execution history</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                        <span>Gain leadership experience before graduating</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                        <span>Create a professional portfolio that matters</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Lifelong Professional Record</CardTitle>
                    <CardDescription>Your career starts here, verified forever</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Database className="h-5 w-5 flex-shrink-0 text-primary" />
                      <div>
                        <p className="font-medium">Immutable Ledger</p>
                        <p className="text-sm text-muted-foreground">
                          Every role, task, and achievement permanently recorded and verifiable
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Award className="h-5 w-5 flex-shrink-0 text-primary" />
                      <div>
                        <p className="font-medium">Multi-Dimensional Reputation</p>
                        <p className="text-sm text-muted-foreground">
                          Rated on execution, collaboration, leadership, ethics, and reliability
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Lock className="h-5 w-5 flex-shrink-0 text-primary" />
                      <div>
                        <p className="font-medium">Employer Verification</p>
                        <p className="text-sm text-muted-foreground">
                          Employers can verify your complete work history with your consent
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="flex items-center justify-center">
                <Button size="lg" className="text-base" asChild>
                  <Link href="/dashboard/student">
                    View Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="universities" className="mt-8">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Insight & Analytics</CardTitle>
                    <CardDescription>See real student outcomes, not just grades</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                        <span>Tag students to your institution</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                        <span>View individual student performance insights</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                        <span>Department-level analytics dashboards</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                        <span>University-wide impact metrics</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                        <span>Track student progression across roles and projects</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Rankings & Reputation</CardTitle>
                    <CardDescription>Transform outcomes into measurable reputation</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-3">
                      <BarChart3 className="h-5 w-5 flex-shrink-0 text-primary" />
                      <div>
                        <p className="font-medium">Public Leaderboards</p>
                        <p className="text-sm text-muted-foreground">
                          Universities ranked by real student execution and impact
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Target className="h-5 w-5 flex-shrink-0 text-primary" />
                      <div>
                        <p className="font-medium">Outcome-Based Metrics</p>
                        <p className="text-sm text-muted-foreground">
                          Demonstrate employability with data, not marketing claims
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Users className="h-5 w-5 flex-shrink-0 text-primary" />
                      <div>
                        <p className="font-medium">Optional Integration</p>
                        <p className="text-sm text-muted-foreground">
                          Start as observer, become partner—no curriculum change required
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="flex items-center justify-center">
                <Button size="lg" className="text-base" asChild>
                  <Link href="/dashboard/university">
                    View Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="employers" className="mt-8">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Verified Talent Pipelines</CardTitle>
                    <CardDescription>Hire based on proven execution</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                        <span>View verified professional records</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                        <span>Access multi-dimensional reputation profiles</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 w-4 flex-shrink-0 text-primary" />
                        <span>See real project experience and leadership history</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                        <span>Reduce hiring risk with documented performance</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                        <span>Early access to high-performing graduates</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Employer Verification</CardTitle>
                    <CardDescription>Background checks simplified</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Shield className="h-5 w-5 flex-shrink-0 text-primary" />
                      <div>
                        <p className="font-medium">Consent-Based Access</p>
                        <p className="text-sm text-muted-foreground">
                          Request verification with student consent
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Database className="h-5 w-5 flex-shrink-0 text-primary" />
                      <div>
                        <p className="font-medium">Complete History</p>
                        <p className="text-sm text-muted-foreground">
                          Access work history from university through career
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Award className="h-5 w-5 flex-shrink-0 text-primary" />
                      <div>
                        <p className="font-medium">Rate Employees</p>
                        <p className="text-sm text-muted-foreground">
                          Provide feedback that becomes part of their professional record
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="flex items-center justify-center">
                <Button size="lg" className="text-base" asChild>
                  <Link href="/dashboard/employer">
                    View Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="investors" className="mt-8">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Curated Deal Flow</CardTitle>
                    <CardDescription>Early-stage ventures with proven teams</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-orange-500" />
                        <span>Access vetted student-led ventures</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-orange-500" />
                        <span>Transparent team and governance data</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-orange-500" />
                        <span>Structured investment frameworks</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-orange-500" />
                        <span>Reduced execution risk with track records</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-orange-500" />
                        <span>Standardized agreements and IP protection</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>De-Risked Investment</CardTitle>
                    <CardDescription>See execution before investing</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-3">
                      <BarChart3 className="h-5 w-5 flex-shrink-0 text-orange-500" />
                      <div>
                        <p className="font-medium">Execution Metrics</p>
                        <p className="text-sm text-muted-foreground">
                          View team track records, collaboration quality, and leadership history
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Globe className="h-5 w-5 flex-shrink-0 text-orange-500" />
                      <div>
                        <p className="font-medium">Global Access</p>
                        <p className="text-sm text-muted-foreground">
                          Discover talent and ventures from universities worldwide
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Shield className="h-5 w-5 flex-shrink-0 text-orange-500" />
                      <div>
                        <p className="font-medium">Governance Oversight</p>
                        <p className="text-sm text-muted-foreground">
                          Platform-managed compliance and dispute resolution
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="flex items-center justify-center">
                <Button size="lg" className="text-base" asChild>
                  <Link href="/dashboard/investor">
                    View Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="admins" className="mt-8">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Platform Governance</CardTitle>
                    <CardDescription>Ensure compliance and security</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-500" />
                        <span>User Management</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-500" />
                        <span>Project Oversight</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-500" />
                        <span>Audit Logging</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-500" />
                        <span>Dispute Resolution</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Analytics & Insights</CardTitle>
                    <CardDescription>Data-driven decision making</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-3">
                      <BarChart3 className="h-5 w-5 flex-shrink-0 text-red-500" />
                      <div>
                        <p className="font-medium">Platform Statistics</p>
                        <p className="text-sm text-muted-foreground">
                          View user counts, project stats, and engagement metrics
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Zap className="h-5 w-5 flex-shrink-0 text-red-500" />
                      <div>
                        <p className="font-medium">Performance Metrics</p>
                        <p className="text-sm text-muted-foreground">
                          Monitor server performance, API response times, and error rates
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Users className="h-5 w-5 flex-shrink-0 text-red-500" />
                      <div>
                        <p className="font-medium">User Analytics</p>
                        <p className="text-sm text-muted-foreground">
                          Track user signups, activity, and retention rates
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Target className="h-5 w-5 flex-shrink-0 text-red-500" />
                      <div>
                        <p className="font-medium">Revenue Tracking</p>
                        <p className="text-sm text-muted-foreground">
                          Monitor subscription revenue and platform utilization
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Platform Settings</CardTitle>
                    <CardDescription>Configure platform behavior</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Shield className="h-5 w-5 flex-shrink-0 text-red-500" />
                      <div>
                        <p className="font-medium">Global Configuration</p>
                        <p className="text-sm text-muted-foreground">
                          Set platform-wide settings, policies, and rules
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Shield className="h-5 w-5 flex-shrink-0 text-red-500" />
                      <div>
                        <p className="font-medium">Feature Flags</p>
                        <p className="text-sm text-muted-foreground">
                          Enable or disable platform features and functionality
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Shield className="h-5 w-5 flex-shrink-0 text-red-500" />
                      <div>
                        <p className="font-medium">Security Settings</p>
                        <p className="text-sm text-muted-foreground">
                          Configure authentication, rate limiting, and access controls
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Shield className="h-5 w-5 flex-shrink-0 text-red-500" />
                      <div>
                        <p className="font-medium">Notification Settings</p>
                        <p className="text-sm text-muted-foreground">
                          Configure email, push, and in-app notifications
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="flex items-center justify-center">
                <Button size="lg" className="text-base" asChild>
                  <Link href="/admin">
                    View Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl">Applied Execution Platform</span>
            </div>
            <div className="flex gap-6 text-sm">
              <a href="/" className="hover:underline">
                Home
              </a>
              <a href="/terms" className="hover:underline">
                Terms of Service
              </a>
              <a href="/privacy" className="hover:underline">
                Privacy Policy
              </a>
              <a href="/support" className="hover:underline">
                Contact
              </a>
            </div>
          </div>
          <div className="text-center mt-8 text-sm text-muted-foreground">
            © {new Date().getFullYear()} Applied Execution Platform. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
