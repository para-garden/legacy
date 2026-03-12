---
label: "Lumen — Changelogs v0.8–v1.2"
description: "Release notes for Lumen, an open-source personal information manager, spanning v0.8 through v1.2 (2030–2032). Written by Noa Chen."
tags: [document, technology, open-source, artifact]
related: [lumen-interrupt-profile-noa-chen-2032]
---

---

*[Archived from lumen.noachen.net/changelog. Entries written by Noa Chen.]*

---

# Lumen Changelog

---

## v0.8.0 — November 2030

First public release. If you're reading this, you found it through the mailing list or directly through the repo, which means you're the kind of person I was building this for.

What's in 0.8:

- Ingest: plain text, markdown, images (JPEG/PNG/HEIC), PDFs (text-layer extraction), links (title + description fetched at save time, full page archived locally). Voice notes: recorded in-app or dropped in as .m4a/.mp3/.wav; transcription runs locally using a small whisper variant. Transcription quality is acceptable for clear dictation, rougher for noisy environments. I'll keep working on this.
- Search: full-text across all content types, plus tag filtering. Syntax: bare terms are AND by default, `OR` for union, `-` for exclusion, `tag:foo` for tag filter, `before:` and `after:` for date range. A few people asked for regex. I'll think about it.
- Timeline view: everything in chronological order. This is the view I use most.
- Tagging: automatic based on content, plus manual. Tags suggested on ingest, not forced. You can ignore them all.
- No account. No sync yet (coming). No telemetry. Nothing phones home. The update check is a single HTTP GET that returns the current version number; you can disable it in settings or point it at a server you control.

Data format is documented at docs/format.md. It's flat files. You can read them without Lumen.

The name: Lumen is a unit of light flux. It's also just a word I like. No deeper meaning. I was going to call it something else but the domain was taken.

Known issues are tracked in the repo. The most significant one right now is that link archiving can be slow for sites with heavy JS rendering. Workaround is manual paste.

---

## v0.8.4 — February 2031

Patch release. No new features.

- Fixed a crash on ingest of PDFs with malformed cross-reference tables. Thanks to Ari Lebowitz for the detailed bug report and the test files.
- Voice transcription no longer blocks the UI thread. This was embarrassing. Fixed.
- Search now handles diacritics correctly — searching "cafe" will find "café". Should have been there from the start.
- Timeline view performance: significant improvement for libraries above ~10,000 items. If you had slowness before, check again.
- Tag suggestion now ignores common words (a, the, and, etc.) when auto-tagging. The previous behavior produced useless tags.

---

## v0.9.0 — May 2031

This release took longer than I wanted because I rebuilt the sync foundation from scratch. The first implementation had a design problem I couldn't talk myself out of, so I restarted it. That added about six weeks.

**Sync (self-hosted)**

The self-hosted sync server is available. It's a single binary, configured via a YAML file, runs anywhere that can serve HTTPS. Sync is end-to-end encrypted; the server stores ciphertext and the key never leaves your devices. Conflict resolution is last-write-wins per item; I considered something more sophisticated and decided it was the wrong tradeoff for the use case.

Setup documentation is at docs/sync.md. If you can run a small web service, you can run this. If you can't, you don't have to — local-only continues to work exactly as before.

I'm not going to offer a hosted sync service. I understand why people want one and I understand it's a barrier. My answer to the barrier is to make the self-hosted version as simple as I can. If someone wants to run a community sync server for users who can't self-host, the protocol is documented and I'll link to community efforts from the project page.

**Calendar integration**

Read-only import from .ics files and CalDAV sources. Events appear in the timeline view. I didn't build event creation — Lumen is not trying to be your calendar. If you want to see your calendar events in context with your notes, you can now do that.

**Other changes**

- Extended search syntax: `type:voice`, `type:link`, `type:image`, etc. for filtering by content type.
- Images now have basic EXIF-based tagging (location names if available, device type). EXIF data stays local; it's used for tagging only.
- Fixed a memory issue affecting voice transcription of files longer than 30 minutes. I don't transcribe anything that long but apparently some of you do.

---

## v1.0.0 — April 2032

It's done. Or rather: it does what I set out for it to do. Development will continue but this is the thing I meant to build.

Changes since 0.9:

**Voice transcription**

Significant improvement to the local transcription model. Better performance with non-American accents and faster on lower-end hardware. Still not good with heavy background noise. I've thought about whether to offer a server-side transcription option for users who want higher quality and are willing to send audio somewhere. I decided against it. The whole point is that your voice notes stay on your machine. A toggle that sends audio to a server — even opt-in, even with good privacy guarantees — changes what Lumen is. So: no. The local model will keep improving. I'll update it when there's something meaningfully better to ship.

**Search: saved searches and keyboard navigation**

Searches can be saved and named. Keyboard-driven navigation throughout — full list of bindings in the docs. I use Lumen almost entirely from the keyboard now.

**Journal mode**

An optional mode that changes the new-entry prompt to a date-stamped journal entry by default. Differences from a regular entry: dated automatically, always private (excluded from any future export functions unless explicitly included), shown with a distinct visual treatment in timeline. This is a small thing but I've wanted it for a long time.

**Reduced memory footprint**

Baseline memory use is down ~35% from 0.9. The timeline view for large libraries is faster again. I'll keep working on this.

**Seven contributors named in the release notes**, in the repo. Thank you especially to Selin Kaya for the work on keyboard navigation and to Dani Ortiz for sustained patience with bug reports over 18 months.

---

## v1.1.0 — August 2032

**Link handling**

Link ingest now captures a full static snapshot of the page (HTML + images, no JavaScript replay). The archive is stored locally and viewable even if the original URL is gone. Search indexes the full page text. This was the most-requested feature since 1.0.

Archiving can be slow for some sites. There's a setting to do archiving asynchronously so ingest doesn't block.

**Tag management**

New tag management view: see all tags, counts, rename tags globally, merge tags, delete tags (optionally removing from all items). Previously this required manually editing the flat files, which worked but wasn't great.

**Relative date syntax in search**

`after:30d`, `before:1y`, `within:week`. I kept meaning to do this and kept deprioritizing it. It's there now.

**Performance**

Search is faster. The previous implementation rebuilt the index on each query in ways that didn't need to happen. Fixed.

One thing I didn't build this cycle: a few contributors proposed a "streaks" feature — tracking how many consecutive days you've added entries, with a visible counter. I understand why people want it. I've seen it help people build habits in other tools. I didn't add it. Lumen is not trying to optimize your engagement with Lumen. There's no counter that goes up. There's no notification to tell you that you haven't opened the app today. If you use it, good. If you don't for a while, it'll be there when you come back with everything where you left it. I don't think I'll change my mind on this.

---

## v1.2.0 — November 2032

**Plaintext export**

Full library export to a folder of plain text files: one file per item, with metadata in a YAML frontmatter block, content as markdown. Images exported alongside. This was always implied by the data format but now it's a one-click operation in settings. The goal is: you should be able to get your data out of Lumen without Lumen.

This release also ships an import path for common formats: Day One JSON export, Apple Notes (via .enex), Obsidian vaults, and folders of plain text files. The import is not perfect — some metadata doesn't translate — but it's close enough to be useful. Known limitations are listed at docs/import.md.

**Small things**

- Drag-and-drop ingest now works from any app on the system, not just the Finder/file manager. Files, images, text selections.
- Voice notes play back in the entry view. Previously you had to open the file externally.
- Fixed an issue where items ingested via sync sometimes appeared in the wrong timezone. This was a long-standing bug that was hard to reproduce. Ari found a reliable reproduction case, which finally made it fixable.
- Dark mode contrast improvements. Thanks to the several people who filed accessibility issues.

This will probably be the last release for a few months. I have some other things I need to do. The mailing list will have updates. Nothing is wrong; I'm just taking a break.

---

*[Lumen is maintained by Noa Chen. Source: github.com/noachen/lumen. License: MIT.]*

---
