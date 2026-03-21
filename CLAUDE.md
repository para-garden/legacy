# CLAUDE.md

Behavioral rules for Claude Code in the legacy repository.

## What This Is

Legacy is a worldbuilding project under the para-garden org — "what humanity left behind." It explores a world where humanity's self-destructive tendencies, not technology itself, are the source of civilizational risk. The central reframe: "AI will be dangerous for humanity" → "humanity is dangerous for humanity."

The site is a spatial graph (forked from ptera.world's engine) that you navigate like a world. Nodes are places, factions, figures, events, concepts. The graph layout is argument: proximity is relationship.

Legacy is the world. It has a single collection with facets as tags. A document can carry multiple facets — they're coexisting forces, not separate worlds.

## Origin

Scaffolded 2026-03-08 as "hubris" from a conversation about what to build next. The original name came from the Greek concept — overreach, the pride that precedes the fall. It fit: the world isn't undone by its machines. It's undone by the people who built them, who funded them, who refused to stop, who were certain they were doing the right thing.

Renamed to "legacy" on 2026-03-12 to encompass multiple facets of the world. Hubris became one collection among several — the era of overreach. "Legacy" means what humanity left behind.

"Hubris" is also a self-aware collection on ptera.world (~/git/pteraworld), where the reflective writing about these themes lives. The standalone legacy site is the worldbuilding — fiction, lore, in-universe documents, the world itself. The ptera.world collection is the author looking at it from outside.

The distinction: ptera.world is reflective. Legacy is immersive.

## Architecture

Forked from ptera.world's engine. All source is in `src/` (~1,200 lines), zero runtime dependencies except `keybinds` and `yaml`. See ptera.world's CLAUDE.md for the full architecture description — legacy uses the same graph engine, zoom tier system, content pipeline, cluster system, and build tools.

Key differences from ptera.world:
- Single collection, facets as tags (not separate collections)
- Site config: `name: "legacy"`, `domain: "legacy.paragarden.world"`, `metaNodeId: "meta/legacy"`
- All content lives in `public/content/world/`

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
