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

    // Video Zoom on Scroll
    const videoZoomEl = document.getElementById('aboutVideoZoom');
    if (videoZoomEl) {
        gsap.to(videoZoomEl, {
            scale: 1,
            ease: 'none',
            scrollTrigger: {
                trigger: videoZoomEl,
                start: 'top 85%',
                end: 'top 30%',
                scrub: 1
            }
        });
    }



    // Gallery Slider
    const galleryTrack = document.querySelector('.about-gallery-track');
    const galleryPrev = document.querySelector('.gallery-prev');
    const galleryNext = document.querySelector('.gallery-next');

    if (galleryTrack && galleryPrev && galleryNext) {
        let galleryIndex = 0;
        const galleryItems = galleryTrack.querySelectorAll('.gallery-item');
        const totalItems = galleryItems.length;
        const gap = 20;
        let autoSlideInterval = null;

        function getVisibleCount() {
            if (window.innerWidth <= 640) return 1;
            if (window.innerWidth <= 992) return 2;
            return 3;
        }

        function updateGallery() {
            const visible = getVisibleCount();
            const maxIndex = Math.max(0, totalItems - visible);
            if (galleryIndex > maxIndex) galleryIndex = maxIndex;
            if (galleryIndex < 0) galleryIndex = 0;

            const itemWidth = galleryItems[0].offsetWidth + gap;
            galleryTrack.style.transform = `translateX(-${galleryIndex * itemWidth}px)`;
        }

        function slideNext() {
            const visible = getVisibleCount();
            const maxIndex = totalItems - visible;
            galleryIndex++;
            if (galleryIndex > maxIndex) galleryIndex = 0; // loop back
            updateGallery();
        }

        function slidePrev() {
            const visible = getVisibleCount();
            const maxIndex = totalItems - visible;
            galleryIndex--;
            if (galleryIndex < 0) galleryIndex = maxIndex; // loop to end
            updateGallery();
        }

        galleryNext.addEventListener('click', () => { slideNext(); resetAutoSlide(); });
        galleryPrev.addEventListener('click', () => { slidePrev(); resetAutoSlide(); });

        // Auto-slide
        function startAutoSlide() {
            autoSlideInterval = setInterval(slideNext, 1500);
        }

        function stopAutoSlide() {
            clearInterval(autoSlideInterval);
        }

        function resetAutoSlide() {
            stopAutoSlide();
            startAutoSlide();
        }

        startAutoSlide();

        // Pause on hover
        const sliderWrapper = document.querySelector('.about-gallery-slider-wrapper');
        if (sliderWrapper) {
            sliderWrapper.addEventListener('mouseenter', stopAutoSlide);
            sliderWrapper.addEventListener('mouseleave', startAutoSlide);
        }

        // Mouse drag
        let isDragging = false;
        let startX = 0;
        let currentTranslate = 0;
        let dragDelta = 0;

        galleryTrack.style.cursor = 'grab';

        galleryTrack.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.pageX;
            const itemWidth = galleryItems[0].offsetWidth + gap;
            currentTranslate = -(galleryIndex * itemWidth);
            galleryTrack.style.transition = 'none';
            galleryTrack.style.cursor = 'grabbing';
            e.preventDefault();
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            dragDelta = e.pageX - startX;
            galleryTrack.style.transform = `translateX(${currentTranslate + dragDelta}px)`;
        });

        document.addEventListener('mouseup', () => {
            if (!isDragging) return;
            isDragging = false;
            galleryTrack.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
            galleryTrack.style.cursor = 'grab';

            const threshold = 80;
            if (dragDelta < -threshold) {
                slideNext();
            } else if (dragDelta > threshold) {
                slidePrev();
            } else {
                updateGallery();
            }
            dragDelta = 0;
            resetAutoSlide();
        });

        // Touch drag
        galleryTrack.addEventListener('touchstart', (e) => {
            isDragging = true;
            startX = e.touches[0].pageX;
            const itemWidth = galleryItems[0].offsetWidth + gap;
            currentTranslate = -(galleryIndex * itemWidth);
            galleryTrack.style.transition = 'none';
            stopAutoSlide();
        }, { passive: true });

        galleryTrack.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            dragDelta = e.touches[0].pageX - startX;
            galleryTrack.style.transform = `translateX(${currentTranslate + dragDelta}px)`;
        }, { passive: true });

        galleryTrack.addEventListener('touchend', () => {
            if (!isDragging) return;
            isDragging = false;
            galleryTrack.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';

            const threshold = 50;
            if (dragDelta < -threshold) {
                slideNext();
            } else if (dragDelta > threshold) {
                slidePrev();
            } else {
                updateGallery();
            }
            dragDelta = 0;
            resetAutoSlide();
        });

        window.addEventListener('resize', updateGallery);
    }

    // ── Team Slider Nav Buttons (mobile only) ──
    const teamGrid = document.getElementById('teamGrid');
    const teamPrev = document.getElementById('teamPrev');
    const teamNext = document.getElementById('teamNext');

    if (teamGrid && teamPrev && teamNext) {
        function scrollTeam(dir) {
            if (window.innerWidth > 768) return; // desktop: do nothing
            const card = teamGrid.querySelector('.team-card');
            if (!card) return;
            const cardWidth = card.offsetWidth + 16; // 16 = gap
            teamGrid.scrollBy({ left: dir * cardWidth, behavior: 'smooth' });
        }

        teamPrev.addEventListener('click', () => scrollTeam(-1));
        teamNext.addEventListener('click', () => scrollTeam(1));
    }
});
