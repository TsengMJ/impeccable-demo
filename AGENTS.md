# Test Lab instructions

<!-- CODEGRAPH_START -->
## CodeGraph
In repositories indexed by CodeGraph (a `.codegraph/` directory exists at the repo root), use `codegraph_explore` or `codegraph explore` BEFORE grep/find or reading code. If there is no `.codegraph/` directory, skip CodeGraph entirely; indexing is the user's decision.
<!-- CODEGRAPH_END -->

## Scope and provenance
- This is a local test harness, not the upstream Impeccable repository.
- Every experiment is independent. Edit only the requested `demos/<key>/` or `experiments/<key>/` directory unless explicitly asked to change the harness.
- Never edit `public/baselines/` or rewrite `docs/provenance.json` hashes to hide drift. Keep Apache attribution.
- `docs/prompts/<key>.md` holds the case's product facts. Do not inherit a different case's visual direction, or the upstream demo's context from `vendor/`.
- The three experiments initially contain explicit pending placeholders. They are not generated results or no-skill baselines.
- User requirement: each of wallet / tea / festival MUST have a real no-Impeccable result before any skill treatment. Do not generate only the skill version or use a placeholder as Before.
- Generate version A in a fresh conversation and isolated project where Impeccable instructions, local/global skills, plugins and hooks are not loaded. This existing conversation has already read the skill and cannot serve as the clean control. Audit availability before claiming isolation; removing the `$impeccable` prefix alone is insufficient. Do not create user-owned tasks unless the user explicitly requests them.
- Freeze A's source, exact Prompt, model/settings, tools/assets, screenshots and recordings. Then copy A and apply the chosen skill command to version B; preserve A intact. Keep the original product brief, model/settings and viewing conditions fixed, and record B's exact additional command and all interventions. This is an iteration comparison, not proof that skill alone caused every difference.
- Before presenting a case as ready for comparison, expose A and B at separate local paths in this same frontend project and verify both. Extend the route/capture registry then; the current scaffold does not yet provide these generated A/B paths. If either version or its provenance is missing, mark the comparison incomplete.
- Independent from-scratch generation with skill is a separate optional experiment C, not a substitute for the requested A-to-B before/after comparison.
- Before executing any experiment, save the exact user Prompt and a before snapshot. Afterward save code, follow-up prompts, failures, manual fixes, asset origins and actual validation evidence. Use `scripts/snapshot.mjs`.
- Do not label a command executed just because a prompt exists. Don't invent model configuration, elapsed generation times, scores or official source prompts.
- After generating a case, update its displayed status/note in `src/data.js` and home counts if requested; document that harness edit separately from the experiment.
- Keep the stack simple: native HTML/CSS/JS and one Vite server. Shared harness styles must not affect demo pages.
- Skill is manually installed in `.agents/skills/impeccable` at a pinned commit; no hooks were installed. Ask for no additional permission for actions already authorized by the current user request.
