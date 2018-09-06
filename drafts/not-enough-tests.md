# Why it's Time to Start Writing More and Better Tests

You may have read my rant about "the curse of IoC and why we write too many tests". I admit it was a bit click-baity and intended to challenge a few opinions. I want to take a more considered view and suggest what we can do to improve the tests we write.

To recap, the problem as I see it is that we write too many tests that aren't very helpful. Instead of testing functionality they test interactions with mocks and ultimately a specific implementation. This means that changing the implementation often breaks lots of tests.

## What can we do about it?

The place to start is to define what we mean by a unit. Most developers seem to view a unit as a class. However, a better definition is to say that a unit is a module e.g. a microservice for managing a shopping basket on an e-commerce site. 

The funny thing is we often already have tests at this level, written using the Gherkin language. The original idea of Gherkin was that developers would write tests in natural language, and then business people would check them and be confident that their requirements had been delivered e.g.

```
Given I have an empty basket
When I add an item to the basket
Then my basket will contain the added item
```

The only problem with this is these tests are often very slow and unreliable. Many developers don't enjoy writing them, they can be hard to write, and they often depend on real databases/file systems.

Having redefined what a unit is, the next thing is to remind ourselves of the TDD process.
- Write a failing test
- Write code to make the test pass
- Refactor

Most developers I know don't start with the failing test. To be fair, I don't blame them because when you view a class as a unit, constantly writing tests disrupts your flow. However if we write module-level tests rather than class-level tests, then we can write a single test for each required behaviour, rather than lots of tests tied into how we imagine the problem can be solved. There shouldn't be much need for mocks in this test unless the module interacts with an external system like a database, file system or web service. In this case there may be a need for something like an in-memory database or faked web service with known behaviour, but certainly nothing like the mocks we often see in tests.

Having written a failing test, we should just write any code we can to make it pass. There is no need at this point to worry about classes and avoiding duplication. Just solve the problem and get the test to pass.

Once a test is passing we can then refactor as appropriate. We may create new classes or methods at this point, but we don't need to write any more tests. The passing test gives us confidence in our refactoring and since the test is no longer tied to the implementation it is robust. The code we write will probably look quite different to what we are used to. Any classes/methods we create will be internal to the module we are testing. In C# developers commonly make classes and their methods public even though they are only used inside a module. Now we can make them internal as they are simply implementation details. Similarly we can move away from injecting interfaces with only a single implementation. Potentially we can create dependencies when we need them, possibly using a factory.