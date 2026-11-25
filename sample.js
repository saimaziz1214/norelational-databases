const { MongoClient } = require("mongodb");

const URI = "mongodb://localhost:27017";
const client = new MongoClient(URI);

async function main() {
  await client.connect();
  const books = client.db("book_db").collection("books");

  // Start fresh on every run.
  await books.deleteMany({});

  // TODO 1 - insertOne with an embedded object
  await books.insertOne({
    title: "Le Petit Prince",
    author: "Antoine de Saint-Exupéry",
    publisher: { name: "Gallimard", country: "France" },
  });

  // TODO 2 - insertOne with an array
  await books.insertOne({
    title: "Dune",
    author: "Frank Herbert",
    tags: ["sci-fi", "classic", "desert"],
  });

  // TODO 3 - insertMany
  await books.insertMany([
    {
      title: "Les Misérables",
      author: "Victor Hugo",
      publisher: { name: "Albert Lacroix", country: "France" },
      tags: ["classic", "historical", "drama"],
    },
    {
      title: "1984",
      author: "George Orwell",
      publisher: { name: "Secker & Warburg", country: "UK" },
    },
    {
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      tags: ["fantasy", "adventure", "dragons"],
    },
    {
      title: "L'Étranger",
      author: "Albert Camus",
      publisher: { name: "Gallimard", country: "France" },
    },
    {
      title: "Clean Code",
      author: "Robert C. Martin",
    },
  ]);

  // TODO 4 - find all documents
  const allBooks = await books.find().toArray();
  console.log("All books:");
  allBooks.forEach((book) => console.log(" -", book.title));

  // TODO 5 - findOne with dot notation
  const firstFrench = await books.findOne({ "publisher.country": "France" });
  console.log("First French book:", firstFrench.title);

  // TODO 6 - find with a filter
  const frenchBooks = await books.find({ "publisher.country": "France" }).toArray();
  console.log(`French books (${frenchBooks.length}):`);
  frenchBooks.forEach((book) => console.log(" -", book.title));

  // TODO 7 - find with $exists
  const taggedBooks = await books.find({ tags: { $exists: true } }).toArray();
  console.log("Books with tags:");
  taggedBooks.forEach((book) => console.log(" -", book.title, book.tags));

  await client.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});