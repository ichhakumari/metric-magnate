// Service Page JS — Portfolio Slider + Scroll Animations
document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);

    // Fade-up animations
    document.querySelectorAll('.fade-up').forEach(el => {
        gsap.from(el, {
            scrollTrigger: { trigger: el, start: 'top 90%' },
            y: 50, opacity: 0, duration: 0.8, ease: 'power3.out'
        });
    });

    // Hero entrance — staggered sequence
    const heroBadge = document.querySelector('.svc-hero-badge');
    const heroH1 = document.querySelector('.svc-hero h1');
    const heroDesc = document.querySelector('.svc-hero-desc');
    const heroBtns = document.querySelector('.svc-hero-btns');
    const heroVisual = document.querySelector('.svc-hero-visual');
    const heroBottom = document.querySelector('.svc-hero-bottom');

    if (heroBadge) gsap.from(heroBadge, { y: 30, opacity: 0, duration: 0.8, ease: 'power3.out', delay: 0.2 });
    if (heroH1) gsap.from(heroH1, { y: 80, opacity: 0, duration: 1.2, ease: 'power4.out', delay: 0.4 });
    if (heroDesc) gsap.from(heroDesc, { y: 30, opacity: 0, duration: 1, ease: 'power3.out', delay: 0.7 });
    if (heroBtns) gsap.from(heroBtns, { y: 30, opacity: 0, duration: 0.8, ease: 'power3.out', delay: 0.9 });
    if (heroVisual) gsap.from(heroVisual, { x: 60, opacity: 0, duration: 1.2, ease: 'power3.out', delay: 0.5 });
    if (heroBottom) gsap.from(heroBottom, { y: 20, opacity: 0, duration: 0.8, ease: 'power3.out', delay: 1.1 });

    // Portfolio Marquee — clone items for seamless infinite scroll
    const track = document.querySelector('.svc-portfolio-track');
    const items = document.querySelectorAll('.svc-portfolio-item');

    if (track && items.length) {
        // Clone all items and append for seamless loop
        items.forEach(item => {
            const clone = item.cloneNode(true);
            track.appendChild(clone);
        });
    }

    // FAQ cards stagger entrance
    gsap.from('.svc-faq-card', {
        scrollTrigger: { trigger: '.svc-faq-grid', start: 'top 80%' },
        y: 40, opacity: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out'
    });

    // ====== Overview cards — scroll-triggered in-view + tilt ======
    const overviewCards = document.querySelectorAll('.svc-overview-card');

    // IntersectionObserver to add 'in-view' class for staggered entry
    if (overviewCards.length) {
        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    cardObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        overviewCards.forEach(card => cardObserver.observe(card));

        // Subtle 3D tilt on hover
        overviewCards.forEach(card => {
            card.addEventListener('mousemove', e => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = ((y - centerY) / centerY) * -4;
                const rotateY = ((x - centerX) / centerX) * 4;
                card.style.transform = `translateY(-8px) scale(1.02) perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });
    }

    // Testimonial cards stagger
    gsap.from('.svc-testi-card', {
        scrollTrigger: { trigger: '.svc-testimonials-grid', start: 'top 80%' },
        y: 40, opacity: 0, duration: 0.6, stagger: 0.15, ease: 'power3.out'
    });
});
