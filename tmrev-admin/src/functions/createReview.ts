import { fa, faker } from '@faker-js/faker';
import { getRandomMovie } from'./fetchRandomMovie';
import { initFirebase } from'./initFirebase'
import { createIdTokenfromCustomToken }from'./exchangeCustomToken';

type Genre = {
  id: number;
  name: string;
};

type MovieDetails = {
  backdrop_path: string;
  budget: number;
  genres: Genre[];
  id: number;
  imdb_id: string;
  original_language: string;
  poster_path: string;
  release_date: string;
  revenue: number;
  runtime: number;
  title: string;
};

const createReview = async (uid: string, movieId?: number) => {
  try {
    const TMREV_BASE_URL = process.env.TMREV_API_BASE_URL
    initFirebase()

    const movie = await getRandomMovie(movieId)

    const advancedScore = {
      acting: faker.datatype.number({ min: 1, max: 10 }),
      characters: faker.datatype.number({ min: 1, max: 10 }),
      cinematography: faker.datatype.number({ min: 1, max: 10 }),
      climax: faker.datatype.number({ min: 1, max: 10 }),
      ending: faker.datatype.number({ min: 1, max: 10 }),
      music: faker.datatype.number({ min: 1, max: 10 }),
      personalScore: faker.datatype.number({ min: 1, max: 10 }),
      plot: faker.datatype.number({ min: 1, max: 10 }),
      theme: faker.datatype.number({ min: 1, max: 10 }),
      visuals: faker.datatype.number({ min: 1, max: 10 })
    }

    // const movieDetails: MovieDetails = {
    //   backdrop_path: movie.backdrop_path || null,
    //   budget: movie.budget || null,
    //   genres: movie.genres || [],
    //   id: movie.id,
    //   imdb_id: movie.imdb_id || null,
    //   original_language: movie.original_language || null,
    //   poster_path: movie.poster_path || null,
    //   release_date: movie.release_date || null,
    //   revenue: movie.revenue || null,
    //   runtime: movie.runtime || null,
    //   title: movie.title || null
    // }
  
    const review = {
      tmdbID: movie.id,
      advancedScore,
      notes: faker.lorem.sentences(),
      public: faker.datatype.boolean(),
      reviewedDate: faker.date.recent(30).toISOString().split('T')[0],
      title: faker.lorem.words({min: 1, max: 5}),
    }

    const token = await createIdTokenfromCustomToken(uid)

   const response = await fetch(`${TMREV_BASE_URL}/movie/review`, {
      method: 'POST',
      body: JSON.stringify(review),
      headers: {
        authorization: token,
        'Content-Type': 'application/json',
      } as any
    })

    const data = await response.json()

    console.log(data)

    return review

  } catch (error) {
    console.error(error)
  }
}

export {createReview}