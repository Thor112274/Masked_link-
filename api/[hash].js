export default async function handler(req, res) {
  const { hash } = req.query;

  const mongo = process.env.MONGO_URI;

  const { MongoClient } = require("mongodb");
  const client = new MongoClient(mongo);

  await client.connect();

  const db = client.db(process.env.DB_NAME);

  const data = await db.collection("masked_links").findOne({ _id: hash });

  if (!data) {
    res.status(404).send("Invalid link");
    return;
  }

  res.writeHead(302, {
    Location: data.target
  });

  res.end();
  }
