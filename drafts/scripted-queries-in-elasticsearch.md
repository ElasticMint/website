# Scripted Queries in Elasticsearch

Having recently used Elasticsearch while working on a project recently, I wanted to reflect on my experience on what I learnt. For seasoned users of Elasticsearch I'm sure none of this will come as news, but I'm hoping that someone else may benefit from my experience.

### Lesson 1 - Use the right tool

At first glance Elasticsearch seems very similar to other NOSQL data stores like MongoDB, or DynamoDB. It stores data as JSON documents and can hold large amounts of data. It's strength though is in searching and filtering that data. If all you are doing is finding documents according to their id, perhaps you would be better off using another data store optimised for storage. Alternatively if you need to search and filter on a number of fields, it might make sense to store that data in Elasticsearch and store other data somewhere else.

The reasoning for this is how Elasticsearch stores and indexes data. Elasticsearch is a distributed text search engine backed by Lucene. All data held within it will be indexed to optimise for searching. This obviously takes time and leads to Elasticsearch being slow when it comes to adding new data compared to many NOSQL databases. While it's certainly possible to use Elasticsearch as a primary data store, it feels like a waste of resources.

### Lesson 2 - Structure your data according to how you are going to use it

Imagine storing book reviews. Two obvious ways of structuring the data stand out to me.

1 - A single book index with each book document containing a collection of reviews e.g.
```
{
  "isbn": "1408855895",
  "name": "Harry Potter and the Philosopher's Stone",
  "author": "J.K. Rowling",
  "reviews": [
    {
      "date": "2015-05-25",
      "rating": 5,
      "comments": "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
    },
    {
      "date": "2016-04-13",
      "rating": 4,
      "comments": "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
    }
  ]
}
```

2 - Separate book and review indexes e.g.

```
{
  "isbn": "1408855895",
  "name": "Harry Potter and the Philosopher's Stone",
  "author": "J.K. Rowling"
}

{    
  "isbn": "1408855895",
  "date": "2015-05-25",
  "rating": 5,
  "comments": "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
}

{    
  "isbn": "1408855895",
  "date": "2016-04-13",
  "rating": 4,
  "comments": "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
}
```