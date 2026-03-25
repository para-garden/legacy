---
label: "The Last Free Tool — Interrupt on Lumen and Noa Chen"
description: "Profile piece from Interrupt magazine, 2032. Covers Lumen, the open-source personal information manager, and its creator — a developer who could afford to build something good."
format: article
theme: interrupt
tags: [document, technology, capitalism, open-source, profile]
related: []
---

<div class="site-chrome">
<div class="site-wordmark">INTERRUPT</div>
<nav class="site-nav">Features · Archive · About · Subscribe</nav>
</div>

<div class="site-meta">Issue 41 · June 2032 · 12 min read</div>

# The Last Free Tool

*Noa Chen spent three years building Lumen — a personal information manager that doesn't want anything from you. That's the good news. The bad news is also the good news.*

**By Priya Anand**

---

When Noa Chen released Lumen 1.0 last April, the announcement was a single post on the project's mailing list. No launch event. No press release. No Product Hunt submission. The post was four paragraphs: what Lumen was, where to download it, a thank-you to seven contributors by name, and a note that Chen would be taking two weeks off.

"I don't really do launches," Chen says. We're talking over video from Chen's apartment in Oakland, a sparse room with good light and a visible pile of library books on the corner of the desk. "I just wanted it to be done and available."

Done and available. In the contemporary software landscape, this is almost a radical stance.

Lumen is a personal information manager — the category that has been dying, getting acquired, pivoting, and enshittifying on a rolling basis for the past decade. It ingests almost anything: voice notes (transcribed locally, without any audio leaving your machine), journal entries, calendar events, grocery lists, to-do items, photos, links, arbitrary files, text pasted from anywhere. It stores everything locally. It organizes without requiring you to organize — there's a powerful search syntax, automatic tagging, a timeline view, and no mandatory folder structure. If you want folders, you can have folders. If you don't want folders, you don't have to think about folders.

There is no account. No subscription. No telemetry. No server to go down. Lumen runs on your machine. It keeps your data on your machine. If you want to sync across devices, you can set up your own sync server using the documented protocol, or you can not do that.

The price is zero.

---

The category Lumen occupies has been a graveyard for exactly this kind of ambition. Notational Velocity, Evernote's first five years, Reeder, Simplenote before the SimpleNote acquisition — all of them gestured at the same thing and then bent toward business reality. Evernote added a freemium cap. Simplenote got acquired, then acquired again. Reeder became a subscription. Notion started free and then started calling features "Plus plan." Obsidian, the current darling, remains free for local use and keeps its sync features paid; a reasonable compromise, but a compromise. Everything has to survive.

"I looked at what was available when I started building this," Chen says. "I'd been using a combination of four or five tools and the combination was worse than any one of them. I wanted one thing that didn't require me to think about whether I was in the right app. So I started building it for myself."

The decision to make it free and open source came later, Chen says — not at the start, but when it became clear that Lumen was actually good. "At some point I looked at what I had and I thought: this is the tool I've been looking for. And I know other people have been looking for it too. So — release it."

---

Chen has 40,000 active users by the last measurement that matters, which is the count from the project's own analytics — opt-in, aggregate only, a counter of how many instances pinged the update server in the last 30 days. Chen doesn't know who those users are. The number has grown steadily since 0.8, which is when the mailing list started, without any meaningful marketing.

No monetization is planned. No roadmap with dates. "I'll work on it when I have things to add," Chen says. "It'll be maintained as long as I'm interested in it. Which I expect to be a long time. I use it every day."

Chen, 43, sold a startup in 2018 — a B2B workflow tool in the insurance sector, not the kind of company anyone wrote trend pieces about, which was fine. "It was a good business. We were profitable. The acquirer wanted the team and the contracts. It was a reasonable exit." Chen is careful not to specify the number. I don't push. The relevant fact is that it was enough — enough to not need Lumen to pay rent, not now, not for the foreseeable future.

Since the exit, Chen has released eleven smaller open-source projects: a terminal calendar utility, a command-line interface for a popular read-later service, a library for handling time zones in JavaScript that apparently a lot of people use in contexts Chen doesn't track. The projects have a consistent character: small, careful, built for a real use case, released when finished. Lumen is the first one Chen describes as the main thing.

"I needed something with more scope," Chen says. "The small projects were fine. But I wanted to work on something I'd be thinking about for years. Something that was worth thinking about for years."

---

This is the part of the conversation I had been building toward.

The question about Lumen — the question that I think has to be asked, even though it's somewhat awkward to ask to someone's face — is what it means that this exists because of the specific circumstances that produced it. Lumen is good, in part, because Chen didn't need it to be good in any financial sense. The normal pressures that bend tools toward business models — the subscription, the upsell, the engagement feature, the data sale — are absent. Chen has removed them by being someone who doesn't need them.

That's a good thing for the 40,000 people using Lumen. It is a strange thing for everyone else.

I ask Chen about this directly.

There's a pause. Not a defensive pause — a thinking one.

"Yeah," Chen says. "I know."

Another pause.

"The thing I find uncomfortable about it — and I find it uncomfortable — is that it's not replicable. Like, the reason this tool exists in this form is not a model. It's not: here's how to make good software. It's: I happen to have enough money to not compromise. That's not a lesson. That's a lottery."

Chen doesn't look away from this. "Most people who want to build something like this have to make it sustainable. Which means they have to make choices that compromise it. And then the tool is worse, or it dies, or it gets acquired and becomes something else. And I got to skip that entire process because of something that happened to me in 2018. It's — I don't know what to do with that. I built the tool anyway. I didn't think the answer was to not build it."

I ask if Chen worries about what happens when Chen stops maintaining it.

"It's open source," Chen says. "Someone else can maintain it. That's the point. I'm not the single point of failure. I tried to make sure I'm not the single point of failure."

There's a fork of Lumen already, a community-maintained version with a few UI experiments that Chen has chosen not to merge. This is described without any apparent tension. "That's correct behavior," Chen says. "They wanted something different. They should have it."

---

I used Lumen for six weeks before writing this piece. I want to say something balanced and professional about the experience, but the honest thing is that it worked. It worked in the specific way that very few tools work, which is that I stopped thinking about it. I put things in and they were there when I needed them. The search was fast and it found what I was looking for. I set up sync with a server I already had running and it took about forty minutes and then it worked.

The voice transcription is local and, Chen says, uses a small model that fits on the device — good enough for most dictation, not perfect with accents. Chen flagged this in the 1.0 release notes as a known limitation. "It's a hard problem. I don't want to solve it by sending audio to a server. So we're where we are with it."

At the end of the six weeks I tried to think of a feature that was missing. I couldn't.

---

"Do you think people will remember it?" I ask, near the end of the call. It's a strange question. I'm not sure why I asked it.

Chen looks mildly amused. "I don't really think about it that way. It's a notes app."

A pause.

"I hope people still have it in ten years. I hope it still works. That seems like the right thing to want."

---

*Lumen is available at lumen.noachen.net. Source at github.com/noachen/lumen. No account required.*

*Priya Anand is a contributing editor at Interrupt.*

<div class="site-footer">
<div class="site-wordmark">INTERRUPT</div>
<div class="site-footer-text">Independent technology journalism, funded by readers. No ads. No affiliates.</div>
<nav class="site-nav">Subscribe · Gift · Back Issues · Editorial Policy</nav>
</div>
