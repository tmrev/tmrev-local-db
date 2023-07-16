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
  if(req.method === 'DELETE') {
    initFirebase()

    // return all users from db
    const db = client.db('tmrev').collection('reviews')
    const _id = new ObjectId(id as string)

    const review = await db.findOne({_id})

    if(review){
      await db.deleteOne({_id})
    }

    res.status(200).json({success: review})
    client.close(true)
  }
}
