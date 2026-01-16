# Deployment Guide

## Backend Deployment (Vercel)

### Prerequisites
- Vercel account (https://vercel.com)
- Vercel CLI installed: `npm i -g vercel`

### Steps

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy to Vercel**
   ```bash
   vercel --name gadget-backend-api
   ```
   - Follow the prompts
   - Use project name: `gadget-backend-api` (or choose a unique name)
   - Vercel will automatically detect the configuration from `vercel.json`

4. **Set Environment Variables in Vercel Dashboard**
   
   Go to your project settings on Vercel and add these environment variables:
   
   ```
   JWT_SECRET=your-super-secret-jwt-key-change-this-to-something-random-and-secure-min-32-chars
   NODE_ENV=production
   FRONTEND_URL=https://your-netlify-app.netlify.app
   FIREBASE_SERVICE_ACCOUNT_BASE64=<your-base64-string-from-serviceAccountKey.base64.txt>
   ```

   **Important:** Copy the entire base64 string from `backend/serviceAccountKey.base64.txt`

5. **Get your backend URL**
   - After deployment, Vercel will provide a URL like: `https://your-app.vercel.app`
   - Save this URL for frontend configuration

---

## Frontend Deployment (Netlify)

### Prerequisites
- Netlify account (https://netlify.com)
- Netlify CLI installed: `npm i -g netlify-cli`

### Steps

1. **Update Frontend Environment Variables**
   
   Edit `frontend/.env.local` and update the API URL:
   ```
   NEXT_PUBLIC_API_URL=https://your-vercel-backend.vercel.app
   ```
   
   Keep all Firebase config variables as they are.

2. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

3. **Build the project locally (optional test)**
   ```bash
   npm run build
   ```

4. **Login to Netlify**
   ```bash
   netlify login
   ```

5. **Deploy to Netlify**
   ```bash
   netlify deploy --prod
   ```
   - Follow the prompts
   - Select "Create & configure a new site" or choose existing site
   - Build command: `npm run build`
   - Publish directory: `.next`

6. **Set Environment Variables in Netlify Dashboard**
   
   Go to Site settings > Environment variables and add:
   
   ```
   NEXT_PUBLIC_API_URL=https://your-vercel-backend.vercel.app
   NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyDe47-j-9lvbbah3qnZHIC3C0nMkWRWTfs
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=sourov-job-task-projects.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=sourov-job-task-projects
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=sourov-job-task-projects.firebasestorage.app
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=466005833276
   NEXT_PUBLIC_FIREBASE_APP_ID=1:466005833276:web:2c9067b2c4bcf2b51bb539
   ```

7. **Trigger a new deployment** (if needed)
   - Netlify will automatically rebuild with the new environment variables

---

## Alternative: Deploy via Git (Recommended)

### Backend (Vercel)

1. Push your code to GitHub (already done)
2. Go to https://vercel.com/new
3. Import your GitHub repository
4. Select the `backend` folder as the root directory
5. Add environment variables in the dashboard
6. Deploy

### Frontend (Netlify)

1. Go to https://app.netlify.com/start
2. Connect to your GitHub repository
3. Configure build settings:
   - Base directory: `frontend`
   - Build command: `npm run build`
   - Publish directory: `frontend/.next`
4. Add environment variables in the dashboard
5. Deploy

---

## Post-Deployment

### Update CORS Settings

After deploying frontend, update the backend CORS configuration:

1. Go to Vercel dashboard
2. Update `FRONTEND_URL` environment variable with your Netlify URL
3. Redeploy the backend

### Test Your Deployment

1. Visit your Netlify URL
2. Test public pages (landing, items list)
3. Test authentication (login)
4. Test protected routes (add item)
5. Test cart and wishlist functionality

---

## Troubleshooting

### Backend Issues
- Check Vercel logs for errors
- Verify all environment variables are set correctly
- Ensure FIREBASE_SERVICE_ACCOUNT_BASE64 is properly formatted (no line breaks)

### Frontend Issues
- Check Netlify deploy logs
- Verify NEXT_PUBLIC_API_URL points to your Vercel backend
- Check browser console for CORS errors
- Ensure all Firebase config variables are set

### CORS Errors
- Make sure FRONTEND_URL in backend matches your Netlify URL exactly
- Include protocol (https://) in the URL
- Redeploy backend after updating FRONTEND_URL

---

## Environment Variables Summary

### Backend (Vercel)
```
JWT_SECRET=<your-secret-key>
NODE_ENV=production
FRONTEND_URL=<your-netlify-url>
FIREBASE_SERVICE_ACCOUNT_BASE64=<base64-string>
```

### Frontend (Netlify)
```
NEXT_PUBLIC_API_URL=<your-vercel-url>
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyDe47-j-9lvbbah3qnZHIC3C0nMkWRWTfs
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=sourov-job-task-projects.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=sourov-job-task-projects
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=sourov-job-task-projects.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=466005833276
NEXT_PUBLIC_FIREBASE_APP_ID=1:466005833276:web:2c9067b2c4bcf2b51bb539
```
