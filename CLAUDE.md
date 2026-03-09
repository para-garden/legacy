# CLAUDE.md

Behavioral rules for Claude Code in the hubris repository.

## What This Is

Hubris is a worldbuilding project under the para-garden org. It explores a world where humanity's self-destructive tendencies — not technology itself — are the source of civilizational risk. The central reframe: "AI will be dangerous for humanity" → "humanity is dangerous for humanity."

The site is a spatial graph (forked from ptera.world's engine) that you navigate like a world. Nodes are places, factions, figures, events, concepts. The graph layout is argument: proximity is relationship.

## Origin

Scaffolded 2026-03-08 from a conversation about what to build next. The name comes from the Greek concept — overreach, the pride that precedes the fall. It fits: the world isn't undone by its machines. It's undone by the people who built them, who funded them, who refused to stop, who were certain they were doing the right thing.

"Hubris" is also a self-aware collection on ptera.world (~/git/pteraworld), where the reflective writing about these themes lives. The standalone hubris site is the worldbuilding — fiction, lore, in-universe documents, the world itself. The ptera.world collection is the author looking at it from outside.

The distinction: ptera.world is reflective. Hubris is immersive.

## Architecture

Forked from ptera.world's engine. All source is in `src/` (~1,200 lines), zero runtime dependencies except `keybinds` and `yaml`. See ptera.world's CLAUDE.md for the full architecture description — hubris uses the same graph engine, zoom tier system, content pipeline, cluster system, and build tools.

Key differences from ptera.world:
- Single collection (no "unfiltered" / "intent" split)
- Content lives in `public/content/world/` instead of prose/project/ecosystem dirs
- Site config: `name: "hubris"`, `domain: "hubris.paragarden.world"`, `metaNodeId: "meta/hubris"`

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

Worldbuilding content lives in `public/content/world/`. Each file is a node in the graph. Frontmatter fields:

- `label` — node display name
- `description` — one-line summary shown in cards
- `tags` — used for coloring and grouping
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

In-world documents are written as if they exist inside the world — reports, manifestos, histories, profiles. External pieces (author's framing, analysis) belong on ptera.world's hubris collection, not here.

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
