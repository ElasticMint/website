# The Curse of IoC and Why We Write Too Many Useless Tests

## The Problem With Tests

Sometimes it seems that we simply go from one extreme to another. Once upon a time developers didn't bother to write tests. Everything was tested manually. When changes were made the whole thing would need to be manually tested again. Sometimes they used test scripts, other times developers just played around trying to break functionally. And then they couldn't remember what they had done to break it!

Managers would roll their eyes in frustration when developers talked about writing unit tests. How would writing more code make applications more reliable and faster to develop? Until one day a critical mass was reached, and suddenly everyone was doing it. Automated tests proliferated. High code-coverage became a mark of pride. Some companies went a step further and required a certain level of code-coverage or the build would break and (presumably!) bad things would happen.

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

As a client of `ClassToBeTested` why is it important to me whether it delegates functionality to another object or performs it internally? It isn't. All I care about is that calling a method has the desired effect, whether it be storing some data somewhere, sending a message, or performing a calculation. How it does this is unimportant.

Part of the problem here is that Dependency Injection and the use of IoC containers became popular at the same time as writing tests. Previously it was very common to see a dependent object be created inside a method. Interfaces were something of a rarity. Suddenly, with the advent of IoC, every class had an interface associated with it. The whole idea that an interface could have multiple implementations was forgotten. Instead each interface would have a single implementation, and each class would have a constructor with 5 or 10 interfaces as parameters. Obviously this was hard to manage and so we needed to have IoC containers to make it simple. The end result was that we could now easily write tests and because we were trying to test each class individually we mocked all the dependencies and ended up testing that methods on dependencies were called at the right time.

This just leads to brittle tests that change whenever anyone does any refactoring!

For years, companies and developers have talked about how great TDD is and sometimes about their struggles with it. The simple truth is though, that many developers have no idea what it really is! 

I first became interested in tests after working on a project which wasn't as successful as we all hoped. Despite it being greenfield development, parts of the code quickly became very complicated as they were poorly structured. We spent days (literally) testing and retesting as bugs were fixed and then new ones inadvertenly introduced.

I remember the excitement of realising I could test classes by injecting the dependencies as interfaces. Suddenly it became easy to have loosely-coupled testable code. As more and more people started doing this code quality improved, functionality became more reliable, and I no longer had to spend large amounts of time doing manual testing.

However, in spite of the articles I read about about TDD, I found I could never really do it. Occassionally I would start with the tests when I needed to write an algorithm, but generally I found it easier to write the tests afterwards to confirm my code did what I expected it to do.

Over time I became convinced there was something wrong. Tests and DI had given me some benefits, but it wasn't enough. Too many of the tests I wrote seemed worthless.

## TDD Revisited

What does TDD look like?

- Write a failing test
- Write code to make the test pass
- Refactor

Sounds simple. But when you are writing tests for each class it quickly becomes frustrating. Plus, the tests don't drive the design as you've already designed it in your head.

The problem is that most developers, myself included, tend to think of a class as being a unit. Any tests that you write at that level will only test part of the problem you are trying to solve. And when you come back to them 6 months down the line, the chances are you're not going to understand what they do.

Imagine a requirement to manage a basket on an e-commerce website. It might look like this:

```
Given I have an empty basket
When I add an item to the basket
Then my basket will contain the added item
```

In order to meet this requirement you will need a module for managing baskets. This might be a microservice, or just one endpoint among many on a webservice. Regardless of how it's implemented, the observable outcome will be the same. Adding an item to the basket will cause the basket to contain that item.

If we write a test at the module level then this is easy to do before writing any code. If you really want to, you can use a tool like SpecFlow which converts human readable Gherkin into test methods. Personally though, I don't think anyone ever reads those tests, so I'm quite happy to use my unit testing tool which I use for testing classes.

In writing code to make that test pass, I can make it as smelly and dirty as I want. It doesn't matter. I just need the test to pass. It might be there are already classes I can reuse to help me, or I could just write it all inside the public facing method which gets called.

Once the test passes, it's refactoring time. There's no need to write any more tests because we already know it works. Any classes that are extracted should not be exposed publically. In the world of C#, this means they should be `internal`. 

At this point it's ok to create dependencies inline. They don't need to be injected into the constructor. Nothing is gained by doing this. I realise this goes against all our current practices, but the simple truth is that it's very rare for there to be multiple implementations of an interface. We've been creating all these interfaces in the name of reusability, when actually very little reuse goes on.

As a result of this I will have far fewer tests, any tests I do have will not be tied to my implementation, and if I need to refactor at some point in the future I can do so easily.

By changing where we write our tests and going back to TDD, we can stop them being such a burden, and get an increased benefit from them. We won't have as many, but code-coverage will remain high (never something to be relied on!), and we can realise the promise of being able to refactor with confidence.