# DPR Quality Assessment System - Unified Deployment

## 🚀 Single Application Deployment (Frontend + Backend)

The authentication backend has been integrated into the Next.js frontend as API routes, making it easy to deploy everything together on Vercel as a single application.

## 📋 Demo Accounts for Judges

### 1. MDoNER Administrator Account
- **Email:** `mdoner.admin@gov.in`
- **Password:** `MDoNER@2025`
- **Role:** Ministry of Development of North Eastern Region Admin
- **Dashboard:** Full administrative access to review, approve, and manage DPR submissions

### 2. Client User Account  
- **Email:** `client.user@project.in`
- **Password:** `Client@2025`
- **Role:** Project Stakeholder/Client
- **Dashboard:** Submit DPR documents, track status, view assessment results

## 🎯 Quick Start (Development)

### Local Development
```bash
cd frontend
npm install
npm run dev
```

**That's it!** The authentication API is now built into the Next.js app.

- Frontend: `http://localhost:3000`
- API Routes: `http://localhost:3000/api/*`

## 🌐 API Routes (Built-in)

- `POST /api/auth/login` - User authentication
- `GET /api/auth/profile` - Get user profile (protected)  
- `GET /api/health` - Health check with account info

## ☁️ Vercel Deployment

### Easy One-Click Deploy
1. Push your code to GitHub
2. Connect your GitHub repo to Vercel
3. Deploy automatically!

### Environment Variables (Vercel Dashboard)
Set this in your Vercel project settings:
```
JWT_SECRET=dpr_assessment_system_secret_key_2025
```

### Deployment Structure
```
frontend/
├── src/app/api/          # Backend API routes (serverless)
│   ├── auth/login/       # Authentication endpoint
│   ├── auth/profile/     # User profile endpoint
│   └── health/           # Health check endpoint
├── src/components/       # React components
├── src/app/             # Next.js pages
└── vercel.json          # Vercel configuration
```

## 🔐 How to Login

1. Visit your deployed app or `http://localhost:3000/login`
2. **Click either demo account box** to auto-fill credentials
3. Click "Sign In" to authenticate
4. Redirected to role-specific dashboard

## 🎨 Features

### Authentication System
- ✅ JWT-based authentication
- 🔒 Secure password hashing with bcrypt
- 🏷️ Role-based access control
- 📱 Session management
- 🛡️ Protected API routes

### User Experience  
- 👆 **Click-to-fill credentials** for judges
- 🎨 **Transparent glass-morphism UI**
- 🌈 **Aurora background animations**
- ✨ **Flickering grid effects**
- 📱 **Fully responsive design**

### Dashboards
- **MDoNER Admin**: Review submissions, risk analysis, policy management
- **Client User**: Submit DPRs, track status, view results

## 📁 Folder Structure Benefits

- ✅ **Single deployment** - Everything in one Next.js app
- ✅ **Serverless API** - Automatic scaling on Vercel
- ✅ **No separate backend** - Simplified architecture
- ✅ **Easy maintenance** - One codebase to manage
- ✅ **Cost effective** - No separate server needed

## 🔧 Development Notes

The backend authentication logic is now in:
- `src/app/api/auth/login/route.ts` - Login endpoint
- `src/app/api/auth/profile/route.ts` - Profile endpoint  
- `src/app/api/health/route.ts` - Health check

All user data is stored in-memory for demo purposes. In production, you'd connect to a database.

---

**Perfect for Vercel deployment!** 🚀 The entire application (frontend + backend) can now be deployed as a single Next.js application.