export default function SupportPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-background">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <a href="/" className="flex items-center gap-2">
              <div className="w-6 h-6 bg-primary rounded-full"></div>
              <span className="font-bold text-xl">Applied Execution Platform</span>
            </a>
            <a href="/" className="text-sm text-muted-foreground hover:underline">
              Back to Home
            </a>
          </div>
        </div>
      </header>

      <main className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl mb-6 text-center">
            Support
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground md:text-xl mb-12 text-center">
            We're here to help you succeed on the Applied Execution Platform.
          </p>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div>
              <div className="mb-8">
                <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center mb-4">
                  <Mail className="w-6 h-6 text-blue-500" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Email Support</h2>
                <div className="space-y-4">
                  <p className="text-muted-foreground mb-4">
                    For general inquiries, account assistance, or feedback about the platform, please email us.
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    We typically respond to all email inquiries within 24-48 hours during business days.
                  </p>
                  <a 
                    href="mailto:support@appliedexecution.com" 
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    <span className="font-medium">Email Support Team</span>
                  </a>
                  <p className="text-sm text-muted-foreground mt-4">
                    support@appliedexecution.com
                  </p>
                </div>
              </div>

              <div className="mb-8">
                <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center mb-4">
                  <HelpCircle className="w-6 h-6 text-green-500" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Knowledge Base</h2>
                <div className="space-y-4">
                  <p className="text-muted-foreground mb-4">
                    Browse our comprehensive documentation, guides, and self-help resources to find answers to common questions.
                  </p>
                  <a 
                    href="/docs" 
                    className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                  >
                    <HelpCircle className="w-4 h-4" />
                    <span className="font-medium">Browse Knowledge Base</span>
                  </a>
                  <p className="text-sm text-muted-foreground mt-4">
                    Access FAQs, troubleshooting guides, and platform documentation.
                  </p>
                </div>
              </div>

              <div className="mb-8">
                <div className="w-12 h-12 bg-purple-500/10 rounded-full flex items-center justify-center mb-4">
                  <BookOpen className="w-6 h-6 text-purple-500" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Live Chat</h2>
                <div className="space-y-4">
                  <p className="text-muted-foreground mb-4">
                    Get instant help through our live chat support during business hours.
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    Live chat is available Monday through Friday, 9am - 5pm EST.
                  </p>
                  <button className="inline-flex items-center gap-2 px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors">
                    <BookOpen className="w-4 h-4" />
                    <span className="font-medium">Start Live Chat</span>
                  </button>
                  <p className="text-sm text-muted-foreground mt-4">
                    Average wait time: 2-5 minutes during peak hours.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-6">Common Issues</h2>
              <div className="space-y-4">
                <p className="text-muted-foreground mb-4">
                  Find solutions to the most common problems users encounter on the platform.
                </p>
                
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="border rounded-lg p-6">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                      <div className="w-8 h-8 bg-blue-500/10 rounded-full flex items-center justify-center">
                        <Shield className="w-4 h-4 text-blue-500" />
                      </div>
                      Account & Login Issues
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Problems with logging in, password reset, or account access.
                    </p>
                    <p className="text-sm text-muted-foreground mb-4">
                      Solutions: Check email/password, try password reset, contact support.
                    </p>
                  </div>

                  <div className="border rounded-lg p-6">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                      <div className="w-8 h-8 bg-green-500/10 rounded-full flex items-center justify-center">
                        <Database className="w-4 h-4 text-green-500" />
                      </div>
                      Data & Projects
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Issues with creating projects, managing tasks, or project permissions.
                    </p>
                    <p className="text-sm text-muted-foreground mb-4">
                      Solutions: Check role permissions, contact project lead, refresh page.
                    </p>
                  </div>

                  <div className="border rounded-lg p-6">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                      <div className="w-8 h-8 bg-orange-500/10 rounded-full flex items-center justify-center">
                        <Award className="w-4 h-4 text-orange-500" />
                      </div>
                      Ratings & Verification
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Problems with rating submissions, verification requests, or employer access.
                    </p>
                    <p className="text-sm text-muted-foreground mb-4">
                      Solutions: Ensure student consent, check verification status, contact employer.
                    </p>
                  </div>

                  <div className="border rounded-lg p-6">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                      <div className="w-8 h-8 bg-red-500/10 rounded-full flex items-center justify-center">
                        <Users className="w-4 h-4 text-red-500" />
                      </div>
                      Investment & Portfolio
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Issues with expressing interest, managing investments, or viewing portfolio.
                    </p>
                    <p className="text-sm text-muted-foreground mb-4">
                      Solutions: Check investor dashboard, review portfolio, contact support.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-6">Getting Started</h2>
              <div className="space-y-4">
                <p className="text-muted-foreground mb-4">
                  New to the platform? Here's how to get started quickly and easily.
                </p>
                
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="border rounded-lg p-6 flex flex-col items-center justify-between">
                    <div className="flex-1">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                        <GraduationCap className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-lg font-bold">Create Account</h3>
                      <p className="text-sm text-muted-foreground">
                        Join the platform and choose your role (Student, University, Employer, Investor)
                      </p>
                    </div>
                    <a 
                      href="/auth" 
                      className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                    >
                      Get Started
                    </a>
                  </div>

                  <div className="border rounded-lg p-6 flex flex-col items-center justify-between">
                    <div className="flex-1">
                      <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center mb-4">
                        <FileText className="w-6 h-6 text-blue-500" />
                      </div>
                      <h3 className="text-lg font-bold">Explore Platform</h3>
                      <p className="text-sm text-muted-foreground">
                        Browse dashboards, marketplace, leaderboards, and all platform features
                      </p>
                    </div>
                    <a 
                      href="/dashboard/student" 
                      className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      Explore Platform
                    </a>
                  </div>

                  <div className="border rounded-lg p-6 flex flex-col items-center justify-between">
                    <div className="flex-1">
                      <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center mb-4">
                        <BookOpen className="w-6 h-6 text-green-500" />
                      </div>
                      <h3 className="text-lg font-bold">Read Documentation</h3>
                      <p className="text-sm text-muted-foreground">
                        Comprehensive guides for all features and workflows
                      </p>
                    </div>
                    <a 
                      href="/docs" 
                      className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                    >
                      Read Docs
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-6">Platform Resources</h2>
              <div className="space-y-4">
                <p className="text-muted-foreground mb-4">
                  Additional resources and links to help you make the most of the Applied Execution Platform.
                </p>
                
                <div className="grid gap-4 md:grid-cols-2">
                  <a 
                    href="/terms" 
                    className="block border rounded-lg p-6 hover:border-primary transition-colors"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <FileText className="w-8 h-8 text-muted-foreground" />
                      <div>
                        <h3 className="text-lg font-bold">Terms of Service</h3>
                        <p className="text-sm text-muted-foreground">
                          Platform usage terms, conditions, and legal agreements
                        </p>
                      </div>
                    </div>
                  </a>

                  <a 
                    href="/privacy" 
                    className="block border rounded-lg p-6 hover:border-primary transition-colors"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <Lock className="w-8 h-8 text-muted-foreground" />
                      <div>
                        <h3 className="text-lg font-bold">Privacy Policy</h3>
                        <p className="text-sm text-muted-foreground">
                          How we collect, use, and protect your personal information
                        </p>
                      </div>
                    </div>
                  </a>

                  <a 
                    href="/docs" 
                    className="block border rounded-lg p-6 hover:border-primary transition-colors"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <BookOpen className="w-8 h-8 text-muted-foreground" />
                      <div>
                        <h3 className="text-lg font-bold">Documentation</h3>
                        <p className="text-sm text-muted-foreground">
                          API docs, deployment guides, and architecture references
                        </p>
                      </div>
                    </div>
                  </a>

                  <a 
                    href="/blog" 
                    className="block border rounded-lg p-6 hover:border-primary transition-colors"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <BookOpen className="w-8 h-8 text-muted-foreground" />
                      <div>
                        <h3 className="text-lg font-bold">Blog</h3>
                        <p className="text-sm text-muted-foreground">
                          Platform updates, feature announcements, and insights
                        </p>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t bg-muted py-8">
        <div className="container mx-auto px-4">
          <div className="text-center text-sm text-muted-foreground mb-4">
            Still need help? We're here for you.
          </div>
          <div className="grid md:grid-cols-2 gap-6 text-center">
            <div className="space-y-4">
              <h3 className="text-lg font-bold mb-2">Emergency Support</h3>
              <p className="text-sm text-muted-foreground">
                For urgent security issues or critical platform problems
              </p>
              <a 
                href="mailto:emergency@appliedexecution.com" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                <Shield className="w-4 h-4" />
                <span className="font-medium">Emergency Contact</span>
              </a>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold mb-2">Business Hours</h3>
              <p className="text-sm text-muted-foreground">
                Support availability and response times
              </p>
              <p className="text-sm text-muted-foreground">
                Email: 24/7 support<br />
                Live Chat: Mon-Fri, 9am-5pm EST<br />
                Phone: 1-800-APPLYED (8am-8pm EST)
              </p>
            </div>
          </div>

          <div className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Applied Execution Platform. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
