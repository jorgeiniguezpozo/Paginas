document.addEventListener('DOMContentLoaded', () => {
    
// ============================================
    // 0. PRELOADER - Pantalla de carga
    // ============================================
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        // Ocultar preloader después de que la página cargue
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.classList.add('hidden');
                // Remover preloader del DOM después de la animación
                setTimeout(() => {
                    preloader.remove();
                }, 500);
            }, 1500); // Duración del preloader (1.5s)
        });
    }

    // ============================================
    // 0b. VIDEO BACKGROUND - Manejo del video
    // ============================================
    const heroVideo = document.querySelector('.hero-video');
    const heroGradient = document.querySelector('.hero-gradient-animated');
    
    if (heroVideo) {
        // Ocultar gradiente cuando el video starts playing
        heroVideo.addEventListener('playing', () => {
            if (heroGradient) {
                heroGradient.style.display = 'none';
            }
        });
        
        // Mostrar gradiente si el video no carga
        heroVideo.addEventListener('error', () => {
            if (heroGradient) {
                heroGradient.style.display = 'block';
            }
        });
        
        // Fallback: si el video no puede reproducirse
        if (heroVideo.readyState === 2) { // HAVE_ENOUGH_DATA
            if (heroGradient) {
                heroGradient.style.display = 'block';
            }
        }
    }

    // ============================================
    // 1. EFECTO SCROLL NAVBAR
    // ============================================
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ============================================
    // 2. MENÚ MÓVIL (HAMBURGUESA)
    // ============================================
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const menuToggleBtn = document.querySelector('.menu-toggle');

    // Actualizar aria-expanded
    if (menuToggleBtn) {
        menuToggleBtn.setAttribute('aria-label', 'Abrir menú');
        menuToggleBtn.setAttribute('aria-expanded', 'false');
        menuToggleBtn.setAttribute('aria-controls', 'navigation-menu');
    }

    if (menuToggle && navMenu) {
        menuToggle.setAttribute('id', 'navigation-menu');
        
        menuToggle.addEventListener('click', () => {
            const isOpen = navMenu.classList.toggle('open');
            menuToggleBtn.setAttribute('aria-expanded', isOpen);
            
            // Animación simple de las líneas del botón
            const spans = menuToggle.querySelectorAll('span');
            spans.forEach(span => span.classList.toggle('active'));
        });
    }

    // Cerrar menú al hacer click en un enlace
    document.querySelectorAll('.nav-link, .btn-nav').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('open');
            menuToggleBtn.setAttribute('aria-expanded', 'false');
        });
    });

    // ============================================
    // 3. SEGUIMIENTO DE SECCIÓN ACTIVA EN EL MENU
    // ============================================
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
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
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // ============================================
    // 4. ANIMACIONES AL HACER SCROLL (Intersection Observer)
    // ============================================
    const animElements = document.querySelectorAll('.scroll-animate, .scroll-animate-left, .scroll-animate-right');
    
    const observerOptions = {
        root: null,
        threshold: 0.1, // Reducido a 10% para más animaciones
        rootMargin: "0px"
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Deja de observar una vez animado
            }
        });
    }, observerOptions);

    animElements.forEach(el => observer.observe(el));

    // ============================================
    // 5. NAVEGACIÓN POR TECLADO (Accesibilidad)
    // ============================================
    // Añadir soporte para tecla Enter en botones del menú
    document.querySelectorAll('.menu-toggle').forEach(btn => {
        btn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                btn.click();
            }
        });
    });

    // ============================================
    // 6. ANALYTICS - Google Analytics
    // ============================================
    // Configurar GA si está cargado
    if (typeof gtag === 'function') {
        // Tracking de clics en botones de producto
        document.querySelectorAll('.btn-product, .btn-whatsapp').forEach(btn => {
            btn.addEventListener('click', () => {
                gtag('event', 'conversion', {
                    'event_category': 'Engagement',
                    'event_label': btn.textContent.trim()
                });
            });
        });
    }

    // ============================================
    // 7. EFECTO PARALLAX SUAVE (Opcional)
    // ============================================
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            heroSection.style.backgroundPositionY = scrolled * 0.5 + 'px';
        });
    }

    // ============================================
    // 8. DETECCIÓN DE PREFERENCIA DE TEMA (Modo Oscuro - Futuro)
    // ============================================
    // Nota: Este proyecto ya usa tema oscuro por defecto
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    console.log('Modo oscuro preferido:', prefersDarkMode);

// ============================================
    // 9. LAZY LOADING DE IMÁGENES (Nativo)
    // ============================================
    // El navegador ya soporta lazy loading nativo mediante el atributo loading="lazy"
    // No requiere código adicional

    // ============================================
    // 10. FORMULARIO NEWSLETTER
    // ============================================
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('input[type="email"]').value;
            
            // Aquí normalmente enviarías a tu servidor o servicio de email
            console.log('Newsletter suscripción:', email);
            
            // Feedback visual
            const btn = newsletterForm.querySelector('.newsletter-btn');
            const originalText = btn.textContent;
            btn.textContent = '¡Suscrito! ✓';
            btn.style.background = '#25D366';
            
            // Reset después de 3 segundos
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = '';
                newsletterForm.reset();
            }, 3000);
            
            // Tracking
            if (typeof gtag === 'function') {
                gtag('event', 'sign_up', {
                    'event_category': 'Engagement',
                    'event_label': 'Newsletter'
                });
            }
        });
    }

    // ============================================
    // 11. REDUCE MOTION - Accesibilidad
    // ============================================
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
        console.log('Usuario prefiere reducir movimiento');
        // Desactivar animaciones
        document.querySelectorAll('.scroll-animate, .scroll-animate-left, .scroll-animate-right').forEach(el => {
            el.style.transition = 'none';
            el.style.opacity = '1';
            el.style.transform = 'none';
        });
        
        // Desactivar partículas
        document.querySelectorAll('.particle').forEach(p => {
            p.style.display = 'none';
        });
        
        // Desactivar preloader
        if (preloader) {
            preloader.classList.add('hidden');
        }
    }

});
