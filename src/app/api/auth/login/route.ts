import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


// Predefined user accounts
const users = [
  {
    id: 1,
    email: 'mdoner.admin@gov.in',
    password: '$2b$10$iL/iLWeWhTVzb/unmhfOCuXfOQ3Apt7jDY5toXjgpdxRagMDcPyWW', // MDoNER@2025
    role: 'mdoner',
    name: 'MDoNER Administrator',
    department: 'Ministry of Development of North Eastern Region'
  },
  {
    id: 2,
    email: 'client.user@project.in',
    password: '$2b$10$yu4IJL6J7QxMUPLzo2VzmuuGMlHZjA/p03m671u2FHV5QZ/SOPGU.', // Client@2025
    role: 'client',
    name: 'Project Client',
    department: 'Project Stakeholder'
  }
];

const JWT_SECRET = process.env.JWT_SECRET || 'dpr_assessment_system_secret_key_2025';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Find user by email
    const user = users.find(u => u.email === email);
    if (!user) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Invalid email or password' 
        },
        { status: 401 }
      );
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Invalid email or password' 
        },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: user.id, 
        email: user.email, 
        role: user.role 
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    return NextResponse.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        department: user.department
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Internal server error' 
      },
      { status: 500 }
    );
  }
}