import {connectToDatabase} from '@/helpers/db';

async function handler(req, res) {
  if (req.method === 'POST') {
    const email = req.body.email;

    if (!email || !email.includes('@')) {
      return res.status(422).json({message: 'Invalid email address'});
    }

    const {client, db} = await connectToDatabase();

    await db.collection('newsletter').insertOne({
      email,
    });

    client.close();

    res.status(201).json({message: 'Signed up'});
  }
}

export default handler;
