/* ═══════════════════════════════════════════
   PROJECTS SECTION — Real GitHub project data
═══════════════════════════════════════════ */

const PROJECTS = [
    {
        name: 'AI-Powered Pull Request Reviewer',
        description: 'Intelligent, automated code review agent that integrates with GitHub & GitLab. Uses LLMs (GPT-4, Claude, Ollama) with agentic tool use — if a diff references an unknown function, the AI fetches and reads the codebase before reviewing. Built on distributed microservices with RabbitMQ and Redis.',
        language: 'Python',
        stars: 14,
        url: 'https://github.com/Lmalviya/AI-Powered-Pull-Request-Review',
        filter: 'llm',
        featured: true,
        tags: ['LLM Agents', 'RabbitMQ', 'Redis', 'GitHub/GitLab', 'AST Parsing', 'Microservices'],
    },
    {
        name: 'Pull Request Pilot',
        description: 'Advanced AI code reviewer with "Tiny Chunking" — breaks diffs into 10-line blocks to prevent context overload. Features review memory (stateful deduplication), Tree-sitter AST for semantic filtering across 9+ languages, multi-model support (GPT-4, Claude, Llama), agentic context pull, and parallel asyncio processing.',
        language: 'Python',
        stars: 11,
        url: 'https://github.com/Lmalviya/Pull-Request-Pilot',
        filter: 'llm',
        featured: true,
        tags: ['Agentic AI', 'Tree-sitter', 'Multi-model', 'Docker', 'asyncio', 'Ollama'],
    },
    {
        name: 'Nexus — Self-Hosted AI Platform',
        description: 'Self-hosted, multi-tenant AI chat platform with full RAG pipeline. Supports local Ollama (Llama 3, Qwen 2.5, LLaVA) and cloud LLMs. Features document intelligence (PDF/image chunking → vector DB), smart AI router, Redis-based long-context memory with summarizer agent, organization-level isolation, and multimodal support.',
        language: 'Python',
        stars: 9,
        url: 'https://github.com/Lmalviya/Nexus',
        filter: 'llm',
        featured: true,
        tags: ['RAG', 'FastAPI', 'Qdrant', 'LLaMA', 'Multi-tenant', 'React', 'Redis'],
    },
];

const LANG_COLORS = {
    'Python': '#3572A5',
    'JavaScript': '#f1e05a',
    'Jupyter Notebook': '#DA5B0B',
    'TypeScript': '#2b7489',
    'HTML': '#e34c26',
};

export function initProjects() {
    const grid = document.getElementById('projects-grid');
    if (!grid) return;

    // Try fetching from GitHub API first; fall back to curated local data
    fetchAndMerge().then(projects => renderProjects(projects, grid));
    initFilters(grid);
}

async function fetchAndMerge() {
    try {
        const res = await fetch('https://api.github.com/users/Lmalviya/repos?per_page=40&sort=updated', {
            headers: { 'Accept': 'application/vnd.github.v3+json' }
        });
        if (!res.ok) throw new Error('API limit or error');
        const apiData = await res.json();

        // Merge: enrich local curated list with real star counts from API
        return PROJECTS.map(p => {
            const slug = p.url.split('/').pop();
            const apiMatch = apiData.find(r => r.name === slug);
            return apiMatch ? { ...p, stars: Math.max(p.stars, apiMatch.stargazers_count) } : p;
        });
    } catch {
        return PROJECTS;
    }
}

function renderProjects(projects, grid) {
    grid.innerHTML = '';

    projects.forEach((proj, i) => {
        const langColor = LANG_COLORS[proj.language] || '#7c3aed';

        const card = document.createElement('div');
        card.className = `project-card glass-card reveal${proj.featured ? ' animated-border' : ''}`;
        card.dataset.filter = proj.filter;

        card.innerHTML = `
      <div class="project-card-header">
        <h3 class="project-name">${proj.name}</h3>
        <div class="project-links">
          ${proj.featured ? '<span class="featured-tag">⭐ Featured</span>' : ''}
          <a href="${proj.url}" target="_blank" class="project-link" title="View on GitHub" aria-label="GitHub">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          </a>
        </div>
      </div>
      <p class="project-desc">${proj.description}</p>
      <div class="project-tech-tags">
        ${proj.tags.slice(0, 5).map(t => `<span class="badge">${t}</span>`).join('')}
      </div>
      <div class="project-footer">
        <span class="project-lang">
          <span class="lang-dot" style="background:${langColor}"></span>
          ${proj.language}
        </span>
        <span class="project-stars">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
          ${proj.stars}
        </span>
      </div>
    `;

        grid.appendChild(card);

        if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
            gsap.fromTo(card, { opacity: 0, y: 50 }, {
                opacity: 1, y: 0, duration: 0.6, ease: 'power3.out',
                scrollTrigger: { trigger: card, start: 'top 90%', once: true },
                delay: i * 0.07,
            });
        } else {
            card.style.opacity = 1;
            card.style.transform = 'none';
        }
    });
}

function initFilters(grid) {
    const btnContainer = document.getElementById('project-filters');
    if (!btnContainer) return;

    btnContainer.addEventListener('click', e => {
        const btn = e.target.closest('.filter-btn');
        if (!btn) return;
        btnContainer.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;
        grid.querySelectorAll('.project-card').forEach(card => {
            card.style.display = (filter === 'all' || card.dataset.filter === filter) ? 'flex' : 'none';
        });
    });
}
