import { MongoClient, ObjectId } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next'

const uri = process.env.MONGODB_URI || ''

const client: MongoClient = new MongoClient(uri);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await client.connect();
  const { id } = req.query
  if(req.method === 'GET') {
    // return all users from db
    const db = client.db('tmrev').collection('reviews')

    const review = await db.findOne({_id: new ObjectId(id as string)})

    res.status(200).json(review)
    client.close(true)
  }
}
