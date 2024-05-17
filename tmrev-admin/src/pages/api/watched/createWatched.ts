import { createWatched } from "@/functions/createWatched"
import { NextApiRequest, NextApiResponse } from "next/types"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if(req.method === 'POST') {
    try {
      const { uuid } = req.body as {uuid: string}

      const users = await createWatched(uuid)
  
      res.status(200).json(users)
    } catch (error) {
      console.error(error)
    }

  }
}