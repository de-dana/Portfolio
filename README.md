# Dana Hassan - Portfolio Website

A modern, responsive portfolio website built with HTML, CSS, and JavaScript. This website showcases your skills, projects, and professional information in an elegant and interactive design.

## Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern UI/UX**: Clean, professional design with smooth animations
- **Interactive Elements**: Hover effects, smooth scrolling, and dynamic content
- **Mobile Navigation**: Hamburger menu for mobile devices

- **Social Links**: Easy integration with social media profiles
- **SEO Optimized**: Semantic HTML structure for better search engine visibility
- **Admin Panel**: Complete content management system with login authentication
- **Real-time Updates**: Changes made in admin panel instantly reflect on the main site
- **Data Persistence**: All content is saved locally and persists between sessions

## Sections

1. **Hero Section**: Introduction with call-to-action buttons
2. **About Section**: Personal information and statistics
3. **Skills Section**: Technical skills organized by category
4. **Projects Section**: Showcase of your work with links

6. **Footer**: Copyright and additional links

## Customization Guide

### Personal Information

1. **Update your name and title** in `index.html`:
   ```html
   <title>Your Name - Portfolio</title>
   <h1 class="hero-title">Hi, I'm <span class="highlight">Your Name</span></h1>
   <p class="hero-subtitle">Your Title & Description</p>
   ```

2. **Modify the About section** with your personal story and statistics:
   ```html
   <div class="stat">
       <h3>Your Number</h3>
       <p>Your Stat</p>
   </div>
   ```

### Skills and Technologies

Update the skills section in `index.html` to reflect your expertise:

```html
<div class="skill-item">
    <i class="fab fa-your-icon"></i>
    <span>Your Skill</span>
</div>
```

### Projects

Replace the sample projects with your actual work:

1. **Update project titles and descriptions**
2. **Add your project images** (replace placeholder divs)
3. **Update technology tags**
4. **Add real GitHub and live demo links**



### Social Media Links

Update the social links with your actual profiles:

```html
<div class="social-links">
    <a href="your-github-url" class="social-link"><i class="fab fa-github"></i></a>
    <a href="your-linkedin-url" class="social-link"><i class="fab fa-linkedin"></i></a>
    <!-- Add more social links as needed -->
</div>
```

## Adding Your Profile Picture

1. Add your profile image to the project folder
2. Replace the placeholder in the hero section:
   ```html
   <div class="hero-image">
       <img src="your-image.jpg" alt="Your Name" class="profile-image">
   </div>
   ```
3. Add CSS for the image:
   ```css
   .profile-image {
       width: 300px;
       height: 300px;
       border-radius: 50%;
       object-fit: cover;
       border: 3px solid rgba(255, 255, 255, 0.2);
   }
   ```

## Adding Project Images

1. Add your project screenshots to the project folder
2. Replace the placeholder divs in the projects section:
   ```html
   <div class="project-image">
       <img src="project-screenshot.jpg" alt="Project Name">
   </div>
   ```

## Color Scheme Customization

The website uses a modern blue and purple gradient theme. You can customize the colors in `styles.css`:

- **Primary Blue**: `#2563eb`
- **Secondary Purple**: `#764ba2`
- **Accent Yellow**: `#fbbf24`
- **Background Gray**: `#f8fafc`

## Admin Panel

The portfolio includes a complete admin panel for easy content management:

### Accessing the Admin Panel

1. Click the "Admin" link in the footer of your portfolio
2. Login with the default credentials:
   - **Username**: `admin`
   - **Password**: `admin123`

### Admin Panel Features

- **Hero Section Editor**: Update your name, title, and description
- **About Section Editor**: Modify your bio and statistics
- **Skills Manager**: Add, remove, and edit skills with icons
- **Projects Manager**: Create, edit, and remove project entries

- **Data Export/Import**: Backup and restore your portfolio data

### Security Note

⚠️ **Important**: The default admin credentials are stored in the browser. For production use:
1. Change the credentials in `admin.js`
2. Implement proper server-side authentication
3. Use environment variables for sensitive data

## Deployment

### GitHub Pages (Free)

1. Create a GitHub repository
2. Upload all files to the repository
3. Go to Settings > Pages
4. Select source branch (usually `main`)
5. Your site will be available at `https://yourusername.github.io/repository-name`

### Netlify (Free)

1. Create a Netlify account
2. Drag and drop your project folder to Netlify
3. Your site will be deployed instantly
4. You can connect a custom domain later

### Vercel (Free)

1. Create a Vercel account
2. Connect your GitHub repository
3. Deploy automatically on every push

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Performance Optimization

The website is optimized for performance with:
- Minimal external dependencies
- Optimized CSS and JavaScript
- Responsive images
- Efficient animations

## Customization Tips

1. **Keep it simple**: Don't overcrowd with too much information
2. **Use high-quality images**: Ensure your profile and project images are professional
3. **Update regularly**: Keep your projects and skills current
4. **Test on mobile**: Always test the responsive design
5. **Optimize images**: Compress images for faster loading

## File Structure

```
portfolio/
├── index.html              # Main HTML file
├── styles.css              # CSS styles
├── script.js               # JavaScript functionality
├── admin.html              # Admin panel interface
├── admin-styles.css        # Admin panel styles
├── admin.js                # Admin panel functionality
├── portfolio-sync.js       # Content synchronization
├── test-storage.html       # localStorage testing utility
├── README.md               # This file
└── images/                 # Add your images here
    ├── profile.jpg
    ├── project1.jpg
    └── project2.jpg
```

## Troubleshooting

### Data Not Saving in Admin Panel

If changes made in the admin panel are not persisting:

1. **Check Browser Console**: Open Developer Tools (F12) and look for any JavaScript errors
2. **Test localStorage**: Use the `test-storage.html` page to verify localStorage is working
3. **Clear Browser Data**: Try clearing browser cache and localStorage
4. **Check Browser Settings**: Ensure JavaScript and localStorage are enabled
5. **Use Supported Browser**: Make sure you're using a modern browser (Chrome, Firefox, Safari, Edge)

### Admin Panel Not Loading Data

If the admin panel shows empty forms:

1. **Refresh the page**: Sometimes the data needs to be reloaded
2. **Check login status**: Make sure you're properly logged in
3. **Load default data**: Use the test page to load default data
4. **Check file paths**: Ensure all JavaScript files are in the correct location

### Portfolio Not Updating

If changes don't appear on the main portfolio page:

1. **Refresh the page**: The main portfolio page needs to be refreshed to see changes
2. **Check synchronization**: Ensure `portfolio-sync.js` is properly loaded
3. **Open in new tab**: Use the "View Portfolio" button in the admin panel
4. **Clear cache**: Hard refresh (Ctrl+F5) to clear browser cache

## Support

If you need help customizing your portfolio or have questions about the code, feel free to:

1. Check the comments in the code files
2. Refer to this README
3. Use the `test-storage.html` page to debug localStorage issues
4. Look up HTML, CSS, and JavaScript documentation

## License

This portfolio template is free to use and modify for personal and commercial projects.

---


**Happy coding! 🚀** 
