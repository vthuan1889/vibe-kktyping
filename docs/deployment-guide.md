# Deployment Guide

**Project:** Kaka's Adventure
**Platform:** GitHub Pages
**Last Updated:** 2026-01-21

---

## Overview

Kaka's Adventure is deployed to GitHub Pages, a free static hosting service provided by GitHub. The deployment process is fully automated using GitHub Actions, triggered by pushing git tags.

**Live Site:** https://vthuan1889.github.io/vibe-kktyping/

---

## Prerequisites

### Required Tools
- Git installed and configured
- GitHub account with repository access
- Node.js 20+ installed
- npm package manager

### Repository Setup
1. Repository must have GitHub Actions enabled
2. Repository must have GitHub Pages enabled (Settings → Pages)
3. Deployment source set to **GitHub Actions**

---

## Build Process

### Local Development Build

**Start Development Server:**
```bash
npm run dev
```
- Opens http://localhost:3000
- Hot module replacement (HMR) enabled
- Asset serving from `public/` directory

**Type Check:**
```bash
npm run typecheck
```
- Validates TypeScript without building
- Catches type errors before build

**Production Build:**
```bash
npm run build
```
- Runs `tsc` (type check) first
- Builds optimized bundle with Vite
- Output directory: `dist/`

**Preview Production Build:**
```bash
npm run preview
```
- Serves `dist/` directory locally
- Simulates production environment
- Opens http://localhost:4173

---

## Automated Deployment (GitHub Actions)

### Workflow Configuration

**File:** `.github/workflows/deploy.yml`

**Trigger Events:**
1. **Push tags** matching `v*` pattern (e.g., v1.0.0, v1.2.3)
2. **Manual dispatch** via GitHub Actions UI

### Workflow Steps

```yaml
name: Deploy to GitHub Pages

on:
  push:
    tags:
      - 'v*'
  workflow_dispatch:

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      1. Checkout code (fetch repository)
      2. Setup Node.js 20 with npm cache
      3. Install dependencies (npm ci)
      4. Build project (npm run build)
      5. Upload dist/ artifact
      6. Deploy to GitHub Pages
```

### Step-by-Step Breakdown

#### Step 1: Checkout Code
```yaml
- uses: actions/checkout@v4
```
- Clones repository to runner
- Includes all files and git history

#### Step 2: Setup Node.js
```yaml
- uses: actions/setup-node@v4
  with:
    node-version: '20'
    cache: 'npm'
```
- Installs Node.js 20 LTS
- Caches npm dependencies for faster builds

#### Step 3: Install Dependencies
```yaml
- run: npm ci
```
- Clean install (uses package-lock.json)
- Faster and more reliable than `npm install`
- Ensures consistent dependency versions

#### Step 4: Build Project
```yaml
- run: npm run build
```
- Executes `vite build`
- TypeScript compilation (ES2020 target)
- Minification with esbuild
- Asset optimization and hashing

**Build Output:**
```
dist/
├── index.html                 # Entry HTML
├── assets/
│   ├── index-[hash].js       # Minified bundle (~200KB)
│   ├── index-[hash].css      # Styles (if any)
│   └── [asset files]         # Images, audio, fonts
```

#### Step 5: Upload Artifact
```yaml
- uses: actions/upload-pages-artifact@v3
  with:
    path: './dist'
```
- Packages `dist/` directory
- Creates artifact for deployment step

#### Step 6: Deploy to GitHub Pages
```yaml
- uses: actions/deploy-pages@v4
```
- Deploys artifact to `gh-pages` branch
- Updates live site (https://vthuan1889.github.io/vibe-kktyping/)
- Typically completes in 1-2 minutes

---

## Manual Deployment Steps

### 1. Prepare Release

**Ensure clean state:**
```bash
git status
```
- Commit all changes: `git add . && git commit -m "chore: prepare release"`
- Push to main: `git push origin main`

**Run local build:**
```bash
npm run build
npm run preview
```
- Test production build locally
- Verify all features work (gameplay, audio, LocalStorage)

### 2. Create Git Tag

**Semantic Versioning:**
- Major: Breaking changes (v2.0.0)
- Minor: New features (v1.1.0)
- Patch: Bug fixes (v1.0.1)

**Create tag:**
```bash
git tag v1.0.0
```

**Tag with message (recommended):**
```bash
git tag -a v1.0.0 -m "Release v1.0.0: Initial launch with 50 levels"
```

### 3. Push Tag to GitHub

**Push tag:**
```bash
git push origin v1.0.0
```
- Triggers GitHub Actions workflow
- Automatically builds and deploys

**Push all tags (if multiple):**
```bash
git push origin --tags
```

### 4. Monitor Deployment

**GitHub Actions UI:**
1. Go to repository on GitHub
2. Click **Actions** tab
3. Find workflow run (named after tag, e.g., "v1.0.0")
4. Watch real-time logs for each step
5. Wait for green checkmark (success)

**Check deployment:**
1. Go to **Settings** → **Pages**
2. See "Your site is live at https://vthuan1889.github.io/vibe-kktyping/"
3. Visit link to verify

### 5. Verify Production

**Smoke Test Checklist:**
- [ ] Site loads without errors
- [ ] All assets load (images, audio, fonts)
- [ ] Menu scene displays correctly
- [ ] Play button navigates to TreasureMap
- [ ] Level selection works
- [ ] Gameplay mechanics functional (typing, scoring)
- [ ] Audio plays (SFX, BGM, TTS)
- [ ] LocalStorage saves progress
- [ ] Fullscreen mode works
- [ ] Browser compatibility (Chrome, Firefox, Edge)

---

## Manual Deployment (Alternative)

If GitHub Actions is unavailable, you can deploy manually:

### Using GitHub CLI (gh)

**Prerequisites:**
```bash
npm install -g gh
gh auth login
```

**Deploy:**
```bash
npm run build
gh release create v1.0.0 --title "Release v1.0.0" --notes "Initial release"
```
- Uploads `dist/` to release
- Manually copy to `gh-pages` branch (not recommended, use Actions)

### Using gh-pages npm Package

**Install:**
```bash
npm install -g gh-pages
```

**Deploy:**
```bash
npm run build
gh-pages -d dist
```
- Pushes `dist/` to `gh-pages` branch
- Updates GitHub Pages automatically

**Add to package.json:**
```json
{
  "scripts": {
    "deploy": "npm run build && gh-pages -d dist"
  }
}
```

---

## Configuration Details

### Vite Configuration (vite.config.ts)

**Base Path:**
```typescript
export default defineConfig({
  base: '/vibe-kktyping/', // Must match GitHub repo name
  // ...
});
```
- **Critical:** Must match repository name for GitHub Pages subdirectory
- For custom domain (e.g., kakatyping.com), set `base: '/'`

**Build Options:**
```typescript
build: {
  outDir: 'dist',
  assetsDir: 'assets',
  minify: 'esbuild',
  sourcemap: false, // Disable for production (reduce bundle size)
}
```

### GitHub Pages Settings

**Repository Settings → Pages:**
- **Source:** GitHub Actions (not "Deploy from branch")
- **Custom Domain:** (Optional) Configure CNAME
- **Enforce HTTPS:** Enabled (recommended)

---

## Environment-Specific Builds

### Development vs Production

**Development (npm run dev):**
- Source maps enabled
- No minification
- Fast HMR (Hot Module Replacement)
- Localhost server

**Production (npm run build):**
- Minified JavaScript (esbuild)
- Asset hashing (cache busting)
- Dead code elimination
- Optimized for performance

### Environment Variables

**Vite Env Variables:**
```typescript
// Access in code
const isDev = import.meta.env.DEV;
const isProd = import.meta.env.PROD;
const baseUrl = import.meta.env.BASE_URL; // '/vibe-kktyping/'
```

**Custom Env Variables:**
Create `.env.production` (not committed):
```
VITE_API_KEY=your_key_here
```

Access in code:
```typescript
const apiKey = import.meta.env.VITE_API_KEY;
```

---

## Rollback Procedure

### If Deployment Fails

**Option 1: Redeploy Previous Tag**
```bash
git tag -d v1.0.1              # Delete bad tag locally
git push origin :refs/tags/v1.0.1  # Delete on GitHub
git tag v1.0.1-fixed           # Create new tag
git push origin v1.0.1-fixed   # Trigger new deployment
```

**Option 2: Revert to Previous Commit**
```bash
git revert HEAD                # Undo last commit
git tag v1.0.2                 # Create patch version
git push origin v1.0.2
```

### If Production Has Bugs

**Hotfix Process:**
1. Create hotfix branch: `git checkout -b hotfix/audio-fix`
2. Fix bug, commit: `git commit -m "fix: resolve audio autoplay issue"`
3. Merge to main: `git checkout main && git merge hotfix/audio-fix`
4. Tag patch version: `git tag v1.0.1`
5. Push: `git push origin main --tags`

---

## Custom Domain (Optional)

### Setup Custom Domain

**If you own a domain (e.g., kakatyping.com):**

1. **Add CNAME file to `public/` directory:**
```
kakatyping.com
```

2. **Update vite.config.ts:**
```typescript
base: '/', // Root path for custom domain
```

3. **Configure DNS (at domain registrar):**
- Add A records pointing to GitHub Pages IPs:
  - 185.199.108.153
  - 185.199.109.153
  - 185.199.110.153
  - 185.199.111.153
- Or add CNAME record: `vthuan1889.github.io`

4. **Enable in GitHub Settings → Pages:**
- Enter custom domain: `kakatyping.com`
- Wait for DNS check (may take 24-48 hours)
- Enable "Enforce HTTPS" after DNS propagates

---

## Performance Optimization

### Asset Optimization

**Images:**
- Compress PNG/JPEG files (use TinyPNG, Squoosh)
- Use WebP format for modern browsers
- Serve multiple sizes (srcset) if needed

**Audio:**
- MP3 format at 128kbps (balance quality/size)
- Normalize audio levels (prevent clipping)
- Trim silence from start/end

**Fonts:**
- Subset Google Fonts (Latin charset only)
- Use `font-display: swap` for faster rendering
- Preload critical fonts

### Build Optimizations

**Code Splitting:**
```typescript
// vite.config.ts
build: {
  rollupOptions: {
    output: {
      manualChunks: {
        phaser: ['phaser'], // Separate Phaser into own chunk
      },
    },
  },
},
```

**Tree Shaking:**
- Ensure `package.json` has `"sideEffects": false`
- Use ES modules (import/export, not require)

**Minification:**
- esbuild (default, fastest)
- Alternative: Terser (slower but smaller)

---

## Monitoring & Analytics (Optional)

### GitHub Pages Analytics

**Built-in Traffic Stats:**
- Go to repository **Insights** → **Traffic**
- View page views and unique visitors (last 14 days)

### External Analytics (Privacy-Friendly)

**Recommended Tools:**
- **Plausible**: Privacy-focused, no cookies, GDPR-compliant
- **Fathom**: Simple, privacy-first analytics
- **Cloudflare Web Analytics**: Free, no tracking

**Integration Example (Plausible):**
```html
<!-- index.html -->
<script defer data-domain="vthuan1889.github.io" src="https://plausible.io/js/script.js"></script>
```

---

## Troubleshooting

### Common Issues

#### 1. Site Returns 404 After Deployment

**Cause:** Base path mismatch

**Solution:**
```typescript
// vite.config.ts
base: '/vibe-kktyping/', // Must match repo name exactly
```

#### 2. Assets Not Loading (Console Errors)

**Cause:** Incorrect asset paths

**Solution:**
- Use relative paths: `./assets/audio/music.mp3`
- Or use Vite's asset handling: `import audioFile from './audio.mp3'`

#### 3. GitHub Actions Workflow Fails

**Cause:** Missing permissions

**Solution:**
1. Go to **Settings** → **Actions** → **General**
2. Set **Workflow permissions** to "Read and write permissions"
3. Enable "Allow GitHub Actions to create and approve pull requests"

#### 4. Deployment Succeeds but Site Shows Old Version

**Cause:** Browser cache

**Solution:**
- Hard refresh: Ctrl+Shift+R (Windows/Linux) or Cmd+Shift+R (Mac)
- Clear browser cache
- Check asset hashing in build output (should have new hashes)

#### 5. Audio Doesn't Autoplay

**Cause:** Browser autoplay policy

**Solution:**
- Ensure AudioManager resumes audio context on user interaction
- Require user to click "Play" button before starting audio

---

## Security Considerations

### GitHub Pages Limitations

**Cannot:**
- Run server-side code (PHP, Node.js, Python)
- Use databases (SQL, NoSQL)
- Store secrets (API keys should not be in frontend code)

**Can:**
- Serve static files (HTML, CSS, JS, images, audio)
- Use client-side JavaScript (Phaser, TypeScript)
- Make API calls to external services (CORS required)

### Best Practices

1. **No Secrets in Code:**
   - Never commit API keys, passwords, or tokens
   - Use backend proxy for sensitive API calls

2. **HTTPS Enforcement:**
   - Always enable "Enforce HTTPS" in GitHub Pages settings
   - Prevents man-in-the-middle attacks

3. **Content Security Policy (CSP):**
   - Add CSP headers via meta tag in `index.html`
   - Restrict inline scripts, external resources

4. **Dependency Audits:**
   ```bash
   npm audit
   npm audit fix
   ```

---

## Continuous Deployment Workflow

### Recommended Git Workflow

```
main (production)
 │
 ├─ feature/new-level-content
 ├─ feature/kaka-animations
 └─ hotfix/audio-bug

1. Create feature branch
2. Develop and test locally
3. Merge to main (via PR)
4. Tag release (v1.x.x)
5. GitHub Actions deploys automatically
```

### Release Checklist

Before tagging a release:
- [ ] All code merged to main
- [ ] Local build succeeds (`npm run build`)
- [ ] Local preview works (`npm run preview`)
- [ ] Type check passes (`npm run typecheck`)
- [ ] No console errors in browser
- [ ] All features tested manually
- [ ] Version number updated in package.json (optional)
- [ ] CHANGELOG.md updated (optional)

---

## Advanced Deployment Options

### Deploy to Multiple Environments

**Staging Environment:**
- Create separate GitHub repo: `vibe-kktyping-staging`
- Deploy from `develop` branch instead of tags
- Test features before production

**Production Environment:**
- Main repo: `vibe-kktyping`
- Deploy from tags only

### Custom GitHub Actions Workflow

**Example: Deploy on Every Push to Main**
```yaml
on:
  push:
    branches:
      - main
```

**Example: Run Tests Before Deploy**
```yaml
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm test  # If tests exist

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - # ... build and deploy steps
```

---

## Deployment Costs

### GitHub Pages Pricing

**Free Tier (Public Repositories):**
- 1 GB storage
- 100 GB bandwidth per month
- Custom domain support
- HTTPS included

**For Kaka's Adventure:**
- Total asset size: ~5MB
- Expected monthly bandwidth: <10 GB (1000 users × 5MB each)
- **Cost:** $0 (within free tier)

---

## References

### Official Documentation
- [GitHub Pages Docs](https://docs.github.com/en/pages)
- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)

### Useful Resources
- [Semantic Versioning](https://semver.org/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [GitHub Pages Custom Domain Guide](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)

---

**Document Version:** 1.0
**Last Updated:** 2026-01-21
**Maintained By:** vthuan1889
