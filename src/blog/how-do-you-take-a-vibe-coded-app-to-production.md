---
headline: "How do you take a vibe-coded app to production?"
description: "Vibe coding gets you a working prototype fast. Production is a higher bar. Here's what goes wrong, and how to get a vibe-coded app ready for real use."
date: 2026-08-03
summary: "Why a working vibe-coded app is not the same as a production one, what tends to go wrong, and how to get it ready for real users without starting over."
---
Vibe coding, building an app by describing what you want to an AI and letting it write the code, is very good at getting you a working prototype fast. Production is a different bar. Taking a vibe-coded app to production means closing the gap between "it works when I show it" and "it holds up with real users, real data, and someone who can maintain it." You get there by having the code assessed by someone who understands how AI-generated code fails, hardening the parts that carry real risk, and deciding honestly what to keep, rebuild or hand over.

The good news is that this rarely means throwing away what you have. The trap is assuming that because the app runs, it is ready. "It runs" is where the work starts, not where it ends.

<div class="key-takeaways">

## Key takeaways

- Vibe coding means building an app by prompting an AI to write the code, rather than writing it yourself. It is excellent for a fast prototype.
- Production is a higher bar than a working demo: real users, real data, and code someone can safely maintain.
- The gap between "it works when I show it" and "I can run a business on it" is where vibe-coded apps get into trouble.
- Taking one to production is usually about hardening the risky parts, not rewriting everything.
- Get the app assessed by someone who knows how AI-generated code fails before you rely on it, not after something breaks.

</div>

## What vibe coding is good at, and where it stops

Vibe coding is genuinely good at the early bit: getting an idea onto the screen, proving something is possible, and doing it fast without a development team. If that is what you need right now, it is a great tool and this post is not telling you to stop.

Where it stops is the part it does not force you to think about. Nothing in the process makes you consider what happens when a stranger uses the app in a way you did not expect, when hundreds of people use it at once, or when you need to change it in six months. AI is fluent enough to produce code that looks right. Looking right and being right are different things, and the difference is exactly the part that matters in production.

## What actually goes wrong with a vibe-coded app

In our experience the problems cluster in the same few places, because they are the parts AI gets plausibly wrong and a quick build skips:

- **Security.** Logins and permissions that let the wrong person see the wrong data, secrets left where a browser can read them, and user input that was never treated as hostile.
- **Data and privacy.** If the app holds personal information, UK GDPR is your responsibility as the business, no matter what built it.
- **Reliability.** Code that works for one careful user can fall over when real numbers of people hit it at once.
- **Maintainability.** The app runs, but it is a black box no one, including you, can change with confidence. That is fine until the day it needs to change.

We go deeper on the safety side of this in [is it safe to launch an app built with AI](/blog/is-it-safe-to-launch-an-app-built-with-ai/). For production, the point is that all four have to be dealt with, not just the one you happened to notice.

## Why "it works" is not the same as "it's in production"

A demo proves the happy path works when one careful person clicks through in the expected order. Production is the opposite of that. It is strangers doing the unexpected, some of them deliberately, on data that actually matters, at a volume you did not test. Most of what separates a prototype from a product is invisible until those conditions arrive, which is why so many vibe-coded apps feel finished and then are not. Reaching that realisation is not failure. It is the normal moment where speed has to hand over to judgement.

## What taking it to production actually involves

The route is usually the same, and it is rarely a full rebuild.

1. **Assessment.** Someone senior reads the code, maps what it does, and finds where the real risk sits. This gives you the honest picture a black box has been hiding: what is fine, what needs documenting, and what needs replacing.
2. **Hardening.** Fix the security-sensitive parts, add tests so changing the app stops being a gamble, document how it works, and replace or migrate anything that cannot be trusted or is locked inside a platform you do not control.
3. **Decide, part by part.** Keep what is sound, rebuild only what has to be. Most vibe-coded apps have more salvageable in them than their owners fear.

If it does turn into a proper build, our guide to [what bespoke software costs in the UK](/blog/how-much-does-bespoke-software-cost-uk/) covers how that work gets scoped and priced.

## When to leave it as a prototype

Sometimes the honest answer is not to productionise it at all. If the app exists to test an idea, holds no real data, and nothing serious happens if it breaks, then keeping it as a cheap, disposable prototype is the right call. Do not spend money making something robust that only needs to survive a few friendly users. The signal to invest is real users and real data. Until then, let it stay a prototype.

## What to do next

If your vibe-coded app is heading for real users, the most valuable next step is an honest assessment of the code before you rely on it, not after something goes wrong.

What would your app have to survive in front of real customers, and has anyone checked whether it can? That is the conversation worth having before you call it production.
