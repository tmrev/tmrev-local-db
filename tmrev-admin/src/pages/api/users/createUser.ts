import { MongoClient } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next'
import { createUser } from '../../../functions/createUser'
import { initFirebase } from '@/functions/initFirebase';
import { faker } from '@faker-js/faker';
import { getAuth } from 'firebase-admin/auth';

const uri = process.env.MONGODB_URI || ''

interface Body {
  numberOfReviews: number
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if(req.method === 'POST') {
    try {
      const { numberOfReviews } = req.body as Body

      const users = await createUser(numberOfReviews)
  
      res.status(200).json(users)
    } catch (error) {
      console.error(error)
    }

  }
}
