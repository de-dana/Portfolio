// Portfolio Sync JavaScript
// This file handles syncing admin changes with the main portfolio page

// Local storage keys
const STORAGE_KEYS = {
    PORTFOLIO_DATA: 'portfolio_data'
};

// Default portfolio data (same as in admin.js)
const DEFAULT_PORTFOLIO_DATA = {
    navName: 'Naor Beeri',
    hero: {
        name: 'Naor Beeri',
        title: 'Full Stack Developer & Creative Problem Solver',
        description: 'I create innovative digital solutions that combine cutting-edge technology with exceptional user experiences.',
        profilePhoto: null
    },
    about: {
        text1: 'I\'m a passionate developer with a love for creating meaningful digital experiences. With expertise in both frontend and backend development, I bring ideas to life through clean, efficient code and intuitive design.',
        text2: 'When I\'m not coding, you can find me exploring new technologies, contributing to open-source projects, or sharing knowledge with the developer community.',
        stats: {
            experience: 3,
            projects: 20
        }
    },
    skills: {
        frontend: [
            { name: 'HTML5', icon: 'fab fa-html5' },
            { name: 'CSS3', icon: 'fab fa-css3-alt' },
            { name: 'JavaScript', icon: 'fab fa-js' },
            { name: 'React', icon: 'fab fa-react' }
        ],
        backend: [
            { name: 'Node.js', icon: 'fab fa-node-js' },
            { name: 'Python', icon: 'fab fa-python' },
            { name: 'SQL', icon: 'fas fa-database' },
            { name: 'AWS', icon: 'fab fa-aws' }
        ],
        tools: [
            { name: 'Git', icon: 'fab fa-git-alt' },
            { name: 'Docker', icon: 'fab fa-docker' },
            { name: 'Figma', icon: 'fab fa-figma' },
            { name: 'CLI', icon: 'fas fa-terminal' }
        ]
    },
    projects: [
        {
            title: 'E-Commerce Platform',
            description: 'A full-stack e-commerce solution with React frontend and Node.js backend, featuring user authentication, payment processing, and admin dashboard.',
            technologies: 'React, Node.js, MongoDB',
            github: '#',
            demo: '#'
        },
        {
            title: 'Task Management App',
            description: 'A responsive task management application with real-time updates, drag-and-drop functionality, and team collaboration features.',
            technologies: 'Vue.js, Firebase, Vuetify',
            github: '#',
            demo: '#'
        },
        {
            title: 'Data Analytics Dashboard',
            description: 'An interactive dashboard for data visualization and analytics, built with modern web technologies and real-time data integration.',
            technologies: 'D3.js, Python, Flask',
            github: '#',
            demo: '#'
        }
    ],
    footer: {
        text: '&copy; 2025 Naor Beeri. All rights reserved.'
    }
};

// Initialize portfolio sync
document.addEventListener('DOMContentLoaded', function() {
    updatePortfolioContentEnhanced();
    
    // Listen for storage changes (when admin updates content)
    window.addEventListener('storage', function(e) {
        if (e.key === STORAGE_KEYS.PORTFOLIO_DATA) {
            updatePortfolioContentEnhanced();
        }
    });
});

function getPortfolioData() {
    try {
        const stored = localStorage.getItem(STORAGE_KEYS.PORTFOLIO_DATA);
        console.log('🔍 Portfolio-sync: Raw localStorage data:', stored);
        
        if (stored) {
            const data = JSON.parse(stored);
            console.log('✅ Portfolio-sync: Data loaded from localStorage:', data);
            return data;
        } else {
            console.log('⚠️ Portfolio-sync: No data in localStorage, using default data');
            return DEFAULT_PORTFOLIO_DATA;
        }
    } catch (error) {
        console.error('❌ Portfolio-sync: Error loading portfolio data:', error);
        console.log('⚠️ Portfolio-sync: Using default data due to error');
        return DEFAULT_PORTFOLIO_DATA;
    }
}

function updatePortfolioContent() {
    const data = getPortfolioData();
    
    // Update navigation bar
    updateNavigationBar(data.navName);
    
    // Update hero section
    updateHeroSection(data.hero);
    
    // Update about section
    updateAboutSection(data.about);
    
    // Update skills section
    updateSkillsSection(data.skills);
    
    // Update projects section
    updateProjectsSection(data.projects);
    
    // Update footer section
    updateFooterSection(data.footer);

}

function updateHeroSection(heroData) {
    if (!heroData) return;
    
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroDescription = document.querySelector('.hero-description');
    const heroImage = document.querySelector('.hero-image');
    
    if (heroTitle) {
        const newContent = `Hi, I'm <span class="highlight">${heroData.name}</span>`;
        // Set a flag to indicate admin updated content
        heroTitle.setAttribute('data-admin-updated', 'true');
        
        // Run typing animation with new content
        heroTitle.innerHTML = '';
        if (window.typeWriter) {
            window.typeWriter(heroTitle, newContent, 50);
        } else {
            // Fallback if typeWriter function is not available
            heroTitle.innerHTML = newContent;
        }
    }
    
    if (heroSubtitle) {
        heroSubtitle.textContent = heroData.title;
    }
    
    if (heroDescription) {
        heroDescription.textContent = heroData.description;
    }
    
    // Update profile photo
    if (heroImage) {
        updateProfilePhoto(heroImage, heroData.profilePhoto);
    }
}

function updateNavigationBar(navName) {
    if (!navName) return;
    
    const navLogo = document.querySelector('.nav-logo a');
    if (navLogo) {
        navLogo.textContent = navName;
    }
}

function updateProfilePhoto(heroImage, profilePhotoData) {
    // Remove existing profile photo if any
    const existingPhoto = heroImage.querySelector('.profile-photo');
    if (existingPhoto) {
        existingPhoto.remove();
    }
    
    // Remove placeholder if it exists
    const placeholder = heroImage.querySelector('.profile-placeholder');
    if (placeholder) {
        placeholder.remove();
    }
    
    if (profilePhotoData) {
        // Create and add profile photo
        const profilePhoto = document.createElement('img');
        profilePhoto.className = 'profile-photo';
        profilePhoto.src = profilePhotoData;
        profilePhoto.alt = 'Profile Photo';
        heroImage.appendChild(profilePhoto);
    } else {
        // Add placeholder if no photo
        const placeholder = document.createElement('div');
        placeholder.className = 'profile-placeholder';
        placeholder.innerHTML = '<i class="fas fa-user"></i>';
        heroImage.appendChild(placeholder);
    }
}

function updateAboutSection(aboutData) {
    if (!aboutData) return;
    
    const aboutTexts = document.querySelectorAll('.about-text p');
    const stats = document.querySelectorAll('.stat h3');
    
    if (aboutTexts.length >= 2) {
        aboutTexts[0].textContent = aboutData.text1;
        aboutTexts[1].textContent = aboutData.text2;
    }
    
    if (stats.length >= 2) {
        stats[0].textContent = aboutData.stats.experience + '+';
        stats[1].textContent = aboutData.stats.projects + '+';
    }
}

function updateSkillsSection(skillsData) {
    if (!skillsData) return;
    
    // Update frontend skills
    updateSkillCategory('frontend', skillsData.frontend);
    
    // Update backend skills
    updateSkillCategory('backend', skillsData.backend);
    
    // Update tools
    updateSkillCategory('tools', skillsData.tools);
}

function updateSkillCategory(category, skills) {
    const skillCategory = document.querySelector(`.skill-category:has(h3:contains('${category.charAt(0).toUpperCase() + category.slice(1)}'))`);
    if (!skillCategory) return;
    
    const skillItems = skillCategory.querySelector('.skill-items');
    if (!skillItems) return;
    
    // Clear existing skills
    skillItems.innerHTML = '';
    
    // Add new skills
    skills.forEach(skill => {
        const skillItem = document.createElement('div');
        skillItem.className = 'skill-item';
        skillItem.innerHTML = `
            <i class="${skill.icon}"></i>
            <span>${skill.name}</span>
        `;
        skillItems.appendChild(skillItem);
    });
}

function updateProjectsSection(projectsData) {
    if (!projectsData) return;
    
    const projectsGrid = document.querySelector('.projects-grid');
    if (!projectsGrid) return;
    
    // Clear existing projects
    projectsGrid.innerHTML = '';
    
    // Add new projects
    projectsData.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.innerHTML = `
            <div class="project-image">
                <div class="project-placeholder">
                    <i class="fas fa-laptop-code"></i>
                </div>
            </div>
            <div class="project-content">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-tech">
                    ${project.technologies.split(',').map(tech => `<span>${tech.trim()}</span>`).join('')}
                </div>
                <div class="project-links">
                    <a href="${project.github}" class="project-link"><i class="fab fa-github"></i> Code</a>
                    <a href="${project.demo}" class="project-link"><i class="fas fa-external-link-alt"></i> Live</a>
                </div>
            </div>
        `;
        projectsGrid.appendChild(projectCard);
    });
}

function updateFooterSection(footerData) {
    if (!footerData) return;
    
    const footer = document.querySelector('.footer p');
    if (footer) {
        footer.innerHTML = footerData.text;
    }
}



// Alternative method for updating skills (more compatible)
function updateSkillsSectionAlt(skillsData) {
    if (!skillsData) return;
    
    const skillCategories = document.querySelectorAll('.skill-category');
    
    skillCategories.forEach((category, index) => {
        const skillItems = category.querySelector('.skill-items');
        if (!skillItems) return;
        
        let skills;
        if (index === 0) skills = skillsData.frontend;
        else if (index === 1) skills = skillsData.backend;
        else if (index === 2) skills = skillsData.tools;
        else return;
        
        // Clear existing skills
        skillItems.innerHTML = '';
        
        // Add new skills
        skills.forEach(skill => {
            const skillItem = document.createElement('div');
            skillItem.className = 'skill-item';
            skillItem.innerHTML = `
                <i class="${skill.icon}"></i>
                <span>${skill.name}</span>
            `;
            skillItems.appendChild(skillItem);
        });
    });
}

// Fallback method for updating skills
function updateSkillsSectionFallback(skillsData) {
    if (!skillsData) return;
    
    // Update frontend skills
    const frontendSkills = document.querySelectorAll('.skill-category:nth-child(1) .skill-item');
    updateSkillItems(frontendSkills, skillsData.frontend);
    
    // Update backend skills
    const backendSkills = document.querySelectorAll('.skill-category:nth-child(2) .skill-item');
    updateSkillItems(backendSkills, skillsData.backend);
    
    // Update tools
    const toolsSkills = document.querySelectorAll('.skill-category:nth-child(3) .skill-item');
    updateSkillItems(toolsSkills, skillsData.tools);
}

function updateSkillItems(existingItems, newSkills) {
    existingItems.forEach((item, index) => {
        if (newSkills[index]) {
            const icon = item.querySelector('i');
            const span = item.querySelector('span');
            
            if (icon) icon.className = newSkills[index].icon;
            if (span) span.textContent = newSkills[index].name;
        }
    });
}

// Enhanced update function with better error handling
function updatePortfolioContentEnhanced() {
    try {
        const data = getPortfolioData();
        
        // Update navigation bar
        updateNavigationBar(data.navName);
        
        // Update hero section
        updateHeroSection(data.hero);
        
        // Update about section
        updateAboutSection(data.about);
        
        // Try different methods for skills update
        try {
            updateSkillsSection(data.skills);
        } catch (e) {
            try {
                updateSkillsSectionAlt(data.skills);
            } catch (e2) {
                updateSkillsSectionFallback(data.skills);
            }
        }
        
        // Update projects section
        updateProjectsSection(data.projects);
        
        // Update footer section
        updateFooterSection(data.footer);
        
        console.log('Portfolio content updated successfully');
    } catch (error) {
        console.error('Error updating portfolio content:', error);
    }
}

// Export functions for use in other scripts
window.PortfolioSync = {
    updateContent: updatePortfolioContentEnhanced,
    getData: getPortfolioData,
    updateHero: updateHeroSection,
    updateAbout: updateAboutSection,
    updateSkills: updateSkillsSection,
    updateProjects: updateProjectsSection,
    updateNavigation: updateNavigationBar,
    updateFooter: updateFooterSection,
}; 