import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  try {
    const { hash } = req.query;

    const client = new MongoClient(process.env.MONGO_URI);
    await client.connect();

    const db = client.db(process.env.DB_NAME);

    const data = await db.collection("masked_links").findOne({ _id: hash });

    if (!data) {
      res.status(404).send("Invalid link");
      return;
    }

    res.redirect(data.target);
  } catch (err) {
    res.status(500).send("Server Error: " + err.message);
  }
}
