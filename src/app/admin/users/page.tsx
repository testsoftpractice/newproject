'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Shield, Mail, Lock, Eye, UserPlus, RefreshCw } from 'lucide-react'
import Link from 'next/link'
import { toast } from '@/hooks/use-toast'

interface User {
  id: string
  name: string
  email: string
  role: string
  university?: string
  verificationStatus: string
  createdAt: string
  lastLogin?: string
}

export default function AdminUsersPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [verificationFilter, setVerificationFilter] = useState('all')

  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(false)

  // Mock users data
  const mockUsers: User[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@university.edu',
      role: 'STUDENT',
      university: 'MIT',
      verificationStatus: 'VERIFIED',
      createdAt: '2024-12-10T10:00:00Z',
      lastLogin: '2024-01-13T14:30:00Z',
    },
    {
      id: '2',
      name: 'Michael Chen',
      email: 'michael.chen@stanford.edu',
      role: 'STUDENT',
      university: 'Stanford',
      verificationStatus: 'VERIFIED',
      createdAt: '2024-12-05T09:00:00Z',
      lastLogin: '2024-01-12T11:15:00Z',
    },
    {
      id: '3',
      name: 'Emily Davis',
      email: 'emily.davis@example.com',
      role: 'EMPLOYER',
      university: null,
      verificationStatus: 'VERIFIED',
      createdAt: '2024-11-28T15:30:00Z',
      lastLogin: '2024-01-13T16:45:00Z',
    },
    {
      id: '4',
      name: 'James Wilson',
      email: 'james.wilson@example.com',
      role: 'INVESTOR',
      university: null,
      verificationStatus: 'VERIFIED',
      createdAt: '2024-12-01T08:00:00Z',
      lastLogin: '2024-01-10T09:20:00Z',
    },
    {
      id: '5',
      name: 'Dr. Robert Martinez',
      email: 'r.martinez@harvard.edu',
      role: 'UNIVERSITY_ADMIN',
      university: 'Harvard',
      verificationStatus: 'VERIFIED',
      createdAt: '2024-11-15T12:00:00Z',
      lastLogin: '2024-01-13T10:00:00Z',
    },
    {
      id: '6',
      name: 'Jessica Taylor',
      email: 'jessica.t@berkeley.edu',
      role: 'STUDENT',
      university: 'Berkeley',
      verificationStatus: 'PENDING',
      createdAt: '2024-12-20T14:00:00Z',
      lastLogin: null,
    },
  ]

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true)
      await new Promise(resolve => setTimeout(resolve, 500))
      setUsers(mockUsers)
      setLoading(false)
    }
    fetchUsers()
  }, [])

  const filteredUsers = users.filter(user => {
    const matchesSearch = !searchQuery || 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRole = roleFilter === 'all' || user.role === roleFilter
    const matchesVerification = verificationFilter === 'all' || user.verificationStatus === verificationFilter
    return matchesSearch && matchesRole && matchesVerification
  })

  const handleAction = async (action: string, user: User) => {
    toast({
      title: 'Action',
      description: `${action} user: ${user.name}`,
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-primary text-primary-foreground sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0" />
              <h1 className="text-xl sm:text-2xl font-bold truncate">Manage Users</h1>
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
              <CardTitle>User Statistics</CardTitle>
              <CardDescription>Overview of user base</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:gap-6 grid-cols-2 md:grid-cols-4">
                <div className="text-center space-y-1 sm:space-y-2">
                  <div className="text-3xl sm:text-4xl font-bold break-words">{users.length}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Total Users</div>
                </div>
                <div className="text-center space-y-1 sm:space-y-2">
                  <div className="text-3xl sm:text-4xl font-bold text-green-500 break-words">{users.filter(u => u.verificationStatus === 'VERIFIED').length}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Verified</div>
                </div>
                <div className="text-center space-y-1 sm:space-y-2">
                  <div className="text-3xl sm:text-4xl font-bold text-yellow-500 break-words">{users.filter(u => u.verificationStatus === 'PENDING').length}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Pending</div>
                </div>
                <div className="text-center space-y-1 sm:space-y-2">
                  <div className="text-3xl sm:text-4xl font-bold text-red-500 break-words">{users.filter(u => u.verificationStatus === 'REJECTED').length}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Rejected</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Search & Filter</CardTitle>
              <CardDescription>Find and filter users</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4">
              <div className="flex-1 relative min-w-0">
                <Shield className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Search users by name or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 sm:py-3 border rounded-md text-sm sm:text-base"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={roleFilter === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setRoleFilter('all')}
                >
                  All
                </Button>
                <Button
                  variant={roleFilter === 'STUDENT' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setRoleFilter('STUDENT')}
                >
                  Students
                </Button>
                <Button
                  variant={roleFilter === 'EMPLOYER' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setRoleFilter('EMPLOYER')}
                >
                  Employers
                </Button>
                <Button
                  variant={roleFilter === 'INVESTOR' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setRoleFilter('INVESTOR')}
                >
                  Investors
                </Button>
                <Button
                  variant={roleFilter === 'UNIVERSITY_ADMIN' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setRoleFilter('UNIVERSITY_ADMIN')}
                >
                  Universities
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={verificationFilter === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setVerificationFilter('all')}
                >
                  All
                </Button>
                <Button
                  variant={verificationFilter === 'VERIFIED' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setVerificationFilter('VERIFIED')}
                >
                  Verified
                </Button>
                <Button
                  variant={verificationFilter === 'PENDING' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setVerificationFilter('PENDING')}
                >
                  Pending
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Users List</CardTitle>
              <CardDescription>
                {filteredUsers.length} user{filteredUsers.length === 1 ? '' : 's'} found
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="animate-pulse text-center py-8 sm:py-12">
                  <div className="h-10 w-10 sm:h-12 sm:w-12 border-4 border-t-blue-500 border-r-transparent rounded-full animate-spin mx-auto" />
                  <p className="text-sm text-muted-foreground mt-2">Loading users...</p>
                </div>
              ) : filteredUsers.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3 sm:p-4 text-xs sm:text-sm font-medium text-muted-foreground">User</th>
                        <th className="text-left p-3 sm:p-4 text-xs sm:text-sm font-medium text-muted-foreground">Email</th>
                        <th className="text-left p-3 sm:p-4 text-xs sm:text-sm font-medium text-muted-foreground">Role</th>
                        <th className="text-left p-3 sm:p-4 text-xs sm:text-sm font-medium text-muted-foreground">Status</th>
                        <th className="text-left p-3 sm:p-4 text-xs sm:text-sm font-medium text-muted-foreground">Joined</th>
                        <th className="text-right p-3 sm:p-4 text-xs sm:text-sm font-medium text-muted-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map((user) => (
                        <tr key={user.id} className="border-b hover:bg-muted/50">
                          <td className="p-3 sm:p-4">
                            <div className="flex items-center gap-3">
                              <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-primary/20 flex items-center justify-center font-semibold text-primary flex-shrink-0">
                                {user.name.charAt(0).toUpperCase()}
                              </div>
                              <div className="min-w-0">
                                <div className="font-medium text-sm sm:text-base truncate">{user.name}</div>
                                <div className="text-xs sm:text-sm text-muted-foreground truncate">{user.email}</div>
                                {user.university && (
                                  <div className="text-xs sm:text-sm text-muted-foreground mt-1 truncate">
                                    • {user.university}
                                  </div>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="p-3 sm:p-4">
                            <Badge variant="outline" className="text-xs sm:text-sm">{user.role.replace('_', ' ')}</Badge>
                          </td>
                          <td className="p-3 sm:p-4">
                            <Badge
                              variant={user.verificationStatus === 'VERIFIED' ? 'default' : user.verificationStatus === 'PENDING' ? 'secondary' : 'destructive'}
                              className="text-xs sm:text-sm"
                            >
                              {user.verificationStatus}
                            </Badge>
                          </td>
                          <td className="p-3 sm:p-4 text-xs sm:text-sm text-muted-foreground">
                            {new Date(user.createdAt).toLocaleDateString()}
                          </td>
                          <td className="p-3 sm:p-4">
                            <div className="flex items-center justify-end gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => toast({ title: 'View User', description: user.name })}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => toast({ title: 'Reset Password', description: user.name })}
                              >
                                <Lock className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleAction('Locked', user)}
                              >
                                <RefreshCw className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-8 sm:py-12">
                  <UserPlus className="h-16 w-16 sm:h-20 sm:w-20 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg sm:text-xl font-semibold mb-2">No Users Found</h3>
                  <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">
                    No users match your search and filter criteria.
                  </p>
                  <Button variant="outline" className="text-sm sm:text-base" asChild>
                    <Link href="/admin/governance">
                      Back to Admin Dashboard
                    </Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

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
