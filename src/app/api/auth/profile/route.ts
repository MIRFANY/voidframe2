import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

// Predefined user accounts
const users = [
  {
    id: 1,
    email: 'mdoner.admin@gov.in',
    role: 'mdoner',
    name: 'MDoNER Administrator',
    department: 'Ministry of Development of North Eastern Region'
  },
  {
    id: 2,
    email: 'client.user@project.in',
    role: 'client',
    name: 'Project Client',
    department: 'Project Stakeholder'
  }
];

const JWT_SECRET = process.env.JWT_SECRET || 'dpr_assessment_system_secret_key_2025';

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Access token required' 
        },
        { status: 401 }
      );
    }

    let decoded: { userId: number; email: string; role: string };
    try {
      decoded = jwt.verify(token, JWT_SECRET) as { userId: number; email: string; role: string };
    } catch {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Invalid or expired token' 
        },
        { status: 403 }
      );
    }

    const user = users.find(u => u.id === decoded.userId);
    if (!user) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'User not found' 
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        department: user.department
      }
    });

  } catch (error) {
    console.error('Profile error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Internal server error' 
      },
      { status: 500 }
    );
  }
}