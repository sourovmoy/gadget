# ✅ Ready to Deploy Checklist

## Build Status: SUCCESS ✅

Your frontend has been successfully built and is ready for deployment!

```
Route (app)                                 Size  First Load JS 
┌ ○ /                                      162 B         106 kB 
├ ○ /add-item                            1.96 kB         125 kB 
├ ○ /cart                                2.05 kB         113 kB 
├ ○ /items                               1.38 kB         133 kB 
├ ƒ /items/[id]                          2.31 kB         134 kB 
├ ○ /login                                  2 kB         158 kB 
└ ○ /wishlist                            1.74 kB         113 kB 
```

---

## Deployment Steps

### 1️⃣ Deploy Backend to Vercel

**Via Dashboard (Recommended):**

1. Go to: https://vercel.com/new
2. Import: `https://github.com/sourovmoy/gadget`
3. Configure:
   - **Project Name**: `gadget-backend-api` (or your unique name)
   - **Root Directory**: `backend`
   - **Framework**: Other
4. Add Environment Variables:
   ```
   JWT_SECRET=your-super-secret-jwt-key-change-this-to-something-random-and-secure-min-32-chars
   
   FRONTEND_URL=https://your-app.netlify.app
   
   FIREBASE_SERVICE_ACCOUNT_BASE64=<paste from backend/serviceAccountKey.base64.txt>
   ```
5. Click **Deploy**
6. **Save your Vercel URL** → You'll need it for frontend!

**Via CLI:**
```bash
cd backend
vercel login
vercel --name gadget-backend-api
```

---

### 2️⃣ Deploy Frontend to Netlify

**Via Dashboard (Recommended):**

1. Go to: https://app.netlify.com/start
2. Connect to GitHub: `https://github.com/sourovmoy/gadget`
3. Configure:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/.next`
4. Add Environment Variables:
   ```
   NEXT_PUBLIC_API_URL=<your-vercel-backend-url>
   NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyDe47-j-9lvbbah3qnZHIC3C0nMkWRWTfs
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=sourov-job-task-projects.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=sourov-job-task-projects
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=sourov-job-task-projects.firebasestorage.app
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=466005833276
   NEXT_PUBLIC_FIREBASE_APP_ID=1:466005833276:web:2c9067b2c4bcf2b51bb539
   ```
5. Click **Deploy site**

**Via CLI:**
```bash
cd frontend
netlify login
netlify deploy --prod
```

---

### 3️⃣ Update Backend CORS

After frontend is deployed:

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Update `FRONTEND_URL` with your actual Netlify URL
3. Redeploy backend (or it will auto-redeploy)

---

## Important Notes

### Firebase Base64 String
- Open: `backend/serviceAccountKey.base64.txt`
- Copy the **ENTIRE** string (it's very long, one line)
- Paste as `FIREBASE_SERVICE_ACCOUNT_BASE64` in Vercel

### CORS Configuration
- `FRONTEND_URL` in Vercel must match your Netlify URL exactly
- Include `https://` protocol
- No trailing slash
- Example: `https://gadget-app.netlify.app`

### API URL
- After backend deploys, copy the Vercel URL
- Use it as `NEXT_PUBLIC_API_URL` in Netlify
- Example: `https://gadget-backend-api.vercel.app`

---

## Test Your Deployment

After both are deployed, test:

✅ Landing page loads  
✅ Items list displays  
✅ Item details page works  
✅ Login/Register works  
✅ Add item (protected route)  
✅ Cart functionality  
✅ Wishlist functionality  

---

## Troubleshooting

### CORS Error
- Check `FRONTEND_URL` in Vercel matches Netlify URL
- Redeploy backend after updating

### API Not Working
- Check `NEXT_PUBLIC_API_URL` in Netlify points to Vercel URL
- Redeploy frontend after updating

### Firebase Auth Error
- Verify `FIREBASE_SERVICE_ACCOUNT_BASE64` is set in Vercel
- Make sure there are no line breaks in the base64 string

### Build Failed
- Check build logs in dashboard
- Verify all dependencies are in package.json
- Ensure Node version is 18+

---

## Quick Links

- **GitHub Repo**: https://github.com/sourovmoy/gadget
- **Vercel Dashboard**: https://vercel.com/dashboard
- **Netlify Dashboard**: https://app.netlify.com
- **Firebase Console**: https://console.firebase.google.com

---

## Files Reference

- `VERCEL_DEPLOY_STEPS.md` - Detailed Vercel deployment guide
- `QUICK_DEPLOY.md` - Quick deployment instructions
- `DEPLOYMENT.md` - Complete deployment documentation
- `backend/serviceAccountKey.base64.txt` - Firebase credentials for Vercel

---

## Your Project is Ready! 🚀

Everything is configured and tested. Just follow the steps above to deploy!
