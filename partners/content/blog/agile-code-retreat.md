+++
title = "agile code (retreat on the beach)"
date = "2018-04-19T09:00:00+00:00"
tags = ["agile", "TDD", "cyber-dojo", "pair programming"]
categories = ["agile", "TDD", "cyber-dojo", "pair programming"]
banner = "img/banners/blogs/CodeRetreat_1.jpg"
author = "Jon Reynolds"
+++


On 19th March Gordon and I attended a 2 day agile coding retreat in St Austell, Cornwall. Hosted by [Kevlin Henney](https://twitter.com/kevlinhenney) and [Jon Jagger](https://twitter.com/JonJagger) the retreat was organised for developers to discuss, practice and improve their software craftsmanship, communication and creativity. Having personally never attended such an event before I was interested to see if there was an opportunity for me to hone my programming skills to ultimately improve my performance as a developer. And I was not disappointed! 

### Deliberate practice through repetition

Throughout the 2 days all the attendees worked in different pairs or more (mob-pragramming) using the shared learning environment of [Cyber-dojo](http://www.cyber-dojo.org/) to improve their powers of communication and test-driven development (TDD). Cyber-dojo is an online development environment that provides code puzzle exercises in a choice of different languages with the ability to measure the time and status of unit tests. 

![Pair and mob programming](/img/banners/blogs/CodeRetreat_3.jpg)


The real insight for me in these workshops was to not solve the solution as quickly as possible but to focus on the process of working within the small, iterative learning cycles of PDSA:

#### (P)lan
* discussing collectively so we all understood what current problem we were trying to solve
* listening to each other's ideas
* asking questions
* not making assumptions
    * discuss with the stakeholder to avoid this
* writing a failing test
    *  have a realistic context and use realistic test data
    * remembering that the style of writing tests is different to writing code

### (D)o
* implement the code to make the test pass
* Avoid using content-free words to describe variables, classes or methods which offer no specific meaning
* Avoid writing code that does not influence directly how the test should pass

### (S)tudy
* no coding
* take time to review and reflect what you have written
* could the implemented code be refactored or improved to ease readability?
* could using a design pattern help describe the intent of the code more easily?
* with care comes quality

### (A)ct
* In this refactoring phase apply the learnings from the reflection phase
* tidy up tests as well
    * enhance using parameterisation of tests using realistic test arguments
    * reduce the number of tests if a test pattern emerges over each iteration
        * a single test containing a series of decorated test criteria describing a patterned behaviour would be easier to read rather than having a series of multiple tests using single test data that imply the same meaning


Working in a repetitive manner, even on the same puzzle within different pairs, gave everyone chance to exercise these coding habits continuously. After 2 days it became second nature for everyone to work like this. Following each exercise everyone collectively reviewed each pair's tests and code to see how each other could improve their approaches in the following iteration. Kevlin and Jon's experience and advice were always offered and appreciated at this point.

So without giving any more away I would definitely recommend this event to any developer wishing to improve their software craftmanship using TDD and the powers of communication. 

### With Thanks

I would like to thank the following for making this a worthwhile, unique experience which I'm sure will resonate in my every day life as a developer:

* [Kevlin Henney](https://twitter.com/kevlinhenney)
* [Jon Jagger](https://twitter.com/JonJagger)
* [Belinda Waldock](https://twitter.com/belindawaldock) and the team at [Agile On The Beach](https://twitter.com/agileonthebeach) for hosting such a well-organised event with great food and facilities.

![Fellow retreat attendees embracing the snow](/img/banners/blogs/CodeRetreat_2.jpg)
