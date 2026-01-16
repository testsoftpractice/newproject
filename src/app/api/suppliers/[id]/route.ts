import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET /api/suppliers/[id] - Get a specific supplier
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    // Mock supplier data (in production, fetch from database)
    const mockSuppliers = [
      {
        id: 'supplier-1',
        name: 'Tech Solutions Inc.',
        description: 'Software development and cloud infrastructure services. We specialize in building scalable web applications and helping businesses modernize their technology stack.',
        category: 'Technology',
        subCategories: ['Web Development', 'Cloud Services', 'API Development'],
        expertise: ['React', 'Node.js', 'Python', 'AWS', 'PostgreSQL', 'Docker', 'Kubernetes'],
        hourlyRate: 150,
        location: 'San Francisco, CA',
        website: 'https://techsolutionsinc.com',
        contactEmail: 'contact@techsolutionsinc.com',
        contactPhone: '+1 (415) 123-4567',
        companySize: '11-50',
        yearsInBusiness: '5-10 years',
        portfolioLinks: [
          'https://techsolutionsinc.com/portfolio/project1',
          'https://techsolutionsinc.com/portfolio/project2',
        ],
        services: [
          'Custom Software Development',
          'Cloud Migration Services',
          'API Development & Integration',
          'Database Design & Optimization',
          'DevOps & Infrastructure',
        ],
        certifications: [
          'AWS Certified Solutions Architect',
          'Google Cloud Professional',
          'Microsoft Azure Developer',
        ],
        projectsCompleted: 25,
        rating: 4.5,
        verified: true,
        createdAt: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString(),
        owner: {
          id: 'owner-1',
          name: 'Michael Chen',
          email: 'michael@techsolutionsinc.com',
        },
      },
      {
        id: 'supplier-2',
        name: 'Design Studio Pro',
        description: 'UI/UX design and branding services. We create beautiful, user-centered designs that help businesses stand out and connect with their audience.',
        category: 'Design',
        subCategories: ['UI Design', 'UX Design', 'Branding'],
        expertise: ['Figma', 'Adobe XD', 'Sketch', 'User Research', 'Prototyping', 'Design Systems'],
        hourlyRate: 100,
        location: 'New York, NY',
        website: 'https://designstudiopro.com',
        contactEmail: 'hello@designstudiopro.com',
        contactPhone: '+1 (212) 456-7890',
        companySize: '11-50',
        yearsInBusiness: '3-5 years',
        portfolioLinks: [
          'https://designstudiopro.com/work/branding',
          'https://designstudiopro.com/work/mobile-app',
          'https://designstudiopro.com/work/web-design',
        ],
        services: [
          'UI/UX Design',
          'Brand Identity Design',
          'Website Design',
          'Mobile App Design',
          'Design Systems Creation',
        ],
        certifications: [
          'Google UX Design Certificate',
          'Adobe Certified Expert',
        ],
        projectsCompleted: 40,
        rating: 4.8,
        verified: true,
        createdAt: new Date(Date.now() - 730 * 24 * 60 * 60 * 1000).toISOString(),
        owner: {
          id: 'owner-2',
          name: 'Sarah Williams',
          email: 'sarah@designstudiopro.com',
        },
      },
      {
        id: 'supplier-3',
        name: 'Marketing Experts',
        description: 'Digital marketing and growth strategies. We help businesses grow their online presence and reach their target audience effectively.',
        category: 'Marketing',
        subCategories: ['Digital Marketing', 'SEO', 'Social Media Marketing'],
        expertise: ['Google Ads', 'Facebook Ads', 'SEO', 'Content Marketing', 'Email Marketing', 'Analytics'],
        hourlyRate: 120,
        location: 'Austin, TX',
        website: 'https://marketingexperts.com',
        contactEmail: 'team@marketingexperts.com',
        contactPhone: '+1 (512) 345-6789',
        companySize: '1-10',
        yearsInBusiness: '1-3 years',
        portfolioLinks: [
          'https://marketingexperts.com/case-study1',
        ],
        services: [
          'Digital Marketing Strategy',
          'Search Engine Optimization',
          'Social Media Management',
          'Content Creation',
          'Email Marketing Campaigns',
        ],
        certifications: [
          'Google Ads Certified',
          'HubSpot Inbound Marketing',
        ],
        projectsCompleted: 18,
        rating: 4.3,
        verified: false,
        createdAt: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString(),
        owner: {
          id: 'owner-3',
          name: 'David Johnson',
          email: 'david@marketingexperts.com',
        },
      },
      {
        id: 'supplier-4',
        name: 'Data Analytics Hub',
        description: 'Business intelligence and data visualization. We transform raw data into actionable insights that drive business decisions.',
        category: 'Data & Analytics',
        subCategories: ['Business Intelligence', 'Data Visualization', 'Predictive Analytics'],
        expertise: ['Power BI', 'Tableau', 'Python', 'R', 'SQL', 'Machine Learning'],
        hourlyRate: 175,
        location: 'Seattle, WA',
        website: 'https://dataanalyticshub.com',
        contactEmail: 'info@dataanalyticshub.com',
        contactPhone: '+1 (206) 567-8901',
        companySize: '11-50',
        yearsInBusiness: '10+ years',
        portfolioLinks: [
          'https://dataanalyticshub.com/portfolio/dashboard1',
          'https://dataanalyticshub.com/portfolio/dashboard2',
        ],
        services: [
          'Business Intelligence Solutions',
          'Data Visualization Dashboards',
          'Predictive Analytics',
          'Data Warehousing',
          'Machine Learning Models',
        ],
        certifications: [
          'AWS Big Data Specialty',
          'Google Data Engineer',
          'Microsoft Power BI',
        ],
        projectsCompleted: 32,
        rating: 4.7,
        verified: true,
        createdAt: new Date(Date.now() - 1095 * 24 * 60 * 60 * 1000).toISOString(),
        owner: {
          id: 'owner-4',
          name: 'Emily Zhang',
          email: 'emily@dataanalyticshub.com',
        },
      },
      {
        id: 'supplier-5',
        name: 'Content Creators',
        description: 'Content writing and creative services. We craft compelling content that engages audiences and drives results.',
        category: 'Content',
        subCategories: ['Content Writing', 'Copywriting', 'Technical Writing'],
        expertise: ['Blog Writing', 'Technical Writing', 'Copywriting', 'SEO Content', 'Editing'],
        hourlyRate: 80,
        location: 'Chicago, IL',
        website: 'https://contentcreators.com',
        contactEmail: 'writers@contentcreators.com',
        contactPhone: '+1 (312) 678-9012',
        companySize: '1-10',
        yearsInBusiness: '3-5 years',
        portfolioLinks: [
          'https://contentcreators.com/samples/blog',
          'https://contentcreators.com/samples/technical',
        ],
        services: [
          'Blog & Article Writing',
          'Website Copy',
          'Technical Documentation',
          'SEO Content Writing',
          'Editing & Proofreading',
        ],
        certifications: [
          'HubSpot Content Marketing',
        ],
        projectsCompleted: 22,
        rating: 4.4,
        verified: true,
        createdAt: new Date(Date.now() - 547 * 24 * 60 * 60 * 1000).toISOString(),
        owner: {
          id: 'owner-5',
          name: 'Rachel Green',
          email: 'rachel@contentcreators.com',
        },
      },
    ]

    const supplier = mockSuppliers.find((s) => s.id === id)

    if (!supplier) {
      return NextResponse.json(
        { success: false, error: 'Supplier not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: { supplier },
    })
  } catch (error: any) {
    console.error('Get supplier error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
