import { createIdTokenfromCustomToken } from '@/functions/exchangeCustomToken';
import { initFirebase } from '@/functions/initFirebase';
import axios from 'axios';
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
    initFirebase()

    // return all users from db
    const dbUser = client.db('tmrev').collection('users')
    const _id = new ObjectId(id as string)

    const user = await dbUser.findOne({_id});
    const token = await createIdTokenfromCustomToken(user?.uuid)
    const reviews = await axios.get(`${process.env.TMREV_API_BASE_URL}/review/user/${user?.uuid}?pageSize=1000`, {
      headers: {
        'Authorization': token
      }
    })

    res.status(200).json({result: {
      user,
      reviews: reviews.data?.results || []
    }})
    client.close(true)
  }
}
