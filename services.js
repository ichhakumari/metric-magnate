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

    // Hero entrance
    const heroH1 = document.querySelector('.svc-hero h1');
    const heroDesc = document.querySelector('.svc-hero-desc');
    if (heroH1) gsap.from(heroH1, { y: 80, opacity: 0, duration: 1.2, ease: 'power4.out', delay: 0.3 });
    if (heroDesc) gsap.from(heroDesc, { y: 30, opacity: 0, duration: 1, ease: 'power3.out', delay: 0.6 });

    // Portfolio Slider
    const track = document.querySelector('.svc-portfolio-track');
    const items = document.querySelectorAll('.svc-portfolio-item');
    const nextBtn = document.querySelector('.svc-next');
    const prevBtn = document.querySelector('.svc-prev');

    if (track && items.length) {
        let index = 0;
        const gap = 24;

        function getVisible() {
            if (window.innerWidth > 992) return 3;
            if (window.innerWidth > 768) return 2;
            return 1;
        }

        function slide() {
            const itemW = items[0].offsetWidth + gap;
            const maxIdx = Math.max(0, items.length - getVisible());
            if (index > maxIdx) index = maxIdx;
            if (index < 0) index = 0;
            gsap.to(track, { x: -index * itemW, duration: 0.6, ease: 'power4.out' });
        }

        if (nextBtn) nextBtn.addEventListener('click', () => { index++; slide(); });
        if (prevBtn) prevBtn.addEventListener('click', () => { index--; slide(); });
        window.addEventListener('resize', slide);
        slide();
    }

    // FAQ cards stagger entrance
    gsap.from('.svc-faq-card', {
        scrollTrigger: { trigger: '.svc-faq-grid', start: 'top 80%' },
        y: 40, opacity: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out'
    });

    // Testimonial cards stagger
    gsap.from('.svc-testi-card', {
        scrollTrigger: { trigger: '.svc-testimonials-grid', start: 'top 80%' },
        y: 40, opacity: 0, duration: 0.6, stagger: 0.15, ease: 'power3.out'
    });
});
