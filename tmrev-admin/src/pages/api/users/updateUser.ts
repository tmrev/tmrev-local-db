import { MongoClient } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next'
import { createUser } from '../../../functions/createUser'
import updateUser from '@/functions/updateUser';

const uri = process.env.MONGODB_URI || ''

interface Body {
  uid: string
  formData: {
    email: string
    bio: string
    link: string | null
    followers: string[]
    following: string[]
    photoUrl: string | null
    firstName: string
    lastName: string
    public: boolean
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if(req.method === 'POST') {
    try {
      const { uid, formData } = req.body as Body

     await updateUser({uid, formData})
  
      res.status(200)
    } catch (error) {
      console.error(error)
    }

  }
}
