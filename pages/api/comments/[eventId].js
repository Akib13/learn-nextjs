import { MongoClient } from 'mongodb';

async function handler(req, res) {
  const eventId = req.query.eventId;

  const client = await MongoClient.connect(
    "mongodb+srv://Akib13:Akib13@cluster0.zwtrljo.mongodb.net/?retryWrites=true&w=majority"
  );

  if (req.method === "POST") {
    // add server validation
    const { email, name, text } = req.body;

    if (
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !text ||
      text.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid input." });
      return;
    }

    // const newComment = {
    //   id: new Date().toISOString(),
    //   email,
    //   name,
    //   text,
    // };

    //console.log(newComment);

    const newComment = {
      email,
      name,
      text,
      eventId
    };

    const db = client.db('events');
    const result = await db.collection('comments').insertOne(newComment);
    console.log(result);

    newComment.id = result.insertedId;

    res.status(201).json({ message: "Added Comment", comment: newComment });
  }

  if (req.method === "GET") {
    const dummyList = [
      { id: "c1", name: "Max", text: "First comment" },
      { id: "c2", name: "Manuel", text: "Second comment" },
    ];
    res.status(200).json({ comments: dummyList });
  }
  client.close();
}

export default handler;
