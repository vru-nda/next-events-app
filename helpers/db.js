import {MongoClient} from 'mongodb';

export async function connectToDatabase() {
  const client = await MongoClient.connect(process.env.MONGO_URI);

  return client;
}

export async function insertDocument(client, collection, document) {
  const db = client.db();

  return await db.collection(collection).insertOne(document);
}

export async function getAllDocs(client, collection, sort, filter = {}) {
  const db = client.db();
  const results = await db
    .collection(collection)
    .find(filter)
    .sort(sort)
    .toArray();
  return results;
}
