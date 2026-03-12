# Legacy — Backlog

## Rename: hubris → legacy

The repo is being renamed from "hubris" to "legacy" to encompass multiple facets of the world. Hubris becomes one collection among several.

### Mechanical changes (in this repo)

- [x] Update TODO.md (this file)
- [ ] Rename GitHub repo: `gh repo rename legacy -R para-garden/hubris`
- [ ] Move local directory: `~/git/paragarden/hubris/` → `~/git/paragarden/legacy/`
- [x] `site-config.ts`: single collection, contentDirs: ["meta", "world"]
- [ ] `package.json`: name → "legacy"
- [ ] `public/index.html`: title → "legacy"
- [ ] `flake.nix`: description → "legacy - worldbuilding project"
- [x] `CLAUDE.md`: rewrite for single collection with facets as tags
- [x] `README.md`: rewrite for legacy framing
- [x] `public/content/meta/hubris.md` → collections: [default]
- [x] `public/content/meta/legacy.md` → landing node with facets section
- [x] `public/content/hubris/` → `public/content/world/` (flat content dir)
- [x] Remove empty collection dirs and per-collection meta nodes
- [ ] Update `.github/workflows/deploy.yml` if needed (probably fine as-is)
- [ ] GitHub repo settings: update homepage to `https://legacy.paragarden.world/`

### Mechanical changes (ecosystem docs — github-io)

- [ ] `CLAUDE.md`: update External / Related Repos table
- [ ] Memory files: update hubris references

## Facets

The world is called "legacy" — what humanity left behind. Facets are not eras, not a timeline — they're coexisting forces, lenses, patterns. They overlap. A single document can carry multiple facets. Content lives in one flat collection; facets are tags.

### hubris

The era of overreach. Humans in the moment, certain they are right.

### consequences

The aftermath. What follows the overreach — humans dealing with the fallout.

### unsettlement

Post-scarcity runaway consumerism rendering the world uninhabitable. "Unsettling" (disturbing) + "un-settlement" (making the world unlivable). Potentially morbid — humanity as archaeological artifact. The machines that survived in a world no animals could — they have the data but not the context.

### futility

Humanity brute-forcing intelligence. Scaling LLMs — one-hot encoding on a linear representation of knowledge with autoregressive output — instead of rethinking the architecture. Pouring civilization-scale resources into making the same wrong thing bigger.

### aspiration

Reaching for utopia but ignoring material, energy, intellectual, and time limits. Getting 20%, 50%, 80%, 95%, 99.9% of the way there... and then running out of resources. The scaffolding starts to crumble. The closer you got, the more devastating the failure.

### domestication

A few individuals with disproportionate effect on public consciousness. Humanity domesticating itself — shaped top-down into compliance through culture, not genetics.

### justice

Justice as a product. Available to those who can afford it.

### complacency

Outsourcing thinking itself. Not misinformation — that's a surface symptom. The cause: people stop reasoning for themselves entirely because the machine does it passably enough. "Is this real?" → ask the AI, take the answer, move on. Never check, never question, never think.

Distinct from domestication (top-down, done *to* you) — complacency is bottom-up, done *to yourself*.

### choice

The illusion of choice. Every option leads to the same place — political horseshoe, consumer "choice," career "choice." The whole apparatus of freedom that's really just selection from a curated menu. Two "sides" that are functionally the same thing, a spectrum that collapses into one outcome wearing different labels.

### satisfaction

Metric satisfaction. Picking the numbers that tell the story you want. GDP goes up, so things are good. Engagement is high, so people are happy. The metrics are chosen *because* they tell the right story — deliberately. Pick the number that makes things look fine, ignore the ones that don't, and now you have proof.

### rounding

Real humans treated as a decimal point. People who don't fit the model get rounded away — statistical noise, not significant enough to count. The ones who fall through the cracks aren't a bug, they're a rounding error. Homelessness in America is 0.23%. Only 770,000 people.

Satisfaction is the top (who picks the numbers and why). Rounding is the bottom (who disappears when they do).

## Hubris collection backlog (preserved)

### Successful life (surface only) — options

Pick one, but don't lose the others:

- **The job that requires you to be someone you're not** — good title, good salary, the self slowly ground down by the performance of it
- **The apartment that's fine but alone in it** — stability as the thing that quietly replaced everything else
- **Deferral** — health stuff, relationships, figuring out who you actually are. The life that looks complete because nothing has visibly gone wrong yet.
- **The metrics trap** — hitting every external marker (promoted, partnered, owns things) while something internal has quietly gone dark
- **Startup CEO** — genuinely believes they're changing the world, the hustle is real, the success is real, the thing they built is also the thing that's grinding someone else down
- **Real estate mogul** — runs the numbers, the numbers work, buys up affordable housing, converts it, completely rational, also the reason someone can't afford rent
- **VC / investor** — one step removed from the product, funds the things, takes the returns, the distance is the point

### Homes

Multiple distinct homes, each foregrounding a different pressure. Also: one building multiple units, and housing instability over time — all valid shapes. The world should be vast enough that no single reader sees everything.

Pressures to explore (not exhaustive):

- **Poverty / self-fulfilling prophecy** — you're poor because your parents were poor, the zip code determines the school, the school determines the score, the score determines the job. The system calls it meritocracy.
- **Bad roommate** — the specific hell of being trapped with someone, the power dynamics, the ways it can go wrong
- **Financial struggle** — rent that eats everything, the math that never works out, the decisions you make when there's no good option
- **Unsafety / crime** — not just crime rates but the specific texture of feeling unsafe at home, who gets protected and who doesn't
- **Racial discrimination** — housing discrimination, redlining's long tail, who gets approved and who doesn't, same income different outcomes
- **LGBT / coming out** — home that isn't safe to be yourself in, or trying to come out and it going wrong, or just the quiet of not being able to
- **Trans-specific** — the home that becomes hostile, family rejection, the particular isolation
- **Neurodivergence / ADHD + executive dysfunction** — the weight it adds to everything, the ways home becomes harder to maintain, the shame spiral, cutting across all other pressures
- **Neglect** — a home that was never really a home, the absence of care, what that does over time
- **Housing instability** — multiple homes over time, each one a different kind of precarity

### Healthcare — parallel threads

Same event as Riley's story (appendectomy), different outcomes. For juxtaposition. Not a parallel document series — fragments, things you find. Some harder to find than others. The medical stuff as entry point, the ripple as the story.

- **No insurance** — chargemaster price is the real price. What that actually looks like.
- **Debt cascade** — medical debt tips into missed rent, destroyed credit, downstream effects on unrelated things. Medical in the background, ripple in the foreground.
- **Delayed care** — person who didn't go in because of cost. Paid a different price for that.
- **Out-of-network cascade** — anesthesiologist came back OON and tipped something Riley narrowly avoided.
