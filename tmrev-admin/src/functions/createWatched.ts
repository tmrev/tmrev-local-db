import { faker } from "@faker-js/faker"
import { getRandomMovie } from "./fetchRandomMovie"
import { initFirebase } from "./initFirebase"
import { createIdTokenfromCustomToken } from "./exchangeCustomToken"

const createWatched = async (userId: string) => {
  try {
    const TMREV_BASE_URL = process.env.TMREV_API_BASE_URL
    initFirebase()

    const movie = await getRandomMovie()

    const watchedMovieBody = {
      liked: faker.datatype.boolean(),
      posterPath: movie.poster_path,
      title: movie.title,
      tmdbID: movie.id,
    }

    const token = await createIdTokenfromCustomToken(userId);

    const response = await fetch(`${TMREV_BASE_URL}/movie/watched`, {
      method: 'POST',
      body: JSON.stringify(watchedMovieBody),
      headers: {
        authorization: token,
        'Content-Type': 'application/json',
      } as any
    })

    const data = await response.json()

    return data

  } catch (error) {
    console.error(error)    
  }
}

export { createWatched }