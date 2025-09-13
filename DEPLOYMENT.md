# Deployment Guide - Shanti Ayurveda Hospital Website

## Quick Start

To view the website locally:

```bash
cd ayurveda-hospital-website
python3 -m http.server 8000
```

Then open http://localhost:8000 in your browser.

## Deployment Options

### 1. Netlify (Recommended - Free)

1. **Via Drag & Drop:**
   - Go to [netlify.com](https://netlify.com)
   - Drag the entire `ayurveda-hospital-website` folder to the deploy area
   - Your site will be live instantly with a random URL
   - You can change the site name in settings

2. **Via Git (Continuous Deployment):**
   - Push your code to GitHub/GitLab
   - Connect your repository to Netlify
   - Auto-deploy on every push

### 2. Vercel (Free)

1. Install Vercel CLI: `npm i -g vercel`
2. In project directory: `vercel`
3. Follow the prompts
4. Your site will be deployed instantly

### 3. GitHub Pages (Free)

1. Create a GitHub repository
2. Upload all files to the repository
3. Go to repository Settings → Pages
4. Select source branch (usually `main`)
5. Your site will be available at `https://username.github.io/repository-name`

### 4. Traditional Web Hosting

Upload all files via FTP/SFTP to your web hosting provider:

```
public_html/
├── index.html
├── css/
├── js/
├── images/
└── README.md
```

### 5. AWS S3 Static Website

1. Create an S3 bucket
2. Enable static website hosting
3. Upload all files
4. Set bucket policy for public read access
5. Configure CloudFront for better performance

## Pre-Deployment Checklist

### Content Updates
- [ ] Replace "Shanti Ayurveda Hospital" with actual hospital name
- [ ] Update contact information (phone, email, address)
- [ ] Replace placeholder images with real photos
- [ ] Update doctor profiles with real information
- [ ] Replace testimonials with genuine patient reviews
- [ ] Update service descriptions to match actual offerings

### Technical Optimizations
- [ ] Compress images for web (use tools like TinyPNG)
- [ ] Minify CSS and JavaScript files
- [ ] Test all form submissions
- [ ] Verify all links work correctly
- [ ] Test responsive design on multiple devices
- [ ] Check loading speed with tools like PageSpeed Insights

### SEO Setup
- [ ] Update meta descriptions for each section
- [ ] Add relevant keywords
- [ ] Set up Google Analytics
- [ ] Create and submit sitemap.xml
- [ ] Set up Google Search Console

## Form Handling Setup

The contact form currently shows a success message but doesn't actually send emails. To make it functional:

### Option 1: Netlify Forms (Easiest)
Add `netlify` attribute to the form tag:
```html
<form id="appointment-form" netlify>
```

### Option 2: Formspree
1. Sign up at [formspree.io](https://formspree.io)
2. Update form action:
```html
<form id="appointment-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

### Option 3: Custom Backend
Implement a server-side solution using:
- Node.js with Express
- PHP
- Python with Flask/Django
- Any backend technology

## Domain Setup

### Using a Custom Domain

1. **Purchase a domain** from providers like:
   - Namecheap
   - GoDaddy
   - Google Domains

2. **Configure DNS:**
   - For Netlify: Add CNAME record pointing to your Netlify URL
   - For Vercel: Add CNAME record pointing to cname.vercel-dns.com
   - For GitHub Pages: Add CNAME file with your domain name

3. **Enable HTTPS** (automatic with most providers)

## Performance Optimization

### Image Optimization
```bash
# Install imagemagick
sudo apt-get install imagemagick

# Optimize images
mogrify -resize 800x600 -quality 85 images/*.jpg
```

### CSS & JS Minification
Use tools like:
- [CSS Minifier](https://cssminifier.com/)
- [JavaScript Minifier](https://javascript-minifier.com/)

Or build tools like:
- Webpack
- Gulp
- Vite

## Security Considerations

### Headers Setup
Add security headers via your hosting provider or .htaccess:

```
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
```

### SSL Certificate
Ensure HTTPS is enabled (most modern hosting providers include this for free).

## Monitoring & Analytics

### Google Analytics Setup
1. Create a Google Analytics account
2. Add tracking code to the `<head>` section:
```html
<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_TRACKING_ID');
</script>
```

### Other Monitoring Tools
- Google Search Console
- Hotjar for user behavior
- PageSpeed Insights for performance

## Backup Strategy

### Automated Backups
- Set up regular backups of your hosting
- Use version control (Git) for code
- Keep database backups if you add dynamic features

### Manual Backups
- Download complete site files monthly
- Export any databases or forms data
- Keep backups in multiple locations

## Maintenance

### Regular Updates
- [ ] Check for broken links monthly
- [ ] Update content seasonally
- [ ] Review and respond to form submissions
- [ ] Monitor site performance
- [ ] Update doctor information as needed
- [ ] Add new testimonials

### Security Updates
- [ ] Keep hosting platform updated
- [ ] Monitor for security vulnerabilities
- [ ] Review form submissions for spam
- [ ] Update contact information as needed

## Troubleshooting

### Common Issues

1. **Images not loading:**
   - Check file paths are correct
   - Verify images exist in the images folder
   - Check file extensions match HTML

2. **CSS not applying:**
   - Verify CSS file path in HTML
   - Check for syntax errors in CSS
   - Clear browser cache

3. **JavaScript not working:**
   - Check browser console for errors
   - Verify script path in HTML
   - Test in different browsers

4. **Form not submitting:**
   - Check form action URL
   - Verify form handling service is set up
   - Test with simple form first

### Support Resources

- Browser developer tools (F12)
- Online validators for HTML/CSS
- Stack Overflow for specific issues
- Hosting provider documentation

## Cost Estimates

### Free Options
- Netlify: Free tier with custom domain
- Vercel: Free tier with good limits
- GitHub Pages: Free for public repositories

### Paid Options
- Shared hosting: $3-10/month
- VPS: $5-20/month
- AWS S3 + CloudFront: $1-5/month
- Domain name: $10-15/year

## Next Steps After Deployment

1. **Test thoroughly** on different devices and browsers
2. **Submit to search engines** (Google, Bing)
3. **Set up social media** links and profiles
4. **Create business listings** on Google My Business
5. **Monitor performance** and user feedback
6. **Plan regular updates** and maintenance schedule

---

Need help with deployment? Feel free to reach out for support!