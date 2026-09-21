---
headline: "Is it worth replacing a system that still works?"
description: "A working system holds years of undocumented knowledge about your business. How to tell whether yours should be replaced or modernised, and what each involves."
date: 2026-09-21
summary: "How to tell whether a system should be replaced or modernised, and what each of those two approaches involves."
ctaHeading: "Wondering whether yours has had its day?"
ctaTitle: false
ctaButton: "Ask about an assessment"
ctaUrl: "/services/consultancy.html"
faqs:
  - q: "How do you replace a system without disrupting the business?"
    a: "Usually by not replacing it all at once. You can build the new system alongside the old one and move people across when it is ready, or modernise a piece at a time and leave the rest running. Either way you will be paying for two systems for a while. Most of the disruption comes from things nobody wrote down, so it is worth looking for those early."
  - q: "Is replacing a legacy system worth it?"
    a: "It depends on what the system is stopping the business doing. If there is a clear business need that cannot be met by the current system, then potentially yes. If the answer is that the database is old and the screens look dated, then probably not. The clearest reason to replace is that the technology underneath is no longer supported."
  - q: "How long does it take to modernise a system?"
    a: "Usually longer than planned. Preqin ran their old and new systems alongside each other for around two years, and the modernisation as a whole took several years. Modernising a piece at a time can take longer still, although the business keeps working throughout. Nobody can give you a sensible timescale until they have [looked at what you have](/services/consultancy.html)."
---
The standard answer to whether you should replace or rewrite a working system is no. A system that has been running for years typically contains a great deal of knowledge about how the business works, often not written down anywhere else. Replacing a system means all of this has to be rebuilt, and it is rarely as simple as it seems. When replacing a system is the right answer, it is more often because something has forced the decision than because anyone chose it freely.

<div class="key-takeaways">

## Key takeaways

- A working system often contains years of undocumented knowledge about how your business runs.
- The strongest reason to replace is that the technology underneath is no longer supported.
- Replacing a system often involves a period of running the old and new system alongside each other and keeping their data in sync.
- Often the best way to modernise is one component or piece of functionality at a time.
- As much as a team may complain about an old system, there is no guarantee that they will be able to build something better.

</div>

## What do you have now?

The starting point of any modernisation project has to be to understand what you have now. What technologies is it built on? How is data stored? Is there a technical reason such as a technology becoming obsolete that is forcing a change? Is it easy to use? Once you have this, you can start asking where you would like to get to, and start planning a route.

One key challenge is that any system that has been running for years holds hundreds of decisions embedded in the code. Often these have never been written down, and they may not even reflect how you want your business to work now. Throwing it all away and starting again means that all of this knowledge about the business has to be thought through again, and important edge cases are easily missed.

It is worth asking whether a full rewrite is required or whether you can get by with sprucing up the UI, or improving key pieces of functionality. And if you do decide to rebuild who will do it? A team that has been maintaining an app for years may know the business through and through, but there is no guarantee they can build something better. Sometimes a fresh perspective can make a big difference.

## When technology forces a decision

Over the years we have worked with a number of companies modernising older systems, and often the decision had been forced on them. That was true of both [Preqin](/case-studies/legacy-migration.html) and [Millbrook Healthcare](/case-studies/millbrook-healthcare.html). Each had mobile applications built with Xamarin, and support for Xamarin ended in 2024. Equally, both had applications built with ASP.NET Web Forms and the old .NET Framework, which is still maintained but not developed.

Once something is past its end of support date there are no more security patches, hosting providers start to drop support, and it gets harder and more expensive to find people willing to work on it.

It is not uncommon for businesses to keep applications running long past that date. One company we work with still has a key application built with VB6. It works, and it has worked for years, but the number of people who can safely change it gets smaller all the time.

## Running the old and new systems alongside each other

Preqin's approach to modernisation was to build a new system and run it alongside the old system. This enabled them to completely redesign their product and how it presented data, and then to add new features.

The technology used changed from ASP.NET Web Forms (written in VB.NET) to .NET Core APIs written in C# with a React UI. They also brought in Elasticsearch and MongoDB to provide specific functionality. One thing that made it easier though was that they kept the same database as the source of truth serving both.

One of the challenges of running two systems is that they need to be kept in sync, and there is usually a period where the old system becomes frozen and no features are added. Then at some point later, the new system is good enough to move users over. This is a risk, but a clear benefit is that you can always go back to the old system if need be.

## Modernising piece by piece

A different approach is being taken by Millbrook Healthcare. Their system has grown over many years, and business logic sits across several legacy applications. A rewrite would be enormous, and it would put a live service that people depend on at risk while it happened.

Instead they are modernising one piece at the time. Logic that was scattered across applications is being consolidated into APIs, so there is a clear line on which system owns which behaviour. Event-driven workflows are going in so that services can be changed independently of each other. Authentication foundations are being put in place so that the older applications and the new ones can talk to each other securely. The legacy applications are being kept running throughout. Further detail is in the [Millbrook case study](/case-studies/millbrook-healthcare.html).

This approach is often slower, but it minimises risk and enables new functionality to still be delivered.

## What to do next

When faced with this question, a good place to start is by writing down what the system is stopping the business doing, in business terms rather than technical ones. If nothing comes, the money is often better spent elsewhere.

If something does come, start looking at the technologies used and whether they are still supported. Consider whether it is better to modernise one step at a time or wholesale.

If you are weighing this up and would rather not decide it on your own, [tell us what you have](/contact.html) and what it does for the business. We will tell you what we would need to look at and what we think your options are. If the honest answer is that you should leave it alone for another two years, that is what we will say.
