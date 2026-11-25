const { MongoClient } = require("mongodb");

const URI = process.env.MONGODB_URI || "mongodb://localhost:27017";
const client = new MongoClient(URI);

async function main() {
  await client.connect();
  const users = client.db("blog_db").collection("users");

  await users.deleteMany({});

  // TODO 1: user with an embedded address object
  await users.insertOne({
    name: "Saim Chaudhary",
    address: { city: "Paris", country: "France" },
  });

  // TODO 2: user with a skills array (3+ items)
  await users.insertOne({
    name: "Alice Martin",
    skills: ["JavaScript", "MongoDB", "Node.js"],
  });

  // TODO 3: insertMany with at least 5 users
  await users.insertMany([
    {
      name: "Lucas Bernard",
      address: { city: "Lyon", country: "France" },
      skills: ["Python", "SQL"],
    },
    {
      name: "Emma Dubois",
      address: { city: "Marseille", country: "France" },
    },
    {
      name: "John Smith",
      address: { city: "London", country: "UK" },
      skills: ["Java", "Spring", "Docker"],
    },
    {
      name: "Sara Rossi",
      address: { city: "Rome", country: "Italy" },
    },
    {
      name: "Omar Khan",
      skills: ["C++", "Linux"],
    },
  ]);

  // TODO 4: retrieve all documents and log each name
  const allUsers = await users.find().toArray();
  console.log("All users:");
  allUsers.forEach((user) => console.log(" -", user.name));

  // TODO 5: dot notation - user whose address.city is "Paris"
  const parisUser = await users.findOne({ "address.city": "Paris" });
  console.log("User in Paris:", parisUser);

  // TODO 6: all users whose address.country is "France"
  const frenchUsers = await users.find({ "address.country": "France" }).toArray();
  console.log("Users from France:");
  frenchUsers.forEach((user) => console.log(" -", user.name));

  // TODO 7: all users who have a skills field
  const skilledUsers = await users.find({ skills: { $exists: true } }).toArray();
  console.log("Users with skills:");
  skilledUsers.forEach((user) => console.log(" -", user.name));

  await client.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});