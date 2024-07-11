import {connectToDatabase, insertDocument} from '@/helpers/db';

async function handler(req, res) {
  if (req.method === 'POST') {
    const email = req.body.email;

    if (!email || !email.includes('@')) {
      return res.status(422).json({message: 'Invalid email address'});
    }

    let client;

    try {
      client = await connectToDatabase();
    } catch (error) {
      return res
        .status(500)
        .json({message: 'Failed to connect to the Database'});
    }

    try {
      await insertDocument(client, 'newsletter', {email});
      client.close();
    } catch (error) {
      return res.status(500).json({message: 'Inserting data failed'});
    }

    res.status(201).json({message: 'Signed up'});
  }
}

export default handler;
