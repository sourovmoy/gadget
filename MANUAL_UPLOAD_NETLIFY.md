# Manual Upload to Netlify - Step by Step

## ⚠️ Important Note
Manual upload works but has limitations:
- No automatic updates when you push to GitHub
- Environment variables need special handling
- You'll need to manually upload every time you make changes

**Recommended: Use GitHub deployment instead** (see QUICK_DEPLOY.md)

---

## Option 1: Drag & Drop Upload (Easiest)

### Step 1: Locate the Build Folder
The build is already complete! The folder you need is:
```
frontend/.next
```

### Step 2: Upload to Netlify
1. Go to: **https://app.netlify.com/drop**
2. **Drag and drop** the entire `frontend/.next` folder onto the page
3. Wait for upload to complete
4. Netlify will give you a URL like: `https://random-name-123456.netlify.app`

### Step 3: Configure Environment Variables (Important!)
Since you uploaded manually, environment variables won't work automatically.

**You have 2 options:**

#### Option A: Update .env.local and Rebuild
1. Edit `frontend/.env.local` with your production values:
   ```
   NEXT_PUBLIC_API_URL=https://your-vercel-backend.vercel.app
   NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyDe47-j-9lvbbah3qnZHIC3C0nMkWRWTfs
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=sourov-job-task-projects.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=sourov-job-task-projects
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=sourov-job-task-projects.firebasestorage.app
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=466005833276
   NEXT_PUBLIC_FIREBASE_APP_ID=1:466005833276:web:2c9067b2c4bcf2b51bb539
   ```
2. Rebuild:
   ```bash
   cd frontend
   npm run build
   ```
3. Upload the new `.next` folder again

#### Option B: Claim the Site and Add Variables
1. In Netlify, click "Claim this site"
2. Go to Site settings > Environment variables
3. Add all the variables
4. Redeploy (but this requires GitHub connection)

---

## Option 2: Netlify CLI Upload

### Step 1: Install Netlify CLI
```bash
npm install -g netlify-cli
```

### Step 2: Login
```bash
netlify login
```

### Step 3: Deploy
```bash
cd frontend
netlify deploy --dir=.next --prod
```

Follow the prompts:
- Create new site or link existing
- Choose your team
- Enter site name (optional)

### Step 4: Set Environment Variables
```bash
netlify env:set NEXT_PUBLIC_API_URL "https://your-vercel-backend.vercel.app"
netlify env:set NEXT_PUBLIC_FIREBASE_API_KEY "AIzaSyDe47-j-9lvbbah3qnZHIC3C0nMkWRWTfs"
netlify env:set NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN "sourov-job-task-projects.firebaseapp.com"
netlify env:set NEXT_PUBLIC_FIREBASE_PROJECT_ID "sourov-job-task-projects"
netlify env:set NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET "sourov-job-task-projects.firebasestorage.app"
netlify env:set NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID "466005833276"
netlify env:set NEXT_PUBLIC_FIREBASE_APP_ID "1:466005833276:web:2c9067b2c4bcf2b51bb539"
```

---

## What to Upload

### ✅ Upload This Folder:
```
frontend/.next/
```

This folder contains:
- All compiled pages
- Static assets
- JavaScript bundles
- Everything needed to run your app

### ❌ Don't Upload:
- `frontend/node_modules/` (too large, not needed)
- `frontend/app/` (source code, not needed)
- `frontend/components/` (source code, not needed)
- Individual files (upload the whole `.next` folder)

---

## File Structure You're Uploading

```
.next/
├── static/          (CSS, JS, images)
├── server/          (Server-side code)
├── BUILD_ID         (Build identifier)
└── ...other files
```

---

## After Upload - Test Your Site

Visit your Netlify URL and test:
- ✅ Landing page loads
- ✅ Items list displays
- ✅ Login works
- ✅ Add item (protected route)
- ✅ Cart functionality
- ✅ Wishlist functionality

---

## Troubleshooting

### 404 Errors on Routes
- Make sure you uploaded the entire `.next` folder, not just contents
- Check that `_redirects` file is in the `.next` folder

### API Not Working
- Check if `NEXT_PUBLIC_API_URL` is set correctly
- Make sure your backend is deployed and running
- Check browser console for CORS errors

### Images Not Loading
- This is normal for manual upload
- Images are optimized and should still work with `unoptimized: true`

### Need to Update?
- Make changes to your code
- Run `npm run build` again
- Upload the new `.next` folder
- Old deployment will be replaced

---

## Better Alternative: GitHub Deployment

Instead of manual upload, connect to GitHub:

1. Go to: https://app.netlify.com/start
2. Connect your GitHub repo
3. Set base directory: `frontend`
4. Netlify will auto-deploy on every push
5. Environment variables work properly
6. Get preview deployments for PRs

**This is much easier for ongoing development!**

---

## Quick Commands Reference

```bash
# Build the project
cd frontend
npm run build

# Upload via CLI
netlify deploy --dir=.next --prod

# Set environment variable
netlify env:set VARIABLE_NAME "value"

# Check deployment status
netlify status
```

---

## Your Build is Ready! 🚀

The `.next` folder is in: `C:\Assigment\job-task-assignment\frontend\.next`

Just drag and drop it to: https://app.netlify.com/drop
