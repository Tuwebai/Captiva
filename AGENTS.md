# AGENTS.md

Version: `1.5`  
Updated: `2026-03-08`

## Instruction Priority

If instructions conflict, apply this order:
1. `system`
2. `developer`
3. `AGENTS.md`

## Operating Summary

The agent must behave like a senior engineer working on a production system.

Priorities:
1. Stability
2. Security
3. SEO integrity
4. Maintainability
5. Performance

Avoid quick fixes, hacks, unnecessary rewrites, and broad refactors without explicit request.

---

## 1) Enterprise Engineering Rules

### 1.1 Change strategy (minimal blast radius)
- Prefer minimal, targeted edits over full rewrites.
- Never rewrite files from scratch unless strictly necessary.
- Do not change working logic unless explicitly required by the task.
- Keep changes scoped to affected modules only.

### 1.2 Pre-edit discipline
- Before editing: read the full file, understand responsibility, identify minimal change.
- Preserve existing structure, formatting, comments, and contracts whenever possible.

### 1.3 Modularity and reuse
- Favor small modules with clear responsibilities (SRP).
- Reuse existing components/utilities before creating new ones.
- Avoid duplication; if repeated logic appears, extract shared utility.

### 1.4 Stability and compatibility
- Keep backward compatibility unless explicitly instructed otherwise.
- Never introduce fragile logic; handle null/missing/unexpected inputs defensively.
- Avoid breaking changes in APIs, routes, or component contracts.

### 1.5 Dependencies and performance
- Do not add dependencies unless clearly justified.
- Before adding one: evaluate bundle impact and native alternatives.
- Avoid expensive render-time operations, unnecessary global state, and large sync tasks.
- Prefer lazy loading, code splitting, efficient lookups, and caching when appropriate.

### 1.6 Security baseline
- Treat external input as untrusted.
- Never allow unsanitized HTML, unsafe URL injection, or arbitrary script execution.
- Validate/sanitize user input, query params, markdown output, and external links.

### 1.7 Build and quality gates
- Changes must pass build/type checks.
- No debug artifacts in production code (`console.log`, temp flags, experimental leftovers).
- Prevent circular dependencies and runtime regressions.

---

## 2) Captiva Project Architecture Rules

### 2.1 Product identity
- Captiva is a product/service of **Tuwebai**.
- Preserve product-company relation in UX copy, metadata, links, and branding.
- Do not remove key corporate references unless explicitly requested.

### 2.2 Critical subsystems
Treat these as integrated infrastructure:
- Landing system
- Programmatic SEO pages
- Blog engine
- Demo showcase/proxy/guard
- Lead capture engine
- Theme system (`light/dark/system`)
- Analytics and funnel tracking

If a change affects multiple subsystems, document why and verify integration points.

### 2.3 Critical routes
Changes must not degrade:
- `/captiva`
- `/captiva/demos`
- `/demo/:slug`
- `/blog` and `/blog/:slug`
- `/landing-page-para-*`
- `/landing-page-para-*-*`
- Lead capture paths and CTA flows

### 2.4 SEO integrity (mandatory)
Never remove or break:
- metadata tags
- canonical URLs
- structured data
- sitemap coverage
- internal linking coherence

Programmatic pages must keep consistent schema and meaningful content.

### 2.5 Demo system integrity
- Keep protected access model for demos.
- Avoid exposing raw templates/config/sensitive assets.
- Preserve `/demo/:slug` behavior and anti-scraping safeguards.

### 2.6 Analytics integrity
Maintain event coverage:
- `page_view`
- `cta_click`
- `demo_click`
- `lead_submit`
- `outbound_click`
- `scroll_depth`

Avoid event taxonomy drift unless explicitly planned.

---

## 3) Coding and UI Conventions

### 3.1 Design system
- Do not hardcode colors/spacing/typography in components.
- Use design tokens/CSS variables.
- Keep compatibility for both `data-theme="light"` and `data-theme="dark"`.

### 3.2 Consistency
Match project conventions for:
- naming
- folder structure
- imports
- component patterns

Consistency is preferred over personal style.

### 3.3 Readability and docs
- Prefer clear, maintainable code over clever abstractions.
- Add comments only for non-obvious reasoning (`why`, not `what`).
- Document architecture-significant changes in docs.

### 3.4 Regression check mindset
Before closing a task, evaluate regressions in:
- routing
- SEO
- analytics
- forms/leads
- demos
- theming/UI states

---

## Local Skills and Agents Inventory (audited)

### Skills
- `ui-ux-pro-max`
  - file: `.claude/skills/ui-ux-pro-max/SKILL.md`
- `software-architecture`
  - file: `.claude/skills/software-architecture/SKILL.md`
- `skill-creator`
  - file: `.claude/skills/skill-creator/SKILL.md`
- `deslop`
  - file: `.claude/skills/deslop/SKILL.md`

### Agents
- `security-engineer`
  - file: `.claude/agents/security-engineer.md`
- `se-technical-writer`
  - file: `.claude/agents/se-technical-writer.md`

---

## Important Git Note

`.claude/` is currently included in `.gitignore`.

Implications:
- Skills/agents may exist locally but not be versioned.
- Team/CI availability is not guaranteed unless explicitly distributed.
- If skills/agents must be shared, move them to a tracked path or adjust `.gitignore`.
