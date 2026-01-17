# CORS Fix Guide

## Issues Fixed

1. **Enhanced CORS Configuration**: Added explicit CORS headers and methods
2. **Production Environment**: Set NODE_ENV to production for Vercel deployment
3. **Preflight Handling**: Added OPTIONS handler for CORS preflight requests

## Next Steps to Deploy

### 1. Deploy Backend to Vercel

```bash
cd backend
vercel --prod
```

**Important**: Make sure your Vercel project is named correctly and note the deployment URL.

### 2. Update Frontend Environment

After deploying the backend, update `frontend/.env.local` with the correct backend URL:

```env
NEXT_PUBLIC_API_URL=https://your-actual-vercel-backend-url.vercel.app
```

Replace `https://your-actual-vercel-backend-url.vercel.app` with the actual URL from your Vercel deployment.

### 3. Set Vercel Environment Variables

In your Vercel dashboard for the backend project, add these environment variables:

- `JWT_SECRET`: your-super-secret-jwt-key-change-this-to-something-random-and-secure-min-32-chars
- `NODE_ENV`: production
- `FRONTEND_URL`: https://gadgets-products.netlify.app
- `FIREBASE_SERVICE_ACCOUNT_BASE64`: (the base64 encoded service account)

### 4. Redeploy Frontend

After updating the backend URL:

```bash
cd frontend
npm run build
# Deploy to Netlify (or your preferred platform)
```

## Testing the Fix

1. Check if backend is accessible: `https://your-backend-url.vercel.app/api/health`
2. Test CORS by making a request from your frontend domain
3. Verify authentication endpoints work: `/api/auth/verify`
4. Test items endpoint: `/api/items`

## Common Issues

- **404 Errors**: Make sure the Vercel deployment is successful and routes are configured correctly
- **CORS Still Blocked**: Verify the frontend URL matches exactly in the CORS configuration
- **Environment Variables**: Ensure all required env vars are set in Vercel dashboard

## Backend URL Mismatch

The error shows requests to `https://your-vercel-backend.vercel.app` but your frontend is configured for `https://gadget-rust.vercel.app`. Make sure:

1. Your backend is deployed to the correct Vercel project
2. The frontend `.env.local` has the correct backend URL
3. Both URLs match exactly