+++
title = "The Curse of IoC and Why We Write Too Many Useless Tests"
date = "2018-09-11T13:37:01+01:00"
tags = ["agile", "TDD","refactoring", "testing"]
categories = ["agile", "TDD","refactoring", "testing"]
banner = "img/banners/blogs/GreyComputerMonitor.jpg"
author = "Andy Garner"
+++

Sometimes it seems that we simply go from one extreme to another. Once upon a time developers didn't bother to write tests. Everything was tested manually. When changes were made the whole thing would need to be manually tested again. Sometimes we used test scripts, other times we just played around trying to break functionally. And then we couldn't remember what we had done to break it!

Managers would roll their eyes in frustration when developers talked about writing unit tests. How would writing more code make applications more reliable and faster to develop? Until one day a critical mass was reached, and suddenly everyone was doing it. Automated tests proliferated. High code-coverage became a mark of pride. Some companies went a step further and required a certain level of code-coverage or the build would break and (presumably!) bad things would happen.

### The Problem With Tests

So what have all these tests achieved?

Have you ever seen a test like this?

```
[Test]
public void CallingFunctionAbcDoesStuff()
{
    var mockedDependency = new Mock<IDependency>();
    var sut = new ClassToBeTested(mockedDependency.Object);

    sut.Abc();

    mockedDependency.Verify(x => x.Xyz(), Times.Once);
}
```

What does this test? It tests that a function is called on a dependent object when the function `Abc()` is called. 

Why is that important? I don't know.

As a client of `ClassToBeTested` why is it important to me whether it delegates functionality to another object or performs it internally? All I care about is that calling a method has the desired effect, whether it be storing some data somewhere, sending a message, or performing a calculation. How it does this is unimportant.

Part of the problem here is that Dependency Injection and the use of IoC containers became popular at the same time as writing tests. Previously it was very common to see a dependent object be created inside a method. Interfaces were something of a rarity. Suddenly, with the advent of IoC, every class had an interface associated with it. The whole idea that an interface could have multiple implementations was forgotten. Instead each interface would have a single implementation, and each class would have a constructor with 5 or 10 interfaces as parameters. Obviously this was hard to manage and so we needed to have IoC containers to make it simple. The end result was that we could now easily write tests, and because we were trying to test each class individually, we mocked all the dependencies and ended up testing that methods on dependencies were called at the right time.

This just leads to brittle tests that change whenever anyone does any refactoring!

For years, companies and developers have talked about how great TDD is and sometimes about their struggles with it. However, I think the original purpose and method of TDD has become distorted over time. TDD for many developers has morphed into a monster that hinders, rather than helps.

I first became interested in tests after working on a project which wasn't as successful as we all hoped. Despite it being greenfield development, parts of the code quickly became very complicated as they were poorly structured. We spent days (literally) testing and retesting as bugs were fixed and then new ones inadvertently introduced.

I remember the excitement of realising I could test classes by injecting the dependencies as interfaces. Suddenly it became easy to have loosely-coupled testable code. As more and more people started doing this, code quality improved, functionality became more reliable, and I no longer had to spend large amounts of time doing manual testing.

However, in spite of the articles I read about TDD, I found I could never really do it. Occassionally I would start with the tests when I needed to write an algorithm, but generally, I found it easier to write the tests afterwards to confirm my code did what I expected it to do.

Over time I became convinced there was something wrong. Tests and DI had given me some benefits, but it wasn't enough. Too many of the tests I wrote seemed worthless.

### TDD Revisited

What does TDD look like?

- Write a failing test
- Write code to make the test pass
- Refactor

Sounds simple. But when you are writing tests for each class, it quickly becomes frustrating. Plus, the tests don't drive the design as you've already designed it in your head.

The problem is that many developers, myself included, tend to think of a class as being a unit. Any tests that you write at that level will only test part of the problem you are trying to solve. And when you come back to them 6 months down the line, the chances are you're not going to understand what they do.

Imagine a requirement to manage a basket on an e-commerce website. It might look like this:

```
Given I have an empty basket
When I add an item to the basket
Then my basket will contain the added item
```

In order to meet this requirement you will need a module for managing baskets. This might be a microservice or just one endpoint among many on a webservice. Regardless of how it's implemented, the observable outcome will be the same. Adding an item to the basket will cause the basket to contain that item.

If we write a test at the module level then this is easy to do before writing any code. If you really want to, you can use a tool like SpecFlow which converts human-readable Gherkin into test methods. Personally though, I don't think anyone ever reads those tests, so I'm quite happy to use the unit testing tool which I use for testing classes.

In writing code to make that test pass, I can make it as smelly and dirty as I want. It doesn't matter. I just need the test to pass. There might already be classes I can reuse to help me, or I can just write it all inside the public facing method which gets called.

Once the test passes, it's refactoring time. There's no need to write any more tests because we already know it works. Any classes that are extracted should not be exposed publically. In the world of C#, this means they should be `internal`. (Another thing we tend not to do!)

It might be appropriate to create instances of these extracted classes inline with the `new` keyword, especially if construction is very simple and only uses data that is present at the point it is created. Sometimes, it will make sense to use a factory to create a dependency. I once extracted a calculation which involved a number of branches into a set of classes with one class for each combination of variables, and then used a factory to create an instance of the correct type - see [Strategy pattern](http://www.blackwasp.co.uk/Strategy.aspx).

In a lot of code that I see, most dependencies are simply injected into the constructor. We've become used to creating interfaces with only a single implementation. While there is still a place for dependency injection, maybe we don't need all these interfaces and not all these dependencies need to be injected.

As a result of this approach I will have far fewer tests, any tests I do have will not be tied to my implementation, and if I need to refactor at some point in the future I can do so easily.

By changing where we write our tests and going back to TDD, we can stop them being such a burden, and get an increased benefit from them. We won't have as many, but code-coverage will remain high (never something to be relied on!), and we can realise the promise of being able to refactor with confidence.