/* ═══════════════════════════════════════════
   CHATBOT WIDGET — FAQ-driven JS assistant
═══════════════════════════════════════════ */

const FAQ = [
    {
        keys: ['role', 'job', 'work', 'current', 'doing', 'position', 'title'],
        answer: "I'm currently a **Machine Learning Engineer at Skyfall.ai** (May 2025–Present), building multi-agent AI systems with MCP-based tool orchestration across Okta, SAP, and ServiceNow. Before that, I was an **Applied Scientist-2 at PrivaSapien** (July 2023–April 2025), working on LLM fine-tuning and AI security layers."
    },
    {
        keys: ['education', 'study', 'degree', 'university', 'iisc', 'college', 'mtech', 'background'],
        answer: "I hold an **M.Tech in Computer Science from IISc Bangalore** (2021–2023) — one of India's top research institutes. I also did my B.E. in CS from MITS Gwalior (2016–2020)."
    },
    {
        keys: ['project', 'built', 'make', 'github', 'code', 'repo', 'portfolio'],
        answer: "My top projects include:\n• **AI-Powered Pull Request Review System** — distributed LLM agent (Llama 3.2 via Ollama) with chunk-level parallelism, RabbitMQ, containerized with Docker. Capacity-modeled for ~120 PRs/hour.\n• **Pull Request Pilot** — advanced AI code reviewer with Tiny Chunking, Tree-sitter AST, multi-model support\n• **Nexus** — self-hosted multi-tenant AI chat platform with full RAG pipeline and Redis-based long-context memory\nAll available on my GitHub!"
    },
    {
        keys: ['skill', 'tech', 'stack', 'language', 'framework', 'tool', 'use'],
        answer: "My core stack:\n• **LLM & Fine-tuning**: PyTorch, HuggingFace, LoRA/QLoRA, PEFT, RLHF, Instruction Tuning, LLaMA, BERT, GPT\n• **Agentic AI**: LangChain, LangGraph, MCP, RAG, Multi-Agent Systems\n• **MLOps & Cloud**: Docker, AWS (Lambda/S3/EC2), CI/CD, RabbitMQ\n• **Languages**: Python, SQL, C++\n• **Classical ML**: XGBoost, SVM, Scikit-learn"
    },
    {
        keys: ['blog', 'article', 'write', 'medium', 'publish', 'research'],
        answer: "I write technical deep dives on Medium about cutting-edge AI research:\n• GOAT: Adaptive MoE + SVD for fine-tuning\n• SpargeAttn — sparse attention for faster LLMs\n• LightRAG — graph-enhanced RAG\n• Beyond SMOTE — imbalanced data truth\n• AI Agents architecture\nCheck the Writing section above!"
    },
    {
        keys: ['leetcode', 'competitive', 'algorithm', 'dsa', 'solve', 'problem'],
        answer: "I've solved **104 problems on LeetCode** (46 Easy, 58 Medium). My strongest topics are Dynamic Programming, Backtracking, Arrays, and Two Pointers. I primarily use Python."
    },
    {
        keys: ['hire', 'available', 'open', 'opportunity', 'contact', 'recruit', 'looking'],
        answer: "Yes, I'm **open to exciting opportunities** in ML Engineering and AI Research, especially roles involving LLMs, multi-agent systems, or applied AI. Reach me at **lmalviya4797@gmail.com** or on LinkedIn!"
    },
    {
        keys: ['award', 'patent', 'achievement', 'recognition', 'narayana', 'murthy', 'co-author'],
        answer: "I have three key achievements:\n• **Co-authored Patent** — \"System and method to evaluate risks associated with an AI platform and governance\" at PrivaSapien.\n• **\"Above and Beyond\" Award** — Personally given by Narayana Murthy (Infosys founder) for innovative AI solutions.\n• **Team Lead** — Led the Privacy Threat Modeling team at PrivaSapien."
    },
    {
        keys: ['privacy', 'privasapien', 'federated', 'differential'],
        answer: "At PrivaSapien, I worked on **privacy-preserving ML** — including federated learning, differential privacy techniques, and building ML models that respect data protection requirements. This gave me deep insight into production AI with real-world constraints."
    },
    {
        keys: ['intern', 'internship', 'fresher', 'experience', 'years'],
        answer: "I have **~3 years of industry experience** — almost 2 years as an **Applied Scientist-2 at PrivaSapien** (LLM fine-tuning, AI security layers) and currently as an **ML Engineer at Skyfall.ai** (multi-agent systems). I also did substantial research during my M.Tech at IISc Bangalore."
    },
    {
        keys: ['hello', 'hi', 'hey', 'who', 'lakhan', 'you', 'about'],
        answer: "Hi! I'm an AI assistant for **Lakhan Malviya** — Machine Learning Engineer, IISc M.Tech alumnus, and AI Researcher. You can ask me about his experience, education, projects, skills, or how to contact him! 🚀"
    },
];

const FALLBACK = "I'm not sure about that one! Try asking about Lakhan's **experience**, **education**, **projects**, **skills**, or how to **contact** him. Or just click one of the suggestion chips!";

export function initChatbot() {
    const widget = document.getElementById('chatbot-widget');
    const toggle = document.getElementById('chatbot-toggle');
    const panel = document.getElementById('chatbot-panel');
    const input = document.getElementById('chatbot-input');
    const send = document.getElementById('chatbot-send');
    const messages = document.getElementById('chatbot-messages');
    const iconOpen = toggle?.querySelector('.chatbot-icon-open');
    const iconClose = toggle?.querySelector('.chatbot-icon-close');
    const label = toggle?.querySelector('.chatbot-label');
    if (!widget || !toggle || !panel) return;

    let isOpen = false;

    toggle.addEventListener('click', () => {
        isOpen = !isOpen;
        panel.style.display = isOpen ? 'flex' : 'none';
        panel.style.flexDirection = 'column';
        iconOpen.style.display = isOpen ? 'none' : 'block';
        iconClose.style.display = isOpen ? 'block' : 'none';
        label.textContent = isOpen ? 'Close' : 'Ask about me';
        if (isOpen && input) input.focus();
    });

    // Send on button click
    send?.addEventListener('click', () => handleSend());

    // Send on Enter
    input?.addEventListener('keydown', e => {
        if (e.key === 'Enter') handleSend();
    });

    // Suggestion chips
    messages?.addEventListener('click', e => {
        const chip = e.target.closest('.suggestion-chip');
        if (!chip) return;
        const q = chip.dataset.q;
        handleSend(q);
    });

    function handleSend(text) {
        const msg = (text || input?.value || '').trim();
        if (!msg) return;
        if (input) input.value = '';

        addMessage(msg, 'user');

        // Remove suggestion chips after first use
        const chips = messages?.querySelector('.chatbot-suggestions');
        if (chips) chips.remove();

        setTimeout(() => {
            const answer = findAnswer(msg);
            addMessage(answer, 'bot');
        }, 400);
    }

    function addMessage(text, type) {
        const div = document.createElement('div');
        div.className = `chat-msg ${type === 'bot' ? 'bot-msg' : 'user-msg'}`;
        // Simple markdown-ish bold
        div.innerHTML = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>');
        messages?.appendChild(div);
        messages.scrollTop = messages.scrollHeight;
    }

    function findAnswer(question) {
        const q = question.toLowerCase();
        for (const item of FAQ) {
            if (item.keys.some(k => q.includes(k))) {
                return item.answer;
            }
        }
        return FALLBACK;
    }
}
