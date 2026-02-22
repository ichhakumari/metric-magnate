// Initialize Lenis Smooth Scroll
const lenis = new Lenis()

function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
}

requestAnimationFrame(raf)

// Preloader Fade Out
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    gsap.to(preloader, {
        opacity: 0,
        duration: 1,
        ease: "power2.inOut",
        onComplete: () => {
            preloader.style.display = 'none';
            initAnimations();
        }
    });
});

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

function initAnimations() {
    // hero animations
    gsap.from(".hero h1", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
        delay: 0.2,
        stagger: 0.2
    });

    gsap.from(".hero p", {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.5
    });

    gsap.from(".hero-btns", {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.7
    });

    // Text Reveal Animation
    const revealTexts = document.querySelectorAll('.reveal-text');
    revealTexts.forEach(text => {
        gsap.from(text, {
            scrollTrigger: {
                trigger: text,
                start: "top 85%",
            },
            ease: "power3.out"
        });
    });

    // Fade Up Animations
    const fadeUps = document.querySelectorAll('.fade-up');
    fadeUps.forEach(item => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: "top 90%",
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out"
        });
    });

    // Services Stack Animation
    const stackCards = gsap.utils.toArray(".service-stack-card");
    stackCards.forEach((card, i) => {
        if (i !== stackCards.length - 1) {
            gsap.to(card, {
                scrollTrigger: {
                    trigger: card,
                    start: "top top",
                    end: "bottom top",
                    scrub: true,
                },
                scale: 0.8,
                opacity: 0.5,
                filter: "blur(10px)",
                ease: "none"
            });
        }

        // Content entrance animation
        gsap.from(card.querySelector(".stack-content"), {
            scrollTrigger: {
                trigger: card,
                start: "top 60%",
            },
            y: 100,
            opacity: 0,
            duration: 1.2,
            ease: "power4.out"
        });
    });

    // Why Choose Us reveal
    gsap.from(".why-card-scatter", {
        scrollTrigger: {
            trigger: ".why-scatter-area",
            start: "top 75%",
        },
        y: 80,
        opacity: 0,
        duration: 1.5,
        ease: "power4.out",
        stagger: 0.2,
        clearProps: "all" // Ensures the final state is defined by CSS
    });

    // Portfolio item reveal
    gsap.from(".work-item", {
        scrollTrigger: {
            trigger: ".work",
            start: "top 70%",
        },
        scale: 0.9,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
        stagger: 0.3
    });

    // Testimonial Interactive Grid
    const avatarItems = document.querySelectorAll(".avatar-item");
    const displayName = document.getElementById("display-name");
    const displayQuote = document.getElementById("display-quote");
    const displayAvatar = document.getElementById("display-avatar");
    const displayCard = document.querySelector(".testi-card");

    const nextBtn = document.getElementById("testi-next-btn");
    const prevBtn = document.getElementById("testi-prev-btn");

    avatarItems.forEach(item => {
        item.addEventListener("click", () => {
            if (item.classList.contains('active')) return;

            // Update Active State
            avatarItems.forEach(av => av.classList.remove("active"));
            item.classList.add("active");

            // Animate Content Out
            gsap.to(displayCard, {
                opacity: 0,
                y: 20,
                duration: 0.3,
                onComplete: () => {
                    // Update Content
                    displayName.textContent = item.getAttribute("data-name");
                    displayQuote.textContent = `"${item.getAttribute("data-quote")}"`;
                    displayAvatar.src = item.getAttribute("data-img");

                    // Animate Content In
                    gsap.to(displayCard, {
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                        ease: "power2.out"
                    });
                }
            });
        });
    });

    // Slider Navigation (Next/Prev)
    if (nextBtn) {
        nextBtn.addEventListener("click", () => {
            let currentIndex = Array.from(avatarItems).findIndex(item => item.classList.contains("active"));
            let nextIndex = (currentIndex + 1) % avatarItems.length;
            avatarItems[nextIndex].click();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener("click", () => {
            let currentIndex = Array.from(avatarItems).findIndex(item => item.classList.contains("active"));
            let prevIndex = (currentIndex - 1 + avatarItems.length) % avatarItems.length;
            avatarItems[prevIndex].click();
        });
    }
}

// Custom Cursor
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0
    });
    gsap.to(follower, {
        x: e.clientX - 16,
        y: e.clientY - 16,
        duration: 0.15
    });
});

// Hover effects for cursor
const links = document.querySelectorAll('a, button, .service-card, .work-item, .why-card-scatter');
links.forEach(link => {
    link.addEventListener('mouseenter', () => {
        gsap.to(follower, {
            scale: 2,
            backgroundColor: 'rgba(38, 211, 103, 0.1)',
            borderColor: 'transparent',
            duration: 0.3
        });
    });
    link.addEventListener('mouseleave', () => {
        gsap.to(follower, {
            scale: 1,
            backgroundColor: 'transparent',
            borderColor: '#26D367',
            duration: 0.3
        });
    });
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
const mobileMenu = id => {
    const menu = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menu.classList.toggle('is-active');
    });

    // Mobile dropdown toggle
    const dropdowns = document.querySelectorAll('.nav-dropdown');
    dropdowns.forEach(dd => {
        dd.querySelector('.nav-link').addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                dd.classList.toggle('active');
            }
        });
    });
}
mobileMenu();

// Stats Counter

// Stats Counter
const stats = document.querySelectorAll('.stat-num');
stats.forEach(stat => {
    const target = parseInt(stat.getAttribute('data-val'));
    gsap.to(stat, {
        scrollTrigger: {
            trigger: stat,
            start: "top 90%",
        },
        innerHTML: target,
        duration: 2,
        snap: { innerHTML: 1 },
        ease: "power3.out"
    });
});

// Magnetic Effect for Buttons
const magnetics = document.querySelectorAll('.btn-primary, .logo');
magnetics.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const bounding = btn.getBoundingClientRect();
        const x = e.clientX - bounding.left - bounding.width / 2;
        const y = e.clientY - bounding.top - bounding.height / 2;

        gsap.to(btn, {
            x: x * 0.3,
            y: y * 0.3,
            duration: 0.3,
            ease: "power2.out"
        });
    });

    btn.addEventListener('mouseleave', () => {
        gsap.to(btn, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: "elastic.out(1, 0.3)"
        });
    });
});

// Hero Visual Parallax
document.addEventListener('mousemove', (e) => {
    const visual = document.querySelector('.hero-visual');
    if (visual) {
        const x = (window.innerWidth / 2 - e.clientX) / 25;
        const y = (window.innerHeight / 2 - e.clientY) / 25;
        gsap.to(visual, {
            rotationY: x,
            rotationX: y,
            duration: 0.5
        });
    }
});
// Portfolio Slider Logic
function initWorkSlider() {
    const track = document.querySelector('.work-track');
    const items = document.querySelectorAll('.work-item');
    const nextBtn = document.querySelector('.work-nav.next');
    const prevBtn = document.querySelector('.work-nav.prev');
    const sliderWrapper = document.querySelector('.work-slider-wrapper');

    if (!track || items.length === 0) return;

    let index = 0;
    let autoPlayInterval;
    const gap = 20;

    function getVisibleCount() {
        if (window.innerWidth > 992) return 3;
        if (window.innerWidth > 640) return 2;
        return 1;
    }

    function getWidths() {
        const firstItem = items[0];
        const itemWidth = firstItem ? firstItem.offsetWidth + gap : 0;
        const maxIndex = items.length - getVisibleCount();
        return { itemWidth, maxIndex: Math.max(0, maxIndex) };
    }

    function updateSlider() {
        const { itemWidth, maxIndex } = getWidths();
        if (index > maxIndex) index = maxIndex;
        if (index < 0) index = 0;

        gsap.to(track, {
            x: -index * itemWidth,
            duration: 0.2,
            ease: "power4.out"
        });

        if (prevBtn) prevBtn.style.opacity = index === 0 ? "0.3" : "1";
        if (nextBtn) nextBtn.style.opacity = index >= maxIndex ? "0.3" : "1";
    }

    function startAutoPlay() {
        stopAutoPlay();
        autoPlayInterval = setInterval(() => {
            const { maxIndex } = getWidths();
            if (index < maxIndex) {
                index++;
            } else {
                index = 0;
            }
            updateSlider();
        }, 4000);
    }

    function stopAutoPlay() {
        if (autoPlayInterval) clearInterval(autoPlayInterval);
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            stopAutoPlay();
            const { maxIndex } = getWidths();
            index = (index < maxIndex) ? index + 1 : 0;
            updateSlider();
            startAutoPlay();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            stopAutoPlay();
            const { maxIndex } = getWidths();
            index = (index > 0) ? index - 1 : maxIndex;
            updateSlider();
            startAutoPlay();
        });
    }

    if (sliderWrapper) {
        sliderWrapper.addEventListener('mouseenter', stopAutoPlay);
        sliderWrapper.addEventListener('mouseleave', startAutoPlay);
    }

    // Small delay to ensure browser layout is stable
    setTimeout(() => {
        updateSlider();
        startAutoPlay();
    }, 500);

    window.addEventListener('resize', updateSlider);
}

// Ensure high performance initialization
window.addEventListener('load', initWorkSlider);
