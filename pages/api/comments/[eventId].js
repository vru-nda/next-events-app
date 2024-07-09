import {connectToDatabase} from '@/helpers/db';

async function handler(req, res) {
  const eventId = req.query.eventId;

  const {client, db} = await connectToDatabase();

  if (req.method === 'POST') {
    const {email, name, text} = req.body;

    if (
      !email ||
      !email.includes('@') ||
      !name ||
      name.trim() === '' ||
      !text ||
      text.trim() === ''
    ) {
      return res.status(422).json({message: 'Invalid input'});
    }

    const newComment = {
      email,
      name,
      text,
      eventId,
    };

    const result = await db.collection('comments').insertOne(newComment);

    newComment.id = result.insertedId;

    res.status(201).json({message: 'Comment added.', comment: newComment});
  } else if (req.method === 'GET') {
    const results = await db
      .collection('comments')
      .find({eventId})
      .sort({_id: -1}) //desc
      .toArray();

    res.status(200).json({comments: results});
  }

  client.close();
}

export default handler;
