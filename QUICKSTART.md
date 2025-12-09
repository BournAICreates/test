# Quick Start Guide

Get the website running in 60 seconds!

## 🚀 Start the Website

### Option 1: Python (Recommended)
```bash
python3 -m http.server 8000
```

### Option 2: Node.js
```bash
npx http-server -p 8000
```

### Option 3: PHP
```bash
php -S localhost:8000
```

Then open: **http://localhost:8000**

## 📋 What to Check

1. **Page loads** - No errors
2. **Navigation works** - Click menu items
3. **Mobile menu** - Resize browser, click hamburger
4. **Forms work** - Fill and submit contact form
5. **No console errors** - Press F12, check Console tab

## 🔧 Before Deploying

**Critical Updates Required:**

1. **Update Domain** (Search and replace in `index.html`, `sitemap.xml`, `robots.txt`):
   - Change: `https://www.example.com/`
   - To: `https://yourdomain.com/`

2. **Update Contact Info** (in `index.html`):
   - Email: Change `info@example.com`
   - Phone: Change `+1-555-123-4567`
   - Address: Update with actual address

3. **Update Social Media** (in `index.html`):
   - Twitter: Change `@yourhandle`
   - Update all social media URLs

4. **Replace Images** (in `/assets/` folder):
   - Add real company logo
   - Add actual photos/images
   - Remove placeholder text from images

## 📊 Test Checklist

- [ ] Open in Chrome - works
- [ ] Open in Firefox - works
- [ ] Open in Safari - works (if available)
- [ ] Open in Edge - works
- [ ] Resize to mobile size - menu adapts
- [ ] Check console (F12) - no errors
- [ ] Click all navigation links - smooth scroll
- [ ] Submit contact form - shows alert

## 🎯 Validate SEO

### Quick Validation
1. **View Source** (Ctrl+U): See meta tags in `<head>`
2. **Structured Data**: Copy JSON-LD, paste in [Schema Validator](https://validator.schema.org/)
3. **Mobile-Friendly**: Test at [Google Mobile Test](https://search.google.com/test/mobile-friendly)

### After Deployment
4. **Facebook**: [Sharing Debugger](https://developers.facebook.com/tools/debug/)
5. **Twitter**: [Card Validator](https://cards-dev.twitter.com/validator)
6. **Google**: [Rich Results Test](https://search.google.com/test/rich-results)

## 📚 Documentation

- **README.md** - Full setup guide
- **TESTING.md** - Complete testing checklist
- **SEO_DOCUMENTATION.md** - Detailed SEO guide
- **SUMMARY.md** - Project overview

## 🐛 Troubleshooting

### "Address already in use"
```bash
# Use a different port
python3 -m http.server 8080
```

### Can't see changes
```bash
# Hard refresh browser
# Chrome/Firefox: Ctrl+Shift+R
# Safari: Cmd+Shift+R
```

### Images not loading
Check that you're running a server (not opening file:// directly)

## ✅ You're Ready!

If the site loads and looks good, you're ready to:
1. Add your content
2. Update placeholders
3. Deploy to production

**Questions?** Check README.md for detailed instructions.

---

**Tip**: This is a static website - no database or backend required!
