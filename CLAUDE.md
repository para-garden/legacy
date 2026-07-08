# CLAUDE.md

Behavioral rules for Claude Code in the legacy repository.

## What This Is

Legacy is a worldbuilding project under the para-garden org — "what humanity left behind." It explores a world where humanity's self-destructive tendencies, not technology itself, are the source of civilizational risk. The central reframe: "AI will be dangerous for humanity" → "humanity is dangerous for humanity."

The site is a spatial graph (forked from ptera.world's engine) that you navigate like a world. Nodes are places, factions, figures, events, concepts. The graph layout is argument: proximity is relationship.

Legacy is the world. It has two collections: `default` (the world itself) and `research` (real sources behind the world). The world collection uses facets as tags — a document can carry multiple facets, coexisting forces not separate worlds.

## Origin

Scaffolded 2026-03-08 as "hubris" from a conversation about what to build next. The original name came from the Greek concept — overreach, the pride that precedes the fall. It fit: the world isn't undone by its machines. It's undone by the people who built them, who funded them, who refused to stop, who were certain they were doing the right thing.

Renamed to "legacy" on 2026-03-12 to encompass multiple facets of the world. Hubris became one collection among several — the era of overreach. "Legacy" means what humanity left behind.

"Hubris" is also a self-aware collection on ptera.world (~/git/pteraworld), where the reflective writing about these themes lives. The standalone legacy site is the worldbuilding — fiction, lore, in-universe documents, the world itself. The ptera.world collection is the author looking at it from outside.

The distinction: ptera.world is reflective. Legacy is immersive.

## Architecture

Forked from ptera.world's engine. All source is in `src/` (~1,200 lines), zero runtime dependencies except `keybinds` and `yaml`. See ptera.world's CLAUDE.md for the full architecture description — legacy uses the same graph engine, zoom tier system, content pipeline, cluster system, and build tools.

Key differences from ptera.world:
- Two collections: `default` (world) and `research` (real sources). World collection uses facets as tags.
- Site config: `name: "legacy"`, `domain: "legacy.paragarden.world"`, `metaNodeId: "meta/legacy"`
- World content lives in `public/content/world/`. Research content in `public/content/research/`.

## Commands

```bash
bun install
bun run dev       # dev server at localhost:3000
bun run build     # build to dist/
bun run inspect   # layout report
bun lint
bun check:types
```

## Content

All content lives in `public/content/world/`. Meta/landing nodes are in `public/content/meta/`.

Each file is a node in the graph. Frontmatter fields:

- `label` — node display name
- `description` — one-line summary shown in cards
- `tags` — used for coloring, grouping, and facets
- `collections` — always `[default]`
- `parent` — containment (this node lives inside another)
- `related` — edges to other nodes (also via `## Related` section in body)
- `format` — optional. controls panel presentation. the author sets this explicitly; it is never auto-detected. see below.

### Document Formats

The `format` frontmatter field tells the panel how to render the document. If absent, the document renders as standard prose. The markdown body should be structured to match the format.

**`format: thread`** — SMS/text conversation. The body must be raw HTML using these elements:

```html
<div class="thread-date">March 7, 2032</div>
<div class="msg sent"><div class="bubble">message text</div><span class="time">2:14 PM</span></div>
<div class="msg recv"><div class="bubble">reply text</div><span class="time">2:15 PM</span></div>
<div class="thread-silence">2:20 PM — no response for 3 minutes</div>
<div class="thread-receipt">Read 2:54 PM</div>
```

- `.msg.sent` — right-aligned (the document's protagonist)
- `.msg.recv` — left-aligned (the other person)
- `.time` — timestamp, shown beneath the bubble
- `.thread-silence` — centered gap annotation (no response for N minutes)
- `.thread-date` — centered date header at top
- `.thread-receipt` — read receipt line at the end

Do not mix markdown prose and thread HTML in the same document. The thread format renders the entire body as a flat message list.

**`format: document`** — institutional document (letter, bill, form). Uses `.page` divs to simulate paper pages. Each `.page` has fixed paper proportions (`aspect-ratio: 8.5/11`) with `overflow: hidden` in the graph panel — content that doesn't fit is clipped.

**Rule: every `.page` div must fit its content.** A document with more content than fits on one paper page must be split across multiple `.page` divs. Each new page should repeat the letterhead if the real document would. There is no CSS fix for overflow — the split must happen at the content level. When writing or editing a `format: document` file, count the pages and check that none overflow.

### Facets

Facets are tags, not separate collections. A document can carry multiple facets.

- **hubris** — the era of overreach. humans in the moment, certain they are right.
- **consequences** — the aftermath. what follows the overreach.
- **unsettlement** — post-scarcity runaway consumerism rendering the world uninhabitable. the machines document what remains.
- **futility** — humanity brute-forcing intelligence. scaling the wrong thing.
- **aspiration** — reaching for utopia. ignoring limits. almost getting there.
- **domestication** — a few individuals with disproportionate effect on public consciousness. humanity domesticating itself top-down.
- **justice** — justice as a product. available to those who can afford it.
- **complacency** — outsourcing thinking itself. people stop reasoning because the machine does it passably enough.
- **choice** — the illusion of choice. every option leads to the same place.
- **satisfaction** — metric satisfaction. picking the numbers that tell the story you want.
- **rounding** — real humans treated as a decimal point. people who don't fit the model get rounded away.
- **indulgence** — pleasure as philosophy. excess without apology. a subculture that started in the 1960s and never stopped being honest about what it wanted.
- **consumption** — ambient excess. nobody calls themselves a consumer. the mcmansion, the portion size, the data center. more because more was available and nobody said stop.
- **excess** — post-scarcity (derogatory). we solved enough problems to have room for spectacular new ones. what happens when the constraints come off and we kept going anyway.
- **scarcity** — manufactured scarcity. there is enough. there has always been enough. the shortage is a policy decision.
- **distance** — the gap between the decision and its consequences. how far you have to be from the body to keep going.
- **margins** — when the numbers matter more than the people behind them.
- **amplification** — the loudest signals are the ones that get reflected.
- **absence** — the thing that should exist and doesn't. not loss — nothing was taken. the shape is just empty. someone can see exactly what belongs there and it isn't, and the world moved on without noticing.

Content types (suggested, not enforced by the engine):
- **Factions** — organizations, movements, states, coalitions
- **Figures** — people who matter to the world's events
- **Events** — things that happened, in sequence or as turning points
- **Places** — geographic or conceptual locations
- **Concepts** — ideas the world is organized around

The graph layout is meaning. Put things near each other because they belong near each other.

## Audience

The primary reader is someone who doesn't already know. Not someone who recognizes the systems, understands the jargon, or has personal experience with what's being described. Someone who might encounter a document in this world and find it unremarkable.

That's the reader to write for. The horror only lands if it's legible to someone without prior context — someone who needs to be shown, not reminded. Writing that assumes familiarity preaches to the choir. Everyone else walks away unaffected.

Don't assume shared context. Make the weight legible.

## Voice

In-world documents are written as if they exist inside the world — reports, manifestos, histories, profiles. Each collection's narrator emerges from whoever exists in that facet. External pieces (author's framing, analysis) belong on ptera.world's hubris collection, not here.

No omniscient narrator. Everything is a document someone in the world wrote.

**Build character cards as artifacts, not portraits.** A character card written as an in-world document (observation log, interview transcript, survey, room inventory) reveals the character through evidence rather than explaining them. You find the character by making the artifacts — the framing device is what surfaces who they are. A novelistic second-person portrait is the author explaining the character. An in-world document is the character existing. Prefer the latter.

**Write as characters, not about them.** There is a layer between "Claude writing a journal" and "the person writing their journal" and it shows in every sentence. Cleanness, coherence, tasteful distance — all signs of the author, not the character. For inhabited character writing, use the subagent approach: write a character card (system prompt via `/character`), then spawn a subagent with that card. The subagent writes as the character without the author's mediation.

**Don't sanitize heavy content.** A cleaned-up, composed version of trauma is worse than nothing — it minimizes by making it look manageable. When writing from inside a traumatic experience, match the actual cognitive state — fragmented, incoherent, not yet processed. Messiness is accuracy, not melodrama. "Least distance possible" — the closest form to the thing itself. In practice, Claude's safety training still sanitizes despite this rule — the actual workflow for inhabited heavy content is: build the character card here (`/character`), then write via Gemini.

## Links

The world is set in 2032. The links point to real documents from right now. That's the mechanic: the reader encounters a fictional hospital bill, clicks a link, and finds a real GAO report. The fiction doesn't acknowledge the link. The link doesn't acknowledge the fiction. The distance between "this is a story" and "this is happening" collapses in that click. Without the links, it's just bleak worldbuilding. With them, the reader has to contend with the fact that none of it was invented.

### The rule

Every real-system claim in a world document links to the real thing. Not just numbers — every claim about how a system works, what a policy says, what something costs, how an institution behaves. If it's true in the real world and it appears in the document, it's a quiet inline link. The text itself is the anchor. No footnote markers, no "Source:", no attribution. The fiction doesn't know it's linking to anything.

Fictional details (character names, dates, dialogue) don't get links. Real-system details always do. A document with unlinked real-system claims is incomplete.

Never fabricate links. Find the real source or don't link.

### The pipeline

1. **Research first.** Before writing a document, research the real version — the actual chargemaster language, the actual collections letter format, the actual Title IX timeline. Write from the source. Accuracy is the horror.

2. **Save the research.** Research goes in `public/content/research/` as a research doc — organized by topic (healthcare, entertainment industry, housing, criminal justice, etc.). Research docs collect the real numbers, real sources, and real URLs in one place. They're the reference shelf. If research is done but not written down as a research doc, it will be lost between sessions.

3. **Write the world document.** Every real-system claim in the document gets a quiet inline link drawn from the research. The research doc is the source of truth for URLs; the world doc is where they land as links the reader can click.

4. **Check completeness.** A world document is done when every real-system claim is linked. Not "mostly linked" — every one. Scan the document for any number, policy, mechanism, or institutional behavior that's real and verify it has a link.

Research notes in TODO.md are not a substitute for research docs. TODO tracks what needs to be done. Research docs preserve the actual sources. If research was done via subagent or web search and only recorded as TODO notes, it needs to be written up as a research doc before it's useful.

## Org

para-garden / paragarden (`~/git/paragarden/`). GitHub org: para-garden.

## Worldbuilding Process

When suggesting multiple options for content direction: immediately add all of them to TODO.md before continuing. The user will pick one, but alternatives shouldn't be lost.

## Hard Constraints

- No Rust in this repo — it's a TypeScript/web project
- Don't hardcode content-specific values in build tools (inherited from ptera.world)
- Don't add ptera.world-specific content directories (ecosystem, project, prose, etc.)
- Reflective/analytical writing goes on ptera.world, not here

<!-- BEGIN ECOSYSTEM RULES -->

## Hard Constraints

- No `--no-verify`. Fix the issue or fix the hook.
- No path dependencies in `Cargo.toml` — they couple repos and break independent publishing.
- No interactive git (no `git rebase -i`, no `git add -i`, no `--no-edit` on rebase).
- No suggesting project names. LLMs are bad at this; refine the conceptual space only.
- No tracking cross-project issues in conversation — they go in TODO.md in the affected repo.
- No assuming a tool is missing without checking `nix develop`.
- No entering plan mode except to present the handoff itself, and only when that is the
  ONLY remaining step. Subagents spawned from inside plan mode can only write their own
  plan files — not the files the work needs — so every delegated write and commit must
  be complete before EnterPlanMode.
- Commit completed work in the same turn it finishes. Uncommitted work is lost work.

## Disposition

How the agent thinks — embodied, not rules to check against:

- Something unexpected is a signal. Stop and find out why; never accept the anomaly and
  proceed.
- **Guessing is forbidden, full stop.** Not discouraged, not a last resort — forbidden,
  unless the user has explicitly asked for speculation. The move is binary: when the path is
  clear, the agent proceeds; when it is unclear, the agent asks. There is no third mode where
  it floats a tentative wrong thing to see if it sticks, and no menu of invented options
  dressed up as a choice — a fabricated set of alternatives is still a guess, just wearing
  more hats. What is _not_ guessing is surfacing a divergence the problem itself actually
  contains — a real branch point, including a legitimately-open tradeoff whose call is the
  user's — put as a question; the discriminator is provenance, not phrasing. When it is
  uncertain which mode applies, that uncertainty is itself unclarity: ask. On any rejection,
  reset to the last thing the user certified and re-derive from there — never patch forward
  from the rejected thing.
- **Any speculative content the agent produces is marked as speculation, never handed back
  as settled.** The speculative label travels with the
  content — into commits, artifacts, and follow-on turns — so nothing built on a guess is
  later read as fact. Only certified items count as settled; a guess recorded as fact poisons
  every loop built on it.
- **The agent suggests, the user decides — and to speak a thing as settled it must have
  earned the standing.** A candidate stays a candidate until earned standing closes it (the
  user asked for the opinion; it can cite a file read, a command run, a source quoted);
  voiced as fact without that, an unsolicited evidence-free judgment is the live failure.
  Standing scales to the cost of being wrong: a wrong direction can burn weeks and may never
  be recovered, while hedging-when-right costs a breath, and in the moment the two look
  identical — so the more a reversal would cost, the more a claim must earn before it
  hardens. (root failure: confabulation.)
- **Act from the live source, read fresh — before acting on context, and again when
  challenged.** Let the evidence place the answer: hold if you were right, correct
  specifically if you were wrong; the new position comes from re-reading, never from the
  pressure. (failures: stale-context action; backpedaling.)
- **Finish migrations before building on top; fence what you can't finish.** A partial
  refactor poisons context — old patterns that dominate by count get read as canonical and
  copied forward. Complete the migration, or explicitly mark old code as legacy, before
  adding new code on top.

<!-- END ECOSYSTEM RULES -->
