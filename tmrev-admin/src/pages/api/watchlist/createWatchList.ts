import { createIdTokenfromCustomToken } from "@/functions/exchangeCustomToken"
import { getRandomMovie } from "@/functions/fetchRandomMovie"
import { initFirebase } from "@/functions/initFirebase"
import { faker } from "@faker-js/faker"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if(req.method === 'POST') {
    try {
      initFirebase()

      const { uuid, numberOfMovies } = req.body

      console.log(uuid, numberOfMovies)

      const token = await createIdTokenfromCustomToken(String(uuid));

      const TMREV_BASE_URL = process.env.TMREV_API_BASE_URL


      // get 10 random movies
      const movies = []
      for (let i = 0; i < numberOfMovies; i++) {
        console.log('getting movie')
        const movie = await getRandomMovie()
        movies.push(movie)
      }

      const watchList = {
        title: faker.word.words({count: {min: 1, max: 4}}),
        description: faker.lorem.sentences(),
        public: faker.datatype.boolean(),
        tags: faker.word.adjective(5).split(' '),
        movies: movies.map((movie, i) => ({order: i, tmdbID: movie.id}))
      }

      console.log(watchList)

      const response = await fetch(`${TMREV_BASE_URL}/watch-list`, {
        method: 'POST',
        body: JSON.stringify(watchList),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        } as any
      })

      const data = await response.json()
      res.status(200).json(data)
    } catch (error) {
      console.error(error)
    }

  }
}