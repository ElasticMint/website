---
headline: "Is it safe to launch an app built with AI?"
description: "An app built with AI can be safe to launch, but not on trust. Here's where AI-built code tends to break, and how to check yours before you go live."
date: 2026-07-20
summary: "Whether an AI-built app is safe to put in front of real users, the places that code tends to break, and how to tell if yours is ready."
---
An app built with AI can be safe to launch. It is just not safe by default. AI is very good at producing something that works in a demo and looks finished, then fails in the specific places it tends to get wrong: how it handles logins, how it stores personal data, and what happens when real people use it in numbers. Whether yours is safe to launch depends on what it does and who it is for.

This is not an argument against building with AI. We use it every day. It is an argument against trusting the parts of the job where being confidently wrong is expensive. The trouble is rarely the code you can see working. It is the code you cannot.

<div class="key-takeaways">

## Key takeaways

- An AI-built app that runs is not the same as one that is safe to launch. It can work perfectly in a demo and still be unsafe in front of real users.
- The risk concentrates in a few areas: logins and permissions, stored personal data, and how the app behaves under real-world load.
- If your app holds personal data or takes payments, UK data protection rules apply to you no matter how the app was built.
- The clearest warning sign is simple: nobody who did not build it has ever read the code.
- Getting an app onto solid ground usually means a senior review first, then fixing or rebuilding the risky parts. It rarely means starting again from scratch.

</div>

## What "safe to launch" actually means

Running is a low bar. An app is safe to launch when it protects the data it holds, behaves sensibly when lots of people use it at once, and can be maintained by someone other than the person or tool that built it. A demo proves none of those things. It proves the happy path works when one careful person clicks through it in the expected order.

The useful question is not "does it work". It is "what happens when someone uses it in a way I did not plan for, and what am I holding on their behalf if it goes wrong".

## Where apps built with AI tend to break

In our experience the failures cluster in the same handful of places, because they are the parts AI is fluent enough to get plausibly wrong.

- **Logins and permissions.** Auth is easy to make look right and hard to make actually right. AI-built apps often let the wrong user see the wrong data, because the check that should sit on every request only sits on some of them.
- **Secrets and keys.** API keys and passwords get hard-coded or left where a browser can read them. Once an app is public, that is a door left open.
- **Handling untrusted input.** Anything a user can type is something an attacker can type. This is exactly the kind of careful, adversarial thinking that a quick build skips.
- **Personal data.** If your app stores names, emails, health or payment details, UK GDPR is your responsibility as the business, not the tool's. "The AI wrote it" is not a defence the regulator accepts.
- **The black box.** The code runs, but no human understands it end to end. That is fine until the day it breaks or needs to change, and then you own a system nobody can safely touch.

None of this makes AI-built software bad. It makes it easy to get burned, in the same way going offshore is not bad but is easy to have a bad experience with. The risk is not the tool. It is shipping the parts that look finished without anyone checking the parts that are not.

## How to tell whether yours is safe

You do not need to read the code to get a strong signal. Ask yourself:

- Does the app store anything about real people? The more sensitive the data, the higher the bar.
- Does it handle logins, roles or payments? If so, the security-sensitive code is the code most likely to be wrong.
- Has anyone who did not build it ever read it? If the answer is no, you have no independent check on any of the above.
- Do you know what happens when a hundred people use it at once, rather than one?

If you cannot answer these with confidence, that is the moment of realisation. It does not mean the app is worthless. It means you have reached the wall where careful judgement has to replace speed.

## When launching as-is is perfectly fine

Sometimes the honest answer is "just launch it". If the app is an internal tool for a handful of colleagues, holds no personal data, and nothing serious happens if it falls over, the risk is low and the sensible move is to ship it and learn. The same is true of a rough prototype you are putting in front of a few friendly users to test an idea. Do not gold-plate something that exists to be thrown away.

The line to watch is real users and real data. The day strangers can sign up, or the app starts holding information about actual people, the calculation changes and "safe to launch" stops being a formality.

## What getting it onto solid ground takes

When an app does matter, the route onto solid ground is not usually a rebuild from zero. It starts with a senior review: someone who knows how AI-generated code fails, reading the parts that carry the risk and telling you honestly what is fine, what needs fixing, and what needs replacing. Often most of the app is fine and the danger sits in a few specific places.

The thing to avoid is trading one bad experience for another. Bringing in help you cannot judge, on a vague brief, is how people get burned a second time. Get a clear picture of what is wrong first, then you can scope the fix properly and know what you are paying for. If that turns into a proper build, our guide to [what bespoke software costs in the UK](/blog/how-much-does-bespoke-software-cost-uk/) covers how that work gets priced.

## What to do next

Place your app against the questions above. If it holds real data or serves real customers, the single most valuable next step is to have someone independent read the code before you rely on it, not after something goes wrong.

What is your app holding on other people's behalf, and who has actually checked it? That is the conversation worth having before launch.
