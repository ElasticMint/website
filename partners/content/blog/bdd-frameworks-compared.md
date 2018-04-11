+++
title = "BDD frameworks compared - SpecFlow and BDDfy"
date = "2018-04-11T09:00:00+00:00"
tags = ["agile", "testing", "BDD", ".Net", "Frameworks"]
categories = ["testing", "BDD", ".Net", "Frameworks"]
banner = "img/banners/blogs/BddfyAddScenario.png"
author = "Andy Garner"
+++

I first learnt about writing unit tests following a project where we missed the deadline and spent far too long fixing and then refixing the code. I became frustrated that we would fix one thing and then something else would go wrong. When I saw how tools like NUnit and Rhino Mocks gave me the confidence to fix bugs and refactor it genuinely changed my working life. On my next project I determined to write tests as I went along and to be honest I've never looked back. 

Writing unit tests went mainstream very quickly, but it was a long time until I started to work at companies where they used tools to write BDD style tests. The advantage of BDD has always been that you can write a scenario in normal language and then implement code to make it pass. 

![Given When Then](/img/banners/blogs/BddfyAddScenario.png)

### SpecFlow

[SpecFlow](http://specflow.org/) uses the Gherkin language to write tests in human readable language. It allows problems to be expressed using the language of the domain stakeholders. This language is then bound to code.

```
Scenario Outline: Add two numbers
	Given values <value1> and <value2>
	When I add the values
	Then the result should be <result>

Examples: 
| value1 | value2 | result |
| 1      | 1      | 2      |
| 1.2    | 2.3    | 3.5    |


[When(@"I add the values")]
internal void WhenIAddTheValues()
{
    // Code to perform this step
}
```

In theory this is a great idea. Stakeholders write their requirements in the form of user stories. Typically the acceptance criteria are written in the Given, When, Then format, which can be copied and pasted into a feature file for the developer or QA engineer to write the test.

### BDDfy

[BDDfy](https://github.com/TestStack/TestStack.BDDfy) has a different approach. Instead of starting off with a scenario written using natural language, the developer writes a test using their framework of choice e.g. NUnit, XUnit. The output is a report in the Given, When, Then format.

```
internal class Add
{
    private readonly Calculator calculator = new Calculator();
    private readonly Values values = new Values();

    [Test]
    [TestCase(1, 1, 2)]
    [TestCase(1.2, 2.3, 3.5)]
    public void ShouldBeAbleToAddTwoNumbers(decimal value1, decimal value2, decimal result)
    {
        this.Given(_ => _.GivenIHaveTwoValues(value1, value2))
            .When(_ => _.WhenIAddThem())
            .Then(_ => _.ThenIGetTheExpectedResult(result))
            .BDDfy();
    }

    private void GivenIHaveTwoValues(decimal value1, decimal value2)
    {
        values.Value1 = value1;
        values.Value2 = value2;
    }

    private void WhenIAddThem()
    {
        values.Result = calculator.Add(values.Value1, values.Value2);
    }

    private void ThenIGetTheExpectedResult(decimal result)
    {
        values.Result.ShouldBe(result);
    }
}

Scenario: Should be able to add two numbers
	Given I have two values 1.2, 2.3
	When I add them
	Then I get the expected result 3.5
```

The idea here seems to be a recognition that often stakeholders don't actually create the scenarios, but developers do and so perhaps it is easier for them to do so in code and then output a report in human readable form.

### Comparison

In order to explore some of the differences between SpecFlow and BDDfy I created a very simple class called Calculator which can perform basic mathematical operations on two numbers. I then created the same tests using both SpecFlow and BDDfy. You can get the code [here](https://github.com/ElasticMint/specflow_bddfy_example).

I've used SpecFlow for a number of years now, but this was my first experience with BDDfy.

What I've seen with SpecFlow is that the tests often become very hard to maintain. The idea of writing a test using natural language is great. However I'm not convinced the same care and attention is usually applied to the test code as to the production code. I also think the features of the tool are often underused and perhaps not understood by those writing the code. 

SpecFlow has its own dependency injection engine. This means that reusable code can easily be pulled out into service classes. Instances of these classes can be injected into the constructor of any class within the test and don't need to be "newed up". SpecFlow will create a single instance which lasts the lifetime of a test meaning any data such as parameters or return values can be persisted across the various test steps.

Looking at the code I wrote, in what after all is a very trivial example, there seems to be a lot of it! There are Feature and Steps files for each mathematical operation. In addition there is a CommonSteps file for steps found in multiple features. Then there is a simple class to hold the data related to tests. In comparison, I created 5 files in total for the BDDfy version. 

As this is such a simple example, I haven't created files which contain steps to be run either before or after a test. Typically I would create classes with names like BeforeScenarioSteps and place well named methods in their which perform the required actions. The problem I have with this is that the code starts getting spread out all over the place. You really have to understand how SpecFlow works and be disciplined in how you structure your code in order to avoid spaghetti.

BDDfy provides several ways of configuring the tests. I opted to use the Fluent configuration because I wanted to pass data in to my tests and this seemed the simplest way. As a complete novice to the framework I found I was able to very quickly get a test running and with minimal code. The one misgiving I had was that I repeated code. I would need to spend a bit more time thinking about how to organise things in order to avoid that. The other bugbear for me was that some of the documentation wasn't finished, although there are good examples in Git.

### Conclusion

I really liked how BDDfy kept all the relevant code in one place whereas with SpecFlow I'm often struggling to navigate around the codebase. For me SpecFlow works well when the code is well-organised, but I think that's hard to do. I'm very keen to try BDDfy on something more substantial to see how I get on.

##### Further reading
* [SpecFlow home page](http://specflow.org/)
* [BDDfy home page](https://github.com/TestStack/TestStack.BDDfy)