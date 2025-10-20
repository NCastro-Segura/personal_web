# ADS API Integration Guide with CORS Handling

This guide will help you set up automatic publication fetching from NASA ADS with proper CORS handling.

## 🎯 Solution Overview

We'll use **Netlify** to host your site (instead of GitHub Pages) because:
- ✅ Free serverless functions (handles CORS)
- ✅ Automatic deployments from GitHub
- ✅ Free SSL certificates
- ✅ Custom domain support
- ✅ No CORS issues!

## 📋 Prerequisites

1. GitHub account (you have this)
2. Netlify account (free - sign up with GitHub)
3. ADS API token (free - we'll get this)

## 🚀 Step-by-Step Setup

### Step 1: Get Your ADS API Token

1. Go to [ADS Account Settings](https://ui.adsabs.harvard.edu/user/settings/token)
2. Log in (or create account if needed)
3. Click **"Generate a new key"**
4. Copy the token (looks like: `aBc123dEf456...`)
5. **SAVE THIS TOKEN** - you'll need it later

### Step 2: Set Up Your Repository Structure

```bash
cd /Users/noelcastro/software/personal_web

# Create Netlify functions directory
mkdir -p netlify/functions

# Your structure should look like:
# personal_web/
# ├── index.html
# ├── README.md
# ├── .gitignore
# ├── netlify.toml
# └── netlify/
#     └── functions/
#         └── fetch-publications.js
```

### Step 3: Add Netlify Files

Create these two new files:

**File 1: `netlify.toml`** (copy from the artifact above)

**File 2: `netlify/functions/fetch-publications.js`** (copy from the artifact above)

```bash
# Create the function file
mkdir -p netlify/functions
nano netlify/functions/fetch-publications.js
# Paste the content from the artifact

# Create Netlify config
nano netlify.toml
# Paste the content from the artifact
```

### Step 4: Update Your index.html

Replace the `fetchPublications` function in your `index.html` with the updated version from the "Updated JavaScript for ADS Integration" artifact.

Find this section in your index.html:
```javascript
async function fetchPublications() {
    // OLD CODE HERE
}
```

And replace it with the new version.

### Step 5: Push to GitHub

```bash
cd /Users/noelcastro/software/personal_web

git add .
git commit -m "Add Netlify functions for ADS API integration"
git push origin main
```

### Step 6: Deploy to Netlify

1. **Sign up for Netlify**:
   - Go to [netlify.com](https://www.netlify.com/)
   - Click "Sign up" → "Sign up with GitHub"
   - Authorize Netlify

2. **Import your repository**:
   - Click "Add new site" → "Import an existing project"
   - Choose "GitHub"
   - Select your `personal_web` repository
   - Click "Deploy site"

3. **Configure site settings**:
   - Site name: Change to `noel-castro-segura` (or your preference)
   - Your site will be at: `https://noel-castro-segura.netlify.app`

### Step 7: Add ADS API Token to Netlify

1. In Netlify dashboard, go to **Site settings**
2. Click **Environment variables** (left sidebar)
3. Click **Add a variable**
4. Add:
   - **Key**: `ADS_API_TOKEN`
   - **Value**: (paste your ADS token from Step 1)
5. Click **Save**

### Step 8: Trigger Redeploy

1. Go to **Deploys** tab
2. Click **Trigger deploy** → "Deploy site"
3. Wait 2-3 minutes for deployment

### Step 9: Test Your Site! 🎉

Visit your Netlify URL (e.g., `https://noel-castro-segura.netlify.app`)

1. Click on the **Research** tab
2. You should see "Loading publications from ADS..."
3. After a few seconds, your real publications appear!
4. Statistics (publication count, citations, h-index) are calculated automatically

## ✅ Verification Checklist

- [ ] Site loads at Netlify URL
- [ ] All tabs work correctly
- [ ] Constellation animation works
- [ ] Research tab loads publications from ADS
- [ ] Statistics show real numbers
- [ ] Links to ORCID, GitHub, CV work
- [ ] Contact form appears (not functional yet)

## 🌐 Optional: Add Custom Domain

If you want to use a custom domain (e.g., `noelcastrosegura.com`):

1. Buy domain from provider (Namecheap, Google Domains, etc.)
2. In Netlify: **Domain settings** → **Add custom domain**
3. Follow Netlify's DNS instructions
4. Enable HTTPS (automatic and free)

## 🔄 How It Works

### Architecture

```
User Browser
    ↓
Your Netlify Site (index.html)
    ↓
Netlify Function (fetch-publications.js)
    ↓
NASA ADS API
    ↓
Publications data returned
    ↓
Displayed on your site
```

### Why This Solves CORS

1. **Browser calls your Netlify function** (same domain = no CORS)
2. **Netlify function calls ADS API** (server-to-server = no CORS)
3. **Function returns data to browser** (same domain = no CORS)

## 🐛 Troubleshooting

### Publications not loading?

**Check the browser console** (F12 or Cmd+Option+I):

```javascript
// You should NOT see CORS errors
// If you see errors, check:
```

1. **Check environment variable**:
   - Netlify Dashboard → Site settings → Environment variables
   - Make sure `ADS_API_TOKEN` is set correctly

2. **Check function logs**:
   - Netlify Dashboard → Functions tab
   - Click on `fetch-publications`
   - View recent invocations and logs

3. **Test the function directly**:
   ```
   https://YOUR-SITE.netlify.app/.netlify/functions/fetch-publications
   ```
   Should return JSON with publications

### Function timeout?

If you get timeout errors:
- ADS API might be slow
- Increase timeout in `netlify.toml`:
  ```toml
  [functions]
    timeout = 30
  ```

### Wrong data appearing?

- Check ORCID ID in the function code
- Verify your ORCID has publications linked
- Check ADS search directly: https://ui.adsabs.harvard.edu/search/q=orcid%3A0000-0002-5870-0443

## 📊 Customization

### Change number of publications displayed

Edit `netlify/functions/fetch-publications.js`:
```javascript
rows: '10',  // Change to 20, 30, etc.
```

### Add more fields

Add to the `fl` parameter:
```javascript
fl: 'title,author,pub,year,bibcode,citation_count,abstract,keyword,aff'
```

### Filter publications

Modify the query in the function:
```javascript
q: `orcid:${ORCID_ID} AND year:2020-2024`,  // Only recent papers
```

## 🎓 Understanding the Code

### Netlify Function Basics

```javascript
exports.handler = async function(event, context) {
  // event: HTTP request info
  // context: execution context
  
  return {
    statusCode: 200,        // HTTP status
    headers: { /* CORS */ },  // Response headers
    body: JSON.stringify({})  // Response data
  };
}
```

### CORS Headers Explained

```javascript
'Access-Control-Allow-Origin': '*',  // Allow all domains
'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',  // Allowed methods
'Access-Control-Allow-Headers': 'Content-Type'  // Allowed headers
```

## 🔐 Security Notes

- ✅ API token stored securely in Netlify (not in code)
- ✅ Function only allows GET requests
- ✅ No sensitive data exposed to client
- ⚠️ Function is publicly accessible (but that's OK for read-only data)

## 💰 Cost

**Everything is FREE!**
- Netlify: 100GB bandwidth/month free
- ADS API: Unlimited free requests
- GitHub: Free for public repositories

## 📚 Additional Resources

- [Netlify Functions Docs](https://docs.netlify.com/functions/overview/)
- [ADS API Documentation](https://ui.adsabs.harvard.edu/help/api/)
- [CORS Explained](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)

## 🆘 Need Help?

If you run into issues:
1. Check Netlify function logs
2. Test ADS API directly
3. Verify environment variables
4. Check browser console for errors

---

Once set up, your publications will automatically update from ADS! No manual maintenance required. 🎉