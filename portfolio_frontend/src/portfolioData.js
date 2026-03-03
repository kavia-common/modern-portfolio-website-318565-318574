/**
 * Central config for portfolio content.
 * Update this file to customize your profile, skills, and projects.
 */

export const profile = {
  name: "Alex Morgan",
  title: "Full-Stack Software Engineer",
  location: "Austin, TX (Remote-friendly)",
  tagline: "I build reliable web products with clean UX, strong performance, and pragmatic engineering.",
  bio: [
    "Full-stack engineer with 6+ years of experience building React/Node.js applications and data-driven APIs.",
    "I focus on maintainable architecture, accessible UI, and measurable outcomes—shipping features that improve conversion, performance, and developer velocity."
  ],
  links: {
    email: "alex.morgan.dev@example.com",
    github: "https://github.com/example",
    linkedin: "https://www.linkedin.com/in/example",
    resume: "#"
  }
};

export const skills = [
  { group: "Frontend", items: ["JavaScript (ESNext)", "TypeScript", "React", "Accessibility (WCAG)", "Performance profiling"] },
  { group: "Backend", items: ["Node.js", "Express", "REST APIs", "Python (FastAPI)", "PostgreSQL"] },
  { group: "Cloud & DevOps", items: ["Docker", "GitHub Actions", "AWS (S3, ECS)", "Observability", "CI/CD"] },
  { group: "Practices", items: ["System design", "Testing (Jest)", "Code reviews", "Agile delivery", "Documentation"] }
];

export const projects = [
  {
    id: "pulse-analytics",
    title: "Pulse Analytics Dashboard",
    description: "A responsive product analytics dashboard with real-time charts, cohort views, and alerting for KPI anomalies.",
    tags: ["React", "TypeScript", "Node.js", "PostgreSQL", "WebSockets"],
    role: "Lead Engineer",
    responsibilities: [
      "Designed modular dashboard layout and charting architecture.",
      "Implemented websocket-driven live updates with backpressure handling.",
      "Built API endpoints, migrations, and caching strategy."
    ],
    outcomes: [
      "Reduced time-to-insight from ~15 minutes to under 30 seconds for key stakeholders.",
      "Improved perceived performance by 40% via code-splitting and memoization."
    ],
    links: { github: "https://github.com/example/pulse-analytics", demo: "https://example.com/demo/pulse" }
  },
  {
    id: "supportops",
    title: "SupportOps Triage Automation",
    description: "Automated support ticket triage with classification, routing, and SLA tracking to reduce manual effort.",
    tags: ["Python", "FastAPI", "PostgreSQL", "Docker"],
    role: "Backend Engineer",
    responsibilities: [
      "Built a rules + ML-assisted routing pipeline with audit logs.",
      "Added SLA timers and escalation notifications.",
      "Containerized the service and integrated CI checks."
    ],
    outcomes: [
      "Cut manual triage time by ~55%.",
      "Improved SLA compliance from 82% to 95% within 6 weeks."
    ],
    links: { github: "https://github.com/example/supportops", demo: "" }
  },
  {
    id: "shipshape",
    title: "ShipShape Release Tracker",
    description: "A lightweight release management tool to track deploys, changelogs, and incident annotations across environments.",
    tags: ["React", "Node.js", "CI/CD", "Docker"],
    role: "Full-Stack Engineer",
    responsibilities: [
      "Built CRUD flows for releases and environment promotion.",
      "Added GitHub Actions integration for automated release notes.",
      "Implemented role-based UI permissions."
    ],
    outcomes: [
      "Reduced release coordination overhead by ~30%.",
      "Improved auditability for incident retrospectives."
    ],
    links: { github: "https://github.com/example/shipshape", demo: "https://example.com/demo/shipshape" }
  },
  {
    id: "finlight",
    title: "FinLight Budgeting App",
    description: "Personal finance web app with category budgets, recurring transactions, and CSV imports.",
    tags: ["React", "TypeScript", "Node.js", "PostgreSQL"],
    role: "Frontend + API Engineer",
    responsibilities: [
      "Implemented accessible forms and client-side validation.",
      "Designed import flows and reconciliation UX for CSV uploads.",
      "Optimized API pagination and query performance."
    ],
    outcomes: [
      "Handled 50k+ transactions/import with smooth scrolling and virtualization.",
      "Increased sign-up conversion by 12% after UX improvements."
    ],
    links: { github: "https://github.com/example/finlight", demo: "" }
  },
  {
    id: "devnotes",
    title: "DevNotes Knowledge Base",
    description: "A searchable internal knowledge base with tagging, markdown support, and fast full-text search.",
    tags: ["React", "Node.js", "Search", "Cloud"],
    role: "Engineer",
    responsibilities: [
      "Built markdown editor and preview with safe rendering.",
      "Added tag-based discovery and fast search UX.",
      "Implemented basic caching and rate-limiting."
    ],
    outcomes: [
      "Reduced repeated support questions by ~20% by improving self-serve docs.",
      "Improved content discoverability with consistent taxonomy."
    ],
    links: { github: "https://github.com/example/devnotes", demo: "https://example.com/demo/devnotes" }
  }
];

export const meta = {
  siteTitle: "Alex Morgan — Portfolio",
  footerText: `© ${new Date().getFullYear()} Alex Morgan. All rights reserved.`
};
