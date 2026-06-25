(function () {
    const section = document.querySelector('.product-capabilities');
    if (!section) return;

    const rows = Array.from(section.querySelectorAll('[data-pc-row]'));
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasGsap = window.gsap && window.ScrollTrigger;

    if (hasGsap) {
        window.gsap.registerPlugin(window.ScrollTrigger);
        section.classList.add('pc-gsap');

        window.gsap.fromTo(section.querySelector('.pc-eyebrow'), {
            autoAlpha: 0,
            x: -26
        }, {
            autoAlpha: 1,
            x: 0,
            duration: .75,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: section,
                start: 'top 78%',
                once: true
            }
        });

        window.gsap.fromTo(section.querySelector('.pc-title'), {
            autoAlpha: 0,
            y: 46
        }, {
            autoAlpha: 1,
            y: 0,
            duration: 1.05,
            delay: .08,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: section,
                start: 'top 78%',
                once: true
            }
        });

        rows.forEach((row, index) => {
            const copy = row.querySelector('.pc-copy');
            const stage = row.querySelector('.pc-stage');
            const tool = row.querySelector('.pc-tool');
            const copyDirection = index % 2 === 0 ? -1 : 1;
            const copyDistance = reduceMotion ? 22 : 54;
            const stageDistance = reduceMotion ? 20 : 42;

            window.gsap.fromTo(copy, {
                autoAlpha: 0,
                x: copyDirection * copyDistance,
                y: reduceMotion ? 12 : 24
            }, {
                autoAlpha: 1,
                x: 0,
                y: 0,
                duration: .9,
                ease: 'power3.out',
                clearProps: 'opacity,visibility,transform',
                scrollTrigger: {
                    trigger: row,
                    start: 'top 76%',
                    once: true
                }
            });

            window.gsap.fromTo(stage, {
                autoAlpha: 0,
                x: copyDirection * -stageDistance,
                y: reduceMotion ? 22 : 54,
                scale: reduceMotion ? .99 : .975,
                clipPath: reduceMotion ? 'inset(3% 1% 3% 1% round 16px)' : 'inset(7% 3% 7% 3% round 16px)'
            }, {
                autoAlpha: 1,
                x: 0,
                y: 0,
                scale: 1,
                clipPath: 'inset(0% 0% 0% 0% round 16px)',
                duration: 1.05,
                delay: .08,
                ease: 'power3.out',
                clearProps: 'opacity,visibility,transform,clipPath',
                scrollTrigger: {
                    trigger: row,
                    start: 'top 76%',
                    once: true
                }
            });

            if (tool && !reduceMotion) {
                window.gsap.fromTo(tool, {
                    '--pc-scroll-y': '-16px'
                }, {
                    '--pc-scroll-y': '16px',
                    ease: 'none',
                    scrollTrigger: {
                        trigger: row,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: 1.15
                    }
                });
            }
        });

        window.addEventListener('load', () => window.ScrollTrigger.refresh(), { once: true });
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            const row = entry.target;
            if (entry.isIntersecting) row.classList.add('is-visible');
            row.classList.toggle('is-running', entry.isIntersecting && entry.intersectionRatio >= 0.28);
        });
    }, { threshold: [0, 0.28, 0.58], rootMargin: '-8% 0px -8% 0px' });

    rows.forEach((row) => observer.observe(row));

    if (!reduceMotion && window.matchMedia('(pointer: fine)').matches) {
        rows.forEach((row) => {
            const stage = row.querySelector('.pc-stage');
            if (!stage) return;

            stage.addEventListener('pointermove', (event) => {
                const rect = stage.getBoundingClientRect();
                const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
                const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
                stage.style.setProperty('--pc-x', `${(x * 5).toFixed(2)}px`);
                stage.style.setProperty('--pc-y', `${(y * 4).toFixed(2)}px`);
                stage.style.setProperty('--pc-grid-x', `${(x * 8).toFixed(2)}px`);
                stage.style.setProperty('--pc-grid-y', `${(y * 8).toFixed(2)}px`);
            });

            stage.addEventListener('pointerleave', () => {
                stage.style.setProperty('--pc-x', '0px');
                stage.style.setProperty('--pc-y', '0px');
                stage.style.setProperty('--pc-grid-x', '0px');
                stage.style.setProperty('--pc-grid-y', '0px');
            });
        });
    }

    window.addEventListener('pagehide', () => observer.disconnect(), { once: true });
})();
