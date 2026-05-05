# 🚀 Quick Reference Guide

## Common Commands

### Development
```bash
# Start development server
npm run dev

# Access at: http://localhost:5173
```

### Build & Deploy
```bash
# Build optimized production version
npm run build

# Preview production build locally
npm run preview

# Deploy to production (Vercel)
git add .
git commit -m "your message"
git push origin main
```

### Performance Testing
```bash
# After deployment, test at:
# https://pagespeed.web.dev/
# https://gtmetrix.com/
```

---

## File Structure

```
HKMC-main/
├── src/
│   ├── components/        # React components (lazy loaded)
│   ├── pages/            # Page components
│   ├── data/             # Content data
│   └── App.jsx           # Main app with lazy loading
├── public/               # Static assets
├── dist/                 # Production build (optimized)
├── vite.config.js        # Build configuration
├── package.json          # Dependencies
└── index.html            # Entry HTML (optimized)
```

---

## Performance Checklist

After deployment, verify:
- [ ] PageSpeed score > 90
- [ ] All images load properly
- [ ] Lazy loading works
- [ ] Compressed files served (.gz or .br)
- [ ] Mobile performance good
- [ ] No console errors

---

## Key Optimizations

✅ Code splitting (3 vendor chunks)
✅ Lazy loading (10+ components)
✅ Gzip + Brotli compression
✅ Minification (Terser)
✅ Image optimization
✅ Font preloading
✅ CSS code splitting

---

## Bundle Sizes

| Chunk | Size | Gzipped |
|-------|------|---------|
| React | 156 KB | 51 KB |
| Animations | 114 KB | 36 KB |
| Main | 29 KB | 9 KB |
| CSS | 46 KB | 8 KB |

**Total: ~120 KB (gzipped)** 🎉

---

## Support

For issues or questions:
- Check `PERFORMANCE_OPTIMIZATIONS.md` for details
- Check `PERFORMANCE_SUMMARY.md` for overview
- Test with Chrome DevTools Lighthouse
