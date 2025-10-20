# Deployment Checklist ✅

Use this checklist to deploy your website with full ADS integration.

## 📦 Phase 1: Local Setup (15 minutes)

### Files to Create

- [ ] Create directory: `/Users/noelcastro/software/personal_web`
- [ ] Save `index.html` (from artifact)
- [ ] Save `README.md` (from artifact)  
- [ ] Save `.gitignore` (from artifact)
- [ ] Save `netlify.toml` (from artifact)
- [ ] Create directory: `netlify/functions/`
- [ ] Save `netlify/functions/fetch-publications.js` (from artifact)
- [ ] Update `fetchPublications()` in `index.html` (from artifact)

### Verify Local Files

```bash
cd /Users/noelcastro/software/personal_web
ls -la

# You should see:
# ├── .gitignore
# ├── README.md
# ├── index.html
# ├── netlify.toml
# └── netlify/
#     └── functions/
#         └── fetch-publications.js
```

- [ ] All files present
- [ ] Test locally: `open index.html`

## 🔑 Phase 2: Get ADS API Token (5 minutes)

- [ ] Go to https://ui.adsabs.harvard.edu/user/settings/token
- [ ] Log in / Create account
- [ ] Generate new API token
- [ ] Copy token and save securely (you'll need it for Netlify)
- [ ] Test token works: 
  ```bash
  curl -H "Authorization: Bearer YOUR_TOKEN" \
  "https://api.adsabs.harvard.edu/v1/search/query?q=orcid:0000-0002-5870-0443&rows=1"
  ```

## 🐙 Phase 3: GitHub Setup (5 minutes)

- [ ] Initialize git: `git init`
- [ ] Add files: `git add .`
- [ ] Commit: `git commit -m "Initial commit with ADS integration"`
- [ ] Create GitHub repo: `NCastro-Segura.github.io` (or your username)
- [ ] Add remote: `git remote add origin https://github.com/YOUR-USERNAME/YOUR-USERNAME.github.io.git`
- [ ] Push: `git push -u origin main`
- [ ] Verify on GitHub: All files visible

## 🚀 Phase 4: Netlify Deployment (10 minutes)

### Sign Up
- [ ] Go to https://www.netlify.com
- [ ] Click "Sign up with GitHub"
- [ ] Authorize Netlify

### Deploy Site
- [ ] Click "Add new site" → "Import an existing project"
- [ ] Choose "GitHub"
- [ ] Select your repository
- [ ] Keep default settings:
  - Build command: (leave empty)
  - Publish directory: `.`
  - Functions directory: `netlify/functions`
- [ ] Click "Deploy site"
- [ ] Wait for deployment (2-3 minutes)

### Configure Site
- [ ] Site deployed successfully
- [ ] Click "Site settings"
- [ ] Change site name (optional): `noel-castro-segura`
- [ ] Note your URL: `https://YOUR-SITE-NAME.netlify.app`

### Add Environment Variable
- [ ] Go to "Environment variables"
- [ ] Click "Add a variable"
- [ ] Key: `ADS_API_TOKEN`
- [ ] Value: (paste your ADS token)
- [ ] Scopes: (default - all contexts)
- [ ] Click "Save"

### Redeploy
- [ ] Go to "Deploys" tab
- [ ] Click "Trigger deploy" → "Deploy site"
- [ ] Wait for deployment (1-2 minutes)

## ✅ Phase 5: Testing (5 minutes)

### Basic Functionality
- [ ] Visit your Netlify URL
- [ ] Homepage loads correctly
- [ ] Constellation background animates
- [ ] All tabs switch correctly:
  - [ ] Home tab
  - [ ] About tab
  - [ ] Research tab
  - [ ] Publications tab
  - [ ] Contact tab

### ADS Integration
- [ ] Click "Research" tab
- [ ] See "Loading publications from ADS..." message
- [ ] Publications load (wait 3-5 seconds)
- [ ] Real publication data appears
- [ ] Statistics update with real numbers:
  - [ ] Publication count
  - [ ] Citation count
  - [ ] h-index
- [ ] Click "View on ADS" links - they work

### Footer Links
- [ ] ORCID link works
- [ ] GitHub link works
- [ ] CV link shows (even if 404 for now)

### Mobile Responsive
- [ ] Test on phone (or use browser DevTools)
- [ ] Layout adjusts properly
- [ ] All features work on mobile

## 📱 Phase 6: Optional Enhancements

### Add CV
- [ ] Copy CV to repository: `cp ~/path/to/cv.pdf cv.pdf`
- [ ] Commit: `git add cv.pdf && git commit -m "Add CV"`
- [ ] Push: `git push`
- [ ] Netlify auto-deploys
- [ ] Test CV link works

### Add Profile Photo
- [ ] Copy photo: `cp ~/path/to/photo.jpg profile.jpg`
- [ ] Edit `index.html` - replace profile placeholder
- [ ] Commit and push
- [ ] Test photo appears

### Set Up Contact Form
- [ ] Sign up for Formspree: https://formspree.io
- [ ] Create new form
- [ ] Update form action in `index.html`:
  ```html
  <form action="https://formspree.io/f/YOUR-FORM-ID" method="POST">
  ```
- [ ] Commit and push
- [ ] Test contact form

### Custom Domain (Optional)
- [ ] Buy domain
- [ ] In Netlify: Domain settings → Add custom domain
- [ ] Follow DNS instructions
- [ ] Wait for DNS propagation (can take 24 hours)
- [ ] Enable HTTPS (automatic)
- [ ] Test custom domain

## 🐛 Troubleshooting Checklist

### If Publications Don't Load

- [ ] Check browser console for errors (F12)
- [ ] Verify environment variable in Netlify:
  - [ ] Name is exactly `ADS_API_TOKEN`
  - [ ] Token is correct
  - [ ] No extra spaces
- [ ] Check function logs in Netlify:
  - [ ] Go to Functions tab
  - [ ] Click `fetch-publications`
  - [ ] View recent invocations
- [ ] Test function directly:
  - [ ] Visit: `https://YOUR-SITE.netlify.app/.netlify/functions/fetch-publications`
  - [ ] Should see JSON response
- [ ] Test ADS API token directly:
  ```bash
  curl -H "Authorization: Bearer YOUR_TOKEN" \
  "https://api.adsabs.harvard.edu/v1/search/query?q=orcid:0000-0002-5870-0443&rows=1"
  ```

### If Site Doesn't Deploy

- [ ] Check Netlify deploy logs
- [ ] Verify all files pushed to GitHub
- [ ] Check `netlify.toml` syntax
- [ ] Ensure no syntax errors in JavaScript
- [ ] Try manual redeploy

### If CORS Errors Appear

- [ ] You're using Netlify (not GitHub Pages), right?
- [ ] Function is in `netlify/functions/` directory
- [ ] `netlify.toml` file present
- [ ] Function returns proper CORS headers

## 📊 Success Metrics

After completion, you should have:

- ✅ Live website at Netlify URL
- ✅ All content displays correctly
- ✅ Publications auto-load from ADS
- ✅ Real statistics (citations, h-index)
- ✅ No CORS errors
- ✅ Mobile responsive
- ✅ Professional appearance

## 🎉 You're Done!

Your website is now:
- ✅ Live and accessible
- ✅ Automatically updating from ADS
- ✅ Professional and polished
- ✅ Free to host
- ✅ Easy to maintain

## 🔄 Ongoing Maintenance

### To Update Content
```bash
cd /Users/noelcastro/software/personal_web
# Edit files
git add .
git commit -m "Update content"
git push
# Netlify auto-deploys in 2 minutes
```

### Publications Update Automatically
- No action needed!
- They fetch fresh data from ADS each time someone visits

## 📝 Notes

**Time estimate**: 40 minutes total
- Local setup: 15 min
- API token: 5 min
- GitHub: 5 min
- Netlify: 10 min
- Testing: 5 min

**Skill level**: Beginner friendly
- Copy/paste files
- Basic terminal commands
- Point and click setup

**Cost**: $0 (completely free!)

## 🎓 Learning Outcomes

After completing this, you'll understand:
- How to deploy static websites
- How serverless functions work
- How to handle CORS properly
- How to use environment variables securely
- How to integrate external APIs

## 🆘 Getting Help

If stuck at any step:
1. Check the detailed guides in the artifacts
2. Review Netlify function logs
3. Check browser console (F12)
4. Verify all environment variables
5. Test each component individually

## 📞 Support Resources

- **ADS API Issues**: https://github.com/adsabs/adsabs-dev-api/issues
- **Netlify Help**: https://answers.netlify.com/
- **GitHub Help**: https://docs.github.com/

---

✨ Good luck with your deployment! Your professional astronomy website with automatic ADS integration is just 40 minutes away!