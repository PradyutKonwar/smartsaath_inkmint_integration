# SmartSaathi Hub - Deployment Guide

This guide provides step-by-step instructions for deploying the SmartSaathi Hub to various hosting platforms.

## Quick Deployment Options

### 1. Netlify (Recommended)

**Option A: Drag & Drop**
1. Run `npm run build` to create the `dist` folder
2. Go to [Netlify](https://netlify.com)
3. Drag and drop the `dist` folder to the deployment area
4. Your site will be live instantly with a random URL
5. You can customize the domain in site settings

**Option B: Git Integration**
1. Push your code to GitHub/GitLab
2. Connect your repository to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `dist`
5. Deploy automatically on every push

### 2. Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in your project directory
3. Follow the prompts to deploy
4. Automatic deployments on Git push

### 3. GitHub Pages

1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to package.json scripts:
   ```json
   "homepage": "https://yourusername.github.io/smartsaathi-hub",
   "predeploy": "npm run build",
   "deploy": "gh-pages -d dist"
   ```
3. Run `npm run deploy`

## Environment Setup

### Required Environment Variables

Create a `.env` file (not included in repository):

```env
# Google Analytics
VITE_GA_TRACKING_ID=G-360633556

# WhatsApp Integration
VITE_WHATSAPP_NUMBER=917002122703

# Google Sheets (if using direct integration)
VITE_GOOGLE_SHEETS_URL=your_sheets_url_here
```

### Google Sheets Integration Setup

**Option 1: Google Apps Script (Recommended)**

1. Create a new Google Apps Script project
2. Replace the default code with:

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.openById('19X3R3FhgMhmIl6gN4O8dvGJZVK2HJrAtIC5LUkDnk2w');
    const ws = sheet.getActiveSheet();
    
    const data = JSON.parse(e.postData.contents);
    
    ws.appendRow([
      new Date(),
      data.name,
      data.phone,
      data.details || 'N/A',
      data.services,
      data.total
    ]);
    
    return ContentService
      .createTextOutput(JSON.stringify({success: true}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({success: false, error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

3. Deploy as web app with execute permissions for "Anyone"
4. Copy the web app URL and update the `submitToGoogleSheets` function in `App.tsx`

**Option 2: Zapier Integration**

1. Create a Zapier webhook
2. Connect to Google Sheets
3. Map the fields: timestamp, name, phone, details, services, total
4. Update the webhook URL in the code

## Performance Optimization

### Build Optimization

The project is already optimized with:
- Code splitting
- Tree shaking
- Minification
- Asset optimization

### Additional Optimizations

1. **Enable Gzip Compression** (most hosts do this automatically)
2. **Set up CDN** for faster global delivery
3. **Configure Caching Headers**:
   ```
   Cache-Control: public, max-age=31536000 (for assets)
   Cache-Control: public, max-age=0, must-revalidate (for HTML)
   ```

## Domain Configuration

### Custom Domain Setup

1. **Purchase a domain** (recommended: smartsaathi.com or similar)
2. **Configure DNS**:
   - For Netlify: Add CNAME record pointing to your-site.netlify.app
   - For Vercel: Add CNAME record pointing to cname.vercel-dns.com
3. **Enable HTTPS** (automatic on most platforms)

### Subdomain Options

Consider these subdomain structures:
- `hub.smartsaathi.com` - Main platform
- `students.smartsaathi.com` - Direct student access
- `inkmint.smartsaathi.com` - Creative services
- `bridge.smartsaathi.com` - Business services (when ready)

## Monitoring & Analytics

### Google Analytics Setup

1. Verify GA4 tracking code is in `index.html`
2. Set up conversion goals:
   - Form submissions
   - WhatsApp redirects
   - Service selections
3. Configure custom events (already implemented in code)

### Performance Monitoring

1. **Google PageSpeed Insights**: Test your deployed site
2. **Lighthouse**: Run audits for performance, accessibility, SEO
3. **Real User Monitoring**: Consider tools like Sentry or LogRocket

## Security Considerations

### HTTPS

- Always use HTTPS (automatic on modern hosting platforms)
- Redirect HTTP to HTTPS

### Content Security Policy

Add to your hosting platform's headers:
```
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https:;
```

### Rate Limiting

Consider implementing rate limiting for form submissions to prevent spam.

## Maintenance

### Regular Updates

1. **Dependencies**: Update monthly with `npm update`
2. **Security patches**: Monitor for vulnerabilities
3. **Content updates**: Service prices, descriptions, contact info
4. **Analytics review**: Monthly performance analysis

### Backup Strategy

1. **Code**: Always in Git repository
2. **Analytics data**: Export monthly reports
3. **Lead data**: Regular Google Sheets backups

## Troubleshooting

### Common Issues

1. **Build fails**: Check Node.js version (requires 16+)
2. **Styles not loading**: Verify Tailwind CSS configuration
3. **Analytics not tracking**: Check GA4 ID and implementation
4. **WhatsApp links not working**: Verify phone number format
5. **Forms not submitting**: Check Google Sheets integration

### Support Resources

- **Vite Documentation**: https://vitejs.dev/
- **React Documentation**: https://react.dev/
- **Tailwind CSS**: https://tailwindcss.com/
- **Netlify Support**: https://docs.netlify.com/

## Go-Live Checklist

- [ ] Build completes without errors
- [ ] All links work correctly
- [ ] WhatsApp integration tested
- [ ] Google Analytics tracking verified
- [ ] Google Sheets integration working
- [ ] Mobile responsiveness confirmed
- [ ] Performance score > 90 (Lighthouse)
- [ ] All forms capture data correctly
- [ ] Contact information is accurate
- [ ] SSL certificate active
- [ ] Custom domain configured (if applicable)

## Post-Launch

1. **Monitor analytics** for user behavior
2. **Test all functionality** regularly
3. **Collect user feedback** for improvements
4. **Update content** as services evolve
5. **Scale infrastructure** as traffic grows

Your SmartSaathi Hub is now ready for deployment! 🚀