'use client'

import { getTokenFromHeaders, verifyToken } from '@/lib/auth/jwt'

// API client that automatically includes JWT tokens in requests
class APIClient {
  private baseURL: string
  private token: string | null = null

  constructor(baseURL: string = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api') {
    this.baseURL = baseURL
    // Load token from localStorage
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('token')
    }
  }

  private getHeaders(includeAuth: boolean = true): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    }

    if (includeAuth && this.token) {
      headers['Authorization'] = `Bearer ${this.token}`
    }

    return headers
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<{ success: boolean; data?: T; error?: string }> {
    const url = `${this.baseURL}${endpoint}`

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          ...this.getHeaders(),
          ...options.headers,
        },
      })

      const data = await response.json()
      return data
    } catch (error: any) {
      console.error('API Error:', error)
      return {
        success: false,
        error: error.message || 'An error occurred',
      }
    }
  }

  async get<T>(endpoint: string, params?: Record<string, string>): Promise<{ success: boolean; data?: T; error?: string }> {
    const queryString = params ? new URLSearchParams(params).toString() : ''
    return this.request<T>(`${endpoint}${queryString ? '?' + queryString : ''}`)
  }

  async post<T>(endpoint: string, data: any): Promise<{ success: boolean; data?: T; error?: string }> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async patch<T>(endpoint: string, data: any): Promise<{ success: boolean; data?: T; error?: string }> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data),
    })
  }

  async delete<T>(endpoint: string): Promise<{ success: boolean; data?: T; error?: string }> {
    return this.request<T>(endpoint, {
      method: 'DELETE',
    })
  }

  // Auth endpoints
  async signup(data: any) {
    return this.post('/auth/signup', data)
  }

  async login(data: any) {
    return this.post('/auth/login', data)
  }

  async logout() {
    this.token = null
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    }
  }

  // User endpoints
  async getProfile(userId: string) {
    return this.get(`/users/${userId}`)
  }

  async updateProfile(userId: string, data: any) {
    return this.patch(`/users/${userId}`, data)
  }

  // Projects endpoints
  async getProjects(params?: Record<string, string>) {
    return this.get('/projects', params)
  }

  async createProject(data: any) {
    return this.post('/projects', data)
  }

  async getProject(projectId: string) {
    return this.get(`/projects/${projectId}`)
  }

  async updateProject(projectId: string, data: any) {
    return this.patch(`/projects/${projectId}`, data)
  }

  async deleteProject(projectId: string) {
    return this.delete(`/projects/${projectId}`)
  }

  // Tasks endpoints
  async getTasks(params?: Record<string, string>) {
    return this.get('/tasks', params)
  }

  async createTask(data: any) {
    return this.post('/tasks', data)
  }

  async getTask(taskId: string) {
    return this.get(`/tasks/${taskId}`)
  }

  async updateTask(taskId: string, data: any) {
    return this.patch(`/tasks/${taskId}`, data)
  }

  async deleteTask(taskId: string) {
    return this.delete(`/tasks/${taskId}`)
  }

  // Ratings endpoints
  async createRating(data: any) {
    return this.post('/ratings', data)
  }

  async getRatings(params?: Record<string, string>) {
    return this.get('/ratings', params)
  }

  // Records endpoints
  async getRecords(params?: Record<string, string>) {
    return this.get('/records', params)
  }

  async createRecord(data: any) {
    return this.post('/records', data)
  }

  async updateRecord(recordId: string, data: any) {
    return this.patch(`/records/${recordId}`, data)
  }

  async deleteRecord(recordId: string) {
    return this.delete(`/records/${recordId}`)
  }

  // Verification endpoints
  async createVerificationRequest(data: any) {
    return this.post('/verification', data)
  }

  async updateVerificationRequest(requestId: string, data: any) {
    return this.patch(`/verification/${requestId}`, data)
  }

  async getVerificationRequests(params?: Record<string, string>) {
    return this.get('/verification', params)
  }

  // Investments endpoints
  async getInvestments(params?: Record<string, string>) {
    return this.get('/investments', params)
  }

  async createInvestment(data: any) {
    return this.post('/investments', data)
  }

  async updateInvestment(investmentId: string, data: any) {
    return this.patch(`/investments/${investmentId}`, data)
  }

  // Universities endpoints
  async getUniversities(params?: Record<string, string>) {
    return this.get('/universities', params)
  }

  async createUniversity(data: any) {
    return this.post('/universities', data)
  }

  // Leaderboards endpoints
  async getLeaderboards(params?: Record<string, string>) {
    return this.get('/leaderboards', params)
  }

  async generateLeaderboard(data: any) {
    return this.post('/leaderboards', data)
  }

  // Set token (for use after login/signup)
  setToken(token: string) {
    this.token = token
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token)
    }
  }

  // Get current token
  getToken(): string | null {
    return this.token
  }

  // Clear token (for logout)
  clearToken() {
    this.token = null
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token')
    }
  }
}

// Create singleton instance
export const api = new APIClient()
