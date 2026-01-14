'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/auth-context'

export default function AuthPage() {
  const router = useRouter()
  const { login, logout } = useAuth()
  const [activeTab, setActiveTab] = useState('signup')
  const [selectedRole, setSelectedRole] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const [signupData, setSignupData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    bio: '',
    agreeTerms: false,
  })

  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')

  const roles = [
    { id: 'STUDENT', title: 'Student', color: 'bg-blue-500/10' },
    { id: 'UNIVERSITY', title: 'University', color: 'bg-purple-500/10' },
    { id: 'EMPLOYER', title: 'Employer', color: 'bg-green-500/10' },
    { id: 'INVESTOR', title: 'Investor', color: 'bg-orange-500/10' },
  ]

  const handleSignup = async (e: any) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(signupData),
      })

      const data = await response.json()

      if (data.success) {
        login(data.user, data.token)
        setMessage('Account created successfully! Redirecting...')

        setTimeout(() => {
          if (selectedRole === 'STUDENT') {
            router.push('/dashboard/student')
          } else if (selectedRole === 'UNIVERSITY') {
            router.push('/dashboard/university')
          } else if (selectedRole === 'EMPLOYER') {
            router.push('/marketplace')
          } else if (selectedRole === 'INVESTOR') {
            router.push('/marketplace')
          }
        }, 1000)
      } else {
        setError(data.error || 'Failed to create account')
      }
    } catch (err: any) {
      console.error('Signup error:', err)
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleLogin = async (e: any) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: loginEmail,
          password: loginPassword,
        }),
      })

      const data = await response.json()

      if (data.success) {
        login(data.user, data.token)
        setMessage('Login successful! Redirecting...')

        setTimeout(() => {
          if (data.user.role === 'STUDENT') {
            router.push('/dashboard/student')
          } else if (data.user.role === 'UNIVERSITY') {
            router.push('/dashboard/university')
          } else if (data.user.role === 'EMPLOYER') {
            router.push('/marketplace')
          } else if (data.user.role === 'INVESTOR') {
            router.push('/marketplace')
          } else if (data.user.role === 'ADMIN') {
            router.push('/admin/governance')
          }
        }, 1000)
      } else {
        setError(data.error || 'Invalid email or password')
      }
    } catch (err: any) {
      console.error('Login error:', err)
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-background">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-primary rounded-full"></div>
              <span className="font-bold text-xl">Applied Execution Platform</span>
            </div>
            <a href="/" className="flex items-center gap-2">
              <span>Back to Home</span>
            </a>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-4xl">
          <div className="w-full max-w-md grid grid-cols-2 mx-auto gap-4">
            <button
              className={`w-full py-2 px-4 rounded-lg border-2 transition-all ${activeTab === 'signup' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' : 'border-gray-300 hover:bg-gray-50'}`}
              onClick={() => setActiveTab('signup')}
              disabled={loading}
            >
              Sign Up
            </button>
            <button
              className={`w-full py-2 px-4 rounded-lg border-2 transition-all ${activeTab === 'login' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' : 'border-gray-300 hover:bg-gray-50'}`}
              onClick={() => setActiveTab('login')}
              disabled={loading}
            >
              Login
            </button>
          </div>

          {activeTab === 'signup' && (
            <div className="w-full mt-8 p-6 border rounded-lg shadow-lg">
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-center">Create Your Account</h2>
                  <p className="text-sm text-muted-foreground text-center">Choose your role and join the execution platform</p>
                </div>

                {error && (
                  <div className={`p-4 rounded-lg border ${error.includes('success') || error.includes('created') || error.includes('Redirecting') ? 'bg-green-500/10 border-green-500/20' : 'bg-red-500/10 border-red-500/20'}`}>
                    <div className="text-center font-medium">{error}</div>
                  </div>
                )}

                <div>
                  <label className="text-base font-semibold block mb-2">I am a...</label>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-4">
                    {roles.map((role) => (
                      <button
                        key={role.id}
                        type="button"
                        onClick={() => setSelectedRole(role.id)}
                        disabled={loading}
                        className={`relative p-4 rounded-lg border-2 transition-all ${selectedRole === role.id ? `${role.color} border-current` : 'border-gray-300 hover:border-gray-400'}`}
                      >
                        {selectedRole === role.id && (
                          <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded">Selected</span>
                        )}
                        <div className="h-8 w-8 mx-auto mb-2 bg-blue-500 rounded-full"></div>
                        <div className="font-semibold">{role.title}</div>
                        <div className="text-xs text-muted-foreground">
                          {role.description}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {selectedRole && (
                  <form onSubmit={handleSignup} className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <label htmlFor="firstName" className="block text-sm font-medium mb-2">First Name</label>
                        <input
                          id="firstName"
                          name="firstName"
                          type="text"
                          placeholder="John"
                          value={signupData.firstName}
                          onChange={(e) => setSignupData({ ...signupData, firstName: e.target.value })}
                          disabled={loading}
                          required
                          className="w-full px-4 py-2 border rounded-md"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="lastName" className="block text-sm font-medium mb-2">Last Name</label>
                        <input
                          id="lastName"
                          name="lastName"
                          type="text"
                          placeholder="Doe"
                          value={signupData.lastName}
                          onChange={(e) => setSignupData({ ...signupData, lastName: e.target.value })}
                          disabled={loading}
                          required
                          className="w-full px-4 py-2 border rounded-md"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        value={signupData.email}
                        onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                        disabled={loading}
                        required
                        className="w-full px-4 py-2 border rounded-md"
                      />
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <label htmlFor="password" className="block text-sm font-medium mb-2">Password</label>
                        <input
                          id="password"
                          name="password"
                          type="password"
                          placeholder="Create a strong password (min 8 characters)"
                          value={signupData.password}
                          onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                          disabled={loading}
                          required
                          className="w-full px-4 py-2 border rounded-md"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">Confirm Password</label>
                        <input
                          id="confirmPassword"
                          name="confirmPassword"
                          type="password"
                          placeholder="Confirm your password"
                          value={signupData.confirmPassword}
                          onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                          disabled={loading}
                          required
                          className="w-full px-4 py-2 border rounded-md"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="bio" className="block text-sm font-medium mb-2">About You (Optional)</label>
                      <textarea
                        id="bio"
                        name="bio"
                        placeholder="Tell us a bit about yourself..."
                        rows={3}
                        value={signupData.bio}
                        onChange={(e) => setSignupData({ ...signupData, bio: e.target.value })}
                        disabled={loading}
                        className="w-full px-4 py-2 border rounded-md"
                      />
                    </div>

                    <div className="flex items-start gap-2">
                      <label className="flex items-center gap-2 text-sm font-medium">
                        <input
                          id="terms"
                          name="agreeTerms"
                          type="checkbox"
                          checked={signupData.agreeTerms}
                          onChange={(e) => setSignupData({ ...signupData, agreeTerms: e.target.checked })}
                          disabled={loading}
                          required
                          className="w-4 h-4"
                        />
                        <span className="text-sm text-muted-foreground">
                          I agree to{' '}
                          <a href="/terms" className="text-primary hover:underline">
                            Terms of Service
                          </a>
                          {' '}
                          and{' '}
                          <a href="/privacy" className="text-primary hover:underline">
                            Privacy Policy
                          </a>
                        </span>
                      </label>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3 px-4 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 disabled:opacity-50 transition-all"
                    >
                      {loading ? 'Creating Account...' : 'Create Account'}
                    </button>
                  </form>
                )}
              </div>
            </div>
          )}

          {activeTab === 'login' && (
            <div className="w-full mt-8 p-6 border rounded-lg shadow-lg">
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-center">Welcome Back</h2>
                  <p className="text-sm text-muted-foreground text-center">Sign in to access your account</p>
                </div>

                {error && (
                  <div className={`p-4 rounded-lg border mb-4 ${error.includes('success') || error.includes('Login') || error.includes('Redirecting') ? 'bg-green-500/10 border-green-500/20' : 'bg-red-500/10 border-red-500/20'}`}>
                    <div className="text-center font-medium">{error}</div>
                  </div>
                )}

                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="loginEmail" className="block text-sm font-medium mb-2">Email</label>
                    <input
                      id="loginEmail"
                      name="loginEmail"
                      type="email"
                      placeholder="demo@example.com"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      disabled={loading}
                      required
                      className="w-full px-4 py-2 border rounded-md"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="loginPassword" className="block text-sm font-medium mb-2">Password</label>
                    <input
                      id="loginPassword"
                      name="loginPassword"
                      type="password"
                      placeholder="Enter your password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      disabled={loading}
                      required
                      className="w-full px-4 py-2 border rounded-md"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 px-4 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 disabled:opacity-50 transition-all"
                  >
                    {loading ? 'Logging in...' : 'Login'}
                  </button>

                  <div className="text-center text-sm text-muted-foreground mt-2">
                    <a href="/auth/forgot-password" className="hover:underline">
                      Forgot password?
                    </a>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
