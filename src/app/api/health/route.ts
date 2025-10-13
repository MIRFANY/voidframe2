import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ 
    success: true, 
    message: 'DPR Assessment API is running',
    timestamp: new Date().toISOString(),
    accounts: [
      { role: 'MDoNER Admin', email: 'mdoner.admin@gov.in', password: 'MDoNER@2025' },
      { role: 'Client User', email: 'client.user@project.in', password: 'Client@2025' }
    ]
  });
}