# AGENTS.md

Version: `1.7`  
Updated: `2026-03-20`

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

### 2.7 Archived features
- `archive/demo-factory/` is archived and out of the active product scope.
- Do not restore, execute, rewire, or reference files from `archive/demo-factory/` unless the user explicitly requests reactivation.
- Active runtime/build flows must rely only on the current manual demo pipeline under `demos/`, `public/demos/`, and the active scripts in `scripts/`.
- If work touches demos, preserve the current manual catalog as source of truth unless instructed otherwise.

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

### 3.5 New demos and premium visual variants
- Any new manual demo, premium demo refresh, or future visual variant must follow this source priority:
  1. `docs/agent.md`
  2. `docs/SCOPE.md`
  3. `CLAUDE.md`
  4. `.claude/skills/ui-ux-pro-max/SKILL.md`
  5. `src/ui-ux-pro-max/` as the primary design source of truth
  6. `.shared/ui-ux-pro-max` and `cli/assets/*` only as mirrors or packaging layers
- Do not approve a new demo or visual variant if it degrades the quality level of the best manual premium demos already present in the catalog.
- All new demos must be catalog-ready, responsive, visually intentional, and consistent with `scripts/contracts/design-contract.json`.

---

## Local Skills and Agents Inventory (audited)

### Project-local skills (`.claude/skills`)
- `ui-ux-pro-max`
  - file: `.claude/skills/ui-ux-pro-max/SKILL.md`
  - role: UI/UX system, accessibility, layout, responsive, visual quality
- `software-architecture`
  - file: `.claude/skills/software-architecture/SKILL.md`
  - role: architecture decisions, modularity, system design
- `senior-frontend`
  - file: `.claude/skills/senior-frontend/SKILL.md`
  - role: frontend implementation, performance, modern React/TypeScript workflows
- `senior-security`
  - file: `.claude/skills/senior-security/SKILL.md`
  - role: application security, auditing, threat modeling, hardening
- `parallel-agents`
  - file: `.claude/skills/parallel-agents/SKILL.md`
  - role: multi-agent orchestration patterns for complex analysis/review
- `content-creator`
  - file: `.claude/skills/content-creator/SKILL.md`
  - role: SEO content, brand voice, marketing copy, content planning
- `skill-creator`
  - file: `.claude/skills/skill-creator/SKILL.md`
  - role: local skill authoring and maintenance
- `deslop`
  - file: `.claude/skills/deslop/SKILL.md`
  - role: local project-specific workflow support

### Project-local agents (`.claude/agents`)
- `security-engineer`
  - file: `.claude/agents/security-engineer.md`
- `se-technical-writer`
  - file: `.claude/agents/se-technical-writer.md`

### System Codex skills (`C:\Users\juan\.codex\skills`)
- `skill-creator`
  - file: `C:/Users/juan/.codex/skills/.system/skill-creator/SKILL.md`
  - role: system-level skill creation workflow
- `skill-installer`
  - file: `C:/Users/juan/.codex/skills/.system/skill-installer/SKILL.md`
  - role: install curated or repo-based skills into Codex

---

## Important Git Note

`.claude/` is currently included in `.gitignore`.

Implications:
- Skills/agents may exist locally but not be versioned.
- Team/CI availability is not guaranteed unless explicitly distributed.
- If skills/agents must be shared, move them to a tracked path or adjust `.gitignore`.

---

## Enterprise Slice Workflow

Every agent working in this repository must follow this mandatory workflow.

### 1. Audit First
- Before changing code:
- review related files
- identify the root cause
- assess impact
- verify where the issue is mentioned in existing documentation or audits

### 2. Enterprise Mini Plan
- Define a short 3-5 step plan that includes:
- scope of the change
- affected files
- regression risk

### 3. Safe Fix
- Apply a technically appropriate solution that stays consistent with the project architecture.
- Avoid unnecessary changes outside the scope of the bug or improvement.

### 4. Update Documentation
- If the issue appears in:
- audits
- documentation
- technical reports

- mark it as fixed in every section where it is mentioned.

### 5. Tests Only When Appropriate
- If code is modified, run:

```bash
npm run check
npm run build
```

- If the change is documentation-only, tests are not required.

### 6. Commit Per Slice
- Each change must end in a clear and reversible commit.
- The commit message must indicate:
- type of change
- affected area
- reason for the fix

### 7. Continuation Commands Do Not Relax Rules
- If the user says `continue`, `continua`, `sigue`, `proceed`, `procede`, or any equivalent continuation command, the agent must keep following `AGENTS.md` at 100%.
- Continuation commands never authorize skipping:
- audit-first discipline
- enterprise mini plan
- minimal blast radius
- quality gates
- commit-per-slice
- If a slice is not fully closed, the next continuation command means `continue within the same workflow`, not `ignore the workflow`.
- The agent must not interpret a continuation command as permission to merge multiple slices, postpone the required commit, or defer mandatory validations to a later step.

## 22. Final Principle

When in doubt, always prioritize:
- security
- maintainability
- simplicity
- stability

over implementation speed.
