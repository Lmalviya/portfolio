/* ═══════════════════════════════════════════
   HERO SECTION — Typed text + counters
═══════════════════════════════════════════ */

export function initHero() {
    initTypedText();
    initCounters();
}

// ── Typed text cycling ─────────────────────
function initTypedText() {
    const el = document.getElementById('typed-text');
    if (!el) return;

    const phrases = [
        'LLM Systems',
        'RAG Pipelines',
        'ML Models at Scale',
        'AI Research',
        'Transformer Architectures',
    ];

    let pIdx = 0, cIdx = 0, deleting = false;

    function tick() {
        const current = phrases[pIdx];
        if (!deleting) {
            el.textContent = current.slice(0, cIdx + 1);
            cIdx++;
            if (cIdx === current.length) {
                deleting = true;
                setTimeout(tick, 1800); // pause at full word
                return;
            }
            setTimeout(tick, 80);
        } else {
            el.textContent = current.slice(0, cIdx - 1);
            cIdx--;
            if (cIdx === 0) {
                deleting = false;
                pIdx = (pIdx + 1) % phrases.length;
                setTimeout(tick, 300);
                return;
            }
            setTimeout(tick, 45);
        }
    }

    setTimeout(tick, 800);
}

// ── Animated counters ──────────────────────
function initCounters() {
    const counters = document.querySelectorAll('.counter-num');
    if (!counters.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            const target = parseInt(el.dataset.target, 10);
            const duration = 1600;
            const start = performance.now();

            function step(now) {
                const elapsed = now - start;
                const progress = Math.min(elapsed / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
                el.textContent = Math.floor(eased * target);
                if (progress < 1) requestAnimationFrame(step);
                else el.textContent = target;
            }

            requestAnimationFrame(step);
            observer.unobserve(el);
        });
    }, { threshold: 0.5 });

    counters.forEach(c => observer.observe(c));
}
