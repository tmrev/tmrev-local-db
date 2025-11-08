import { faker } from '@faker-js/faker';
import { getRandomMovie } from'./fetchRandomMovie';
import { initFirebase } from'./initFirebase'
import { createIdTokenfromCustomToken }from'./exchangeCustomToken';

type Genre = {
  id: number;
  name: string;
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

      const review = {
      tmdbID: movie.id,
      advancedScore,
      notes: faker.lorem.sentences(),
      public: faker.datatype.boolean(),
      reviewedDate: faker.date.recent(30).toISOString().split('T')[0],
      title: faker.lorem.words({min: 1, max: 5}),
    }

    const token = await createIdTokenfromCustomToken(uid)

   const response = await fetch(`${TMREV_BASE_URL}/review`, {
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