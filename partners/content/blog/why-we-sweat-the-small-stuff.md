---
title: "Why We Sweat the Small Stuff"
date: 2020-09-21T16:33:52+01:00
tags: ["software", "architecture"]
categories: ["software", "architecture"]
banner: "img/banners/blogs/GreyComputerMonitor.jpg"
author: "Andy Garner"
---

Have you heard the phrase “Don’t sweat the small stuff”? It comes from a book by Richard Carlson called [Don't Sweat the Small Stuff and It's All Small Stuff](https://www.amazon.co.uk/Dont-Sweat-Small-Stuff-Overtaking/dp/0340708018 ) all about stopping little things in life driving you crazy. 

In many areas of life this makes a lot of sense, however when it comes to writing code we’ve found that the “small stuff” really matters. 

The problem is that after you have solved someone’s problems and written the code that does what they want, at some point there will be a new problem. And then someone, quite possibly not you, is going to have to look at what you have done and work out what needs to change on order to solve this new problem. 

Writing code is hard. Organising your thoughts so that it makes sense to other people is even harder. The next person to read this code is going to have a hard enough time understanding it, so the least we can do is sweat the small stuff, care about the details, and do whatever we can to make their life job easier. 

Of course, lots of companies have coding standards and that’s all well and good, but we believe in taking things beyond that and have a philosophy of making code as maintainable as possible for the next person. Among other things this involves thinking about the following: 

* Does the name I have given this variable/method/class accurately describe its purpose? 
* Is it easy to look at a method and understand what it does? 
* Is the important information regarding a method/class easy to find? 
* Are there any abbreviations or spelling mistakes which might make it harder for someone to understand? 
* Does a class do one thing well or has it become a dumping ground for lots of unrelated functionality? 
* Are names consistent throughout the code? 

Let’s work through an example of how we might apply some of these questions to the issue of positioning parameters for a method. 

How often have you seen a method that looks something like this?

```
private static ReturnType DoSomething(Parameter1 parameter1, Parameter2 parameter2, Parameter3 parameter3, Parameter4 parameter4) 
```

For the purposes of this example let’s not worry about what the method does, the parameters or the return value. Let’s just assume there is a good reason for all the parameters. The problem is that this is a really long line. The chances are that in order to read all the parameters you will need to scroll across in your editor. And you can guarantee that the parameter you are interested in will be the last one! 


So what can we do? How about splitting some of the parameters onto separate lines? 

```
private static ReturnType DoSomething(Parameter1 parameter1,  
    Parameter2 parameter2, Parameter3 parameter3, Parameter4 parameter4) 
```

This is much better. At least everything is visible without scrolling, but those three parameters all on the same line are still hard to read. The middle one especially can easily be lost between the other two. 

```
private static ReturnType DoSomething(Parameter1 parameter1,  
    Parameter2 parameter2,  
    Parameter3 parameter3,  
    Parameter4 parameter4) 
```

Now the parameters have been split on to their own lines. However, the first parameter does not line up with the other parameters. This might mean that someone completely misses it and doesn't realise it's there. Potentially this is confusing. 

```
private static ReturnType DoSomething( 
    Parameter1 parameter1,  
    Parameter2 parameter2,  
    Parameter3 parameter3,  
    Parameter4 parameter4) 
```

Finally, each parameter is aligned and on its own line. When someone reads this method, they can easily see all the parameters. If necessary, they can easily add or remove a parameter. The important information is easy to find and someone should be able to quickly understand the parameters required for this method. Now all someone needs to do is understand the code inside the method! 

Now some people might look at that example and argue that it’s a lot of fuss about not very much, and taking that code in isolation they might be right. But in a codebase with many hundreds or even thousands of lines of code, applying this kind of thinking at least shows the next person that care and thought has gone into it. It can make the difference between venting frustration about whatever idiot wrote the code and focussing on what the code actually does. 

In short sweating the small stuff makes the next person’s job easier and that person might just be you!

 