# Deployment Guide - ValueNet Associate (VNP Ltd)

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Vercel account
- Gemini API Key from [Google AI Studio](https://aistudio.google.com/app/apikey)

## Local Development Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Set Environment Variables**
   - Copy `.env.local` and add your Gemini API key:
   ```bash
   GEMINI_API_KEY=your_actual_gemini_api_key_here
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```
   - Access at: `http://localhost:3000`

4. **Build for Production**
   ```bash
   npm run build
   ```

5. **Preview Production Build**
   ```bash
   npm run preview
   ```

## Vercel Deployment

### Option 1: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```
   - Follow the prompts
   - On first deployment, it will create a new project

4. **Add Environment Variable**
   ```bash
   vercel env add GEMINI_API_KEY
   ```
   - Select "Production" environment
   - Paste your Gemini API key

5. **Deploy to Production**
   ```bash
   vercel --prod
   ```

### Option 2: Deploy via Vercel Dashboard

1. **Push to GitHub**
   - Create a new repository on GitHub
   - Push your code:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/your-username/valuenet.git
   git push -u origin main
   ```

2. **Import to Vercel**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New Project"
   - Import your GitHub repository

3. **Configure Project**
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

4. **Add Environment Variables**
   - In project settings → Environment Variables
   - Add: `GEMINI_API_KEY` = your API key
   - Apply to: Production, Preview, Development

5. **Deploy**
   - Click "Deploy"
   - Wait for build to complete

## Post-Deployment

### Custom Domain (Optional)
1. Go to Project Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions

### Environment Variables Management
- Access via: Project Settings → Environment Variables
- Update `GEMINI_API_KEY` if needed
- Redeploy after changes

### Monitoring
- Check deployment logs in Vercel Dashboard
- Monitor performance via Vercel Analytics
- Set up error tracking (optional)

## Important Notes

1. **API Key Security**
   - Never commit `.env.local` to Git
   - Use Vercel's environment variables for production
   - Rotate API keys periodically

2. **Google Fonts**
   - Now loaded locally via `@fontsource` packages
   - No external CDN dependencies

3. **Caching Strategy**
   - Static assets cached for 1 year
   - HTML files served fresh

4. **Security Headers**
   - Configured in `vercel.json`
   - Includes XSS protection, frame options, etc.

5. **SPA Routing**
   - All routes redirect to `index.html`
   - Client-side routing handled by React

## Troubleshooting

### Build Fails
- Check Node.js version (should be v18+)
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Check build logs for specific errors

### API Not Working
- Verify `GEMINI_API_KEY` is set correctly in Vercel
- Check API key has proper permissions in Google AI Studio
- Redeploy after adding environment variables

### Fonts Not Loading
- Ensure `@fontsource` packages are installed
- Check browser console for errors
- Clear browser cache

## Support

For issues or questions, contact VNP technical team.
