// Admin Panel JavaScript

// Admin credentials (in a real app, this would be server-side)
const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'admin123'
};

// Local storage keys
const STORAGE_KEYS = {
    PORTFOLIO_DATA: 'portfolio_data',
    IS_LOGGED_IN: 'admin_logged_in'
};

// Default portfolio data
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

// Initialize admin panel
document.addEventListener('DOMContentLoaded', function() {
    initializeAdminPanel();
});

function initializeAdminPanel() {
    // Check if user is already logged in
    if (localStorage.getItem(STORAGE_KEYS.IS_LOGGED_IN) === 'true') {
        showDashboard();
    } else {
        showLoginScreen();
    }

    // Initialize event listeners
    setupEventListeners();
    
    // Load current portfolio data
    loadPortfolioData();
}

function setupEventListeners() {
    // Login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }

    // Tab navigation
    const navTabs = document.querySelectorAll('.nav-tab');
    navTabs.forEach(tab => {
        tab.addEventListener('click', () => switchTab(tab.dataset.tab));
    });

    // Form submissions
    setupFormSubmissions();

    // Skills management
    setupSkillsManagement();

    // Projects management
    setupProjectsManagement();

    // Photo upload functionality
    setupPhotoUpload();
}

function setupFormSubmissions() {
    // Hero form
    const heroForm = document.getElementById('heroForm');
    if (heroForm) {
        heroForm.addEventListener('submit', handleHeroSubmit);
    }

    // About form
    const aboutForm = document.getElementById('aboutForm');
    if (aboutForm) {
        aboutForm.addEventListener('submit', handleAboutSubmit);
    }

    // Footer form
    const footerForm = document.getElementById('footerForm');
    if (footerForm) {
        footerForm.addEventListener('submit', handleFooterSubmit);
    }

}

function setupSkillsManagement() {
    // Add skill buttons
    const addSkillButtons = document.querySelectorAll('.add-skill');
    addSkillButtons.forEach(button => {
        button.addEventListener('click', () => addSkill(button.dataset.category));
    });

    // Remove skill buttons
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('remove-skill')) {
            e.target.closest('.skill-item-editor').remove();
        }
    });

    // Save skills button
    const saveSkillsBtn = document.getElementById('saveSkills');
    if (saveSkillsBtn) {
        saveSkillsBtn.addEventListener('click', handleSkillsSubmit);
    }
}

function setupProjectsManagement() {
    // Add project button
    const addProjectBtn = document.getElementById('addProject');
    if (addProjectBtn) {
        addProjectBtn.addEventListener('click', addProject);
    }

    // Remove project buttons
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('remove-project')) {
            e.target.closest('.project-editor').remove();
        }
    });

    // Save projects button
    const saveProjectsBtn = document.getElementById('saveProjects');
    if (saveProjectsBtn) {
        saveProjectsBtn.addEventListener('click', handleProjectsSubmit);
    }
}

function setupPhotoUpload() {
    const uploadBtn = document.getElementById('uploadPhotoBtn');
    const photoInput = document.getElementById('profilePhotoInput');
    const removeBtn = document.getElementById('removePhotoBtn');
    const modal = document.getElementById('photoCropperModal');
    const closeModal = document.querySelector('.close-modal');
    const cancelCropBtn = document.getElementById('cancelCropBtn');
    const cropPhotoBtn = document.getElementById('cropPhotoBtn');

    // Upload button click
    if (uploadBtn) {
        uploadBtn.addEventListener('click', () => {
            photoInput.click();
        });
    }

    // File input change
    if (photoInput) {
        photoInput.addEventListener('change', handlePhotoSelect);
    }

    // Remove photo button
    if (removeBtn) {
        removeBtn.addEventListener('click', removeProfilePhoto);
    }

    // Modal controls
    if (closeModal) {
        closeModal.addEventListener('click', closePhotoModal);
    }

    if (cancelCropBtn) {
        cancelCropBtn.addEventListener('click', closePhotoModal);
    }

    if (cropPhotoBtn) {
        cropPhotoBtn.addEventListener('click', cropAndSavePhoto);
    }

    // Close modal when clicking outside
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closePhotoModal();
            }
        });
    }
}

// Photo handling functions
let selectedFile = null;
let cropperData = null;

function handlePhotoSelect(e) {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
        showMessage('Please select a valid image file.', 'error');
        return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
        showMessage('Image file size must be less than 5MB.', 'error');
        return;
    }

    selectedFile = file;
    showPhotoCropper(file);
}

function showPhotoCropper(file) {
    const modal = document.getElementById('photoCropperModal');
    const cropperImage = document.getElementById('cropperImage');
    
    if (!modal || !cropperImage) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        cropperImage.src = e.target.result;
        modal.style.display = 'flex';
        
        // Initialize cropper functionality
        initializeCropper(cropperImage);
    };
    reader.readAsDataURL(file);
}

function initializeCropper(imageElement) {
    let isDragging = false;
    let startX, startY, translateX = 0, translateY = 0;
    let scale = 1;
    
    // Reset transform
    imageElement.style.transform = 'translate(0, 0) scale(1)';
    
    // Mouse events for dragging
    imageElement.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX - translateX;
        startY = e.clientY - translateY;
        imageElement.style.cursor = 'grabbing';
    });
    
    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        
        translateX = e.clientX - startX;
        translateY = e.clientY - startY;
        
        imageElement.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
    });
    
    document.addEventListener('mouseup', () => {
        isDragging = false;
        imageElement.style.cursor = 'grab';
    });
    
    // Wheel event for zooming
    imageElement.addEventListener('wheel', (e) => {
        e.preventDefault();
        const delta = e.deltaY > 0 ? 0.9 : 1.1;
        scale = Math.max(0.5, Math.min(3, scale * delta));
        
        imageElement.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
    });
    
    // Store cropper data for later use
    cropperData = { translateX, translateY, scale };
}

function cropAndSavePhoto() {
    if (!selectedFile || !cropperData) return;
    
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const image = new Image();
    
    image.onload = function() {
        // Set canvas size for circular crop
        const size = 300; // Final size
        canvas.width = size;
        canvas.height = size;
        
        // Create circular clipping path
        ctx.beginPath();
        ctx.arc(size / 2, size / 2, size / 2, 0, 2 * Math.PI);
        ctx.clip();
        
        // Calculate crop area based on cropper data
        const scale = cropperData.scale;
        const translateX = cropperData.translateX;
        const translateY = cropperData.translateY;
        
        // Calculate source rectangle
        const sourceSize = Math.min(image.width, image.height) / scale;
        const sourceX = (image.width - sourceSize) / 2 - translateX / scale;
        const sourceY = (image.height - sourceSize) / 2 - translateY / scale;
        
        // Draw the cropped image
        ctx.drawImage(
            image,
            sourceX, sourceY, sourceSize, sourceSize,
            0, 0, size, size
        );
        
        // Convert to base64
        const croppedImageData = canvas.toDataURL('image/jpeg', 0.8);
        
        // Save the cropped image
        saveProfilePhoto(croppedImageData);
        
        // Close modal
        closePhotoModal();
    };
    
    image.src = URL.createObjectURL(selectedFile);
}

function saveProfilePhoto(imageData) {
    const data = getPortfolioData();
    data.hero.profilePhoto = imageData;
    savePortfolioData(data);
    
    // Update UI
    updateProfilePhotoUI(imageData);
    showMessage('Profile photo updated successfully!', 'success');
}

function updateProfilePhotoUI(imageData) {
    const currentPhoto = document.getElementById('currentProfilePhoto');
    const noPhotoPlaceholder = document.getElementById('noPhotoPlaceholder');
    const removeBtn = document.getElementById('removePhotoBtn');
    
    if (imageData) {
        currentPhoto.src = imageData;
        currentPhoto.style.display = 'block';
        noPhotoPlaceholder.style.display = 'none';
        removeBtn.style.display = 'block';
    } else {
        currentPhoto.style.display = 'none';
        noPhotoPlaceholder.style.display = 'block';
        removeBtn.style.display = 'none';
    }
}

function removeProfilePhoto() {
    const data = getPortfolioData();
    data.hero.profilePhoto = null;
    savePortfolioData(data);
    
    // Update UI
    updateProfilePhotoUI(null);
    showMessage('Profile photo removed successfully!', 'success');
}

function closePhotoModal() {
    const modal = document.getElementById('photoCropperModal');
    if (modal) {
        modal.style.display = 'none';
    }
    
    // Reset file input
    const photoInput = document.getElementById('profilePhotoInput');
    if (photoInput) {
        photoInput.value = '';
    }
    
    selectedFile = null;
    cropperData = null;
}

// Authentication functions
function handleLogin(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        localStorage.setItem(STORAGE_KEYS.IS_LOGGED_IN, 'true');
        showDashboard();
        showMessage('Login successful!', 'success');
    } else {
        showMessage('Invalid credentials. Please try again.', 'error');
    }
}

function handleLogout() {
    localStorage.removeItem(STORAGE_KEYS.IS_LOGGED_IN);
    showLoginScreen();
    showMessage('Logged out successfully.', 'success');
}

function showLoginScreen() {
    document.getElementById('loginScreen').style.display = 'flex';
    document.getElementById('adminDashboard').style.display = 'none';
}

function showDashboard() {
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('adminDashboard').style.display = 'flex';
    
    // Load portfolio data when dashboard is shown
    setTimeout(() => {
        loadPortfolioData();
    }, 100);
}

// Tab navigation
function switchTab(tabName) {
    // Remove active class from all tabs and content
    document.querySelectorAll('.nav-tab').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

    // Add active class to selected tab and content
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    document.getElementById(`${tabName}Tab`).classList.add('active');
}

// Data management functions
function loadPortfolioData() {
    const data = getPortfolioData();
    
    // Load navigation name
    document.getElementById('navName').value = data.navName || '';
    
    // Load hero data
    if (data.hero) {
        document.getElementById('heroName').value = data.hero.name;
        document.getElementById('heroTitle').value = data.hero.title;
        document.getElementById('heroDescription').value = data.hero.description;
        
        // Load profile photo
        if (data.hero.profilePhoto) {
            updateProfilePhotoUI(data.hero.profilePhoto);
        }
    }

    // Load about data
    if (data.about) {
        document.getElementById('aboutText1').value = data.about.text1;
        document.getElementById('aboutText2').value = data.about.text2;
        document.getElementById('stat1Number').value = data.about.stats.experience;
        document.getElementById('stat2Number').value = data.about.stats.projects;
    }

    // Load skills data
    if (data.skills) {
        loadSkillsData(data.skills);
    }

    // Load projects data
    if (data.projects) {
        loadProjectsData(data.projects);
    }

    // Load footer data
    if (data.footer) {
        document.getElementById('footerText').value = data.footer.text;
    }

}

function getPortfolioData() {
    try {
        const stored = localStorage.getItem(STORAGE_KEYS.PORTFOLIO_DATA);
        console.log('🔍 Raw localStorage data:', stored);
        
        if (stored) {
            const data = JSON.parse(stored);
            console.log('✅ Portfolio data loaded from localStorage:', data);
            return data;
        } else {
            console.log('⚠️ No data in localStorage, using default data');
            return DEFAULT_PORTFOLIO_DATA;
        }
    } catch (error) {
        console.error('❌ Error loading portfolio data:', error);
        console.log('⚠️ Using default data due to error');
        return DEFAULT_PORTFOLIO_DATA;
    }
}

function savePortfolioData(data) {
    try {
        localStorage.setItem(STORAGE_KEYS.PORTFOLIO_DATA, JSON.stringify(data));
        console.log('✅ Portfolio data saved successfully:', data);
        
        // Verify the data was actually saved
        const savedData = localStorage.getItem(STORAGE_KEYS.PORTFOLIO_DATA);
        if (savedData) {
            console.log('✅ Data verification: Data exists in localStorage');
        } else {
            console.error('❌ Data verification failed: No data found in localStorage');
        }
    } catch (error) {
        console.error('❌ Error saving portfolio data:', error);
    }
}

// Load skills data into admin forms
function loadSkillsData(skillsData) {
    // Load frontend skills
    const frontendSkills = document.getElementById('frontendSkills');
    if (frontendSkills && skillsData.frontend) {
        frontendSkills.innerHTML = '';
        skillsData.frontend.forEach(skill => {
            const skillItem = document.createElement('div');
            skillItem.className = 'skill-item-editor';
            skillItem.innerHTML = `
                <input type="text" placeholder="Skill name" value="${skill.name}">
                <input type="text" placeholder="Icon class" value="${skill.icon}">
                <button type="button" class="btn btn-danger btn-sm remove-skill"><i class="fas fa-trash"></i></button>
            `;
            frontendSkills.appendChild(skillItem);
        });
    }

    // Load backend skills
    const backendSkills = document.getElementById('backendSkills');
    if (backendSkills && skillsData.backend) {
        backendSkills.innerHTML = '';
        skillsData.backend.forEach(skill => {
            const skillItem = document.createElement('div');
            skillItem.className = 'skill-item-editor';
            skillItem.innerHTML = `
                <input type="text" placeholder="Skill name" value="${skill.name}">
                <input type="text" placeholder="Icon class" value="${skill.icon}">
                <button type="button" class="btn btn-danger btn-sm remove-skill"><i class="fas fa-trash"></i></button>
            `;
            backendSkills.appendChild(skillItem);
        });
    }

    // Load tools
    const toolsSkills = document.getElementById('toolsSkills');
    if (toolsSkills && skillsData.tools) {
        toolsSkills.innerHTML = '';
        skillsData.tools.forEach(skill => {
            const skillItem = document.createElement('div');
            skillItem.className = 'skill-item-editor';
            skillItem.innerHTML = `
                <input type="text" placeholder="Skill name" value="${skill.name}">
                <input type="text" placeholder="Icon class" value="${skill.icon}">
                <button type="button" class="btn btn-danger btn-sm remove-skill"><i class="fas fa-trash"></i></button>
            `;
            toolsSkills.appendChild(skillItem);
        });
    }
}

// Load projects data into admin forms
function loadProjectsData(projectsData) {
    const projectsList = document.getElementById('projectsList');
    if (projectsList && projectsData) {
        projectsList.innerHTML = '';
        projectsData.forEach((project, index) => {
            const projectEditor = document.createElement('div');
            projectEditor.className = 'project-editor';
            projectEditor.innerHTML = `
                <h4>Project ${index + 1}</h4>
                <div class="form-group">
                    <label>Project Title</label>
                    <input type="text" class="project-title" value="${project.title || ''}">
                </div>
                <div class="form-group">
                    <label>Description</label>
                    <textarea class="project-description" rows="3">${project.description || ''}</textarea>
                </div>
                <div class="form-group">
                    <label>Technologies (comma separated)</label>
                    <input type="text" class="project-tech" value="${project.technologies || ''}">
                </div>
                <div class="form-group">
                    <label>GitHub Link</label>
                    <input type="url" class="project-github" value="${project.github || ''}">
                </div>
                <div class="form-group">
                    <label>Live Demo Link</label>
                    <input type="url" class="project-demo" value="${project.demo || ''}">
                </div>
                <button type="button" class="btn btn-danger remove-project">Remove Project</button>
            `;
            projectsList.appendChild(projectEditor);
        });
    }
}

// Form submission handlers
function handleHeroSubmit(e) {
    e.preventDefault();
    
    const data = getPortfolioData();
    data.navName = document.getElementById('navName').value;
    data.hero = {
        name: document.getElementById('heroName').value,
        title: document.getElementById('heroTitle').value,
        description: document.getElementById('heroDescription').value,
        profilePhoto: data.hero.profilePhoto // Preserve existing profile photo
    };
    
    savePortfolioData(data);
    showMessage('Hero section updated successfully!', 'success');
}

function handleAboutSubmit(e) {
    e.preventDefault();
    
    const data = getPortfolioData();
    data.about = {
        text1: document.getElementById('aboutText1').value,
        text2: document.getElementById('aboutText2').value,
        stats: {
            experience: parseInt(document.getElementById('stat1Number').value),
            projects: parseInt(document.getElementById('stat2Number').value)
        }
    };
    
    savePortfolioData(data);
    showMessage('About section updated successfully!', 'success');
}

function handleSkillsSubmit() {
    const data = getPortfolioData();
    
    // Collect frontend skills
    const frontendSkills = [];
    document.querySelectorAll('#frontendSkills .skill-item-editor').forEach(item => {
        const inputs = item.querySelectorAll('input');
        if (inputs[0].value && inputs[1].value) {
            frontendSkills.push({
                name: inputs[0].value,
                icon: inputs[1].value
            });
        }
    });

    // Collect backend skills
    const backendSkills = [];
    document.querySelectorAll('#backendSkills .skill-item-editor').forEach(item => {
        const inputs = item.querySelectorAll('input');
        if (inputs[0].value && inputs[1].value) {
            backendSkills.push({
                name: inputs[0].value,
                icon: inputs[1].value
            });
        }
    });

    // Collect tools
    const toolsSkills = [];
    document.querySelectorAll('#toolsSkills .skill-item-editor').forEach(item => {
        const inputs = item.querySelectorAll('input');
        if (inputs[0].value && inputs[1].value) {
            toolsSkills.push({
                name: inputs[0].value,
                icon: inputs[1].value
            });
        }
    });

    data.skills = {
        frontend: frontendSkills,
        backend: backendSkills,
        tools: toolsSkills
    };
    
    savePortfolioData(data);
    showMessage('Skills updated successfully!', 'success');
}

function handleProjectsSubmit() {
    const data = getPortfolioData();
    const projects = [];
    
    document.querySelectorAll('.project-editor').forEach(project => {
        const title = project.querySelector('.project-title').value;
        const description = project.querySelector('.project-description').value;
        const technologies = project.querySelector('.project-tech').value;
        const github = project.querySelector('.project-github').value;
        const demo = project.querySelector('.project-demo').value;
        
        if (title && description) {
            projects.push({
                title,
                description,
                technologies,
                github,
                demo
            });
        }
    });
    
    data.projects = projects;
    savePortfolioData(data);
    showMessage('Projects updated successfully!', 'success');
}

function handleFooterSubmit(e) {
    e.preventDefault();
    
    const data = getPortfolioData();
    data.footer = {
        text: document.getElementById('footerText').value
    };
    
    savePortfolioData(data);
    showMessage('Footer updated successfully!', 'success');
}



// Skills management functions
function addSkill(category) {
    const skillList = document.getElementById(`${category}Skills`);
    const skillItem = document.createElement('div');
    skillItem.className = 'skill-item-editor';
    skillItem.innerHTML = `
        <input type="text" placeholder="Skill name">
        <input type="text" placeholder="Icon class">
        <button type="button" class="btn btn-danger btn-sm remove-skill"><i class="fas fa-trash"></i></button>
    `;
    skillList.appendChild(skillItem);
}

// Projects management functions
function addProject() {
    const projectsList = document.getElementById('projectsList');
    const projectCount = projectsList.children.length + 1;
    
    const projectEditor = document.createElement('div');
    projectEditor.className = 'project-editor';
    projectEditor.innerHTML = `
        <h4>Project ${projectCount}</h4>
        <div class="form-group">
            <label>Project Title</label>
            <input type="text" class="project-title" placeholder="Enter project title">
        </div>
        <div class="form-group">
            <label>Description</label>
            <textarea class="project-description" rows="3" placeholder="Enter project description"></textarea>
        </div>
        <div class="form-group">
            <label>Technologies (comma separated)</label>
            <input type="text" class="project-tech" placeholder="e.g., React, Node.js, MongoDB">
        </div>
        <div class="form-group">
            <label>GitHub Link</label>
            <input type="url" class="project-github" placeholder="https://github.com/...">
        </div>
        <div class="form-group">
            <label>Live Demo Link</label>
            <input type="url" class="project-demo" placeholder="https://...">
        </div>
        <button type="button" class="btn btn-danger remove-project">Remove Project</button>
    `;
    
    projectsList.appendChild(projectEditor);
}

// Utility functions
function showMessage(message, type = 'success') {
    // Remove existing messages
    const existingMessages = document.querySelectorAll('.message');
    existingMessages.forEach(msg => msg.remove());
    
    // Create new message
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;
    
    // Insert message at the top of the active tab content
    const activeTab = document.querySelector('.tab-content.active');
    if (activeTab) {
        activeTab.insertBefore(messageDiv, activeTab.firstChild);
        
        // Auto-remove message after 3 seconds
        setTimeout(() => {
            messageDiv.remove();
        }, 3000);
    }
}

// Export data function (for backup)
function exportPortfolioData() {
    const data = getPortfolioData();
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'portfolio-data.json';
    link.click();
    
    URL.revokeObjectURL(url);
}

// Refresh main portfolio page
function refreshPortfolioPage() {
    // Open the main portfolio page in a new tab to see changes
    window.open('index.html', '_blank');
    showMessage('Portfolio page opened in new tab. Refresh to see changes.', 'success');
}

// Import data function (for restore)
function importPortfolioData(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            savePortfolioData(data);
            loadPortfolioData();
            showMessage('Portfolio data imported successfully!', 'success');
        } catch (error) {
            showMessage('Invalid file format. Please select a valid JSON file.', 'error');
        }
    };
    reader.readAsText(file);
}

// Add export/import functionality to the admin panel
function addDataManagementButtons() {
    const adminContent = document.querySelector('.admin-content');
    if (adminContent) {
        const dataManagementDiv = document.createElement('div');
        dataManagementDiv.className = 'data-management';
        dataManagementDiv.innerHTML = `
            <h3>Data Management</h3>
            <div class="data-buttons">
                <button type="button" class="btn btn-secondary" onclick="exportPortfolioData()">
                    <i class="fas fa-download"></i> Export Data
                </button>
                <label for="importFile" class="btn btn-secondary">
                    <i class="fas fa-upload"></i> Import Data
                </label>
                <input type="file" id="importFile" accept=".json" style="display: none;" 
                       onchange="importPortfolioData(this.files[0])">
                <button type="button" class="btn btn-primary" onclick="refreshPortfolioPage()">
                    <i class="fas fa-eye"></i> View Portfolio
                </button>
                <button type="button" class="btn btn-warning" onclick="debugLocalStorage()">
                    <i class="fas fa-bug"></i> Debug Storage
                </button>
                <button type="button" class="btn btn-danger" onclick="resetToDefault()">
                    <i class="fas fa-undo"></i> Reset to Default
                </button>
            </div>
        `;
        adminContent.appendChild(dataManagementDiv);
    }
}

// Debug and utility functions
function debugLocalStorage() {
    console.log('🔍 === LOCALSTORAGE DEBUG ===');
    console.log('Storage key:', STORAGE_KEYS.PORTFOLIO_DATA);
    
    const rawData = localStorage.getItem(STORAGE_KEYS.PORTFOLIO_DATA);
    console.log('Raw data:', rawData);
    
    if (rawData) {
        try {
            const parsedData = JSON.parse(rawData);
            console.log('Parsed data:', parsedData);
            console.log('Data structure check:');
            console.log('- navName:', parsedData.navName);
            console.log('- hero:', parsedData.hero);
            console.log('- about:', parsedData.about);
            console.log('- skills:', parsedData.skills);
            console.log('- projects:', parsedData.projects);
        } catch (error) {
            console.error('Error parsing data:', error);
        }
    } else {
        console.log('No data found in localStorage');
    }
    
    // Test saving some data
    const testData = { ...DEFAULT_PORTFOLIO_DATA, navName: 'TEST NAME' };
    localStorage.setItem(STORAGE_KEYS.PORTFOLIO_DATA, JSON.stringify(testData));
    console.log('✅ Test data saved');
    
    const retrieved = localStorage.getItem(STORAGE_KEYS.PORTFOLIO_DATA);
    console.log('Retrieved test data:', retrieved);
    
    showMessage('Debug info logged to console. Check browser console for details.', 'success');
}

function resetToDefault() {
    if (confirm('Are you sure you want to reset all data to default values?')) {
        localStorage.removeItem(STORAGE_KEYS.PORTFOLIO_DATA);
        loadPortfolioData();
        showMessage('Data reset to default values!', 'success');
    }
}

// Initialize data management buttons when dashboard is shown
document.addEventListener('DOMContentLoaded', function() {
    if (localStorage.getItem(STORAGE_KEYS.IS_LOGGED_IN) === 'true') {
        setTimeout(addDataManagementButtons, 100);
    }
}); 