// Contact Page — FAQ Accordion & Hero Animations

document.addEventListener('DOMContentLoaded', () => {
    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all
            faqItems.forEach(faq => faq.classList.remove('active'));

            // Toggle clicked
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // Contact Hero Entrance
    const heroH1 = document.querySelector('.contact-hero h1');
    const heroDesc = document.querySelector('.contact-hero-desc');

    if (heroH1) {
        gsap.from(heroH1, {
            y: 80,
            opacity: 0,
            duration: 1.2,
            ease: 'power4.out',
            delay: 0.3
        });
    }

    if (heroDesc) {
        gsap.from(heroDesc, {
            y: 30,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
            delay: 0.6
        });
    }

    // Form group focus animations
    const formGroups = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');

    formGroups.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', () => {
            input.parentElement.classList.remove('focused');
        });
    });

    // WhatsApp Form Submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const budget = document.getElementById('budget').value || 'Not specified';
            const service = document.getElementById('service').value || 'Not specified';
            const message = document.getElementById('message').value.trim();

            const whatsappMessage =
                `🔔 *New Project Inquiry — Metric Magnate*

👤 *Name:* ${name}
📧 *Email:* ${email}
📞 *Phone:* ${phone}
💰 *Budget:* ${budget}
🎯 *Service:* ${service}

📝 *Message:*
${message}`;

            const encodedMessage = encodeURIComponent(whatsappMessage);
            const whatsappURL = `https://wa.me/919870271198?text=${encodedMessage}`;

            window.open(whatsappURL, '_blank');
        });
    }
});
