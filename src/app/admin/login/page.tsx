'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Shield, LogOut, Home, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from '@/hooks/use-toast'

export default function AdminLoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (data.success) {
        localStorage.setItem('admin_token', data.token)
        localStorage.setItem('admin_user', JSON.stringify(data.user))
        localStorage.setItem('admin_role', 'admin')
        
        toast({
          title: 'Admin Login Successful',
          description: 'Welcome back, Administrator',
        })

        setTimeout(() => {
          router.push('/admin')
        }, 500)
      } else {
        setError(data.error || 'Invalid admin credentials')
      }
    } catch (err: any) {
      console.error('Admin login error:', err)
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-900">
      <div className="absolute top-0 left-0 w-full">
        <Link href="/">
          <Button variant="ghost" size="icon" className="absolute top-4 right-4 bg-slate-800/20 hover:bg-slate-700 text-white">
            <Home className="h-4 w-4" />
          </Button>
        </Link>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader className="space-y-2 text-center">
              <div className="flex justify-center mb-4">
                <Shield className="h-12 w-12 text-primary" />
              </div>
              <CardTitle className="text-2xl">Admin Login</CardTitle>
              <CardDescription>
                Enter your administrator credentials to access admin dashboard
              </CardDescription>
            </CardHeader>

            <CardContent>
              {error && (
                <div className="p-3 mb-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start gap-2">
                  <Shield className="h-5 w-5 text-red-500 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="font-semibold text-red-600">Login Failed</div>
                    <div className="text-sm text-red-600">{error}</div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Admin Email</Label>
                  <div className="relative">
                    <CheckCircle2 className="absolute left-3 top-3 h-4 w-4 text-green-500" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="admin@appliedexecution.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={loading}
                      className="pl-10"
                      required
                    />
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    Use your designated admin email address
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Shield className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="•••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={loading}
                      className="pl-10"
                      required
                    />
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    Enter your secure admin password
                  </p>
                </div>

                <div className="p-4 bg-slate-800/10 border border-slate-700/20 rounded-lg">
                  <div className="flex items-start gap-2">
                    <Shield className="h-5 w-5 text-yellow-500 mt-0.5" />
                    <div className="flex-1 text-sm text-slate-200">
                      <div className="font-semibold mb-1">Security Notice</div>
                      <div>
                        This is an administrative login. All actions performed here are logged and monitored
                        for compliance purposes. Use admin privileges responsibly and in accordance
                        with platform policies.
                      </div>
                      <div className="mt-2 text-xs text-slate-400">
                        Demo credentials: admin@appliedexecution.com / adminpassword123
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.push('/')}
                    disabled={loading}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={loading || !email.trim() || !password.trim()}
                    className="flex-1"
                  >
                    {loading ? 'Logging in...' : 'Admin Login'}
                  </Button>
                </div>
              </form>

              <div className="text-center pt-4">
                <Link href="/" className="text-sm text-slate-400 hover:text-slate-300">
                  Return to Home
                </Link>
              </div>
            </CardContent>

            <CardFooter className="text-xs text-slate-400">
              <div className="flex items-center justify-center gap-2">
                <div className="flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span>SSL Secured</span>
                </div>
                <div className="text-slate-400">
                  IP: 192.168.1.1 • Admin Server v1.0.0
                </div>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
