# The problem with legacy software
or
# We need to talk about legacy software

Sometimes we forget how much old software is out there. We talk about the software industry still being young and perhaps quite immature, but actually word processing software started reaching offices in the early 1970s - over 40 years ago. The first version of PowerPoint was released in 1987, public use of the internet began in 1989 and then exploded during the 1990s.

When I look back at the software I worked on at the beginning of my career in the early 2000s with languages like Visual Basic 5 and Delphi, I am struck by how much has changed in such a short period of time. Of course we didn't write automated tests back then, or use tools like Team City and Octopus to manage continuous building and deployment. I even remember the source code for one application being hidden away on someone's PC because they hadn't felt the need to put it in source control!

Reminiscing is great, but the point I'm getting to is that there are now a lot of old pieces of software out there which are integral parts of businesses. As technologies have changed, much of the technical knowledge required to maintain and understand these applications has been lost. They have become black boxes which just work and mustn't be touched. Reflecting on the development practices that were common when they were written, plus a few memories of spaghetti code which most people were afraid to touch even then, I think it is safe to assume that many of them are complex and fragile.

These legacy applications are a time-bomb. The Visual Basic 6 runtime may still be supported on Windows, but the tools for building VB6 applications are long out of support. Eventually a time will come when updating them can't be put off any more, so what can you do?

The first task is to understand these applications and what they do. Public interfaces and any applications calling into those interfaces need to documented. You need to work through the source code and trace the logic. You may find it helpful to write some tests to demonstrate the behaviour which can then be compared with any replacement you write in the future.

Having understood and documented what a legacy application does, the next task is to decide whether you want a like-for-like replacement but in a modern technology or something different that better supports how you wish to work now. How many business processes have been held back from changing because they rely on a legacy component which works in a specific way and can't be changed?

Finally, it's time to develop the replacement. This is where any tests you've written around the original will come into their own. The last thing you want is for things to go wrong because the behaviour of the application you're replacing wasn't understood properly.

# Elastic Mint Can Help

We understand that your legacy software is vitally important to you. After all, that's one of the reasons it's lasted so long! We also understand that many of your developers either do not know about older technologies, and have little interest in working with them. Our experienced team have seen many technologies come and go - the chances are we will have worked your legacy technology when it was new!

We will take the time to understand what your legacy applications do, how they work, and what other components may depend on them.

We will write a report detailing all we have learnt, so that even if you don't want to go any further now, at least you know what you've got.

We will work with you to design and develop the right replacement, ensuring that it is thoroughly tested and it fits into how you want to work.

If you have some legacy software, why not get in touch to see how we can help?