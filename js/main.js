document.addEventListener('DOMContentLoaded', () => {
    
    // --- Technical Menu Toggle ---
    const navToggle = document.querySelector('.nav-toggle');
    const navOverlay = document.querySelector('.nav-overlay');
    const toggleLabel = document.querySelector('.toggle-label');
    const navLinksOverlay = document.querySelectorAll('.nav-overlay a');

    if (navToggle && navOverlay) {
        navToggle.addEventListener('click', () => {
            const isActive = navOverlay.classList.toggle('active');
            toggleLabel.innerText = isActive ? '[ CLOSE ]' : '[ MENU ]';
            
            // Prevent body scroll when menu is open
            document.body.style.overflow = isActive ? 'hidden' : 'auto';
        });

        // Close menu when a link is clicked
        navLinksOverlay.forEach(link => {
            link.addEventListener('click', () => {
                navOverlay.classList.remove('active');
                toggleLabel.innerText = '[ MENU ]';
                document.body.style.overflow = 'auto';
            });
        });
    }

    // --- Custom Cursor Logic ---
    const dot = document.querySelector('.cursor-dot');
    const outline = document.querySelector('.cursor-outline');
    
    let mouseX = 0, mouseY = 0;
    let dotX = 0, dotY = 0;
    let outlineX = 0, outlineY = 0;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        // Smooth interpolation
        dotX += (mouseX - dotX) * 0.2;
        dotY += (mouseY - dotY) * 0.2;
        outlineX += (mouseX - outlineX) * 0.1;
        outlineY += (mouseY - outlineY) * 0.1;

        dot.style.left = `${dotX}px`;
        dot.style.top = `${dotY}px`;
        outline.style.left = `${outlineX}px`;
        outline.style.top = `${outlineY}px`;

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover interactions for cursor
    const interactables = document.querySelectorAll('a, button, input, textarea, .project-image');
    interactables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            outline.style.transform = 'translate(-50%, -50%) scale(1.5)';
            outline.style.backgroundColor = 'rgba(18, 18, 18, 0.05)';
        });
        el.addEventListener('mouseleave', () => {
            outline.style.transform = 'translate(-50%, -50%) scale(1)';
            outline.style.backgroundColor = 'transparent';
        });
    });

    // --- Magnetic Effect ---
    const magneticElements = document.querySelectorAll('.magnetic');
    magneticElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });
        el.addEventListener('mouseleave', () => {
            el.style.transform = 'translate(0px, 0px)';
        });
    });

    // --- Local Clock (Sri Lanka Time) ---
    function updateClock() {
        const options = { 
            timeZone: 'Asia/Colombo', 
            hour: '2-digit', minute: '2-digit', second: '2-digit', 
            hour12: false 
        };
        const formatter = new Intl.DateTimeFormat('en-GB', options);
        const timeString = formatter.format(new Date());
        const clockEl = document.getElementById('local-time');
        if (clockEl) clockEl.innerText = `[ LKA ${timeString} ]`;
    }
    setInterval(updateClock, 1000);
    updateClock();

    // --- Staggered Scroll Reveal (Pacing: 1, 2, 3, 5) ---
    const reveals = document.querySelectorAll('.reveal');
    const observerOptions = { threshold: 0.15 };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Fibonacci-style staggered reveal
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('active');
                }, delay);
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    reveals.forEach((el, index) => {
        // Assign delays based on sequence
        const sequence = [100, 200, 300, 500, 800];
        el.dataset.delay = sequence[index % sequence.length];
        revealObserver.observe(el);
    });

    // --- Smooth Scrolling ---
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // --- Auto-expand textarea ---
    const textarea = document.querySelector('textarea');
    if (textarea) {
        textarea.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
        });
    }
});
