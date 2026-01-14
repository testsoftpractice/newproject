'use client'

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Users,
  Shield,
  TrendingUp,
  Calendar,
  Clock,
  Star,
  FileText,
  Plus,
  Search,
  Filter,
} from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { toast } from "@/hooks/use-toast"

export default function EmployerDashboard() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("overview")
  const [searchQuery, setSearchQuery] = useState("")

  const [stats, setStats] = useState({
    totalCandidates: 0,
    verifiedCandidates: 0,
    totalRequests: 0,
    pendingRequests: 0,
    averageRating: 0,
  })

  const [candidates, setCandidates] = useState<any[]>([])
  const [verificationRequests, setVerificationRequests] = useState<any[]>([])
  const [ratings, setRatings] = useState<any[]>([])

  const [loading, setLoading] = useState({
    stats: false,
    candidates: false,
    verifications: false,
    ratings: false,
  })

  useEffect(() => {
    const fetchStats = async () => {
      if (!user) return
      try {
        setLoading(prev => ({ ...prev, stats: true }))
        const response = await fetch(`/api/dashboard/employer/stats?userId=${user.id}`)
        const data = await response.json()
        if (data.success) {
          setStats(data.data)
        } else {
          toast({ title: "Error", description: data.error || "Failed to fetch statistics", variant: "destructive" })
        }
      } catch (error) {
        console.error("Fetch stats error:", error)
      } finally {
        setLoading(prev => ({ ...prev, stats: false }))
      }
    }

    if (activeTab === "overview") {
      fetchStats()
    }
  }, [activeTab, user])

  useEffect(() => {
    const fetchCandidates = async () => {
      if (!user) return
      try {
        setLoading(prev => ({ ...prev, candidates: true }))
        const response = await fetch(`/api/users?role=STUDENT&limit=20`)
        const data = await response.json()
        if (data.success) {
          setCandidates(data.data.users || [])
        } else {
          toast({ title: "Error", description: data.error || "Failed to fetch candidates", variant: "destructive" })
        }
      } catch (error) {
        console.error("Fetch candidates error:", error)
      } finally {
        setLoading(prev => ({ ...prev, candidates: false }))
      }
    }

    if (activeTab === "candidates") {
      fetchCandidates()
    }
  }, [activeTab, user])

  useEffect(() => {
    const fetchVerifications = async () => {
      if (!user) return
      try {
        setLoading(prev => ({ ...prev, verifications: true }))
        const response = await fetch(`/api/verification?employerId=${user.id}`)
        const data = await response.json()
        if (data.success) {
          setVerificationRequests(data.data || [])
        } else {
          toast({ title: "Error", description: data.error || "Failed to fetch verifications", variant: "destructive" })
        }
      } catch (error) {
        console.error("Fetch verifications error:", error)
      } finally {
        setLoading(prev => ({ ...prev, verifications: false }))
      }
    }

    if (activeTab === "verifications") {
      fetchVerifications()
    }
  }, [activeTab, user])

  useEffect(() => {
    const fetchRatings = async () => {
      if (!user) return
      try {
        setLoading(prev => ({ ...prev, ratings: true }))
        const response = await fetch(`/api/ratings?sourceId=${user.id}`)
        const data = await response.json()
        if (data.success) {
          setRatings(data.data || [])
        } else {
          toast({ title: "Error", description: data.error || "Failed to fetch ratings", variant: "destructive" })
        }
      } catch (error) {
        console.error("Fetch ratings error:", error)
      } finally {
        setLoading(prev => ({ ...prev, ratings: false }))
      }
    }

    if (activeTab === "ratings") {
      fetchRatings()
    }
  }, [activeTab, user])

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-background">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-primary" />
              <h1 className="text-2xl font-bold">Employer Dashboard</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">{user?.name || "Employer"}</span>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/">Back to Home</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto space-y-6">
          {activeTab === "overview" && (
            <div className="grid gap-6 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Overview</CardTitle>
                  <CardDescription>Your employer platform metrics</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {loading.stats ? (
                    <div className="animate-pulse text-center py-8">
                      <div className="h-6 w-6 border-2 border-t-blue-500 border-r-transparent rounded-full animate-spin mx-auto" />
                      <p className="text-sm text-muted-foreground mt-2">Loading metrics...</p>
                    </div>
                  ) : (
                    <>
                      <div className="text-center mb-4">
                        <div className="text-5xl font-bold">{stats.totalCandidates}</div>
                        <div className="text-sm text-muted-foreground">Total Candidates</div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-blue-500">{stats.verifiedCandidates}</div>
                          <div className="text-sm text-muted-foreground">Verified</div>
                        </div>
                        <div className="text-center">
                          <div className="text-3xl font-bold">{stats.pendingRequests}</div>
                          <div className="text-sm text-muted-foreground">Pending Requests</div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-green-500">{stats.approvedRequests}</div>
                          <div className="text-sm text-muted-foreground">Approved Requests</div>
                        </div>
                        <div className="text-center">
                          <div className="text-3xl font-bold text-red-500">{stats.rejectedRequests}</div>
                          <div className="text-sm text-muted-foreground">Rejected Requests</div>
                        </div>
                      </div>
                      <div className="text-center pt-4 border-t">
                        <div className="text-3xl font-bold text-yellow-500">{stats.averageRating.toFixed(1)}</div>
                        <div className="text-sm text-muted-foreground">Average Rating</div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest verification and rating actions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-blue-500" />
                    <div>
                      <div className="font-medium">This week</div>
                      <div className="text-sm text-muted-foreground">
                        +{stats.totalCandidates - stats.verifiedCandidates} new candidates joined
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-green-500" />
                    <div>
                      <div className="font-medium">This week</div>
                      <div className="text-sm text-muted-foreground">
                        {stats.approvedRequests} verification requests approved
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Star className="h-5 w-5 text-yellow-500" />
                    <div>
                      <div className="font-medium">This week</div>
                      <div className="text-sm text-muted-foreground">
                        {(stats.averageRating * stats.totalCandidates).toFixed(0)} total ratings given
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Common employer tasks</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid gap-3">
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/dashboard/employer/candidates">
                        <Users className="h-4 w-4 mr-2" />
                        Browse Candidates
                      </Link>
                    </Button>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/dashboard/employer/verification-requests">
                        <Shield className="h-4 w-4 mr-2" />
                        Manage Requests
                      </Link>
                    </Button>
                  </div>
                  <div className="grid gap-3">
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/records/create">
                        <FileText className="h-4 w-4 mr-2" />
                        Create Record
                      </Link>
                    </Button>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/marketplace">
                        <TrendingUp className="h-4 w-4 mr-2" />
                        Browse Marketplace
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "candidates" && (
            <div className="space-y-6">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Talent Search</h2>
                  <p className="text-muted-foreground">Find verified candidates for your open positions</p>
                </div>
                <Button asChild>
                  <Link href="/dashboard/employer/candidates">
                    <Plus className="h-4 w-4 mr-2" />
                    Post Job
                  </Link>
                </Button>
              </div>

              <div className="flex gap-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search candidates by name, email, university, or major..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                    disabled={loading.candidates}
                  />
                </div>
                <Button disabled={loading.candidates}>Search</Button>
              </div>

              {loading.candidates ? (
                <div className="animate-pulse text-center py-12">
                  <div className="h-12 w-12 border-2 border-t-blue-500 border-r-transparent rounded-full animate-spin mx-auto" />
                  <p className="text-sm text-muted-foreground mt-2">Loading candidates...</p>
                </div>
              ) : candidates.length > 0 ? (
                <div className="grid gap-4 lg:grid-cols-2">
                  {candidates.map((candidate) => (
                    <Card key={candidate.id}>
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-12 w-12">
                            <AvatarFallback className="text-lg bg-primary text-primary-foreground">
                              {candidate.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <CardTitle>{candidate.name}</CardTitle>
                            <CardDescription>
                              {candidate.university || "No university"} • {candidate.major || "No major"}
                            </CardDescription>
                            <Badge variant={candidate.verified ? "default" : "secondary"}>
                              {candidate.verified ? "Verified" : "Unverified"}
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <Button variant="default" className="w-full" asChild>
                          <Link href={`/records/${candidate.id}`}>
                            View Profile
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="p-12 text-center">
                    <Users className="h-20 w-20 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-xl font-semibold mb-2">No Candidates Found</h3>
                    <p className="text-muted-foreground mb-6">
                      Adjust your search criteria or filters to find candidates that match your requirements.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {activeTab === "verifications" && (
            <div className="space-y-6">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Verification Requests</h2>
                  <p className="text-muted-foreground">Manage employer-initiated verification requests</p>
                </div>
                <Button asChild>
                  <Link href="/dashboard/employer/verification-requests">
                    <Plus className="h-4 w-4 mr-2" />
                    New Request
                  </Link>
                </Button>
              </div>

              {loading.verifications ? (
                <div className="animate-pulse text-center py-12">
                  <div className="h-12 w-12 border-2 border-t-blue-500 border-r-transparent rounded-full animate-spin mx-auto" />
                  <p className="text-sm text-muted-foreground mt-2">Loading verifications...</p>
                </div>
              ) : verificationRequests.length > 0 ? (
                <div className="grid gap-4 lg:grid-cols-1">
                  {verificationRequests.map((request) => (
                    <Card key={request.id}>
                      <CardHeader>
                        <CardTitle>{request.student?.name || "Candidate"}</CardTitle>
                        <CardDescription>Verification Request</CardDescription>
                        <Badge
                          variant={
                            request.status === "PENDING" ? "default" :
                            request.status === "APPROVED" ? "default" : "secondary"
                          }
                        >
                          {request.status}
                        </Badge>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="space-y-2">
                          <div className="text-sm font-medium">Type</div>
                          <Badge variant="outline">{request.type}</Badge>
                        </div>
                        <div>
                          <div className="text-sm font-medium">Purpose</div>
                          <div className="text-sm text-muted-foreground">{request.purpose}</div>
                        </div>
                        <div className="space-y-2">
                          <div className="text-sm font-medium">Requested</div>
                          <div className="text-sm">{new Date(request.createdAt).toLocaleDateString()}</div>
                        </div>
                        <div className="space-y-2">
                          <div className="text-sm font-medium">Expires</div>
                          <div className="text-sm">{new Date(request.expiresAt).toLocaleDateString()}</div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="p-12 text-center">
                    <Shield className="h-20 w-20 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-xl font-semibold mb-2">No Verification Requests</h3>
                    <p className="text-muted-foreground mb-6">
                      You haven't made any verification requests yet. Create a request to verify a candidate's professional records.
                    </p>
                    <Button asChild className="w-full">
                      <Link href="/dashboard/employer/verification-requests">
                        <Plus className="h-4 w-4 mr-2" />
                        Create Your First Request
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {activeTab === "ratings" && (
            <div className="space-y-6">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Given Ratings</h2>
                  <p className="text-muted-foreground">View all ratings you've provided to candidates</p>
                </div>
              </div>

              {loading.ratings ? (
                <div className="animate-pulse text-center py-12">
                  <div className="h-12 w-12 border-2 border-t-blue-500 border-r-transparent rounded-full animate-spin mx-auto" />
                  <p className="text-sm text-muted-foreground mt-2">Loading ratings...</p>
                </div>
              ) : ratings.length > 0 ? (
                <div className="grid gap-4 lg:grid-cols-1">
                  {ratings.map((rating) => (
                    <Card key={rating.id}>
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback className="text-lg bg-primary text-primary-foreground">
                              {rating.candidate?.name?.charAt(0) || "C"}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <CardTitle>{rating.candidate?.name || "Candidate"}</CardTitle>
                            <CardDescription>
                              {rating.candidate?.university || "No university"} • {rating.candidate?.major || "No major"}
                            </CardDescription>
                          </div>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {new Date(rating.createdAt).toLocaleDateString()}
                        </span>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="space-y-2">
                          <div className="text-sm font-medium">Overall Rating</div>
                          <div className="flex items-center gap-2">
                            <div className="flex-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`h-4 w-4 ${
                                    star <= Math.round(rating.overallRating)
                                      ? "text-yellow-500 fill-current"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-lg font-bold">
                              {rating.overallRating.toFixed(1)}
                            </span>
                          </div>
                        </div>
                        <div className="grid grid-cols-5 gap-2 pt-3">
                          <div className="text-center">
                            <div className="text-xs text-muted-foreground mb-1">Execution</div>
                            <div className="text-lg font-bold">
                              {rating.execution.toFixed(1)}
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-xs text-muted-foreground mb-1">Collaboration</div>
                            <div className="text-lg font-bold">
                              {rating.collaboration.toFixed(1)}
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-xs text-muted-foreground mb-1">Leadership</div>
                            <div className="text-lg font-bold">
                              {rating.leadership.toFixed(1)}
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-xs text-muted-foreground mb-1">Ethics</div>
                            <div className="text-lg font-bold">
                              {rating.ethics.toFixed(1)}
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-xs text-muted-foreground mb-1">Reliability</div>
                            <div className="text-lg font-bold">
                              {rating.reliability.toFixed(1)}
                            </div>
                          </div>
                        </div>
                        {rating.comments && (
                          <div className="mt-3 pt-3 border-t">
                            <div className="text-sm font-medium mb-2">Comments</div>
                            <div className="text-sm text-muted-foreground">{rating.comments}</div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="p-12 text-center">
                    <Star className="h-20 w-20 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-xl font-semibold mb-2">No Ratings Given</h3>
                    <p className="text-muted-foreground mb-6">
                      You haven't provided any ratings yet. After verifying a candidate's records,
                      you can leave a rating on their performance across 5 dimensions.
                    </p>
                    <Button asChild className="w-full">
                      <Link href="/dashboard/employer/candidates">
                        <Shield className="h-4 w-4 mr-2" />
                        Verify a Candidate
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          <Card>
            <CardContent className="p-6">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="candidates">Candidates</TabsTrigger>
                  <TabsTrigger value="verifications">Requests</TabsTrigger>
                  <TabsTrigger value="ratings">Ratings</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
