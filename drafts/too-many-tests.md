# The Curse of IoC and Why We Write Too Many Useless Tests

Sometimes it seems that we simply go from one extreme to another. Once upon a time developers didn't bother to write tests. Everything was tested manually. When changes were made the whole thing would need to be manually tested again. Sometimes they used test scripts, other times developers just played around trying to break functionally. And then they couldn't remember what they had to break it!

Managers would roll their eyes in frustration when developers talked about writing unit tests. How would writing more code make applications more reliable and faster to develop? Until one day a critical mass was reached and suddenly everyone was doing it. Unit tests proliferated. High code-coverage became a mark of pride. Some companies went a step further and required a certain level of code-coverage or the build would break and (presumably!) bad things would happen.

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

As a client of `ClassToBeTested` why is it important to me whether it delegates functionality to another object or performs it internally? It isn't. All I care about is that calling a method has the desired effect whether it be storing some data somewhere, sending a message, or performing a calculation. How it does this is unimportant.

Part of the problem here is that Dependency Injection and the use of IoC containers became popular at the same time as writing unit tests. Previously it was very common to see a dependent object be created inside a method. Interfaces were something of a rarity. Suddenly every class had an interface associated with it. The whole idea that an interface could have multiple implementations was forgotten. Instead each interface would have a single implementation, and each class would have a constructor with 5 or 10 interfaces as parameters. Obviously this was hard to manage and so we needed to have IoC containers to make it simple. The end result was that we could now easily write tests and because we were trying to test each class individually we mocked all the dependencies and ended up testing that methods on dependencies were called at the right time.

What a waste of time!

For years, companies and developers have talked about how great TDD is and sometimes about their struggles with it. The simple truth is though, that most developers have no idea what it really is!

Do you remember Uncle Bob Martin's example of writing a bowling game with TDD? Instead of deciding that various classes were needed to do different things up front, he started off with a behaviour, writing a test for it and then writing code that passed it. Refactoring into classes happened later. Because these classes were internal, they didn't need their own tests. They weren't necessarily intended to be reusable. A lot of their purpose was to keep the code simple - remember the Single Responsibilty Principle?

As a community of developers we all bought into the ideas of loose coupling and reusability and writing tests, and to be fair we have reaped some benefits, but we have also ended up with a mass of brittle tests which test interactions rather than outcomes.

Instead of writing more tests, just to meet an arbitrary code-coverage metric, perhaps we need to start deleting them. What do you think?