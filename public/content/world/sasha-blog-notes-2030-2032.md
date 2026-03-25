---
label: "~/notes — sasha's technical notebook"
description: "A personal tech blog, updated irregularly. Mostly about systems design and open source. Some of it is about other things."
format: blog
tags: [document, tech, labor, capitalism, personal]
---

<div class="site-chrome">
<div class="site-wordmark">~/notes</div>
<nav class="site-nav">posts · rss · github · about</nav>
</div>

*sasha's technical notebook — updated irregularly*

---

### 2030-02-14

**The case for boring infrastructure**

*tags: infrastructure, open source, career*

---

I've been writing software professionally for about eight years now. Before that, another three or four years of doing it badly on my own time, which is how most of us got here if we're honest.

Something I've noticed: the work I'm most proud of is almost always invisible. A caching layer that made a flaky test suite deterministic. A migration script that ran once and was never thought about again. A small library — maybe four hundred lines — that did one thing correctly and that I've seen quietly appear in three other projects since.

The glamour jobs are elsewhere. The glamour jobs are the ML pipelines, the real-time inference, the things that go in press releases. I've been adjacent to some of those. Still am.

But when I think about what I actually like — it's the boring stuff. A well-designed queue. A config system that degrades gracefully. Software that tells you clearly when it doesn't know something.

There's a kind of infrastructure that's so reliable people forget it exists. I've been trying to figure out if that's the goal or the consolation prize and I still don't have an answer.

Anyway: this is a blog now. I used to write on the wiki for [sparrowdb-utils](https://github.com/sparrowdb/sparrowdb-utils), the little embedded key-value store I maintain. But wikis are bad for this kind of thing. So: here.

I'll write about technical things. Probably also about other things. We'll see.

---

### 2030-05-03

**What I learned maintaining a small open source project**

*tags: open source, maintenance, sparrowdb*

---

Sparrowdb-utils turns four years old this month. At its peak it had maybe sixty GitHub stars and two regular contributors besides me. Right now it has one hundred and twelve stars and I am the only regular contributor. Both of those facts are about the same thing.

Open source maintainership is a thing people romance. You get to work on what you want, ship when you want, no meetings. What they leave out: you also get every question, every edge case, every "this doesn't work on Windows" issue from someone who hasn't read the readme. You get all of that for free, in your personal time, from your personal email address.

I'm not complaining. I chose this. I still choose it, every weekend when I open the repo instead of doing something else. But I want to be honest about the texture of it because I think the romance does real damage — it sets people up to be exploited by companies that treat "open source" as a supply chain they don't have to pay for.

The number of Fortune 500 companies quietly using sparrowdb-utils in production: at least three, based on the issues they file. The number that have contributed back, offered sponsorship, or sent so much as a thank-you: you can probably guess.

What I actually love about it, when I strip away the romance and the resentment:

The users who file good bug reports. You can feel the care in them — someone took time to reproduce, to minimize, to write it up clearly. That's a form of respect. I try to return it.

The design constraint of "no runtime dependencies." I set that rule in 2026 and it has forced me to be a better engineer. Every time I want to reach for something external I have to think about whether I actually need it. Usually I don't.

The feeling when a piece of code is right. Not just working — *right*. Readable, minimal, does what it says. That feeling hasn't changed since the first time I got it, writing shell scripts in my bedroom at seventeen.

I'm slower to commit these days. Fewer PRs than last year. Work has been demanding. But I'm still here.

---

### 2030-09-18

**On "AI-powered" as a marketing term**

*tags: industry, AI, terminology*

---

I want to be precise about what "AI-powered" means, technically, because I think the imprecision is doing real work in the world and not in a good direction.

When a product says it is "AI-powered," here is the range of things that might be true:

1. There is a large language model or similar generative system in the product that is doing substantive work.
2. There is a classical ML model — a gradient-boosted tree, a logistic regression, something trained on historical data — that is making predictions.
3. There is a rules engine with a vaguely ML-flavored wrapper around it.
4. There is some A/B testing infrastructure and someone decided to call the winning variant "AI."
5. The press release writer heard that AI was important.

These are not equivalent. They have different technical properties, different failure modes, different implications for what the product actually does to the people using it.

The one I want to dwell on is (2), because it's the most common and the most misunderstood. A trained classifier or ranker is doing something real — it's learned a mapping from inputs to outputs from data. But "learned from data" means "learned to reproduce patterns in historical behavior." If the historical behavior was that users who did X eventually did Y, the model will push users toward X. Whether pushing users toward X is good for them is a question the model does not know how to ask. It only knows that X predicted Y in the training distribution.

The marketing language — "personalized," "intelligent," "tailored to you" — implies that the system knows what you want and is helping you get it. The technical reality is that the system knows what people like you have historically done and is optimizing the environment to increase the probability you do it too.

Those are very different things. I think it would be useful for people to know which one they're getting.

*(A few people have asked if I'll write more about recommender systems specifically. Probably, yes. There's a lot to say.)*

---

### 2030-12-11

**Holiday reading: a defense of the Unix philosophy**

*tags: design, philosophy, unix*

---

I spent part of Thanksgiving re-reading *The Art of Unix Programming*, which I first read at nineteen and which still holds up in ways I find almost annoying.

Raymond's formulation of the Unix philosophy is often reduced to "do one thing well" and then either celebrated or dismissed. What I keep coming back to is the underlying principle: composability. The reason you do one thing well is so that someone else can combine your one thing with their one thing and get something neither of you anticipated.

Composability requires honesty about your interfaces. It requires knowing what you do and what you don't do, and making those limits legible. It requires a kind of humility about the system: I am not the whole solution. I am a part. I will behave predictably at my edges so that I can be trusted in combinations.

The failure mode I see most often in software that's grown complex — not just in open source, in production systems, in things I work on every day — is opacity at the interface. The component does more than it says. The output depends on state you can't see. The thing that was supposed to be a simple pass-through has, over time, accumulated behavior that was easier to put there than to put somewhere principled.

I'm being general on purpose.

The principle I come back to: if you can't easily explain what a component does in one sentence, it probably doesn't have one job. Splitting it feels like more work. It usually pays back.

---

### 2031-03-07

**Why I got into this**

*tags: personal, open source, early internet*

---

Someone in the comments on the last post asked how I got started, and I realized I've never written it down. Here it is.

I was fourteen, maybe fifteen. My family had a secondhand desktop running Windows 98, and I was doing what fourteen-year-olds with internet access did in those years: spending too much time in IRC. The server was freenode. The channels were mostly Linux channels.

There was a person in one of those channels — I don't remember their handle now — who answered every dumb question patiently and precisely. I asked a lot of dumb questions. They answered. At some point I asked something they didn't know and they said "I don't know, let's find out," and we found out together in a thread that went for two hours. That was the thing that did it. Not the technology. That.

I ran Gentoo because compiling from source felt like understanding. I probably didn't understand much. But the feeling of something working because you had assembled it from its parts — that was the thing. It felt different from using software. It felt like being inside it.

Open source in those years had an almost religious quality that I'm embarrassed to describe now but won't pretend away. The GPL was a kind of covenant. The kernel mailing list was brutal and real. There was a sense that software could be a public good if people decided to make it one.

I know how that sounds in 2031. I know what the industry looks like now. I know what open source looks like now, who uses it and how and to what ends.

But here is what I still believe: the craft is real. Writing a piece of software that does what it says, that handles its edges, that can be read and understood by someone else — that is a form of making something true. I still feel that. I felt it last weekend working on sparrowdb-utils. It doesn't go away.

The question I've been sitting with — I won't resolve it here — is what you do when the craft and its application come apart. When you are genuinely good at something and you are applying it to ends you don't respect.

That's a question for another post. Or maybe not a post at all.

---

### 2031-06-14

**Dark patterns in recommendation systems (a taxonomy)**

*tags: design, AI, systems, ethics*

---

This is a technical post. It is about recommendation systems in general. It is not about any specific product or employer.

A recommendation system takes a user, a corpus, and a signal, and tries to produce an ordering of the corpus that is good for the user. The word "good" is doing a lot of work in that sentence. Let's look at what happens when it's defined differently.

**Engagement as a proxy for value.** The most common signal is engagement: clicks, views, time spent, return visits. Engagement is measurable. Value — did the user get what they actually wanted, did it help them, did they feel good afterward — is not. So systems are trained on engagement. The problem is that engagement and value are correlated but not identical. Things that produce strong emotional reactions produce engagement. That includes things that are upsetting, addictive, and false.

**The exploration/exploitation failure mode.** A recommendation system that's optimized hard enough on its training signal will start to show users more of what the model thinks they already want, because that's what reliably increases engagement metrics. The long-term effect is a narrowing of what the user sees. This is measurable. Teams that work on these systems know it's measurable. The decision about whether it matters is made elsewhere.

**Scoring systems with behavioral implications.** Some systems don't just recommend — they score. A user's score, derived from behavioral features, determines what they can do, what they see, what they're offered. If the score is derived from behavioral features that correlate with protected characteristics, the system may be doing something that would be illegal if a human did it, operationalized in a way that's difficult to audit or challenge. "The model decided" is not a defense but it functions as one.

**The interface that explains itself incorrectly.** "Recommended for you because you liked X." But the actual feature weights are not interpretable and the explanation is a post-hoc rationalization generated to satisfy a UX requirement. The user forms a mental model of how the system works. The mental model is false. The system is designed to produce a false mental model because it feels better than "we don't actually know, we just think you'll click this."

None of this requires malice. It doesn't even require indifference. It requires the ordinary optimization pressure of a team with quarterly targets and a metric that goes up.

I want to be careful here: I think recommendation systems can be built well. I think the technical problems are real and interesting and some people working on them are genuinely trying to solve them. I also think that the structure of most product organizations makes building them well very difficult, and that "we're working on it" often means "we have a research team" rather than "the thing in production is improving."

That's my taxonomy. I've probably missed something. Comments open.

---

### 2031-10-02

**On maintaining enthusiasm across a long project**

*tags: career, craft, mental health*

---

A few people have mentioned, over the past year or so of this blog, that something sounds a little tired in recent posts. I don't think I agreed with that when I first heard it. I'm starting to think they might have a point.

I want to write about enthusiasm — what it is technically, where it comes from, what depletes it. Not as a self-help thing. As an engineering problem.

Here's my working theory: enthusiasm for a technical problem is sustained by the feedback loop between effort and understanding. You put work in. You understand more than you did. The understanding is its own reward and it makes the next effort feel worthwhile. When that loop is intact, you can work for a very long time on something difficult.

Where it breaks: when you understand more than you wish you did. When the next layer of understanding is not "oh, that's clever" but "oh, that's why." When the thing you've been building starts to make more sense than you wanted it to make.

That's a different kind of knowledge. It doesn't produce the same feedback.

I'm still working on sparrowdb-utils. Slower than I'd like. But the loop there is still intact, mostly because I control what goes into it and why. The constraints I set on it — no runtime dependencies, no scope creep, no features I don't need — are still holding. There's something to be said for a project small enough to hold your intentions in its head.

The other work is fine. I am, objectively, doing well. My performance review was good. I'm told I'm valued. I believe that's true in the way it's meant.

---

### 2032-01-20

**What "responsible AI" means in practice (some thoughts)**

*tags: AI, industry, ethics*

---

I've been seeing a lot of "responsible AI" frameworks lately. Principles documents. Ethics boards. Audit processes. This is a good thing. I want to engage with it seriously rather than dismissively.

The honest version of what I think:

Most "responsible AI" frameworks are designed to answer the question "are we being responsible?" rather than "are we doing harm?" These are not the same question. The first is auditable and can produce a yes. The second often can't.

Here's what an audit can check: does the model meet a fairness metric on a held-out dataset? Is there a process for flagging concerns? Did we have a review? Are the disparate impact numbers within accepted thresholds? Did someone sign off?

Here's what an audit often can't check: are users' mental models of what this system does consistent with what it actually does? Are the outcomes for users who are scored poorly by this system worse than they would be otherwise? Did the features that feed this model, at scale, change behavior in ways we didn't intend and now can't reverse?

The second set of questions requires longitudinal data, honest reporting structures, and a genuine willingness to act on bad answers. It requires that "responsible" mean something that might require you to stop doing something, not just document that you considered it.

I'm not trying to be cynical. I know people inside these processes who are trying in good faith. The problem isn't bad faith. It's that "responsible AI" as currently practiced is largely a process layer over a decision that was already made. The decision was: we are shipping this. The responsibility framework asks: did we check the right boxes before we shipped it?

There's a version of this that works. It requires moving the decision point. It requires that "we might not ship this" be a real outcome at the end of the review, not just a hypothetical.

I have not personally seen that version.

---

### 2032-04-30

**Burnout in open source: a data point**

*tags: open source, mental health, maintainership*

---

I closed twelve issues on sparrowdb-utils this weekend, most of them stale. I merged one PR, which was a doc fix from a first-time contributor. That's it for the past month.

I'm not burned out on sparrowdb-utils. I want to be clear about that. But I've been thinking about burnout in open source maintainership because I've been watching it happen to people I know, and because the pattern is specific enough to be worth describing.

Here's the pattern:

The project exists because someone wanted to solve a problem. The solution is good enough that other people use it. Other people using it creates obligations — issues to respond to, compatibility to maintain, decisions to defend. The obligations are not what the person signed up for. The obligations are just what happens when something works.

Over time, the ratio of "thing I built because I wanted to" to "thing I'm maintaining because other people need it" shifts. The ratio is the thing. When the second outweighs the first by enough, the work stops feeling like the thing it was.

This is structurally identical to what happens in some paid roles. You are hired for your judgment. You develop a track record. The track record becomes a dependency. The dependency creates obligations that slowly replace the original scope. The obligations are not what you signed up for. But they are, in some sense, the consequence of having done good work.

I don't have a solution to this. I think the people who navigate it well do one of a few things: they set very firm scope limits early (I have tried to do this with sparrowdb-utils), they find a way to make the obligations themselves feel meaningful (harder), or they accept that good work has a half-life and plan accordingly.

The thing I don't recommend: staying in the role past the point where the ratio is bearable, telling yourself it will change, waiting for something to shift that you don't actually have the power to shift.

I've watched people do that. It's a long way down and the landing is bad.

*(This is a post about open source. If you're reading something else into it, that's on you.)*

---

### 2032-08-07

**Notes on a system I've been thinking about**

*tags: systems, design, personal*

---

I've been sitting on this one for a while. It's not a clean post. I'm going to write it anyway.

There's a class of system that works exactly as designed and is, in that sense, a success. The design is correct. The implementation is faithful to the design. The metrics it's measured by go up. By every internal measure the thing has worked.

And the system does something that, if you described it plainly to the people affected by it, they would not consent to.

I've been trying to find the precise technical word for that gap — between "the system functions" and "the system does what people think it does" — and I don't think there is one. There should be. It's a specific kind of defect. It's not a bug. The system is doing what it was told. It's a misrepresentation that has been encoded into the architecture itself.

I spent a long time being good at my job and telling myself that the job was separate from the application. The craft and the use of it. This is a real distinction and I'm not walking it back. But there's a version of that distinction that becomes a way to not look at a thing. The craftsmanship is real; so is the thing you're making.

I contributed code to a system that I now understand better than I did when I built my parts of it. I understand the whole, not just the parts. The parts I built are good. The whole is, in my assessment — and this is my technical assessment, based on what the system does and the gap between that and how it is described — not good.

I keep thinking about the conversation I had on IRC when I was fifteen. Some person whose name I've forgotten, patient with my dumb questions, saying "I don't know, let's find out." That impulse — that the knowing matters, that finding out is the right move even when the answer is bad — I still have that. It's one of the things that hasn't gone.

I found out.

I'm still here. Good comp. Good review. The salary is real. The work is real. The gap between what the system does and what it's called is also real.

I don't know what the next move is. I know that this post is not it, or not all of it. But I've been writing here for two and a half years because there are things that need to go somewhere, and this has been the somewhere.

Some of you know exactly what I'm talking about.

That's enough for now.

---

<div class="site-footer">
<div class="site-wordmark">~/notes</div>
<nav class="site-nav">rss · <a href="https://github.com/sparrowdb/sparrowdb-utils">sparrowdb-utils</a> · pgp</nav>
</div>
