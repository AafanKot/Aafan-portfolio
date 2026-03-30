// main.js - Portfolio Interaction Logic

document.addEventListener('DOMContentLoaded', () => {
    // 1. Intersection Observer for Scroll Animations
    // Finds elements with specific classes and adds 'visible' when they scroll into view
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Triggers when 15% of the element is visible
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Opt-out component immediately from JS tracking loop post-animation explicitly preventing heavy re-firing scroll lag
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    // Elements to animate on scroll
    const slideUpElements = document.querySelectorAll('.slide-up-trigger');
    const scaleElements = document.querySelectorAll('.scale-trigger');
    
    slideUpElements.forEach(el => scrollObserver.observe(el));
    scaleElements.forEach(el => scrollObserver.observe(el));

    // 2. Smooth Scrolling for Navigation Links
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only apply to internal anchor links
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                
                if (targetElement) {
                    // Smoothly scroll to target
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // 3. Optional parallax effect on mouse move for the background blobs
    const blobs = document.querySelectorAll('.blob');
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        blobs.forEach((blob, index) => {
            const speed = (index + 1) * 20;
            const xOffset = (x - 0.5) * speed;
            const yOffset = (y - 0.5) * speed;
            
            blob.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
        });
    });

    // 4. Dark/Light Mode Toggle
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    
    // SVG paths
    const sunIcon = '<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>';
    const moonIcon = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>';

    // Load initial from localstorage
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
        if (themeIcon) themeIcon.innerHTML = moonIcon;
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            let theme = document.documentElement.getAttribute('data-theme');
            
            if (theme === 'light') {
                document.documentElement.removeAttribute('data-theme');
                themeIcon.innerHTML = sunIcon;
                localStorage.setItem('theme', 'dark');
            } else {
                document.documentElement.setAttribute('data-theme', 'light');
                themeIcon.innerHTML = moonIcon;
                localStorage.setItem('theme', 'light');
            }
        });
    }

    // 5. Typing Effect for Hero Code Window
    const codeString = `const developer = {
  name: "Aafan Kotawdekar",
  role: "Software Developer",
  focus: "Building real-world apps",
  isCodingRightNow: true
};

function innovate() {
  return "Turning ideas into real apps 🚀";
}`;
    
    const typingCodeElement = document.getElementById('typing-code');
    if (typingCodeElement) {
        let i = 0;
        
        const highlightSyntax = (code) => {
            let res = code.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
            res = res.replace(/\b(const|function|return|true)\b/g, "<span class='keyword'>$1</span>");
            res = res.replace(/\b(developer|innovate)\b/g, "<span class='variable'>$1</span>");
            res = res.replace(/(name:|role:|focus:|isCodingRightNow:)/g, "<span class='property'>$1</span>");
            res = res.replace(/("[^"]*")/g, "<span class='string'>$1</span>");
            return res;
        };

        const typeWriter = () => {
            if (i <= codeString.length) {
                const currentText = codeString.substring(0, i);
                typingCodeElement.innerHTML = highlightSyntax(currentText) + '<span class="cursor" style="border-right: 2px solid var(--accent-cyan); margin-left: 2px;"></span>';
                i++;
                const typingSpeed = Math.random() * 40 + 20; // 20-60ms per char
                setTimeout(typeWriter, typingSpeed);
            } else {
                typingCodeElement.innerHTML = highlightSyntax(codeString) + '<span class="cursor blink" style="border-right: 2px solid var(--accent-cyan); margin-left: 2px;"></span>';
            }
        };
        
        setTimeout(typeWriter, 1000); // Start after 1 second
    }

    // 6. Directional Hover for Nav Buttons
    const navBtns = document.querySelectorAll('.nav-btn');
    navBtns.forEach(btn => {
        btn.addEventListener('mouseenter', function(e) {
            const rect = this.getBoundingClientRect();
            const relX = e.clientX - rect.left;
            if (relX < rect.width / 2) {
                this.style.setProperty('--hover-origin', 'left');
            } else {
                this.style.setProperty('--hover-origin', 'right');
            }
        });
        
        btn.addEventListener('mouseleave', function(e) {
            const rect = this.getBoundingClientRect();
            const relX = e.clientX - rect.left;
            if (relX < rect.width / 2) {
                this.style.setProperty('--hover-origin', 'right');
            } else {
                this.style.setProperty('--hover-origin', 'left');
            }
        });
    });

    // 7. Bubble Physics Skills Section
    const bubbleCanvas = document.getElementById('bubbleCanvas');
    const bubbleNodes = document.querySelectorAll('.bubble-node');
    
    if (bubbleCanvas && bubbleNodes.length > 0) {
        
        const nodeMap = [];

        function scatterNodes() {
            const isMobile = window.innerWidth < 768;
            
            // Obtain actual DOM width of canvas physically for random bounds logic
            const rawWidth = bubbleCanvas.offsetWidth || (isMobile ? window.innerWidth - 30 : 1000);
            const rawHeight = isMobile ? 550 : 350; 
            
            // Define safe clipping zone dynamically adjusting for tighter mobile resolutions
            const safePaddingX = isMobile ? 40 : 60;
            const safePaddingY = isMobile ? 40 : 50;

            nodeMap.length = 0; // Purge previous coordinate data
            const minimumSeparation = isMobile ? 68 : 85; // Allow tighter overlaps securely so multiple don't stack hidden

            // 1. Initial Scattered Random Plotting 
            bubbleNodes.forEach((node, index) => {
                
                let randomX, randomY;
                let overlapping = true;
                let attempts = 0;

                // Generate coordinates and validate they do not natively collide with others
                while (overlapping && attempts < 500) {
                    randomX = (Math.random() - 0.5) * (rawWidth - safePaddingX * 2);
                    randomY = (Math.random() - 0.5) * (rawHeight - safePaddingY * 2);
                    overlapping = false;

                    for (let i = 0; i < nodeMap.length; i++) {
                        const existingNode = nodeMap[i];
                        const dx = randomX - existingNode.baseX;
                        const dy = randomY - existingNode.baseY;
                        const distance = Math.sqrt(dx * dx + dy * dy);

                        if (distance < minimumSeparation) {
                            overlapping = true;
                            break;
                        }
                    }
                    attempts++;
                }
                
                const baseX = randomX;
                const baseY = randomY;
                
                // Immediately dispatch them to separated layout using CSS Calc
                node.style.transform = `translate(calc(-50% + ${baseX}px), calc(-50% + ${baseY}px))`;
                
                nodeMap.push({
                    element: node,
                    baseX: baseX,
                    baseY: baseY,
                    currentX: baseX,
                    currentY: baseY
                });
            });
        }

        // Initialize plotting script manually
        scatterNodes();

        // Listen for browser re-sizings actively (e.g. flipping Dev Tools orientation)
        let layoutTimer;
        window.addEventListener('resize', () => {
            clearTimeout(layoutTimer);
            layoutTimer = setTimeout(scatterNodes, 250); // Recalculate dimensions without memory leaks
        });

        // 2. The Repulsion Physics Loop
        bubbleCanvas.addEventListener('mousemove', (event) => {
            const canvasRect = bubbleCanvas.getBoundingClientRect();
            // Mouse coordinate relative to the true center of the canvas box
            const mouseXCenter = event.clientX - canvasRect.left - canvasRect.width / 2; 
            const mouseYCenter = event.clientY - canvasRect.top - canvasRect.height / 2; 
            
            const collisionRadius = 140; // Trigger radius for mouse
            const maximumDodgeForce = 85;   // Displace distance intensity

            nodeMap.forEach(nodeData => {
                // Calculate Vector delta between Mouse and current Base orbit position
                const deltaX = mouseXCenter - nodeData.baseX;
                const deltaY = mouseYCenter - nodeData.baseY;
                const exactDistance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

                if (exactDistance < collisionRadius) {
                    // Normalize vector directly away from mouse epicenter 
                    const pushFactor = (collisionRadius - exactDistance) / collisionRadius; 
                    const dirX = deltaX / exactDistance;
                    const dirY = deltaY / exactDistance;
                    
                    // Repulse coordinates!
                    nodeData.currentX = nodeData.baseX + (dirX * pushFactor * maximumDodgeForce);
                    nodeData.currentY = nodeData.baseY + (dirY * pushFactor * maximumDodgeForce);
                } else {
                    // Safe distance. Drift back home organically
                    nodeData.currentX = nodeData.baseX;
                    nodeData.currentY = nodeData.baseY;
                }
                
                // Inject mechanical displacement calculation
                nodeData.element.style.transform = `translate(calc(-50% + ${nodeData.currentX}px), calc(-50% + ${nodeData.currentY}px))`;
            });
        });

        // 3. Cleanup: Snap strictly back home when mouse physically dumps the canvas
        bubbleCanvas.addEventListener('mouseleave', () => {
            nodeMap.forEach(nodeData => {
                nodeData.currentX = nodeData.baseX;
                nodeData.currentY = nodeData.baseY;
                nodeData.element.style.transform = `translate(calc(-50% + ${nodeData.currentX}px), calc(-50% + ${nodeData.currentY}px))`;
            });
        });
    }

});
