// main.js - Modern Minimalist Portfolio Logic

document.addEventListener('DOMContentLoaded', () => {
    // 1. Top Scroll Progress Bar & Floating Back-to-Top Button
    const progressBar = document.getElementById('scroll-progress');
    const backToTopBtn = document.getElementById('back-to-top');

    const updateScrollState = () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const progressPercentage = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
        
        if (progressBar) {
            progressBar.style.width = `${progressPercentage}%`;
        }

        if (backToTopBtn) {
            if (scrollTop > 400) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }
    };

    window.addEventListener('scroll', updateScrollState, { passive: true });

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // 2. Mobile Drawer Navigation Toggle
    const hamburgerBtn = document.getElementById('hamburger-toggle');
    const mobileDrawer = document.getElementById('mobile-drawer');
    const mobileLinks = document.querySelectorAll('.mobile-nav-btn');

    if (hamburgerBtn && mobileDrawer) {
        hamburgerBtn.addEventListener('click', () => {
            mobileDrawer.classList.toggle('open');
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileDrawer.classList.remove('open');
            });
        });
    }

    // 3. Dark/Light Mode Theme Toggle
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');

    const sunIcon = `<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>`;
    const moonIcon = `<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>`;

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        if (themeIcon) themeIcon.innerHTML = moonIcon;
    } else {
        document.documentElement.removeAttribute('data-theme');
        if (themeIcon) themeIcon.innerHTML = sunIcon;
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            if (isDark) {
                document.documentElement.removeAttribute('data-theme');
                themeIcon.innerHTML = sunIcon;
                localStorage.setItem('theme', 'light');
            } else {
                document.documentElement.setAttribute('data-theme', 'dark');
                themeIcon.innerHTML = moonIcon;
                localStorage.setItem('theme', 'dark');
            }
        });
    }

    // 4. Preserved Typing Effect for Hero Code Window
    const codeString = `const developer = {
  name: "Aafan Kotawdekar",
  role: "Software & Android Developer",
  focus: "Building real-world applications",
  isCodingRightNow: true
};

function innovate() {
  return "Turning ideas into scalable software 🚀";
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
                typingCodeElement.innerHTML = highlightSyntax(currentText) + '<span style="border-right: 2px solid var(--accent-primary); margin-left: 2px;"></span>';
                i++;
                setTimeout(typeWriter, Math.random() * 35 + 20);
            } else {
                typingCodeElement.innerHTML = highlightSyntax(codeString);
            }
        };

        setTimeout(typeWriter, 800);
    }

    // 5. Copy Email Toast Notification
    const copyEmailBtn = document.getElementById('copy-email-btn');
    const toast = document.getElementById('toast');

    if (copyEmailBtn && toast) {
        copyEmailBtn.addEventListener('click', () => {
            const email = 'aafankotawdekar30@gmail.com';
            navigator.clipboard.writeText(email).then(() => {
                toast.textContent = "Email copied to clipboard!";
                toast.classList.add('show');
                setTimeout(() => {
                    toast.classList.remove('show');
                }, 3000);
            }).catch(err => {
                console.error('Copy failed: ', err);
            });
        });
    }

    // Contact Form Interactive Submission Handler
    const contactForm = document.getElementById('contact-form');
    if (contactForm && toast) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('user_name')?.value || '';
            const email = document.getElementById('user_email')?.value || '';
            const message = document.getElementById('user_message')?.value || '';

            // Construct pre-filled mailto URL
            const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
            const body = encodeURIComponent(`Hi Aafan,\n\n${message}\n\nBest regards,\n${name}\n${email}`);
            const mailtoUrl = `mailto:aafankotawdekar30@gmail.com?subject=${subject}&body=${body}`;

            // Launch default mail client
            window.location.href = mailtoUrl;

            toast.textContent = "Opening mail client... Thank you for reaching out!";
            toast.classList.add('show');
            contactForm.reset();

            setTimeout(() => {
                toast.classList.remove('show');
                toast.textContent = "Email copied to clipboard!";
            }, 4000);
        });
    }

    // 6. Skills Canvas Continuous Bouncing & Collision Physics Engine
    const bubbleCanvas = document.getElementById('bubbleCanvas');
    const bubbleNodes = document.querySelectorAll('.bubble-node');
    const tabBtns = document.querySelectorAll('.tab-btn');

    if (bubbleCanvas && bubbleNodes.length > 0) {
        const nodeMap = [];
        let mouseX = null;
        let mouseY = null;
        let animationFrameId = null;

        function initNodes() {
            const isMobile = window.innerWidth < 768;
            const rawWidth = bubbleCanvas.offsetWidth || (isMobile ? 320 : 900);
            const rawHeight = bubbleCanvas.offsetHeight || (isMobile ? 480 : 380);
            const padding = 45;

            nodeMap.length = 0;

            bubbleNodes.forEach((node) => {
                if (node.style.display === 'none') return;

                const isHighlight = node.classList.contains('highlight-java') || node.classList.contains('highlight-android');
                const radius = isHighlight ? 42 : 32;

                const randomX = (Math.random() - 0.5) * (rawWidth - padding * 2);
                const randomY = (Math.random() - 0.5) * (rawHeight - padding * 2);

                // Random initial float velocity vector
                const angle = Math.random() * Math.PI * 2;
                const speed = 0.8 + Math.random() * 0.8;
                const vx = Math.cos(angle) * speed;
                const vy = Math.sin(angle) * speed;

                nodeMap.push({
                    element: node,
                    x: randomX,
                    y: randomY,
                    vx: vx,
                    vy: vy,
                    radius: radius
                });
            });
        }

        initNodes();

        let layoutTimer;
        window.addEventListener('resize', () => {
            clearTimeout(layoutTimer);
            layoutTimer = setTimeout(initNodes, 200);
        });

        // Track Mouse position relative to center of canvas
        bubbleCanvas.addEventListener('mousemove', (e) => {
            const rect = bubbleCanvas.getBoundingClientRect();
            mouseX = e.clientX - rect.left - rect.width / 2;
            mouseY = e.clientY - rect.top - rect.height / 2;
        });

        bubbleCanvas.addEventListener('mouseleave', () => {
            mouseX = null;
            mouseY = null;
        });

        // 60FPS Continuous Physics Loop
        function updatePhysics() {
            const isMobile = window.innerWidth < 768;
            const rawWidth = bubbleCanvas.offsetWidth || (isMobile ? 320 : 900);
            const rawHeight = bubbleCanvas.offsetHeight || (isMobile ? 380 : 380);
            const maxX = (rawWidth / 2) - 35;
            const maxY = (rawHeight / 2) - 35;

            // 1. Move nodes & Bounce off Walls
            nodeMap.forEach(node => {
                node.x += node.vx;
                node.y += node.vy;

                // Wall Collisions (Reverse direction on impact)
                if (node.x > maxX) {
                    node.x = maxX;
                    node.vx = -Math.abs(node.vx);
                } else if (node.x < -maxX) {
                    node.x = -maxX;
                    node.vx = Math.abs(node.vx);
                }

                if (node.y > maxY) {
                    node.y = maxY;
                    node.vy = -Math.abs(node.vy);
                } else if (node.y < -maxY) {
                    node.y = -maxY;
                    node.vy = Math.abs(node.vy);
                }

                // Mouse Repulsion Physics
                if (mouseX !== null && mouseY !== null) {
                    const dx = node.x - mouseX;
                    const dy = node.y - mouseY;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    const pushRadius = 120;

                    if (dist < pushRadius && dist > 0) {
                        const force = (pushRadius - dist) / pushRadius;
                        const nx = dx / dist;
                        const ny = dy / dist;

                        node.vx += nx * force * 0.8;
                        node.vy += ny * force * 0.8;
                    }
                }
            });

            // 2. Inter-Node Elastic Collisions (Bounce off each other when touching)
            for (let i = 0; i < nodeMap.length; i++) {
                for (let j = i + 1; j < nodeMap.length; j++) {
                    const nodeA = nodeMap[i];
                    const nodeB = nodeMap[j];

                    const dx = nodeB.x - nodeA.x;
                    const dy = nodeB.y - nodeA.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    const minDist = nodeA.radius + nodeB.radius + 4;

                    if (dist < minDist && dist > 0) {
                        const nx = dx / dist;
                        const ny = dy / dist;

                        // Separate overlapping nodes
                        const overlap = (minDist - dist) * 0.5;
                        nodeA.x -= nx * overlap;
                        nodeA.y -= ny * overlap;
                        nodeB.x += nx * overlap;
                        nodeB.y += ny * overlap;

                        // Elastic Velocity Transfer
                        const kx = nodeA.vx - nodeB.vx;
                        const ky = nodeA.vy - nodeB.vy;
                        const p = 2 * (nx * kx + ny * ky) / 2;

                        nodeA.vx -= p * nx;
                        nodeA.vy -= p * ny;
                        nodeB.vx += p * nx;
                        nodeB.vy += p * ny;
                    }
                }
            }

            // 3. Render Positions & Limit Maximum Speed
            nodeMap.forEach(node => {
                const speed = Math.sqrt(node.vx * node.vx + node.vy * node.vy);
                const minSpeed = 0.6;
                const maxSpeed = 3.2;

                if (speed < minSpeed) {
                    node.vx = (node.vx / (speed || 1)) * minSpeed;
                    node.vy = (node.vy / (speed || 1)) * minSpeed;
                } else if (speed > maxSpeed) {
                    node.vx = (node.vx / speed) * maxSpeed;
                    node.vy = (node.vy / speed) * maxSpeed;
                }

                node.element.style.transform = `translate(calc(-50% + ${node.x}px), calc(-50% + ${node.y}px))`;
            });

            animationFrameId = requestAnimationFrame(updatePhysics);
        }

        if (animationFrameId) cancelAnimationFrame(animationFrameId);
        updatePhysics();

        // Category Tab Filtering
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                tabBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const selectedCategory = btn.getAttribute('data-category');

                bubbleNodes.forEach(node => {
                    const cat = node.getAttribute('data-cat');
                    if (selectedCategory === 'all' || cat === selectedCategory) {
                        node.style.display = 'flex';
                    } else {
                        node.style.display = 'none';
                    }
                });

                initNodes();
            });
        });
    }
});
