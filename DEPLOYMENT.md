# Deployment Guide

This guide will help you deploy your TaskMaster app to various hosting platforms.

## Prerequisites

Before deploying, make sure:
1. ✅ Supabase project is set up
2. ✅ Database tables are created
3. ✅ `js/supabase.js` has your correct credentials
4. ✅ App works locally

---

## Option 1: Netlify (Recommended - Easiest)

### Method A: Drag and Drop (Easiest)

1. Go to [netlify.com](https://netlify.com)
2. Sign up or log in
3. Click "Add new site" > "Deploy manually"
4. Drag and drop your `todo-wub` folder
5. Wait for deployment (takes ~30 seconds)
6. Your site is live! 🎉

### Method B: GitHub Integration

1. Push your code to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

2. Go to [netlify.com](https://netlify.com)
3. Click "Add new site" > "Import an existing project"
4. Connect to GitHub
5. Select your repository
6. Click "Deploy site"

**Custom Domain**: 
- Go to Site settings > Domain management
- Add your custom domain

---

## Option 2: Vercel

### Deploy via CLI

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
cd todo-wub
vercel
```

3. Follow the prompts:
   - Set up and deploy? `Y`
   - Which scope? (choose your account)
   - Link to existing project? `N`
   - Project name? `taskmaster` (or your choice)
   - Directory? `./`
   - Override settings? `N`

4. Your site is live! 🎉

### Deploy via GitHub

1. Push code to GitHub (see above)
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Click "Deploy"

---

## Option 3: GitHub Pages

### Setup

1. Push your code to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

2. Go to your repository on GitHub
3. Click "Settings"
4. Scroll to "Pages" section
5. Under "Source", select:
   - Branch: `main`
   - Folder: `/ (root)`
6. Click "Save"
7. Wait 1-2 minutes
8. Your site will be at: `https://YOUR_USERNAME.github.io/REPO_NAME/`

**Note**: GitHub Pages may take a few minutes to go live.

---

## Option 4: Firebase Hosting

### Setup

1. Install Firebase CLI:
```bash
npm install -g firebase-tools
```

2. Login to Firebase:
```bash
firebase login
```

3. Initialize Firebase:
```bash
cd todo-wub
firebase init hosting
```

4. Configure:
   - Use an existing project or create new one
   - Public directory: `.` (current directory)
   - Single-page app: `No`
   - Overwrite index.html: `No`

5. Deploy:
```bash
firebase deploy
```

6. Your site is live at the provided URL! 🎉

---

## Option 5: Cloudflare Pages

1. Push your code to GitHub (see above)
2. Go to [pages.cloudflare.com](https://pages.cloudflare.com)
3. Sign up or log in
4. Click "Create a project"
5. Connect to GitHub
6. Select your repository
7. Configure:
   - Build command: (leave empty)
   - Build output directory: `/`
8. Click "Save and Deploy"

---

## Option 6: Traditional Web Hosting (cPanel, etc.)

If you have traditional web hosting:

1. **Prepare files**:
   - Ensure all files are ready
   - Verify `js/supabase.js` has correct credentials

2. **Upload via FTP**:
   - Use FileZilla or similar FTP client
   - Connect to your hosting
   - Upload all files to `public_html` or `www` folder

3. **Or use cPanel File Manager**:
   - Login to cPanel
   - Open File Manager
   - Navigate to `public_html`
   - Upload all files
   - Extract if uploaded as ZIP

4. **Access your site**:
   - Visit `yourdomain.com`
   - If in subfolder: `yourdomain.com/taskmaster`

---

## Post-Deployment Checklist

After deploying, verify:

- [ ] Site loads correctly
- [ ] Login/Register works
- [ ] Can create tasks
- [ ] Can edit tasks
- [ ] Can delete tasks
- [ ] Dashboard shows correct stats
- [ ] Calendar displays properly
- [ ] Search functionality works
- [ ] Filters work correctly
- [ ] Drag-and-drop functions
- [ ] Daily reminder appears
- [ ] Archive works
- [ ] All images/icons load

---

## Troubleshooting

### "Invalid API key" error after deployment
- The Supabase credentials in `js/supabase.js` are incorrect
- Make sure you committed the correct file with credentials
- Redeploy after fixing

### Site loads but features don't work
- Check browser console (F12) for errors
- Verify all JavaScript files are loading
- Check for CORS issues (shouldn't be a problem with Supabase)

### Database operations fail
- Verify Row Level Security policies are set up in Supabase
- Check that all tables exist
- Ensure the Supabase project is not paused

### CSS/JS not loading
- Clear browser cache
- Check file paths are correct
- Verify all files were uploaded
- Check for case-sensitivity in filenames

---

## Custom Domain Setup

### Netlify
1. Site settings > Domain management
2. Click "Add custom domain"
3. Enter your domain
4. Follow DNS configuration instructions

### Vercel
1. Project settings > Domains
2. Add your domain
3. Configure DNS as instructed

### GitHub Pages
1. Settings > Pages
2. Add custom domain
3. Create CNAME record pointing to GitHub

### General DNS Settings
- Add A record or CNAME as instructed by platform
- Wait for DNS propagation (can take up to 48 hours)
- Enable SSL/HTTPS (usually automatic)

---

## Performance Optimization

### Before Deployment
1. **Minify CSS** (optional):
```bash
# Using online tools or:
npm install -g clean-css-cli
cleancss -o style.min.css style.css
```

2. **Minify JavaScript** (optional):
```bash
npm install -g uglify-js
uglifyjs app.js -o app.min.js
```

3. **Enable caching**: Most platforms do this automatically

### After Deployment
- Enable CDN (Cloudflare, etc.)
- Enable gzip compression
- Use browser caching
- Monitor with Google PageSpeed Insights

---

## Environment-Specific Configuration

If you want different Supabase projects for dev/production:

1. Create separate Supabase projects
2. Before deploying, update `js/supabase.js` with production credentials
3. Keep development credentials in a separate file (not committed)

---

## Continuous Deployment

### Auto-deploy on Git push

Most platforms (Netlify, Vercel, Cloudflare Pages) support automatic deployment:

1. Connect your Git repository
2. Every push to main branch triggers deployment
3. Preview deployments for pull requests
4. Rollback feature if something breaks

---

## Security Considerations

Before deploying to production:

1. **Enable email confirmation** in Supabase:
   - Authentication > Settings
   - Enable "Email confirmations"

2. **Set up proper RLS policies**: Already done in setup

3. **Use environment variables** (advanced):
   - Store credentials separately
   - Use build-time injection

4. **Add rate limiting**: Supabase has this built-in

5. **Monitor usage**: Check Supabase dashboard regularly

---

## Cost Considerations

### Free Tiers (as of 2024)

- **Netlify**: 100GB bandwidth, unlimited sites
- **Vercel**: Unlimited personal projects
- **GitHub Pages**: Free for public repos
- **Cloudflare Pages**: Unlimited requests
- **Firebase**: 10GB storage, 360MB/day transfer
- **Supabase**: 500MB database, 50,000 monthly active users

All free tiers are sufficient for personal/student use!

---

## Monitoring & Analytics

### Add Google Analytics (optional)

Add to `<head>` in both HTML files:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=YOUR_GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'YOUR_GA_ID');
</script>
```

### Supabase Monitoring
- Check Database usage
- Monitor API requests
- View authentication stats
- Check for errors in logs

---

## Maintenance

### Regular Tasks
- [ ] Backup database monthly
- [ ] Update dependencies (if using npm)
- [ ] Check for Supabase updates
- [ ] Monitor user feedback
- [ ] Review analytics

### Updating the App
1. Make changes locally
2. Test thoroughly
3. Commit to Git
4. Push to repository
5. Platform auto-deploys (if connected)

---

## Need Help?

- **Netlify**: [docs.netlify.com](https://docs.netlify.com)
- **Vercel**: [vercel.com/docs](https://vercel.com/docs)
- **GitHub Pages**: [docs.github.com/pages](https://docs.github.com/pages)
- **Supabase**: [supabase.com/docs](https://supabase.com/docs)

---

**Your app is now live and accessible to the world! 🚀**

