import React, { useEffect, useMemo, useRef, useState } from "react";
import "./App.css";
import { meta, profile, projects, skills } from "./portfolioData";
import { useToast } from "./useToast";

/**
 * PUBLIC_INTERFACE
 * App renders a professional single-page portfolio (About, Skills, Projects, Contact)
 * using configurable content from `src/portfolioData.js`.
 */
function App() {
  const [activeSection, setActiveSection] = useState("about");
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState("All");
  const { toasts, pushToast } = useToast();

  // Theme: "light" | "dark"
  const [theme, setTheme] = useState("light");

  const sectionIds = useMemo(() => ["about", "skills", "projects", "contact"], []);

  const refs = {
    about: useRef(null),
    skills: useRef(null),
    projects: useRef(null),
    contact: useRef(null)
  };

  // Update document title from config.
  useEffect(() => {
    document.title = meta.siteTitle;
  }, []);

  // Initialize theme from localStorage; fall back to OS preference.
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem("theme");
      if (stored === "light" || stored === "dark") {
        setTheme(stored);
        return;
      }
    } catch {
      // Ignore storage errors (privacy mode / blocked storage).
    }

    const prefersDark =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;

    setTheme(prefersDark ? "dark" : "light");
  }, []);

  // Apply theme to <html data-theme="..."> and persist.
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);

    try {
      window.localStorage.setItem("theme", theme);
    } catch {
      // Ignore storage errors.
    }
  }, [theme]);

  // Track active section as the user scrolls for nav highlighting.
  useEffect(() => {
    const elements = sectionIds.map((id) => refs[id]?.current).filter(Boolean);

    if (elements.length === 0) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio || 0) - (a.intersectionRatio || 0))[0];
        if (visible?.target?.id) setActiveSection(visible.target.id);
      },
      { root: null, threshold: [0.2, 0.35, 0.55], rootMargin: "-20% 0px -55% 0px" }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sectionIds]);

  const allTags = useMemo(() => {
    const tagSet = new Set();
    projects.forEach((p) => (p.tags || []).forEach((t) => tagSet.add(t)));
    return ["All", ...Array.from(tagSet).sort((a, b) => a.localeCompare(b))];
  }, []);

  const filteredProjects = useMemo(() => {
    const q = query.trim().toLowerCase();

    return projects.filter((p) => {
      const matchesTag = activeTag === "All" ? true : (p.tags || []).includes(activeTag);
      if (!matchesTag) return false;

      if (!q) return true;

      const haystack = [p.title, p.description, p.role, ...(p.tags || []), ...(p.responsibilities || []), ...(p.outcomes || [])]
        .join(" ")
        .toLowerCase();

      return haystack.includes(q);
    });
  }, [query, activeTag]);

  // PUBLIC_INTERFACE
  const scrollToSection = (id) => {
    const el = refs[id]?.current;
    if (!el) return;

    // Offset for sticky navbar height.
    const y = el.getBoundingClientRect().top + window.scrollY - 74;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  // PUBLIC_INTERFACE
  const onContactSubmit = (e) => {
    e.preventDefault();

    // No backend submission by default; this is a safe no-op with feedback.
    pushToast({
      title: "Message queued",
      message: "Thanks — this form is UI-only by default. Wire it to an API when you're ready."
    });

    e.currentTarget.reset();
  };

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  };

  const IconLink = ({ href, label, children }) => (
    <a className="btn iconBtn" href={href} aria-label={label} target="_blank" rel="noreferrer">
      {children}
    </a>
  );

  const InlineIcon = ({ d }) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d={d} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  const ThemeIcon = () => {
    // Keep icon simple and text-driven; both modes render nicely on either theme.
    return (
      <span className="themeToggleIcon" aria-hidden="true">
        {theme === "dark" ? "☾" : "☀︎"}
      </span>
    );
  };

  return (
    <div className="App">
      <nav className="navbar" aria-label="Primary">
        <div className="container">
          <div className="navInner">
            <a
              className="brand"
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("about");
              }}
            >
              <span className="brandMark" aria-hidden="true" />
              <span>{profile.name}</span>
            </a>

            <div className="navLinks">
              {sectionIds.map((id) => (
                <a
                  key={id}
                  className={`navLink ${activeSection === id ? "navLinkActive" : ""}`}
                  href={`#${id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(id);
                  }}
                >
                  {id === "about" ? "About" : id.charAt(0).toUpperCase() + id.slice(1)}
                </a>
              ))}

              <button
                type="button"
                className="themeToggle"
                onClick={toggleTheme}
                aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
                title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
              >
                <ThemeIcon />
                <span>{theme === "dark" ? "Dark" : "Light"}</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <header className="hero" id="top">
        <div className="container">
          <div className="heroGrid">
            <div className="fadeInUp">
              <div className="kicker">
                <span className="kickerDot" aria-hidden="true" />
                <span>{profile.title}</span>
                <span aria-hidden="true">·</span>
                <span>{profile.location}</span>
              </div>

              <h1 className="heroTitle">Building modern, dependable software—end to end.</h1>

              <p className="heroSubtitle">{profile.tagline}</p>

              <div className="heroActions" role="group" aria-label="Primary actions">
                <a className="btn btnPrimary" href={`mailto:${profile.links.email}`}>
                  <InlineIcon d="M4 4h16v16H4z" />
                  Email me
                </a>
                <a className="btn btnGhost" href={profile.links.github} target="_blank" rel="noreferrer">
                  <InlineIcon d="M12 2C6.5 2 2 6.6 2 12.2c0 4.5 2.9 8.4 6.9 9.7.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.2-3.4-1.2-.4-1-.9-1.3-.9-1.3-.8-.6.1-.6.1-.6.9.1 1.4 1 1.4 1 .8 1.4 2.1 1 2.6.8.1-.6.3-1 .6-1.3-2.2-.3-4.5-1.1-4.5-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.6 0 0 .8-.3 2.7 1 .8-.2 1.6-.3 2.4-.3s1.6.1 2.4.3c1.9-1.3 2.7-1 2.7-1 .5 1.3.2 2.3.1 2.6.6.7 1 1.6 1 2.7 0 3.9-2.3 4.7-4.6 5 .3.3.6.9.6 1.8v2.6c0 .3.2.6.7.5 4-1.3 6.9-5.2 6.9-9.7C22 6.6 17.5 2 12 2z" />
                  GitHub
                </a>
                <a className="btn" href={profile.links.linkedin} target="_blank" rel="noreferrer">
                  <InlineIcon d="M4 4h16v16H4z" />
                  LinkedIn
                </a>
              </div>
            </div>

            <aside className="card cardPad fadeInUp" style={{ animationDelay: "120ms" }}>
              <h2 className="cardTitle">Quick profile</h2>
              {profile.bio.map((p) => (
                <p className="cardText" key={p} style={{ marginTop: 10 }}>
                  {p}
                </p>
              ))}

              <div className="chipRow" aria-label="Contact links">
                <IconLink href={`mailto:${profile.links.email}`} label="Email">
                  <InlineIcon d="M4 4h16v16H4z" />
                </IconLink>
                <IconLink href={profile.links.github} label="GitHub">
                  <InlineIcon d="M12 2C6.5 2 2 6.6 2 12.2c0 4.5 2.9 8.4 6.9 9.7.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.2-3.4-1.2-.4-1-.9-1.3-.9-1.3-.8-.6.1-.6.1-.6.9.1 1.4 1 1.4 1 .8 1.4 2.1 1 2.6.8.1-.6.3-1 .6-1.3-2.2-.3-4.5-1.1-4.5-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.6 0 0 .8-.3 2.7 1 .8-.2 1.6-.3 2.4-.3s1.6.1 2.4.3c1.9-1.3 2.7-1 2.7-1 .5 1.3.2 2.3.1 2.6.6.7 1 1.6 1 2.7 0 3.9-2.3 4.7-4.6 5 .3.3.6.9.6 1.8v2.6c0 .3.2.6.7.5 4-1.3 6.9-5.2 6.9-9.7C22 6.6 17.5 2 12 2z" />
                </IconLink>
                <IconLink href={profile.links.linkedin} label="LinkedIn">
                  <InlineIcon d="M4 4h16v16H4z" />
                </IconLink>
              </div>
            </aside>
          </div>
        </div>
      </header>

      <main>
        <section className="section" id="about" ref={refs.about} aria-label="About Me">
          <div className="container">
            <h2 className="sectionTitle fadeInUp">About me</h2>
            <p className="sectionLead fadeInUp" style={{ animationDelay: "60ms" }}>
              I enjoy collaborating with product and design to ship usable features, then iterating with metrics and feedback. My recent work has
              focused on performance, quality, and developer experience.
            </p>

            <div className="projectGrid" style={{ gridTemplateColumns: "1fr 1fr" }}>
              <div className="card cardPad fadeInUp" style={{ animationDelay: "100ms" }}>
                <h3 className="cardTitle">What I’m best at</h3>
                <p className="cardText">Building end-to-end features (UI → API → data), designing maintainable systems, and keeping UX fast and accessible.</p>
                <div className="chipRow" aria-label="Highlights">
                  <span className="badge">Performance</span>
                  <span className="badge">Accessibility</span>
                  <span className="badge">APIs</span>
                  <span className="badge">CI/CD</span>
                </div>
              </div>

              <div className="card cardPad fadeInUp" style={{ animationDelay: "140ms" }}>
                <h3 className="cardTitle">How I work</h3>
                <p className="cardText">
                  Start with clarity: user story, constraints, and success metric. Ship incrementally, measure impact, and document tradeoffs.
                </p>
                <div className="chipRow" aria-label="Work style">
                  <span className="badge">Pragmatic</span>
                  <span className="badge">Collaborative</span>
                  <span className="badge">Quality-first</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="skills" ref={refs.skills} aria-label="Skills">
          <div className="container">
            <h2 className="sectionTitle fadeInUp">Skills</h2>
            <p className="sectionLead fadeInUp" style={{ animationDelay: "60ms" }}>
              A concise view of the tools and practices I use to ship production software.
            </p>

            <div className="skillGrid">
              {skills.map((group, idx) => (
                <div className="card cardPad fadeInUp" key={group.group} style={{ animationDelay: `${90 + idx * 50}ms` }}>
                  <h3 className="cardTitle">{group.group}</h3>
                  <div className="chipRow">
                    {group.items.map((s) => (
                      <span className="badge" key={s}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="projects" ref={refs.projects} aria-label="Projects">
          <div className="container">
            <h2 className="sectionTitle fadeInUp">Projects</h2>
            <p className="sectionLead fadeInUp" style={{ animationDelay: "60ms" }}>
              Selected work with context, responsibilities, and measurable outcomes. Use search or filter by tech.
            </p>

            <div className="projectsToolbar fadeInUp" style={{ animationDelay: "100ms" }}>
              <input
                className="input"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search projects (title, tech, outcomes...)"
                aria-label="Search projects"
              />
              <div className="filterRow" aria-label="Project filters by technology">
                {allTags.map((t) => (
                  <button
                    key={t}
                    type="button"
                    className={`filterBtn ${activeTag === t ? "filterBtnActive" : ""}`}
                    onClick={() => setActiveTag(t)}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="projectGrid" aria-live="polite">
              {filteredProjects.map((p, idx) => (
                <article className="card cardPad fadeInUp" key={p.id} style={{ animationDelay: `${120 + idx * 40}ms` }}>
                  <div className="projectHeader">
                    <div>
                      <h3 className="projectTitle">{p.title}</h3>
                      <p className="projectDesc">{p.description}</p>
                    </div>

                    <div className="miniLinks" aria-label={`${p.title} links`}>
                      {p.links?.github ? (
                        <a className="miniLink" href={p.links.github} target="_blank" rel="noreferrer">
                          <InlineIcon d="M12 2C6.5 2 2 6.6 2 12.2c0 4.5 2.9 8.4 6.9 9.7.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.2-3.4-1.2-.4-1-.9-1.3-.9-1.3-.8-.6.1-.6.1-.6.9.1 1.4 1 1.4 1 .8 1.4 2.1 1 2.6.8.1-.6.3-1 .6-1.3-2.2-.3-4.5-1.1-4.5-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.6 0 0 .8-.3 2.7 1 .8-.2 1.6-.3 2.4-.3s1.6.1 2.4.3c1.9-1.3 2.7-1 2.7-1 .5 1.3.2 2.3.1 2.6.6.7 1 1.6 1 2.7 0 3.9-2.3 4.7-4.6 5 .3.3.6.9.6 1.8v2.6c0 .3.2.6.7.5 4-1.3 6.9-5.2 6.9-9.7C22 6.6 17.5 2 12 2z" />
                          GitHub
                        </a>
                      ) : null}
                      {p.links?.demo ? (
                        <a className="miniLink" href={p.links.demo} target="_blank" rel="noreferrer">
                          <InlineIcon d="M14 3h7v7m0-7L10 14" />
                          Demo
                        </a>
                      ) : null}
                    </div>
                  </div>

                  <div className="chipRow" aria-label="Tech stack">
                    {(p.tags || []).map((t) => (
                      <span className="badge" key={t}>
                        {t}
                      </span>
                    ))}
                  </div>

                  <div style={{ marginTop: 12 }}>
                    <p className="cardText">
                      <strong>Role:</strong> {p.role}
                    </p>
                    <div style={{ display: "grid", gap: 6, marginTop: 10 }}>
                      <p className="cardText" style={{ margin: 0, fontWeight: 800 }}>
                        Responsibilities
                      </p>
                      <ul style={{ margin: 0, paddingLeft: 18, color: "var(--muted)", fontSize: 14 }}>
                        {(p.responsibilities || []).map((r) => (
                          <li key={r} style={{ marginBottom: 6 }}>
                            {r}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div style={{ display: "grid", gap: 6, marginTop: 12 }}>
                      <p className="cardText" style={{ margin: 0, fontWeight: 800 }}>
                        Outcomes
                      </p>
                      <ul style={{ margin: 0, paddingLeft: 18, color: "var(--muted)", fontSize: 14 }}>
                        {(p.outcomes || []).map((o) => (
                          <li key={o} style={{ marginBottom: 6 }}>
                            {o}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              ))}

              {filteredProjects.length === 0 ? (
                <div className="card cardPad fadeInUp" style={{ gridColumn: "1 / -1" }}>
                  <h3 className="cardTitle">No matches</h3>
                  <p className="cardText">Try a different search term or clear the technology filter.</p>
                  <div className="heroActions">
                    <button
                      className="btn"
                      type="button"
                      onClick={() => {
                        setQuery("");
                        setActiveTag("All");
                      }}
                    >
                      Clear filters
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </section>

        <section className="section" id="contact" ref={refs.contact} aria-label="Contact">
          <div className="container">
            <h2 className="sectionTitle fadeInUp">Contact</h2>
            <p className="sectionLead fadeInUp" style={{ animationDelay: "60ms" }}>
              Want to collaborate or discuss a role? Send a note—this form is UI-only by default and can be wired to an API later.
            </p>

            <div className="card cardPad fadeInUp" style={{ animationDelay: "110ms" }}>
              <form onSubmit={onContactSubmit}>
                <div className="formGrid">
                  <label>
                    <span style={{ display: "block", fontWeight: 800, fontSize: 13, marginBottom: 6 }}>Name</span>
                    <input className="input" name="name" placeholder="Your name" required />
                  </label>

                  <label>
                    <span style={{ display: "block", fontWeight: 800, fontSize: 13, marginBottom: 6 }}>Email</span>
                    <input className="input" type="email" name="email" placeholder="you@company.com" required />
                  </label>

                  <label className="textarea">
                    <span style={{ display: "block", fontWeight: 800, fontSize: 13, marginBottom: 6 }}>Message</span>
                    <textarea className="input textarea" name="message" placeholder="How can I help?" required />
                  </label>
                </div>

                <div className="heroActions" style={{ marginTop: 14 }}>
                  <button className="btn btnPrimary" type="submit">
                    Send message
                  </button>
                  <a className="btn" href={`mailto:${profile.links.email}`}>
                    Email instead
                  </a>
                </div>

                <div className="helperText">
                  Tip: Customize your email/GitHub/LinkedIn in <code>src/portfolioData.js</code>.
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer" aria-label="Footer">
        <div className="container">
          <div className="footerInner">
            <div>{meta.footerText}</div>
            <div className="socialRow" aria-label="Social links">
              <a className="miniLink" href={profile.links.github} target="_blank" rel="noreferrer">
                GitHub
              </a>
              <a className="miniLink" href={profile.links.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
              <a className="miniLink" href={`mailto:${profile.links.email}`}>
                Email
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Toasts */}
      <div className="toastWrap" aria-live="polite" aria-relevant="additions removals">
        {toasts.map((t) => (
          <div className="toast" key={t.id} role="status">
            <p className="toastTitle">{t.title}</p>
            <p className="toastText">{t.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
