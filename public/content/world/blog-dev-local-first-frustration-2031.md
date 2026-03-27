---
label: "why is it so hard to just have a thing"
description: "A developer tries to do the obvious thing. Every path leads to a platform."
theme: amenooto
tags: [document, absence, technology, personal]
collections: [default]
related: []
---

<div class="site-chrome">
<div class="site-wordmark">null pointer</div>
<nav class="site-nav">posts &middot; projects &middot; about</nav>
</div>

<div class="site-meta">July 19, 2031</div>

---

**why is it so hard to just have a thing**

okay so I was trying to do something extremely normal yesterday and it took me four hours and I'm still not done.

the thing: I wanted to share a folder of photos with my mom. not a link to a cloud service. not "download our app." just — here are the photos, on your computer, they're yours now, no account required.

my first attempt was the obvious one. email. gmail caps attachments at 25mb. the folder was 340mb. so that's out.

google drive. fine, I'll upload them and send a link. except my mom doesn't have a google account (she has one, she doesn't know the password, she's not going to reset it, we've been through this). and when she clicks the link it asks her to sign in. she calls me. I walk her through requesting access as a viewer without signing in. the sharing modal has nine options. she picks the wrong one. the photos open in a web gallery she can't figure out how to download from. she downloads three photos one at a time before calling me again.

I try wetransfer. she gets the link, clicks download, her browser blocks it because it thinks it's suspicious. she calls me. I tell her to click "keep anyway." she doesn't see that option because she's on safari and the dialog is different. I walk her through it. she gets the zip. she doesn't know what a zip is. she calls me.

at this point I'm sitting in my apartment thinking: I want to send a folder from my computer to her computer. this is the most basic operation a networked computer should support. put files here, they appear there. every operating system has had this built in since the 90s if the two computers are on the same network.

but they're not on the same network. she's in tucson. I'm in portland. and apparently in 2031 the only way to send 340mb from portland to tucson is through a corporation's server, with an account, through a web interface, behind a login, with a sharing model designed for enterprise collaboration, not for sending your mom photos of her grandkids' birthday party.

I know what you're thinking. "just use airdrop / nearby share / —" she has a windows laptop. I have a linux desktop. and even if we were both on apple, airdrop requires proximity.

I know what else you're thinking. "ftp / scp / rsync / —" my mom is 64. she is a retired school librarian. she is not going to ssh into anything.

what I actually want:

1. I put files in a folder
2. she gets the files
3. no accounts, no apps, no cloud, no zip files, no "sharing permissions"
4. the files go from my machine to her machine
5. it works every time
6. she doesn't call me

this does not exist. I have looked. I have looked extensively. every solution is either:

- a cloud service (requires an account, the files live on someone else's server, they can see them, they can delete them, they can change the terms of service)
- a tool that requires the recipient to also install the tool (which means I'm on the phone with my mom for 40 minutes)
- a tool that works between technical users and is utterly opaque to anyone else
- a protocol that exists at the OS level but only works on local networks

the gap is: **a way for a non-technical person to receive files from another computer without an intermediary.**

not a product. not a platform. a protocol. something at the level of email, where you put a thing in and it comes out somewhere else and nobody in the middle owns it.

email did this for text. we never built it for files. and now every possible path for files goes through a company that wants your mom to make an account.

I keep running into this. not just files. everything.

- I want to host a small webpage. every path leads to a hosting company or a platform that will disappear in 3 years.
- I want to run a group chat with 12 friends. discord is the only option that works, and discord is a company that can change anything at any time and we have no recourse.
- I want to keep notes that sync between my laptop and my phone. every app is a subscription. the notes live on their server. if they shut down, the notes are gone.

the pattern is: **something that should be a protocol is a product.** and products have owners, and owners have incentives, and the incentives are never "make this work simply and permanently for the person using it."

I don't know how to fix this. I don't think it's a technical problem — the protocols exist or could exist. it's an incentive problem. nobody can make money building infrastructure that doesn't require an account. there's no business model for "it just works and nobody is in the middle."

anyway my mom still doesn't have the photos. I'm going to burn them to a USB drive and mail it. united states postal service. the original peer-to-peer file transfer protocol.

it works every time. no account required.

<div class="site-footer">
<div class="site-wordmark">null pointer</div>
</div>
