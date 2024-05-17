import type { NextApiRequest, NextApiResponse } from 'next'
import { initFirebase } from '@/functions/initFirebase';
import { createIdTokenfromCustomToken } from '@/functions/exchangeCustomToken';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if(req.method === 'GET') {
    try {
      initFirebase()

      const { uid } = req.query as { uid: string }

      const token = await createIdTokenfromCustomToken(uid)
  
      res.status(200).json({token})
    } catch (error) {
      console.error(error)
    }

  }
}
