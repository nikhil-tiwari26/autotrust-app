# AutoTrust Deployment Checklist

## Pre-Deployment Security & Configuration

### 1. Environment Variables ✅
- [ ] Backend: Copy `.env.production` and update all credentials securely
- [ ] Frontend: Update `VITE_API_URL` to your deployed backend domain
- [ ] Generate new JWT_SECRET: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
- [ ] Regenerate Cloudinary API keys from dashboard
- [ ] Update MongoDB connection string to production instance

### 2. Database Preparation
- [ ] Create MongoDB Atlas cluster (or keep existing if production-ready)
- [ ] Create admin user: `npm run seed` (or `node seed.js`)
- [ ] Backup current database
- [ ] Test all database queries work correctly

### 3. Code Verification
- [ ] Run: `npm test` (if tests exist)
- [ ] Check for console.log statements in production code
- [ ] Verify all error handlers are in place
- [ ] Test error responses return proper messages (no stack traces)

### 4. API Security
- [ ] Rate limiting is enabled for: auth, AI, uploads, general API ✅
- [ ] Input validation enabled on all routes ✅
- [ ] CORS is properly configured (specific origin, not *)
- [ ] JWT tokens have expiration (7 days) ✅
- [ ] Password hashing with bcrypt ✅
- [ ] No sensitive data in logs

### 5. Image Uploads
- [ ] Cloudinary account created and configured
- [ ] Upload folder created: `autotrust/listings`
- [ ] File size limits set (6 images max, 10MB total)
- [ ] Allowed formats: jpg, jpeg, png, webp only ✅

### 6. AI Provider Setup
- [ ] Use OpenRouter (free) for AI requests
- [ ] Obtain OpenRouter API key and add to .env.production
- [ ] Test AI endpoints return proper JSON responses
- [ ] Verify mock data fallback works if API fails

### 7. Frontend Optimization
- [ ] Run: `npm run build` (check for errors)
- [ ] Verify bundle size is reasonable
- [ ] Test responsive design on mobile
- [ ] Check all links point to correct URLs
- [ ] Remove console.log statements
- [ ] Update favicon and meta tags

### 8. Deployment Platforms

#### Option A: Render (Backend)
- [ ] Create account at render.com
- [ ] Connect GitHub repo
- [ ] Set environment variables in Render dashboard
- [ ] Deploy and test health check endpoint
- [ ] Monitor logs for errors

#### Option B: Alternative (Railway, Heroku, etc.)
- [ ] Follow respective platform's Node.js deployment guide
- [ ] Ensure build command: `npm install`
- [ ] Ensure start command: `node server.js`

#### Frontend: Vercel
- [ ] Connect GitHub repo to Vercel
- [ ] Set environment variables in Vercel dashboard
- [ ] Deploy and test all pages
- [ ] Verify API calls go to correct backend URL

### 9. Post-Deployment Testing
- [ ] Test user registration
- [ ] Test user login
- [ ] Test vehicle lookup (with mock data or real API Setu)
- [ ] Test AI risk score generation
- [ ] Test listing creation with image uploads
- [ ] Test admin approval workflows
- [ ] Test pagination and filtering
- [ ] Check performance (load time < 3s)
- [ ] Test on mobile devices
- [ ] Verify error messages don't expose system details

### 10. SSL/HTTPS
- [ ] Force HTTPS redirect (Render/Vercel handle this automatically)
- [ ] Test all external links use HTTPS
- [ ] Verify SSL certificate is valid

### 11. Monitoring & Logging
- [ ] Set up error monitoring (optional: Sentry)
- [ ] Enable backend logging for failed requests
- [ ] Create admin alerts for critical errors
- [ ] Monitor database performance
- [ ] Track API response times

### 12. Backup & Recovery
- [ ] Set up daily database backups
- [ ] Document recovery procedures
- [ ] Test backup restoration
- [ ] Keep database credentials in secure vault

### 13. Documentation
- [ ] Update README with production deployment steps
- [ ] Document API endpoints (if shared)
- [ ] Create admin user guide
- [ ] Document troubleshooting steps

## Deployment Commands

```bash
# Backend
cd server
npm install --legacy-peer-deps
npm run dev          # Test locally first
npm start            # Production start

# Frontend  
cd client
npm install
npm run build        # Generate optimized build
npm run preview      # Preview production build locally
```

## Important Notes
- Always test locally before deploying to production
- Use separate MongoDB instances for dev and production
- Never commit `.env` files to Git
- Keep all API keys and secrets in environment variables only
- Monitor error logs daily for first week after deployment
- Set up automated backups immediately after going live

## Critical Fixes Applied ✅
- Fixed hardcoded PORT (now uses process.env.PORT)
- Fixed route ordering (/:id no longer matches /my)
- Added input validation on all endpoints
- Added rate limiting to prevent abuse
- Completed incomplete functions
- Added production environment configuration
