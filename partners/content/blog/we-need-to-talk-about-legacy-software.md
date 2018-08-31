+++
title = "We need to talk about legacy software"
date = "2018-08-29T09:00:00+00:00"
tags = ["agile", "project","planning"]
categories = ["agile", "project","planning"]
banner = "img/banners/banner-legacy.jpg"
author = "Andy Garner"
+++

Sometimes we forget how much old software is out there. We talk about the software industry still being young and perhaps quite immature, but actually, word processing software started reaching offices in the early 1970s - over 40 years ago. The first version of PowerPoint was released in 1987, public use of the internet began in 1989 and then exploded during the 1990s.

Looking back it is striking how much has changed in a short period of time. 15 years ago most people didn't write automated tests or use tools like Team City and Octopus to manage continuous building and deployment. There are many horror stories about problems caused by practices we wouldn't even consider now.

Reminiscing is fun, but the point is that there are now a lot of old pieces of software out there which are integral parts of businesses. As technologies have changed, much of the technical knowledge required to maintain and understand these applications has been lost. They have become black boxes which just work and mustn't be touched. Reflecting on the development practices that were common when they were written, plus a few memories of spaghetti code which most people were afraid to touch even then, it is safe to assume that many of them are complex and hard to change.

These legacy applications are potential time-bombs. The Visual Basic 6 runtime may still be supported on Windows, but the tools for building VB6 applications are long out of support. Eventually, a time will come when updating them can't be put off anymore.

**What can be done?**

Before you can do anything, you need to understand what needs to be done. As part of this, it's worth looking at the role legacy applications play in your business processes. Do they still match the way you want to work? Is this an opportunity to improve your business processes?

Public interfaces and any applications calling into those interfaces need to documented. You need to work through the source code and trace the logic. You may find it helpful to write some tests to demonstrate the behaviour which can then be compared with any replacement you write in the future.

Having understood and documented what a legacy application does, you need to decide whether you want a like-for-like replacement but in a modern technology, or something different that will help you evolve your business processes. 

Finally, it's time to develop the replacement. It's worth taking the time to carefully look at the technology options available to you. Making the right choices now will make it easier to adapt as your business develops.

Your legacy software is important. After all, that's one of the reasons it's lasted so long! However, technologies come and go. If it is time to revisit your legacy software give yourself the best chance of success by:

- taking the time to understand what your legacy applications do, how they work, and what other components may depend on them
- documenting all that has been learned, so that even if you don't want to go any further, at least you know what you've got
- involving the right people so that you can design and develop the right replacement, ensuring that it uses appropriate technologies, is thoroughly tested and fits with your current business processes