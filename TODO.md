# Legacy — Backlog

## Rename: hubris → legacy

The repo is being renamed from "hubris" to "legacy" to encompass multiple facets of the world. Hubris becomes one collection among several.

### Mechanical changes (in this repo)

- [x] Update TODO.md (this file)
- [x] Rename GitHub repo
- [x] Move local directory
- [x] `site-config.ts`: single collection, contentDirs: ["meta", "world"]
- [x] `package.json`: name → "legacy"
- [x] `public/index.html`: title → "legacy"
- [x] `flake.nix`: description → "legacy - worldbuilding project"
- [x] `CLAUDE.md`: rewrite for single collection with facets as tags
- [x] `README.md`: rewrite for legacy framing
- [x] `public/content/meta/hubris.md` → collections: [default]
- [x] `public/content/meta/legacy.md` → landing node with facets section
- [x] `public/content/hubris/` → `public/content/world/` (flat content dir)
- [x] Remove empty collection dirs and per-collection meta nodes
- [x] `.github/workflows/deploy.yml` — no changes needed
- [x] GitHub repo settings: homepage + description updated
- [x] Move `~/.claude/projects/` dir to new path

### Mechanical changes (ecosystem docs — github-io)

- [x] `CLAUDE.md`: update External / Related Repos table
- [x] Memory files: update hubris references

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

### amplification

The loudest signals are the ones that get reflected. Opinions spread because they demand a response — agreement, disagreement, doesn't matter. The algorithm doesn't care which side you're on. Polarizing by design because that's what spreads. A person who would have had 200 followers in 2005 has 2 million in 2032. The reach is the distortion.

Not rage specifically — opinions. The hot take economy. Contrarianism as strategy. Stake a position, harvest the replies.

### scarcity

Manufactured scarcity. There is enough — food, water, housing, medicine. The shortage is a policy decision. Someone decided who gets it and who doesn't. The same drug, the same molecule, the same factory — different price across a border. American healthcare is the clearest case: the treatment exists, the hospital is right there, you just can't have it.

Distinct from `margins` (extraction from the living) and `distance` (the gap between decision and consequence). Scarcity is the precondition — the surplus that exists and is withheld.

### distance

The gap between the decision and its consequences. The shareholders don't see the body. The algorithm doesn't know her name. The policy is written far away by people who will never meet the person it affects. Not malice — removal. The mechanism that makes it possible to do enormous harm while remaining, personally, a decent person.

### margins

When the numbers matter more than the people behind them. Not a loss — a gain. The margin is extracted from the living. The number that gets better the worse things get for someone else.

Distinct from `rounding` (you were counted and then disappeared) — margins is the active extraction, the improvement that comes at someone else's expense.

### consumption

Ambient excess. Nobody calls themselves a consumer. The McMansion, the portion size, the defense budget, the data center that uses a river to cool itself. No philosophy, no community, no self-awareness. Just more, because more was available and nobody said stop.

Distinct from `unsettlement` (the ecological toll of all this) and `excess` (the post-scarcity moment). Consumption is the background radiation — so normalized it's invisible.

### excess

Post-scarcity (derogatory). We solved enough problems to have room for spectacular new ones. Abundance as the precondition for a particular kind of self-destruction. Not greed — what happens when the constraints come off. We had enough, and kept going anyway.

Distinct from `consumption` (ambient, unconscious) — excess is the moment of. The thing you do when there's no more need to justify it.

### indulgence

Pleasure as philosophy. Excess without apology. A subculture (several, really) that started in the 1960s and never stopped being honest about what it wanted.

Distinct registers under the same tag — different venues, different bodies, different stakes, different social logic:

- **Swinging / lifestyle** — Plato's Retreat, key parties. Straight, married, mostly white, middle-aged. Post-sexual-revolution but pre-AIDS. Institutional in its own way — couples, rules, the cul-de-sac.
- **Queer nightlife / club culture** — downtown scene, drag balls, house/ballroom. Survival and celebration in the same breath. The spaces that were refuge before they were aesthetic. Queer roots of house, techno, the whole lineage.
- **Free love / countercultural** — communes, sex as political act. The ones who thought they were dismantling something. Ideology first, pleasure second (or simultaneously).
- **Rave culture and adjacent** — collective transcendence with hedonism as side effect. PLUR. The music as the point, the drugs as a tool. Underground → festival product → nostalgia brand. The transcendence gets packaged.
- **Burning Man arc** — started countercultural, became tech-bro indulgence tourism. The commodification of temporary dissolution.
- **Ketamine clinics / legal psychedelics** — medicalization and mainstreaming of what used to be illegal and communal. The wellness-to-hedonism pipeline.
- **Greek system** — institutional hedonism. Has a house, a legacy, a hazing ritual. Handed down. Rules about who's inside and who isn't. Class reproduction, assault liability, alumni donor networks. Hierarchical where rave culture (in its original form) was about dissolving hierarchy — same surface behaviors, opposite social logic.

The common thread: **altered states and excess as access to something real.** Whether that's pleasure, connection, transcendence, escape, or belonging — the body and its chemistry as the site of meaning.

By 2032: 30+ more years of evolution, fragmentation, commodification. What was underground is a product. What was radical is a brand.

## Facet coverage

As of 2026-03-27 (continued). 126 world docs. All facets covered; former sparse facets now moderate.

### Moderate (5-10 docs)

- **amplification** (5), **futility** (5), **unsettlement** (5), **excess** (6), **hubris** (6)
- **absence** (7), **consumption** (8), **choice** (9), **complacency** (10), **indulgence** (10)

### Well-covered (12+ docs)

- **domestication** (11), **aspiration** (12), **consequences** (13), **satisfaction** (18)
- **scarcity** (19), **rounding** (23), **justice** (24), **margins** (44), **distance** (87)

### 2032 tools — the absence cluster

The world describes tools that should exist. The citation mechanic inverted: fiction links to a real download page. The reader goes from "imagine if this existed" to "wait, this exists?"

Two approaches (not mutually exclusive):
1. **Real tools earning their place** — rhi ecosystem tools (normalize, rescribe, pad/Lumen, dusklight, paraphase, crescent, reincarnate) appear in world documents because the facets demand them. Lumen already exists this way (complacency). Each tool must illuminate a facet, not just be a product page.
2. **Imaginary tools waiting for an implementor** — tools that *should* exist but don't. Not necessarily rhi tools. Things that are obvious-in-retrospect, tools shaped by the absence. The 2032 version exists in the fiction; the 2026 version is a gap.

The connecting facet is **absence** — the thing that should be here and isn't. The reason it doesn't exist is the world itself: wrong incentives, no market for the right thing, the person who could build it is building four other things.

### Lumen / noachen.net — build the real thing

The citation mechanic fully inverted: the fictional tool is real software at a real domain. The reader finds Lumen in the legacy world, clicks through, and Noa Chen is real enough to have a domain, a GitHub, and software that works.

**noachen.net** — Noa's personal site. Sparse, careful, her voice. Blog posts from the late 2020s watching her figure out the problem pad solves before she names it. The whole arc visible if you scroll back far enough.

**lumen** — real software. LuaJIT + crescent underneath (vendored binaries in the repo, no install ceremony). Local-first, single binary, SQLite, full-text search, no telemetry, no account. pad is the proven foundation; Lumen is what pad looks like with a face.

**github.com/noachen/lumen** — real repository. Commit history starting ~2028. Plausible, not announced. The repo doesn't say it's fiction. Nothing does.

**Stack:** LuaJIT (finished, fastest JIT on the planet, best FFI). crescent for ecosystem/stdlib/distribution. Binaries vendored for all platforms — clone and run, no toolchain required. Same approach as pad's `core/dep/`.

**Priority:** when crescent is far enough along to be the right foundation. Not before. Lumen should be built once and built right.

**Two repos:**
- `noachen/lumen` — the public artifact. Faked commit history aligned to the changelog. No meta-commentary. The fiction stands on its own.
- `paragarden/lumen-dev` — the making-of. Real development history, fabrication script that generates the faked git history from the canonical changelog, decision notes. Public is fine — anyone who finds it knows what it is, but Noa's repo doesn't link to it so it doesn't break anything.

**Fabrication script:** takes the changelog as input, produces a git repo with *texture* — not one commit per release but the shape of real development. Small fixes between releases. The sync rebuild visible as a six-week gap in commit density. Early 2028 commits where it's clearly not done yet. The history should feel discovered, not generated.

**Initial commit hash:** `90ac4e9` — NOACHEN in calculator hex (9=N, 0=O, a=A, c=C, 4=H, e=E, 9=N). Mined deliberately. Every Noa repo shares this root. Date: sometime in 2025, probably — after the B2B exit settled and before she started building seriously. The kind of thing you do on a quiet afternoon when you're setting up a new machine and thinking about what comes next.

## Hubris collection backlog (preserved)

### Entertainment industry cluster

Three industries, one structure: extract creative labor, own the output, manufacture parasocial connection to the product, discard the people when they're spent. The fan's love is real. The industry uses that love as leverage.

Documents are not necessarily one-per-arc. Some stories contain the whole arc. Personal details matter — the thing they loved before they knew what it would cost them. Fiction must be tamer than reality; reality is already this bad.

**Research complete** (2026-03-27) — see notes below. All numbers are real and citable.

#### Gamedev

Real source: Nathan Allen Ortega — cosplayed as a Telltale character, relocated from Texas, landed dream job, developed an ulcer, 30 minutes to clear his desk when Telltale collapsed. This is the template.

Real numbers: Telltale 225 layoffs in a day, 30-minute notice, paper check, healthcare expired within days. Some hired one week prior. CDPR mandatory 6-day weeks after promising no crunch. Rockstar 80-hour weeks, "culture of fear" from 6 independent employees. EA settled two class-actions for $30M combined. 45,000 game jobs lost 2022–2025.

Facets: **aspiration** (going in), **margins + distance** (inside), **rounding + absence** (out)

Personal layer: what game they grew up playing. what they told their parents. what was on their desk in the box.

#### Idol industry

Real numbers: Daisy (~$150k trainee debt, paid once in two years, translation job paid 1.3x). Minjoon (₩600M debt, CEO billing "life lectures" at ₩1M/hour, sued for defamation when he went public). TVXQ: ₩50,000 after 500,000 albums sold = ₩10,000 (~$9) per member. 90% of trainees never debut. Jonghyun. VCHA member's statement: "environment that encourages eating disorders and has caused members to self-harm." Momo told to lose 7kg in a week, ate only ice cubes.

Facets: **aspiration** (going in), **domestication + margins** (inside), **rounding + consequences** (out)

Personal layer: the specific idol they loved. the audition. what their family said.

#### Animation industry

Real numbers: Japanese in-between animators at ¥200/drawing (~$2), 20–30 min per drawing. JAniCA: median 225 hours/month, 65 hours overtime. One Madhouse employee: 400 hours in a month, 37 consecutive days without a day off. US: 1/3 of Animation Guild workforce laid off leading up to 2024. Pixar 175 (14%), Netflix animation 50 (1/3 of entire feature division). Kyoto Animation: the named exception — full employment, benefits, they were treated well and someone burned the building down.

Facets: **aspiration** (going in), **margins + distance** (inside), **rounding + absence** (out)

Personal layer: the film or show that made them want this. the first paycheck. the math they did at 3am.

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

### Dani cluster — reassignment ✓

Resolved: Simone Osei (characters/simone.md) is the filer. Her incident is September 27 (different Phi Delta Sigma party). The campus chronicle article and risk management directive belong to her arc. Dani's text thread no longer links to them; the October 28 dean's office entry is removed.

### Dani cluster — text thread

text-thread-dani-mel-october-2031.md deleted — was hand-crafted and now orphaned after the reassignment. Rebuild via Gemini using characters/dani.md + a Mel character card (or just anchor Mel from Dani's perspective). The thread should cover Dani telling Mel what happened — no dean's office, no filing. Just Mel getting in the car.

### Simone cluster — to build

- [x] Title IX outcome letter (whitmore-title-ix-outcome-osei-2031.md)
- [x] Text thread with Adaeze, Oct–Dec 2031 (text-thread-simone-adaeze-2031.md)
- [ ] Simone node itself — a figure node placing her in the graph

### Citation status by document

Documents with real-system claims need quiet inline links to real sources. Status:

**Sourced:**
- `ascend-hospital-bill-appendectomy.md` — TIME, Advisory Board (saline), JAMA Surgery (OR), KFF (room), ClearHealthCosts (ED), CRS (ambulance)
- `bluecross-eob-appendectomy.md` — Health Affairs, GAO, CRS, KFF (deductible), HealthCare.gov (coinsurance), NAIC (No Surprises Act)
- `ascend-chargemaster-governance-memo-2031.md` — Health Affairs, GAO
- `resolute-recovery-collections-letter-mets.md` — FDCPA statute (Cornell Law)
- `marcus-personal-journal-2003-2033.md` — BLS (wages x2), Child Care Aware, NYT (gifted cuts), ASCA (counselor ratios)
- `whitmore-title-ix-outcome-*.md` (4 files) — 34 CFR Part 106, 2011 Dear Colleague Letter
- `phi-delta-sigma-risk-management-directive-2031.md` — NIC
- `whitmore-title-ix-intake-barrett-2032.md` — AACRAO
- `riley-personal-journal-appendectomy.md` — claims derive from sourced hospital bill/EOB docs

**Still unsourced:**
- `marcus-personal-journal-2003-2033.md` — test prep costs ($200–400). Medium confidence, needs local journalism (Chicago/NYC).
- `derek-otter-transcripts-2032.md` — portfolio numbers are fictional (no inline links needed). Could add a `<small>` footer contextualizing the investment practices with real Phoenix market data (CBRE cap rate reports, Census rent increases, Maricopa County tenant displacement ordinances). Low priority — the transcript format makes inline links impossible anyway.

**No sourcing needed** (fiction/personal voice, no real-system claims):
- Text threads (hospital-bill-reaction, riley-jess x2, simone-adaeze, dani-mel)
- Journal/personal entries (dani-journal, evan, theo, nora x2, finn, sofia, caitlin-walsh)
- Fictional artifacts (lumen-changelogs, lumen-interrupt-profile, sasha-blog, house-of-velvet, campus-chronicle)

### World analogues for research subjects

- [x] **Mikayla Raines analogue** — Joy Callahan. Community meal coordinator, Evarts, KY. Character card: `characters/joy.md`. World doc: `harlan-county-gazette-callahan-obituary-2032.md`. Facets: amplification, distance.
- [x] **Jammie Thomas-Rasset analogue** — Marco Salinas. Data gig worker, Cebu City. Character card: `characters/marco.md`. World doc: `meridian-copyright-demand-salinas-2032.md`. Facets: justice, margins, distance.

### Healthcare — parallel threads

Same event as Riley's story (appendectomy), different outcomes. For juxtaposition. Not a parallel document series — fragments, things you find. Some harder to find than others. The medical stuff as entry point, the ripple as the story.

- [x] **No insurance** — Jordan Watts. Same hospital, same procedure, no insurance. Self-pay discount 25%, owes $41,112.75. Riley owed $4,247. `ascend-hospital-bill-appendectomy-watts-2031.md`
- [x] **Debt cascade** — Jordan Watts again. Hospital bill → Resolute collections → credit score 680→574 → Greystone rental denial. The screening report doesn't say "appendectomy." `greystone-rental-application-denial-watts-2032.md`
- [x] **Delayed care** — Tyler Chen, 34, uninsured, waited 72 hours. Appendix perforated. Open surgery, ICU, 7-day stay, second procedure. Bill will exceed $100K. `ascend-discharge-summary-chen-2032.md`
- [x] **Out-of-network cascade** — Nicole Dawson. Pinnacle Anesthesia bills OON for emergency appendectomy at in-network Ascend. NSA should prevent this. Bill sent anyway. Patient has to know the law exists to enforce it. `pinnacle-anesthesia-bill-dawson-2032.md`

### Greek life — sororities

Current world only covers fraternities (Phi Delta Sigma). Sororities have their own documented issues: hazing, exclusion, body image pressure, racial gatekeeping, and assault (both as sites where victims come from and, less commonly, as direct perpetrators of hazing with sexual elements). Worth exploring — different shape from fraternity dynamics but same institutional structure.

### Node logos / org icons

Each node could display its org's logo — Ascend's teal mark, Whitmore's seal, Otter.ai's logo, etc. Needs: `icon` frontmatter field, asset pipeline for SVGs/PNGs, dom.ts changes to render icons on dots and in cards/panels. Personal docs could show author avatars. Research nodes could show source org logos.

**SVG generation:** Generating quality logos via AI is unreliable — mediocre is worse than absent. Options: (1) commission/hand-make SVGs, (2) find an AI workflow that can iterate to quality, (3) use CSS-only placeholders (initial-in-circle) as interim. Currently using option 3 for letterheads.

### Document page layout

Institutional letters (Title IX outcomes, legal demand letters) should render as paginated paper — US Letter aspect ratio (8.5×11), subtle paper styling, manual page breaks via `<div class="page">`. Partially implemented: page divs added to Title IX letters, CSS for `.page` and `.letterhead` not yet written.

### Audio generation (low priority)

Someday: generate audio for world documents. Voice recordings, phone calls, ambient sound. Very low priority — text-first world, audio as enhancement not replacement.

## Autonomous worldbuilding loop

When out of specific tasks: research real parts of society that are broken, exploitative, or quietly terrible. Find the real numbers, the real mechanisms, the real documents. Then build tamer fictional versions in legacy — the fiction is never as bad as the reality, and the citation mechanic makes that visible.

Sources of inspiration:
- Industries that chew people up (gamedev, animation, idol, gig economy, adjunct academia, residency programs, fast fashion supply chains, warehouse work, content moderation, meat processing)
- Systems that punish individuals for structural failures (medical debt, student loans, criminal justice, immigration, disability, housing)
- Institutions that perform care while extracting value (universities, hospitals, insurance, nonprofits, platforms)
- The gap between the brochure and the experience (recruitment materials vs actual conditions, marketing vs product, mission statement vs practice)

Process: research first (real sources, real numbers, real documents), then build characters (`/character`), then write going-in documents (aspiration, before the machine is legible), then inside documents (the grind, when the pattern becomes visible), then out documents (aftermath, whatever that looks like). Not every thread needs all three. Let the character tell you what's needed.

### Entertainment industry cluster (in progress)

Three industries, same pattern: creative people enter a machine that extracts their passion as labor.

**Gamedev** — Jessie Torres (complete arc)
- Going-in: forum post (aspiration)
- Inside: Arclight crunch email, David Moreno LinkedIn post
- Out: layoff email + mom text thread, Austin Chronicle coverage
- 5 documents total

**Idol industry** — Soo-yeon Park (complete arc)
- Going-in: voice message to Hannah
- Inside: Luminance trainee eval (weight flagged), Soo-yeon/Hannah text thread
- Out: trainee termination letter (₩84,480,000 debt, 24-month cooling period)
- 4 documents total

**Animation** — Yuki Shimizu (complete arc)
- Going-in: first-week blog
- Inside: six-months blog (the math visible), Animage+ AI in-betweening feature
- Out: one-year blog (DougaFlow arrived, correcting AI output now, callus softer)
- 4 documents total

**Gig economy** — Carlos Reyes (complete arc)
- Going-in: Carlos/Luis text thread (the napkin math)
- Inside: DoorDash weekly earnings, Uber quality review (4.84, minimum 4.80)
- Financial: credit card statement ($4,780/$5,000), Sofia's urgent care bill ($387), IRS installment
- Out: Carlos/Elena text thread (card declined at Fry's, $74 groceries)
- 7 documents total

**Adjunct academia** — Rachel Odom (complete arc)
- Going-in: first-semester blog (Marcus, the closet office)
- Inside: cover letter #14 of 47, email to student about AI paper (11:47 PM)
- Institutional: Whitmore appointment letter (Aug 19), rent increase (22%), student loan statement (negative amortization), Whitmore viewbook (Marcus testimonial), Google reviews (Rachel leaves a review)
- Out: unsent letter to Margaret Mary Vojtko (1 AM, 23 papers left, the math)
- 9 documents total

**Content moderation** — Nadia Okafor (complete arc)
- Character card: characters/nadia.md
- Going-in: Nadia/Keisha text thread ("I really think it's gonna be good keish")
- Inside: performance review (96.2% accuracy, wellness room 4 visits)
- Institutional: Clarity Solutions job posting, Vantage benefits guide (corporate vs contract), Vantage summit press release
- Out: Nadia/Keisha text thread (classifying the dog video, checking locks twice)
- 6 documents total

**Housing cluster** — no single character, cross-thread
- Heron Capital investor letter ("turnover is a value-creation event")
- James Whitford LinkedIn profile (Harvard MBA, youth soccer coach, marathon runner)
- Greystone rent increase notice (Rachel's 22%)
- PricePoint AI product page (the algorithm)
- Google reviews (Rachel, Denise, others)
- Ohio Tenant Rights Hotline (defunded)
- Connects to Rachel, Silver Creek/Maria

**Nursing/CNA** — Maria Gutierrez (partial)
- Resignation letter ($15.25/hr → Amazon $19)
- Silver Creek staffing memo (94% turnover)
- Ridgemont Community College catalog (where she got her CNA, clinical site at Silver Creek)
- CMS inspection report — 2 stars, 1 star staffing, 8 deficiencies, 4 CNAs for 106 residents after Maria left
- No character card yet — could build

**Criminal justice / institutional** — Maricopa County (no character, cross-thread)
- Bail schedule ($500 misdemeanor → sit in jail if you can't pay)
- Jail commissary price list (ramen $1.05, 15-min call $4.80, Keefe Group contract)
- Connects to Carlos (Phoenix), debt portfolio (Resolute buys accounts)
- Could add: pretrial detention personal document, public defender caseload memo

**Consumer systems / infrastructure** — cross-thread
- BroadbandNow availability check (1 real option at Carlos's address, $103.99/mo)
- B-Stock liquidation lot (847 returned items, $24,218 retail → $1,875 bid)
- Dollar General site selection (Evarts, KY — 0.4 miles from Joy Callahan's church)
- Desert Vista Elementary school report card (C grade, 24% math proficiency)
- Capstone Online University recruitment email targeting Carlos
- Stratum sustainability report (PR version of environmental compliance data)
- Resolute debt portfolio purchase ($38.2M face value → $1.53M, 4 cents on dollar)
- FastCash title loan ($1,100 against the Camry at 204% APR)
