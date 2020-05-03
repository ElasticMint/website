# Coding Style and Who Cares Anyway?

Have you ever had the argument about curly braces? Do you put one at the end of the line or the beginning of the next line? Or how about comments? Should you have a space after the '//'? Should you even have comments in the first place?

This is the kind of argument that has wasted hours and hours of developer time. It doesn't require much imagination to guess what "non-developers", also known as "normal people", think of this kind of stuff. What kind of oddball gets worked up over the positioning of a curly brace? When almost every week we hear a story about hackers stealing data from a website or a bank's disastrous software upgrade, surely we should be focussing on fixing bugs rather than the minutiae of white space in code.

So why do we bother with this stuff? It obviously matters to some people. You may have heard of Kevlin Henney. If you look him up on YouTube, you would be forgiven for thinking that all he does is talk at conferences about code style. His argument essentially boils down to the idea that one day someone else is going to have to read your code, and the more you can do to help that person the easier it will be for them.

# How Would Coding Style Have Saved TSB?

In April 2018 TSB bank launch a massive upgrade to their banking system. Almost immediately they began to experience problems. Customers were unable to withdraw cash. Companies couldn't pay staff. Despite their best efforts, customers who wished to remortgage couldn't do so until August 2018. How did TSB get it so wrong? It's easy to say that the new system wasn't tested properly or that the upgrade was rushed through, and undoubtedly this is all true. But this takes away responsibility from the individuals who actually wrote the code. According to [Wired magazine](https://www.wired.co.uk/article/tsb-crisis-it-issues-online-banking-problems-ibm-paul-pester-compensation), over 1000 IT professionals were involved in the project. That is a lot of people. In the same article, TSB's banking system is described as "particularly sclerotic" because it contained the "scar tissue of multiple prior mergers". Thousands and thousands of people have worked on the code powering TSB. Some of them will have been very experienced, while others would have been relative newbies. Code is written in a language which looks a lot like English. There will have been spelling mistakes in method names, and poor choices of names for variables. Some of the comments will have been confusing or even totally incorrect. 

When we write code, it's meaning seems obvious to us. But the longer lived that code is, the more people are going to have to look at it and understand our intent. That abbreviation we use in a variable name, may not make sense to someone else who has to make a change in 5 years' time.