import { initFirebase } from '@/functions/initFirebase';
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
    const dbUser = client.db('tmrev').collection('users')
    const dbReviews = client.db('tmrev').collection('reviews')
    const _id = new ObjectId(id as string)

    const user = await dbUser.findOne({_id});
    const reviews = await dbReviews.find({user: new ObjectId(_id)}).toArray();

    res.status(200).json({result: {
      user,
      reviews
    }})
    client.close(true)
  }
}
