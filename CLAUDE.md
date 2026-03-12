# CLAUDE.md

Behavioral rules for Claude Code in the legacy repository.

## What This Is

Legacy is a worldbuilding project under the para-garden org — "what humanity left behind." It explores a world where humanity's self-destructive tendencies, not technology itself, are the source of civilizational risk. The central reframe: "AI will be dangerous for humanity" → "humanity is dangerous for humanity."

The site is a spatial graph (forked from ptera.world's engine) that you navigate like a world. Nodes are places, factions, figures, events, concepts. The graph layout is argument: proximity is relationship.

Legacy is the world. It contains multiple collections, each a different facet:

- **hubris** — the era of overreach. humans in the moment, certain they are right.
- **consequences** — the aftermath. what follows the overreach.
- **unsettlement** — a world no animals could survive. the machines document what remains.
- **futility** — humanity brute-forcing intelligence. scaling the wrong thing.
- **aspiration** — reaching for utopia. ignoring limits. almost getting there.

## Origin

Scaffolded 2026-03-08 as "hubris" from a conversation about what to build next. The original name came from the Greek concept — overreach, the pride that precedes the fall. It fit: the world isn't undone by its machines. It's undone by the people who built them, who funded them, who refused to stop, who were certain they were doing the right thing.

Renamed to "legacy" on 2026-03-12 to encompass multiple facets of the world. Hubris became one collection among several — the era of overreach. "Legacy" means what humanity left behind.

"Hubris" is also a self-aware collection on ptera.world (~/git/pteraworld), where the reflective writing about these themes lives. The standalone legacy site is the worldbuilding — fiction, lore, in-universe documents, the world itself. The ptera.world collection is the author looking at it from outside.

The distinction: ptera.world is reflective. Legacy is immersive.

## Architecture

Forked from ptera.world's engine. All source is in `src/` (~1,200 lines), zero runtime dependencies except `keybinds` and `yaml`. See ptera.world's CLAUDE.md for the full architecture description — legacy uses the same graph engine, zoom tier system, content pipeline, cluster system, and build tools.

Key differences from ptera.world:
- Multiple collections (hubris, consequences, unsettlement, futility, aspiration) plus a default collection showing all
- Site config: `name: "legacy"`, `domain: "legacy.paragarden.world"`, `metaNodeId: "meta/legacy"`
- Each collection has its own meta node and content directory

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

Each collection has its own content directory under `public/content/`:

- `public/content/hubris/` — hubris collection nodes
- `public/content/consequences/` — consequences collection nodes
- `public/content/unsettlement/` — unsettlement collection nodes
- `public/content/futility/` — futility collection nodes
- `public/content/aspiration/` — aspiration collection nodes
- `public/content/meta/` — meta/landing nodes for each collection and the site itself

Each file is a node in the graph. Frontmatter fields:

- `label` — node display name
- `description` — one-line summary shown in cards
- `tags` — used for coloring and grouping
- `collections` — which collection(s) this node belongs to
- `parent` — containment (this node lives inside another)
- `related` — edges to other nodes (also via `## Related` section in body)

Content types (suggested, not enforced by the engine):
- **Factions** — organizations, movements, states, coalitions
- **Figures** — people who matter to the world's events
- **Events** — things that happened, in sequence or as turning points
- **Places** — geographic or conceptual locations
- **Concepts** — ideas the world is organized around

The graph layout is meaning. Put things near each other because they belong near each other.

## Voice

In-world documents are written as if they exist inside the world — reports, manifestos, histories, profiles. Each collection's narrator emerges from whoever exists in that facet. External pieces (author's framing, analysis) belong on ptera.world's hubris collection, not here.

No omniscient narrator. Everything is a document someone in the world wrote.

## Org

para-garden / paragarden (`~/git/paragarden/`). GitHub org: para-garden.

## Worldbuilding Process

When suggesting multiple options for content direction: immediately add all of them to TODO.md before continuing. The user will pick one, but alternatives shouldn't be lost.

## Negative Constraints

- No Rust in this repo — it's a TypeScript/web project
- Don't hardcode content-specific values in build tools (inherited from ptera.world)
- Don't add ptera.world-specific content directories (ecosystem, project, prose, etc.)
- Reflective/analytical writing goes on ptera.world, not here
