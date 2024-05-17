import { MongoClient } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next'
import { createUser } from '../../../functions/createUser'
import { initFirebase } from '@/functions/initFirebase';
import { faker } from '@faker-js/faker';
import { getAuth } from 'firebase-admin/auth';
import { createReview } from '@/functions/createReview';

const uri = process.env.MONGODB_URI || ''

interface Body {
  uid: string
  movieId: number
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if(req.method === 'POST') {
    try {
      const { uid, movieId } = req.body as Body

      const reviews = createReview(uid, Number(movieId))
  
      res.status(200).json(reviews)
    } catch (error) {
      console.error(error)
    }

  }
}
