import { MongoClient } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next'

const uri = process.env.MONGODB_URI || ''

const client: MongoClient = new MongoClient(uri);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await client.connect();

  if(req.method === 'GET') {
    // return all users from db
    const db = client.db('tmrev').collection('users')

    const users = await db.find({}).toArray();

    res.status(200).json(users)
    client.close(true)
  }
}
