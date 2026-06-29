document.documentElement.classList.add("js-enabled");

// ════════════════════════════════════════════════════════════
// BERKE MEMIOGLU — PORTFOLIO SCRIPT
// Change smaller project data here.
// To add another project, copy one object in PROJECTS.
// ════════════════════════════════════════════════════════════

const PROJECTS = [
  {
    title: "C Software Renderer",
    subtitle: "CPU-Side Textured 3D Renderer",
    image: "assets/software-renderer.png",
    tech: ["C", "Rasterisation", "Math", "Depth Buffer"],
    bullets: [
      "Built a scratch-implemented CPU rasterisation pipeline with custom math structures for world-to-camera transforms, clipping, perspective projection, and depth buffering.",
      "Implemented textured triangle and quad rendering with UV interpolation and texture sampling.",
      "Profiled close-up scenes to identify CPU-side rasterisation bottlenecks."
    ],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/BenBerke/3D-Software-Renderer"
      }
    ]
  },
  {
    title: "C Interpreter",
    subtitle: "Tree-Walking Language Implementation",
    image: "assets/interpreter.png",
    tech: ["C", "Lexer", "Parser", "AST", "Runtime"],
    bullets: [
      "Developed a custom tree-walking interpreter with a hand-written lexer, recursive-descent parser, AST representation, variables, expressions, conditionals, scoped blocks, and return values.",
      "Implemented user-defined functions, recursive function calls, and runtime scope handling.",
      "Manually managed AST and runtime memory in C."
    ],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/BenBerke/C-Interpreter"
      }
    ]
  },
  {
    title: "Custom 8-Bit CPU Architecture",
    subtitle: "Digital Logic Design",
    image: "assets/cpu-logisim.png",
    tech: ["Logisim", "Digital Logic", "Assembly", "CPU Design"],
    bullets: [
      "Designed an 8-bit CPU from digital logic components, implementing an ALU, registers, program counter, instruction decoder, and control logic.",
      "Defined a custom instruction set.",
      "Tested execution flow by simulating simple assembly-style programs in Logisim Evolution."
    ],
    links: []
  }
];

function renderProjects() {
  const grid = document.getElementById("projects-grid");
  if (!grid) return;

  grid.innerHTML = PROJECTS.map((project, index) => {
    const techHtml = project.tech
      .map(item => `<span class="tech-badge">${item}</span>`)
      .join("");

    const bulletHtml = project.bullets
      .map(item => `<li>${item}</li>`)
      .join("");

    const linkHtml = project.links
      .map(link => `
        <a href="${link.href}" target="_blank" rel="noopener noreferrer" class="pc-link">
          ${link.label}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
            <polyline points="15 3 21 3 21 9"/>
            <line x1="10" y1="14" x2="21" y2="3"/>
          </svg>
        </a>
      `)
      .join("");

    const linksSection = linkHtml
      ? `<div class="pc-links">${linkHtml}</div>`
      : "";

    return `
      <article class="project-card animate-on-scroll" style="transition-delay: ${index * 0.08}s">
        <div class="pc-image">
          <img
            src="${project.image}"
            alt="${project.title} screenshot"
            loading="lazy"
            onload="this.nextElementSibling.style.display='none'"
            onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'"
          />
          <div class="pc-image-placeholder" style="display: none;">
            Image missing: ${project.image}
          </div>
        </div>

        <div class="pc-body">
          <h3 class="pc-title">${project.title}</h3>
          <p class="pc-subtitle">${project.subtitle}</p>

          <div class="pc-tech">
            ${techHtml}
          </div>

          <ul class="pc-bullets">
            ${bulletHtml}
          </ul>

          ${linksSection}
        </div>
      </article>
    `;
  }).join("");
}

function setupMobileNav() {
  const burger = document.querySelector(".nav-burger");
  const navLinks = document.querySelector(".nav-links");

  if (!burger || !navLinks) return;

  burger.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    burger.classList.toggle("open", isOpen);
    burger.setAttribute("aria-expanded", String(isOpen));
    // Prevent body scroll when menu is open
    document.body.style.overflow = isOpen ? "hidden" : "";
  });

  // Close on link click
  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      burger.classList.remove("open");
      burger.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    });
  });

  // Close when tapping outside the menu
  document.addEventListener("click", (e) => {
    if (
      navLinks.classList.contains("open") &&
      !navLinks.contains(e.target) &&
      !burger.contains(e.target)
    ) {
      navLinks.classList.remove("open");
      burger.classList.remove("open");
      burger.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    }
  });
}

function setupNavScroll() {
  const nav = document.getElementById("nav");
  if (!nav) return;

  const update = () => {
    nav.classList.toggle("scrolled", window.scrollY > 24);
  };

  update();
  window.addEventListener("scroll", update, { passive: true });
}

function setupScrollAnimations() {
  const elements = document.querySelectorAll(".animate-on-scroll");

  if (!("IntersectionObserver" in window)) {
    elements.forEach(el => el.classList.add("visible"));
    return;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12
  });

  elements.forEach(el => observer.observe(el));
}

function setupActiveNavLinks() {
  const sections = document.querySelectorAll("section[id]");
  const links = document.querySelectorAll(".nav-links a[href^='#']");

  if (!sections.length || !links.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const id = entry.target.id;

      links.forEach(link => {
        link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
      });
    });
  }, {
    rootMargin: "-35% 0px -55% 0px"
  });

  sections.forEach(section => observer.observe(section));
}

document.addEventListener("DOMContentLoaded", () => {
  renderProjects();
  setupMobileNav();
  setupNavScroll();
  setupScrollAnimations();
  setupActiveNavLinks();
});
