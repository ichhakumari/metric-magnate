// About Page — Counter Animation & Timeline Enhancements

document.addEventListener('DOMContentLoaded', () => {
    // Animated Counter (ScrollTrigger-based)
    const statNumbers = document.querySelectorAll('.stat-number[data-count]');

    statNumbers.forEach(num => {
        const target = parseInt(num.getAttribute('data-count'));

        ScrollTrigger.create({
            trigger: num,
            start: 'top 85%',
            once: true,
            onEnter: () => {
                gsap.to(num, {
                    innerText: target,
                    duration: 2,
                    ease: 'power2.out',
                    snap: { innerText: 1 },
                    onUpdate: function () {
                        num.textContent = Math.round(parseFloat(num.textContent));
                    }
                });
            }
        });
    });

    // Timeline line grow animation
    const timelineLine = document.querySelector('.timeline-line');
    if (timelineLine) {
        gsap.from(timelineLine, {
            scrollTrigger: {
                trigger: '.journey-timeline',
                start: 'top 80%',
                end: 'bottom 60%',
                scrub: 1
            },
            scaleY: 0,
            transformOrigin: 'top center'
        });
    }

    // About Hero entrance (since .about-hero != .hero, script.js hero anims won't fire)
    const aboutHeroH1 = document.querySelector('.about-hero h1');
    const aboutHeroDesc = document.querySelector('.about-hero-desc');

    if (aboutHeroH1) {
        gsap.from(aboutHeroH1, {
            y: 80,
            opacity: 0,
            duration: 1.2,
            ease: 'power4.out',
            delay: 0.3
        });
    }

    if (aboutHeroDesc) {
        gsap.from(aboutHeroDesc, {
            y: 30,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
            delay: 0.6
        });
    }
});
