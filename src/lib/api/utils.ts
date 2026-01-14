
import { NextResponse } from 'next/server'
import { ZodError } from 'zod'

export class ApiError extends Error {
  statusCode: number
  errors?: any

  constructor(message: string, statusCode: number = 500, errors?: any) {
    super(message)
    this.name = 'ApiError'
    this.statusCode = statusCode
    this.errors = errors
  }
}

export function successResponse(data: any, message?: string, statusCode: number = 200) {
  return NextResponse.json(
    {
      success: true,
      message,
      data,
    },
    { status: statusCode }
  )
}

export function errorResponse(message: string, statusCode: number = 500, errors?: any) {
  return NextResponse.json(
    {
      success: false,
      error: message,
      errors,
    },
    { status: statusCode }
  )
}

export function validationErrorResponse(errors: any) {
  return NextResponse.json(
    {
      success: false,
      error: 'Validation error',
      errors,
    },
    { status: 400 }
  )
}

export function handleApiError(error: unknown) {
  console.error('API Error:', error)

  if (error instanceof ZodError) {
    const formattedErrors = error.errors.map((err: any) => ({
      field: err.path.join('.'),
      message: err.message,
    }))

    return validationErrorResponse(formattedErrors)
  }

  if (error instanceof ApiError) {
    return errorResponse(error.message, error.statusCode, error.errors)
  }

  if (error && typeof error === 'object' && 'code' in error) {
    const prismaError = error as { code: string; meta?: { target?: string } }

    if (prismaError.code === 'P2002') {
      const target = prismaError.meta?.target
      return errorResponse(
        \`\${target} already exists\`,
        409
      )
    }

    if (prismaError.code === 'P2025') {
      return errorResponse('Record not found', 404)
    }
  }

  return errorResponse(
    'An unexpected error occurred',
    500
  )
}

export function withErrorHandler(handler: Function) {
  return async (req: any, res: any, ...args: any[]) => {
    try {
      return await handler(req, res, ...args)
    } catch (error) {
      const errorResponse = handleApiError(error)
      return NextResponse.json(
        {
          success: false,
          error: errorResponse.error,
        },
        { status: errorResponse.statusCode }
      )
    }
  }
}

export function checkRateLimit(identifier: string, limit: number = 100): boolean {
  return true
}

