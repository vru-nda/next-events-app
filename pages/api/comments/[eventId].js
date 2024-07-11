import {connectToDatabase, getAllDocs, insertDocument} from '@/helpers/db';

async function handler(req, res) {
  const eventId = req.query.eventId;

  let client;

  try {
    client = await connectToDatabase();
  } catch (error) {
    return res.status(500).json({message: 'Failed to connect to the Database'});
  }

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
      client.close();
      return res.status(422).json({message: 'Invalid input'});
    }

    const newComment = {
      email,
      name,
      text,
      eventId,
    };

    let result;

    try {
      result = await insertDocument(client, 'comments', newComment);
      newComment._id = result.insertedId;

      res.status(201).json({message: 'Comment added.', comment: newComment});
    } catch (error) {
      res.status(500).json({message: 'Inserting data failed'});
    }
  } else if (req.method === 'GET') {
    try {
      const results = await getAllDocs(
        client,
        'comments',
        {_id: -1},
        {eventId},
      );
      res.status(200).json({comments: results});
    } catch (error) {
      res.status(500).json({message: 'Failed to fetch the data'});
    }
  }

  client.close();
}

export default handler;
