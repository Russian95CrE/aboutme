// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    if (hamburger && navMenu) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 100) {
            navbar.style.background = '#c0c0c0';
            navbar.style.boxShadow = 'inset 0 1px 0 #ffffff, inset 0 -1px 0 #808080';
        } else {
            navbar.style.background = '#c0c0c0';
            navbar.style.boxShadow = 'inset 0 1px 0 #ffffff, inset 0 -1px 0 #808080';
        }
    }
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Window management functions
function showWindow(id) {
    const win = document.getElementById(id);
    if (win) {
        win.classList.remove('window-closed');
        win.classList.add('window-open');
        win.style.zIndex = '9999';
    }
}

function hideWindow(id) {
    const win = document.getElementById(id);
    if (win) {
        win.classList.remove('window-open');
        win.classList.add('window-closed');
    }
}

// Make window draggable (attach to section itself)
function makeWindowDraggable(windowId) {
    const win = document.getElementById(windowId);
    if (!win) return;
    const titleBar = win.querySelector('.window-titlebar');
    if (!titleBar) return;
    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;
    titleBar.style.cursor = 'move';
    titleBar.addEventListener('mousedown', function(e) {
        isDragging = true;
        win.classList.add('dragging');
        win.style.zIndex = '9999';
        const rect = win.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;
        document.body.style.userSelect = 'none';
        e.preventDefault();
        e.stopPropagation();
    });
    document.addEventListener('mousemove', function(e) {
        if (!isDragging) return;
        let x = e.clientX - offsetX;
        let y = e.clientY - offsetY;
        x = Math.max(0, Math.min(window.innerWidth - win.offsetWidth, x));
        y = Math.max(0, Math.min(window.innerHeight - win.offsetHeight - 40, y));
        win.style.left = x + 'px';
        win.style.top = y + 'px';
    });
    document.addEventListener('mouseup', function() {
        if (isDragging) {
            isDragging = false;
            win.classList.remove('dragging');
            document.body.style.userSelect = '';
        }
    });
}

// Typing effect for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Yes
function myfriend() {
    location.href = "https://luminumsrv.win";
}

// Clock
function updateClock() {
    const clockElement = document.getElementById('taskbar-clock');
    if (clockElement) {
        const now = new Date();
        
        // Use toLocaleTimeString to ensure we get the correct local time
        const timeString = now.toLocaleTimeString('en-US', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        
        clockElement.textContent = timeString;
    }
}

// Main initialization
window.addEventListener('DOMContentLoaded', function() {
    // Start button alert
    document.querySelector('.start-btn')?.addEventListener('click', () => {
        alert('Curious, huh?');
    });
    
    // Open/close logic
    document.getElementById('open-home')?.addEventListener('click', () => showWindow('home'));
    document.getElementById('open-projects')?.addEventListener('click', () => showWindow('projects'));
    document.getElementById('open-social')?.addEventListener('click', () => showWindow('social'));
    document.getElementById('taskbar-home')?.addEventListener('click', () => showWindow('home'));
    document.getElementById('taskbar-projects')?.addEventListener('click', () => showWindow('projects'));
    document.getElementById('taskbar-social')?.addEventListener('click', () => showWindow('social'));
    document.getElementById('open-projects-btn')?.addEventListener('click', e => { e.preventDefault(); showWindow('projects'); });
    document.getElementById('open-social-btn')?.addEventListener('click', e => { e.preventDefault(); showWindow('social'); });
    document.querySelectorAll('.window-control[data-close="home"]').forEach(btn => btn.addEventListener('click', () => hideWindow('home')));
    document.querySelectorAll('.window-control[data-close="projects"]').forEach(btn => btn.addEventListener('click', () => hideWindow('projects')));
    document.querySelectorAll('.window-control[data-close="social"]').forEach(btn => btn.addEventListener('click', () => hideWindow('social')));
    document.getElementById('open-stella')?.addEventListener('click', () => showWindow('stella'));
    document.getElementById('taskbar-stella')?.addEventListener('click', () => showWindow('stella'));
    document.querySelectorAll('.window-control[data-close="stella"]').forEach(btn => btn.addEventListener('click', () => hideWindow('stella')));
    document.getElementById('open-nick')?.addEventListener('click', () => showWindow('nick'));
    document.getElementById('taskbar-nick')?.addEventListener('click', () => showWindow('nick'));
    document.querySelectorAll('.window-control[data-close="nick"]').forEach(btn => btn.addEventListener('click', () => hideWindow('nick')));
    document.getElementById('open-hardware')?.addEventListener('click', () => showWindow('hardware'));
    document.getElementById('taskbar-hardware')?.addEventListener('click', () => showWindow('hardware'));
    document.querySelectorAll('.window-control[data-close="hardware"]').forEach(btn => btn.addEventListener('click', () => hideWindow('hardware')));
    // Prevent window controls from interfering with dragging
    document.querySelectorAll('.window-controls').forEach(controls => controls.addEventListener('mousedown', e => e.stopPropagation()));
    // Make all windows draggable
    makeWindowDraggable('home');
    makeWindowDraggable('projects');
    makeWindowDraggable('social');
    makeWindowDraggable('stella');
    makeWindowDraggable('nick');
    makeWindowDraggable('hardware');
    // Start clock
    setInterval(updateClock, 1000);
    updateClock();
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Add CSS for active navigation link
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: #000000 !important;
        background: #ffffff !important;
        border: 1px solid #000000 !important;
        box-shadow: inset 1px 1px 0 #ffffff, inset -1px -1px 0 #808080 !important;
    }
`;
document.head.appendChild(style); 