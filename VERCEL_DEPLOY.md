# Vercel Deployment Guide

## 🚀 Quick Deployment Steps

### 1. Push to GitHub
```bash
git add .
git commit -m "Ready for Vercel deployment"
git push origin master
```

### 2. Connect to Vercel
1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your GitHub repository `MDoNER`
4. Select the `frontend` folder as the root directory

### 3. Set Environment Variables
In the Vercel project settings, add this environment variable:

**Variable Name:** `JWT_SECRET`  
**Value:** `dpr_assessment_system_secret_key_2025`

### 4. Deploy
Click "Deploy" and wait for deployment to complete!

## 🔧 Vercel Configuration

The `vercel.json` file is already configured with:
- API routes with 10-second timeout
- Proper serverless function settings

## 📋 Demo Accounts (Available after deployment)

### MDoNER Administrator
- **Email:** `mdoner.admin@gov.in`
- **Password:** `MDoNER@2025`

### Client User  
- **Email:** `client.user@project.in`
- **Password:** `Client@2025`

## 🌐 After Deployment

1. Visit your deployed URL: `https://your-project.vercel.app`
2. Go to `/login` to test authentication
3. Click either demo account to auto-fill credentials
4. Test both user roles and their respective dashboards

## 🛠️ Troubleshooting

If deployment fails:
1. Check that `JWT_SECRET` environment variable is set
2. Ensure the root directory is set to `frontend`
3. Verify all dependencies are in `package.json`

## ✅ What's Included

- ✅ Frontend React app with Next.js
- ✅ Backend API routes (serverless)
- ✅ Authentication system with JWT
- ✅ Role-based dashboards
- ✅ Professional government UI
- ✅ Mobile responsive design

Your DPR Assessment System is ready for production! 🎉