document.addEventListener('DOMContentLoaded', () => {

    const observer = new IntersectionObserver(
        (entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                    obs.unobserve(entry.target);          // solo una vez
                }
            });
        },
        { threshold: 0.15 }
    );

    document.querySelectorAll('.fade').forEach(el => observer.observe(el));


    document.querySelectorAll('.skill-ring').forEach(ring => {
        const percent = parseInt(ring.dataset.percent, 10) || 0;
        const fill = ring.querySelector('circle.fill');
        const radius = +fill.getAttribute('r');
        const circumference = 2 * Math.PI * radius;

        fill.style.strokeDasharray = circumference;
        fill.style.strokeDashoffset = circumference;          // punto de partida

        // Desfase proporcional
        const offset = circumference * (1 - percent / 100);
        requestAnimationFrame(() => { fill.style.strokeDashoffset = offset; });

        // Etiqueta central
        const label = ring.querySelector('span.label');
        if (label) label.textContent = `${percent}%`;
    });


    const topBtn = document.getElementById('to‑top');
    if (topBtn) {
        const reveal = () => { topBtn.style.opacity = window.scrollY > 300 ? 1 : 0; };
        window.addEventListener('scroll', reveal, { passive: true });
        reveal();
    }

    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            document.documentElement.classList.toggle('light');
        });
    }
});
