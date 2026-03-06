/* ═══════════════════════════════════════════
   STATS SECTION — LeetCode donut chart
═══════════════════════════════════════════ */

export function initStats() {
    drawDonut();
}

function drawDonut() {
    const canvas = document.getElementById('lc-donut');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const cx = 70, cy = 70, r = 52, stroke = 12;

    const data = [
        { count: 46, color: '#22c55e', label: 'Easy' },
        { count: 58, color: '#f59e0b', label: 'Medium' },
        { count: 0, color: '#ef4444', label: 'Hard' },
    ];
    const total = 104;

    // Background track
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255,255,255,0.06)';
    ctx.lineWidth = stroke;
    ctx.stroke();

    // Animate arcs
    let startAngle = -Math.PI / 2;
    const duration = 1200;
    const startTime = performance.now();

    function animate(now) {
        const elapsed = Math.min(now - startTime, duration);
        const progress = elapsed / duration;
        const eased = 1 - Math.pow(1 - progress, 3);

        // Clear
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Track
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255,255,255,0.06)';
        ctx.lineWidth = stroke;
        ctx.stroke();

        // Draw segments
        let angle = -Math.PI / 2;
        data.forEach(seg => {
            if (seg.count === 0) return;
            const slice = (seg.count / total) * Math.PI * 2 * eased;
            ctx.beginPath();
            ctx.arc(cx, cy, r, angle, angle + slice);
            ctx.strokeStyle = seg.color;
            ctx.lineWidth = stroke;
            ctx.lineCap = 'round';
            ctx.stroke();
            angle += slice + 0.03;
        });

        if (elapsed < duration) requestAnimationFrame(animate);
    }

    // Trigger when in view
    const observer = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
            requestAnimationFrame(animate);
            observer.disconnect();
        }
    }, { threshold: 0.5 });
    observer.observe(canvas);
}
