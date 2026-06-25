(function () {
    const section = document.querySelector('.product-capabilities');
    if (!section) return;

    const rows = Array.from(section.querySelectorAll('[data-pc-row]'));
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
