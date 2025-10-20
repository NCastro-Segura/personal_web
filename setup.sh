#!/bin/bash

# Personal Website Setup Script
# This script helps set up your astronomy website with ADS integration

set -e  # Exit on error

echo "=================================================="
echo "  Dr. Noel Castro Segura - Website Setup"
echo "=================================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_success() {
    echo -e "${GREEN}✓${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

print_info() {
    echo -e "${BLUE}ℹ${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

# Set up directory
WEBDIR="/Users/noelcastro/software/personal_web"

echo "Step 1: Setting up directory..."
if [ ! -d "$WEBDIR" ]; then
    mkdir -p "$WEBDIR"
    print_success "Created directory: $WEBDIR"
else
    print_info "Directory already exists: $WEBDIR"
fi

cd "$WEBDIR"

# Create subdirectories
echo ""
echo "Step 2: Creating project structure..."
mkdir -p netlify/functions
print_success "Created netlify/functions directory"

# Check for required files
echo ""
echo "Step 3: Checking for required files..."
echo ""
print_info "You need to manually create these files from the Claude artifacts:"
echo ""

files_needed=0

if [ ! -f "index.html" ]; then
    print_warning "Missing: index.html"
    echo "   → Copy from artifact: 'Complete index.html - Ready to Deploy'"
    files_needed=$((files_needed + 1))
else
    print_success "Found: index.html"
fi

if [ ! -f "README.md" ]; then
    print_warning "Missing: README.md"
    echo "   → Copy from artifact: 'README.md'"
    files_needed=$((files_needed + 1))
else
    print_success "Found: README.md"
fi

if [ ! -f ".gitignore" ]; then
    print_warning "Missing: .gitignore"
    echo "   → Copy from artifact: '.gitignore'"
    files_needed=$((files_needed + 1))
else
    print_success "Found: .gitignore"
fi

if [ ! -f "netlify.toml" ]; then
    print_warning "Missing: netlify.toml"
    echo "   → Copy from artifact: 'netlify.toml'"
    files_needed=$((files_needed + 1))
else
    print_success "Found: netlify.toml"
fi

if [ ! -f "netlify/functions/fetch-publications.js" ]; then
    print_warning "Missing: netlify/functions/fetch-publications.js"
    echo "   → Copy from artifact: 'netlify/functions/fetch-publications.js'"
    files_needed=$((files_needed + 1))
else
    print_success "Found: netlify/functions/fetch-publications.js"
fi

echo ""
if [ $files_needed -gt 0 ]; then
    print_error "$files_needed file(s) missing!"
    echo ""
    echo "Please create the missing files, then run this script again."
    echo ""
    echo "To create files:"
    echo "  1. Open each artifact in Claude"
    echo "  2. Copy the content"
    echo "  3. Create file: nano filename"
    echo "  4. Paste content and save (Ctrl+O, Enter, Ctrl+X)"
    echo ""
    exit 1
else
    print_success "All required files present!"
fi

# Check if git is initialized
echo ""
echo "Step 4: Initializing Git repository..."
if [ ! -d ".git" ]; then
    git init
    print_success "Git repository initialized"
else
    print_info "Git repository already initialized"
fi

# Check git configuration
echo ""
echo "Step 5: Checking Git configuration..."
if ! git config user.name > /dev/null 2>&1; then
    print_warning "Git user name not set"
    read -p "Enter your name for Git commits: " git_name
    git config user.name "$git_name"
    print_success "Git user name set to: $git_name"
else
    git_name=$(git config user.name)
    print_success "Git user name: $git_name"
fi

if ! git config user.email > /dev/null 2>&1; then
    print_warning "Git user email not set"
    read -p "Enter your email for Git commits: " git_email
    git config user.email "$git_email"
    print_success "Git user email set to: $git_email"
else
    git_email=$(git config user.email)
    print_success "Git user email: $git_email"
fi

# Add and commit files
echo ""
echo "Step 6: Committing files to Git..."
git add .
if git diff --cached --quiet; then
    print_info "No changes to commit"
else
    git commit -m "Initial commit: Personal astronomy website with ADS integration"
    print_success "Files committed to Git"
fi

# Check for GitHub remote
echo ""
echo "Step 7: GitHub remote setup..."
if git remote | grep -q "origin"; then
    remote_url=$(git remote get-url origin)
    print_success "GitHub remote already configured: $remote_url"
else
    print_warning "GitHub remote not configured"
    echo ""
    print_info "Next steps for GitHub:"
    echo "  1. Create repository on GitHub: NCastro-Segura.github.io"
    echo "  2. Run: git remote add origin https://github.com/YOUR-USERNAME/YOUR-USERNAME.github.io.git"
    echo "  3. Run: git push -u origin main"
fi

# Summary
echo ""
echo "=================================================="
echo "  Setup Complete!"
echo "=================================================="
echo ""
print_success "Local repository is ready at: $WEBDIR"
echo ""
echo "📋 Next Steps:"
echo ""
echo "1. Get ADS API Token:"
echo "   → Visit: https://ui.adsabs.harvard.edu/user/settings/token"
echo "   → Generate and save your token"
echo ""
echo "2. Push to GitHub:"
if ! git remote | grep -q "origin"; then
    echo "   → Create repo: NCastro-Segura.github.io"
    echo "   → git remote add origin https://github.com/YOUR-USERNAME/YOUR-USERNAME.github.io.git"
fi
echo "   → git push -u origin main"
echo ""
echo "3. Deploy to Netlify:"
echo "   → Sign up: https://www.netlify.com"
echo "   → Import your GitHub repository"
echo "   → Add environment variable: ADS_API_TOKEN"
echo "   → Deploy!"
echo ""
echo "4. Test your site:"
echo "   → Visit your Netlify URL"
echo "   → Check Research tab for publications"
echo ""
echo "📚 Documentation:"
echo "   → Full guide: ADS_INTEGRATION_GUIDE.md"
echo "   → Checklist: DEPLOYMENT_CHECKLIST.md"
echo ""
echo "🎉 Your professional astronomy website is ready to deploy!"
echo ""