/* ═══════════════════════════════════════════
   BLOGS SECTION — Medium posts (hardcoded)
═══════════════════════════════════════════ */

const BLOGS = [
    {
        title: 'GOAT: Bridging the LoRA vs. Full Fine-Tuning Gap with Adaptive MoE and SVD',
        tag: 'LLM Optimization',
        date: 'Mar 2025',
        readTime: '8 min read',
        desc: 'A deep dive into the GOAT framework that combines Mixture of Experts with SVD decomposition to adaptively balance efficiency and expressiveness during fine-tuning.',
        url: 'https://medium.com/@lmalviya/goat-bridging-the-lora-vs-full-fine-tuning-gap-with-adaptive-moe-and-svd-0b2635144194',
    },
    {
        title: 'SpargeAttn: Making LLMs Faster Without Breaking Them',
        tag: 'Attention Mechanisms',
        date: 'Feb 2025',
        readTime: '6 min read',
        desc: 'Understanding how sparse attention mechanisms can drastically reduce computation while maintaining model quality — a practical breakdown of SpargeAttn.',
        url: 'https://medium.com/@lmalviya/spargeattn-making-llms-faster-without-breaking-them-a597e8590770',
    },
    {
        title: 'Understanding LightRAG: A Smarter Way to Retrieve and Generate Information',
        tag: 'RAG',
        date: 'Jan 2025',
        readTime: '7 min read',
        desc: 'How LightRAG uses graph-based retrieval to go beyond simple vector search, enabling richer contextual understanding for knowledge-intensive NLP tasks.',
        url: 'https://medium.com/@lmalviya/understanding-lightrag-a-smarter-way-to-retrieve-and-generate-information-8c7a3c810447',
    },
    {
        title: 'Stop Using SMOTE Blindly: The Truth About Imbalanced Data',
        tag: 'Data Science',
        date: 'Dec 2024',
        readTime: '5 min read',
        desc: 'A critical look at SMOTE and why synthetic oversampling can hurt your model. What to use instead and when imbalanced data handling actually matters.',
        url: 'https://medium.com/@lmalviya/stop-using-smote-blindly-the-truth-about-imbalanced-data-95a962191972',
    },
    {
        title: 'AI Agents: A New Era of Intelligent Assistance',
        tag: 'AI Agents',
        date: 'Nov 2024',
        readTime: '9 min read',
        desc: 'From reactive systems to autonomous goal-driven agents — how modern AI agent architectures work, what frameworks exist, and where this is all heading.',
        url: 'https://medium.com/@lmalviya/ai-agents-a-new-era-of-intelligent-assistance-2157db7653b6',
    },
];

export function initBlogs() {
    const grid = document.getElementById('blogs-grid');
    if (!grid) return;

    BLOGS.forEach((blog, i) => {
        const card = document.createElement('a');
        card.className = 'blog-card glass-card reveal';
        card.href = blog.url;
        card.target = '_blank';
        card.rel = 'noopener noreferrer';

        card.innerHTML = `
      <span class="badge blog-tag">${blog.tag}</span>
      <h3 class="blog-title">${blog.title}</h3>
      <div class="blog-meta">
        <span>${blog.date}</span>
        <span>·</span>
        <span>${blog.readTime}</span>
      </div>
      <p class="blog-desc">${blog.desc}</p>
      <span class="blog-link">
        Read on Medium
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
      </span>
    `;

        grid.appendChild(card);

        if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
            gsap.fromTo(card, { opacity: 0, y: 40 }, {
                opacity: 1, y: 0, duration: 0.6, ease: 'power2.out',
                scrollTrigger: { trigger: card, start: 'top 90%', once: true },
                delay: i * 0.1,
            });
        } else {
            card.style.opacity = 1;
            card.style.transform = 'none';
        }
    });
}
