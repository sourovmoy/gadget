# Vercel Deployment - Avoid Project Name Conflict

## Problem
You have an existing project with the same name in Vercel, and it's trying to combine with the other project.

## Solution: Deploy with a Unique Project Name

### Method 1: Via Vercel Dashboard (Recommended)

1. **Go to Vercel Dashboard**
   - Visit: https://vercel.com/new

2. **Import Repository**
   - Click "Import Git Repository"
   - Select: `https://github.com/sourovmoy/gadget`
   - Click "Import"

3. **Configure Project Settings**
   - **Project Name**: Enter a unique name like:
     - `gadget-backend-api`
     - `gadget-api-v2`
     - `sourov-gadget-backend`
     - Or any unique name you prefer
   
   - **Root Directory**: Click "Edit" and set to `backend`
   
   - **Framework Preset**: Select "Other"
   
   - **Build & Output Settings**: Leave as default (Vercel will use vercel.json)

4. **Add Environment Variables**
   Click "Environment Variables" and add:
   
   ```
   JWT_SECRET
   your-super-secret-jwt-key-change-this-to-something-random-and-secure-min-32-chars
   
   FRONTEND_URL
   https://your-app-name.netlify.app
   
   FIREBASE_SERVICE_ACCOUNT_BASE64
   <paste entire content from backend/serviceAccountKey.base64.txt>
   ```

5. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete
   - Copy your deployment URL (e.g., `https://gadget-backend-api.vercel.app`)

---

### Method 2: Via CLI

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy with specific project name**
   ```bash
   vercel --name gadget-backend-api
   ```
   
   Or choose your own unique name:
   ```bash
   vercel --name your-unique-project-name
   ```

4. **When prompted:**
   - "Set up and deploy?" → **Yes**
   - "Which scope?" → Select your account
   - "Link to existing project?" → **No** (create new)
   - "What's your project's name?" → `gadget-backend-api` (or your chosen name)
   - "In which directory is your code located?" → `./` (current directory)

5. **Set environment variables**
   ```bash
   vercel env add JWT_SECRET
   vercel env add FRONTEND_URL
   vercel env add FIREBASE_SERVICE_ACCOUNT_BASE64
   ```

6. **Deploy to production**
   ```bash
   vercel --prod
   ```

---

### Method 3: Delete or Rename Old Project

If you want to use the same name:

1. Go to your Vercel dashboard
2. Find the old project with the same name
3. Go to Settings → General
4. Either:
   - **Rename** the old project to something else
   - **Delete** the old project (if you don't need it)
5. Then deploy the new project with that name

---

## Verify Deployment

After deployment:

1. **Test the API**
   ```bash
   curl https://your-project-name.vercel.app/api/health
   ```
   
   Should return:
   ```json
   {
     "success": true,
     "message": "Server is running",
     "timestamp": "..."
   }
   ```

2. **Check Environment Variables**
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Verify all 3 variables are set

3. **Save Your Backend URL**
   - Copy the URL (e.g., `https://gadget-backend-api.vercel.app`)
   - You'll need this for the frontend deployment

---

## Next: Deploy Frontend to Netlify

Once backend is deployed, update your frontend:

1. Edit `frontend/.env.local`:
   ```
   NEXT_PUBLIC_API_URL=https://your-vercel-backend-url.vercel.app
   ```

2. Follow the Netlify deployment steps in `QUICK_DEPLOY.md`

---

## Troubleshooting

**Still combining with old project?**
- Make sure you selected "No" when asked "Link to existing project?"
- Try using a completely different project name
- Or delete/rename the old project first

**Environment variables not working?**
- Make sure they're set for "Production" environment
- Redeploy after adding variables
- Check for typos in variable names

**CORS errors after deployment?**
- Update `FRONTEND_URL` in Vercel with your actual Netlify URL
- Redeploy the backend
