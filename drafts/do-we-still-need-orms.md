# Do We Still Need ORMs?

Do you remember the first time you used an ORM (Object Relational Mapper)? For me it was something I wrote to make it easier to map data related to testing electronic devices into a SQL database. Different devices generated different test data, and so I used a convention to map the property names on the classes to the SQL tables and columns. At the time I didn't even know what an ORM was. I was just trying to avoid writing repetitive code.

Some time later I met NHibernate. Once I got past the horrible xml configuration for the mapping I really liked that I could work with objects in code and not really think about the database. Certainly, I didn't miss writing code to use ADO .Net like that below.

```
using (var conn = new SqlConnection(connectionString))
{
    var command = new SqlCommand("UPDATE mytable SET ...", conn) {CommandType = CommandType.Text};
    conn.Open();
    command.ExecuteNonQuery();
}
```

Almost as soon as I started using NHibernate I started having problems. The issue was related to the lifetime of the `ISession` and `ISessionFactory`. Somehow my colleagues and I misunderstood that sessions were not meant to be long-lived. The other problem was lazy loading. So, although the code to access the database became quite easy, it didn't perform very well. 

However, I still liked the idea that I could create domain objects with functionality on them and that storing them in a SQL database was relatively simple. The database became just a service, and we managed to keep business logic inside the application rather than it sometimes finding its way into stored procedures.

Over time other ORMs became popular. Entity Framework took over from NHibernate, and if you wanted something closer to my original use case there was always Dapper.

# Why Would you Use an ORM?

For me the benefits of an ORM have always been related to making it easier to access the database:

* No need to write repetitive boiler-plate data access code
* Business logic can be placed on domain objects which can be easily stored in and retrieved from a database
* Object tree can be retrieved all at once, or with lazy loading
* Can use LINQ to access data
* Database tables/columns can be automatically generated
* Easy to use for non-database experts
* Protection from SQL injection

These benefits though come with a cost.

The first cost is obviously performance. Any library that is generating SQL is obviously doing extra work and will have an effect on performance. The SQL generated is almost certainly nothing like SQL you would write yourself. This doesn't mean it's bad, but it highlights that using an ORM means that you are delegating responsibility for the SQL used to interact with the database to a tool. You need to trust that it generates efficient, performant SQL, and you accept that you can't change it if you're not happy.

Secondly, in order to gain the most benefit from an ORM, you need to understand how things like lazy-loading work. One of the most common problems is the N + 1 issue. This is when a parent object has been loaded into memory which contains a collection of child object e.g. an order with order lines. If you iterate across the collection, then each one is loaded in turn from the database, leading to the cost of opening and closing a database connection and running a SQL query for each record. The larger the collection is, the bigger the effect this will have. 

To solve this you can eagerly load the collection, but this can also be inefficient. Internally the ORM will generate a SQL JOIN and the rows returned from the database will each contain all the data from the parent record. So not only is more data transferred, but the ORM also has to sort out the duplicate data and split it into the appropriate objects. Eagerly load several child collections and you can see how this quickly becomes a complex, time-consuming operation.

Of course, there are strategies you can employ to get the best out of an ORM, but the question has to be asked, at what point do the trade-offs stop being worthwhile?

# When to Use an ORM

A lot has changed since I first used NHibernate. Increasingly, I come across the opinion that it's just not worth using an ORM. Perhaps a lot of that is related to the changes we've seen. Rather than monoliths, we tend to see enterprise applications split into smaller services. While we still often have a relational database as the source of truth, we very often copy data into other data stores, e.g. MongoDB, Elasticsearch, DynamoDB, depending on how we wish to use that data.

I can still see a use for ORMs, but I would suggest it is not dissimilar to VB6 which many developers had a love-hate relationship with. VB6 was designed to enable rapid development of relatively simple applications. And it did a great job at that. The downside was that if you took it too far beyond that use-case you would hit issues e.g. the maximum number of controls on a form. 

For small, simple applications where performance is not crucial, I think an ORM can be fantastic. A modern ORM like EF.Core allows you to rapidly develop your database functionality enabling you to focus more on your business logic. For many small line-of-business applications I have worked on, an ORM has met all their needs.

When developing enterprise-level applications, such as those behind successful online retailers like ASOS or Just Eat, performance becomes a lot more important. These applications have to handle many thousands of requests every second and almost certainly will be served much better by hand-crafted SQL, probably in stored procedures. The way in which data is stored and retrieved will tend to be optimised to avoid performance bottlenecks and may involve the use of other technologies which render the question of ORMS moot.