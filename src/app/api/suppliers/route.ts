import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET /api/suppliers - List suppliers
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')

    // Mock supplier data (in production, fetch from database)
    const mockSuppliers = [
      {
        id: 'supplier-1',
        name: 'Tech Solutions Inc.',
        category: 'Technology',
        description: 'Software development and cloud infrastructure services',
        rating: 4.5,
        projectsCompleted: 25,
        hourlyRate: 150,
        verified: true,
      },
      {
        id: 'supplier-2',
        name: 'Design Studio Pro',
        category: 'Design',
        description: 'UI/UX design and branding services',
        rating: 4.8,
        projectsCompleted: 40,
        hourlyRate: 100,
        verified: true,
      },
      {
        id: 'supplier-3',
        name: 'Marketing Experts',
        category: 'Marketing',
        description: 'Digital marketing and growth strategies',
        rating: 4.3,
        projectsCompleted: 18,
        hourlyRate: 120,
        verified: false,
      },
      {
        id: 'supplier-4',
        name: 'Data Analytics Hub',
        category: 'Data & Analytics',
        description: 'Business intelligence and data visualization',
        rating: 4.7,
        projectsCompleted: 32,
        hourlyRate: 175,
        verified: true,
      },
      {
        id: 'supplier-5',
        name: 'Content Creators',
        category: 'Content',
        description: 'Content writing and creative services',
        rating: 4.4,
        projectsCompleted: 22,
        hourlyRate: 80,
        verified: true,
      },
    ]

    let filteredSuppliers = mockSuppliers

    if (search) {
      filteredSuppliers = filteredSuppliers.filter((s) =>
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.description.toLowerCase().includes(search.toLowerCase())
      )
    }

    if (category && category !== 'all') {
      filteredSuppliers = filteredSuppliers.filter((s) => s.category === category)
    }

    const startIndex = (page - 1) * limit
    const paginatedSuppliers = filteredSuppliers.slice(startIndex, startIndex + limit)

    return NextResponse.json({
      success: true,
      data: {
        suppliers: paginatedSuppliers,
        totalCount: filteredSuppliers.length,
        currentPage: page,
        totalPages: Math.ceil(filteredSuppliers.length / limit),
      },
    })
  } catch (error: any) {
    console.error('Get suppliers error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST /api/suppliers - Create supplier profile
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, category, description, hourlyRate, skills } = body

    // Validate input
    if (!name || !category || !description) {
      return NextResponse.json(
        { success: false, error: 'Name, category, and description are required' },
        { status: 400 }
      )
    }

    // Create supplier (mock - in production, save to database)
    const supplier = {
      id: `supplier-${Date.now()}`,
      name,
      category,
      description,
      hourlyRate: hourlyRate ? parseFloat(hourlyRate) : null,
      skills: skills || [],
      rating: 0,
      projectsCompleted: 0,
      verified: false,
      createdAt: new Date(),
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Supplier profile created successfully',
        data: supplier,
      },
      { status: 201 }
    )
  } catch (error: any) {
    console.error('Create supplier error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
