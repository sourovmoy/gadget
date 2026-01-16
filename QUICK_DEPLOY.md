# Quick Deploy Guide 🚀

## Step 1: Deploy Backend to Vercel

### Option A: Via Vercel Dashboard (Easiest)

1. Go to https://vercel.com/new
2. Import your GitHub repository: `https://github.com/sourovmoy/gadget`
3. Configure project:
   - **Root Directory**: `backend`
   - **Framework Preset**: Other
   - Click "Continue"
4. Add Environment Variables:
   ```
   JWT_SECRET=your-super-secret-jwt-key-change-this-to-something-random-and-secure-min-32-chars
   FRONTEND_URL=https://your-app-name.netlify.app
   FIREBASE_SERVICE_ACCOUNT_BASE64=<paste-from-backend/serviceAccountKey.base64.txt>
   ```
5. Click "Deploy"
6. **Save your Vercel URL** (e.g., `https://gadget-backend.vercel.app`)

### Option B: Via CLI

```bash
cd backend
npm i -g vercel
vercel login
vercel
```

---

## Step 2: Deploy Frontend to Netlify

### Option A: Via Netlify Dashboard (Easiest)

1. Go to https://app.netlify.com/start
2. Connect to GitHub and select your repository
3. Configure build settings:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/.next`
4. Add Environment Variables:
   ```
   NEXT_PUBLIC_API_URL=https://your-vercel-backend.vercel.app
   NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyDe47-j-9lvbbah3qnZHIC3C0nMkWRWTfs
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=sourov-job-task-projects.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=sourov-job-task-projects
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=sourov-job-task-projects.firebasestorage.app
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=466005833276
   NEXT_PUBLIC_FIREBASE_APP_ID=1:466005833276:web:2c9067b2c4bcf2b51bb539
   ```
5. Click "Deploy site"

### Option B: Via CLI

```bash
cd frontend
npm i -g netlify-cli
netlify login
netlify deploy --prod
```

---

## Step 3: Update Backend CORS

1. Go to your Vercel project dashboard
2. Settings > Environment Variables
3. Update `FRONTEND_URL` with your actual Netlify URL
4. Redeploy the backend

---

## Step 4: Test Your Deployment ✅

Visit your Netlify URL and test:
- ✅ Landing page loads
- ✅ Items list displays
- ✅ Login works
- ✅ Add item (protected route)
- ✅ Cart functionality
- ✅ Wishlist functionality

---

## Important Notes

### Firebase Base64 String
- Open `backend/serviceAccountKey.base64.txt`
- Copy the ENTIRE string (it's very long)
- Paste it as the value for `FIREBASE_SERVICE_ACCOUNT_BASE64` in Vercel

### CORS Configuration
- Make sure `FRONTEND_URL` in Vercel matches your Netlify URL exactly
- Include `https://` protocol
- No trailing slash

### Environment Variables
- Backend variables go in **Vercel**
- Frontend variables go in **Netlify**
- All frontend variables must start with `NEXT_PUBLIC_`

---

## Troubleshooting

**CORS Error?**
- Check `FRONTEND_URL` in Vercel matches your Netlify URL
- Redeploy backend after updating

**API Not Working?**
- Check `NEXT_PUBLIC_API_URL` in Netlify points to your Vercel URL
- Redeploy frontend after updating

**Firebase Auth Error?**
- Verify `FIREBASE_SERVICE_ACCOUNT_BASE64` is set correctly in Vercel
- Make sure there are no line breaks in the base64 string

**Build Failed?**
- Check build logs in Vercel/Netlify dashboard
- Verify all dependencies are in package.json
- Make sure Node version is compatible (18+)
