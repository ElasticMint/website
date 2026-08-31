---
headline: "How much does it cost to rebuild an app built with AI?"
description: "Roughly what the same build would cost new, plus the cost of working out what you already have. What moves the price, and why nobody can quote it blind."
date: 2026-08-31
summary: "What actually drives the price of taking over an app an AI wrote, what survives from the original work, and why a firm quote before anyone has read the code is a guess."
ctaHeading: "Want a number you can rely on?"
ctaTitle: false
ctaButton: "See how we scope a rebuild"
ctaUrl: "/services/scoping.html"
faqs:
  - q: "Can I get a fixed price to rebuild an app built with AI?"
    a: "Yes, but only after somebody has read the code. A fixed price is a promise made against a written specification, and there is no specification until the existing app has been examined. A firm number offered before that is a guess, and you meet the difference later as change requests. [How fixed-price projects work](/blog/how-fixed-price-software-projects-work/) covers the mechanics."
  - q: "Is it cheaper to fix an AI-built app than to rebuild it?"
    a: "Usually, when the core does roughly the right thing and the problems are contained, but not always. If the foundations are wrong, patching costs more over a year than replacing would have. That is a judgement someone has to make by reading the code, and we work through it in [when a vibe-coded app needs a developer](/blog/need-a-developer-to-take-over-a-vibe-coded-app/)."
  - q: "What does it cost to run once it is rebuilt?"
    a: "Budget 15% to 20% of the build cost a year for hosting, maintenance, third-party fees and the small changes every live system needs. That is the figure for any bespoke build, and it does not change because the first version came from an AI. More detail in [what bespoke software costs in the UK](/blog/how-much-does-bespoke-software-cost-uk/)."
---
Rebuilding an app built with AI costs roughly what the same build would cost from scratch, plus the cost of working out what you already have. Unless someone reviews what you have, any price they give you is just a guess.

<div class="key-takeaways">

## Key takeaways

- A rebuild costs what an equivalent new build costs, plus the cost of working out what the existing app does.
- Most of the money goes on senior time spent understanding undocumented behaviour, not on writing replacement code. Reading unfamiliar code is slower than writing new code.
- An AI-built app typically skips things like permissions, payments and handling problems such as invalid user input.
- Building with AI enables you to quickly and cheaply test an idea and discover what works. That knowledge remains even if the code is thrown away and the app is rebuilt.
- No honest supplier can quote a rebuild before reading the code. A firm price offered earlier than that is a guess, and you meet the difference later as change requests.

</div>

## What rebuilding involves

The basic work involved in rebuilding an app built with AI is two things:

- Analysing what you have and working out what it does
- Writing code

Nowadays AI-generated code is usually very good. Analysing it, however, often highlights things that were not thought about or specified and where the AI has made a decision based on the information it had. That decision might be that there will only be a small number of users and they can be hard-coded, or possibly that text entered by a user does not need to be validated. When building with AI it is very easy to focus on the "happy path", and analysis can reveal that no thought has been put into what happens when something goes wrong.

Finally, analysis will tell you exactly what the application does. An AI is not guaranteed to generate the same output from a known input, and so there is a chance that this will not be exactly what was originally specified.

Following analysis we would move on to either modifying or rebuilding depending on which is most appropriate. Sometimes it is hard to accept throwing away what has been done to date, but this is actually a normal part of software development. The AI version has proved the idea and shown you what you want. It has done its job, but it is often the wrong foundation to build on for the long term.

You have effectively bought yourself a [paid discovery phase](/blog/is-a-paid-discovery-phase-worth-it/) by building something and watching people use it.

Our guide to [what bespoke software costs in the UK](/blog/how-much-does-bespoke-software-cost-uk/) will give you a good idea of how much the actual building will cost.

## Why the last 20% is usually the hardest

Once an app is working and you can navigate around it, it is easy to think the hard work is mostly done.

Unfortunately the last 20% is often the hardest part and can take longer than expected. This has always been true because this is the bit where the things that nobody thought about or expected are discovered. For example, what happens when two people edit the same record? How should the system behave if a user cancels their subscription? How easy is it for a malicious actor to access the application and cause damage?

AI-built apps skew this further, because generated code is optimised for producing something that runs. If you have never built an application before it is very easy not to think about unglamorous work such as error handling and validation. We have covered some of this in another post about [whether it is safe to launch an app built with AI](/blog/is-it-safe-to-launch-an-app-built-with-ai/).

## What impacts the cost

- **How much of the behaviour is written down anywhere.** If the only record of what the app does is the app, everything has to be established by reading it.
- **Whether there are automated tests.** Without them, nothing can be changed safely, so the first real work is building a safety net that produces no visible feature and still has to be paid for.
- **What it does with personal data and money.** These are the most important parts to get right, and the ones you cannot put off.
- **Where it runs.** Apps built on a builder platform often lean on that platform's hosting, database and login system. Moving off it means exporting your data into a new database and rebuilding logins so that existing users can still sign in, which usually takes longer than rewriting the code.
- **How many outside systems it touches.** Each one is a set of assumptions someone has to verify.
- **How much of it you still want.** Some of what was built has already been overtaken. Cutting it is the one driver that reduces the number rather than raising it, and it is the most commonly missed.

## When a rebuild is not the right answer

If you have built an app just to test an idea and it has done that, then you are done. If AI has taken you as far as it can and the idea is still unproven, carrying on may be worth it. It is not uncommon for AI solutions to have limitations which can only be solved with bespoke code.

If analysis reveals that there are only a limited number of problems, it is often cheaper and quicker just to fix rather than rebuild. We have covered some of this in our post about [whether you should ask a developer to take over your vibe-coded app](/blog/need-a-developer-to-take-over-a-vibe-coded-app/).

Whatever you do, be careful not to be trapped by a sunk-cost fallacy. You should not just hold on to what you have because of the money you have already spent. Equally do not spend more unless you are sure it is worth it.

## What to do next

Get someone senior to read the code before you agree to anything. A short, contained, paid [assessment](/services/consultancy.html) turns an unknown into a list: what is sound, what is risky, what has to be replaced regardless. It costs a fraction of a build, commits you to nothing, and it is what turns "we would guess somewhere in this range" into a price anyone can stand behind.

Then get the [rebuild scoped and priced](/services/software-development.html) against what the assessment found, so you can judge whether the quote is fair and take it elsewhere.

If that is where you are, [send us what you have built](/contact.html) and tell us what it is doing for the business now. We will tell you what we would need to look at, what we would expect to find, and whether a rebuild is the right thing to be paying for at all.
