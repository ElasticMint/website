+++
title = "Fixing Intermittent Test Failures With NCrunch"
date = "2018-04-16T09:00:00+00:00"
tags = ["agile", "testing", "NCrunch", "dotNet", "Frameworks"]
categories = ["testing", "dotNet", "Frameworks"]
banner = "img/banners/banner-7.jpg"
author = "Gordon Barrs"
+++

I was working with a company recently where we were using Xunit as our test framework,  NSubstitute for mocks, stubs etc and we ran our tests using NCrunch whilst developing in Visual Studio.  At one point during the project we noticed that some of our unit tests were failing intermittently.  This is more common in longer running integration tests but not so common in unit tests.  When we do see this behaviour in unit tests the cause is often shared state being accessed when unit tests are being run in parallel.  In this particular instance that did not seem to be the cause.  Our tests appeared to be well isolated with no obvious shared state.

The error messages we were seeing were:

```c#
NSubstitute.Exceptions.AmbiguousArgumentsException: Cannot determine argument specifications to use.
Please use specifications for all arguments of the same type.
```

```c#
NSubstitute.Exceptions.UnexpectedArgumentMatcherException: Argument matchers (Arg.Is, Arg.Any) should only be used in place of member arguments. Do not use in a Returns() statement or anywhere else outside of a member call.
Correct use:
  sub.MyMethod(Arg.Any<string>()).Returns("hi")
Incorrect use:
  sub.MyMethod("hi").Returns(Arg.Any<string>())
```

A quick search revealed

[ Ambiguous arguments is when NSubstitute compares the arguments to the call it is currently working with, to the stack of "argument matchers" it has (each time Arg.Blah is called, an the argument matcher is added to that stack), and it is unable to resolve which argument goes where.](https://stackoverflow.com/questions/26805420/nsubstitute-testfixture-1-causes-ambiguousargumentsexception-in-testfixture-2#26856185)

Finding the cause of this type of intermittent failure is notoriously hard.  Often, tests run concurrently and in a different sequence during each test run.  Test runs will succeed most of the time, with a test failing occasionally. When the failed test is re-run then it usually passes. Such is the nature of intermittently-failing tests.

Enter a new NCrunch feature introduced in version 3.13, `Activate Endless Churn Mode`.

[The intention of Churn Mode is to take the intermittency out of the failure, bringing it up in a way that the failure can be more easily investigated and resolved.  Churn Mode does this by employing the brute-force approach of running tests endlessly until they fail](http://blog.ncrunch.net/post/NCrunch-v313-Churn-mode-and-UI-enhancements.aspx)

Churn mode runs the tests over and over again until you tell it to stop. Any time a test fails NCrunch removes it from the tests being run so that you can identify the failed test and read the associated error message.

Using this feature showed us we had more than just one intermittently failing unit test, which was both surprising and worrying.  Some more searching uncovered a [Stack Overflow post](//https://stackoverflow.com/questions/42971704/nsubstitute-please-use-specifications-for-all-arguments-of-the-same-type-issu#43380486
 )  with a link to an incredibly useful piece of code, [a Diagnostic Substitution Context for NSubstitute](https://gist.github.com/zvirja/56543e5c35cf910e4d1eec87d0fd02f3/). This code allows us to intercept any `AmbiguousArgumentsException` and inspect the state of the Argument Matcher stack.  We amended the code to include both exception types we were seeing and added some trace statements to output the diagnostics to the NCrunch test output window.
 
To troubleshoot our issue we used the following process:
 
 - Run the tests in endless churn mode
 - For each test that breaks, add a diagnostics initialiser to the fixture setup
 - Run the tests in endless churn mode again
 - Inspect the output
 - Fix the problem
 
Our diagnostics gave us information similar to 

```c#
######################
NSubstitute.Exceptions.UnexpectedArgumentMatcherException
any Object
######################

   at System.Environment.get_StackTrace()
   at DiagnosticsSubstitutionContext.ArgumentInfo..ctor() in C:\my-app\src\Tests.Unit\DiagnosticsSubstitutionContext.cs:line 29
   at DiagnosticsSubstitutionContext.EnqueueArgumentSpecification(IArgumentSpecification spec) in C:\my-app\src\Tests.Unit\DiagnosticsSubstitutionContext.cs:line 81
   at NSubstitute.Core.Arguments.ArgumentSpecificationQueue.EnqueueSpecFor[T](IArgumentMatcher matcher)
   at my-app.Tests.Unit.MessagingTests.When_message_handler_processes_a_message.<No_price_events_are_found_then_message_is_logged_and_processing_is_skipped>d__10.MoveNext() in C:\my-app\src\Tests.Unit\MessagingTests\When_message_handler_processes_a_message.cs:line 90
   
   ... (elided for clarity)
   
   NSubstitute.Exceptions.UnexpectedArgumentMatcherException: Argument matchers (Arg.Is, Arg.Any) should only be used in place of member arguments. Do not use in a Returns() statement or anywhere else outside of a member call.
Correct use:
  sub.MyMethod(Arg.Any<string>()).Returns("hi")
Incorrect use:
  sub.MyMethod("hi").Returns(Arg.Any<string>())
   at NSubstitute.Core.SubstitutionContext.LastCallShouldReturn(IReturn value, MatchArgs matchArgs)
   at DiagnosticsSubstitutionContext.LastCallShouldReturn(IReturn value, MatchArgs matchArgs) in C:\my-app\src\Tests.Unit\DiagnosticsSubstitutionContext.cs:line 105
   at my-app.Tests.Unit.When_scheduling_processor_run..ctor() in C:\my-app\src\Tests.Unit\When_scheduling_processor_run.cs:line 27

   
```

The interesting thing to note here is that the failing test is `When_scheduling_processor_run` but a matcher is enqueued at `When_message_handler_processes_a_message`.  These are two completely unrelated tests. This output shows the NSubstitute argument matcher stack getting out-of-sync due to an arg matcher being used outside of call configuration, or as an argument to a non-virtual method.  Taking a look at line 90, we saw the following:

```c#
 mapper
    .DidNotReceiveWithAnyArgs()
    .Map<IEnumerable<PriceChange>>(Arg.Any<object>());
```

Here, we see the `Arg.Any<object>` argument matcher being used as a parameter. On first inspection, this might seem reasonable. On closer inspection we find out the parameter is ignored by NSubstitute due to the call to `DidNotReceiveWithAnyArgs` for this test run, although it is added to the argument matcher stack. This causes the argument matcher to be left on the stack when the next test is run and this causes the exception in the next test.  To fix this issue we changed the code to 

```c#
 var ignoredByNSubstitute = 
    new object(); 
 
mapper
    .DidNotReceiveWithAnyArgs()
    .Map<IEnumerable<PriceChange>>(ignoredByNSubstitute); 
```

After this we repeated the churn mode process. This highlighted other errors. Another example of the type of error we came across is:

```c#
 var priceChange = 
    new PriceChange
        {
            EffectiveDateTimeUtc = Arg.Any<DateTime>(), 
            EndDateTimeUtc = Arg.Any<DateTime>(), 
            CurrentPrice = Arg.Any<decimal>() 
        };
 
var priceChangeTransformation = 
    new PriceChangeTransformation(mapper);

transformedPrice = 
    priceChangeTransformation.Apply(
        priceChange,
        startDateTime,
        endDateTime,
        HighestPrice);
```

In this case `Arg.Any` is being used outside the context of NSubstitute call configuration, although the argument matchers will still be added to the argument matcher stack.  To fix this we change the code to:


```c#
 var priceChange = 
    new PriceChange
        {
            EffectiveDateTimeUtc = DateTime.MinValue, 
            EndDateTimeUtc = DateTime.MaxValue, 
            CurrentPrice = CurrentPrice = 99.99M 
        };
 
var priceChangeTransformation = 
    new PriceChangeTransformation(mapper);

transformedPrice = 
    priceChangeTransformation.Apply(
        priceChange,
        startDateTime,
        endDateTime,
        HighestPrice);
```

We repeated the churn mode process until the tests stopped failing.

In every case the cause of failure was an [incorrect use of NSubstitute argument matchers](http://nsubstitute.github.io/help/argument-matchers/#how_not_to_use_argument_matchers), although it is easy to see how this might have happened if a developer is new to using NSubstitute.

A big thanks goes to [Remco](https://twitter.com/remcomulder) for introducing such a [useful feature](http://blog.ncrunch.net/post/NCrunch-v313-Churn-mode-and-UI-enhancements.aspx) to an already great product and to Alex Povar for taking the time to share a [very useful script](https://gist.github.com/zvirja/56543e5c35cf910e4d1eec87d0fd02f3/).