import { faker } from '@faker-js/faker';
import { getRandomMovie } from'./fetchRandomMovie';
import { initFirebase } from'./initFirebase'
import { createIdTokenfromCustomToken }from'./exchangeCustomToken';


const createReview = async (uid: string) => {
  try {
    const TMREV_BASE_URL = process.env.TMREV_API_BASE_URL
    initFirebase()

    const randomMovie = await getRandomMovie()

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
      advancedScore: advancedScore,
      notes: faker.lorem.sentences(),
      public: faker.datatype.boolean(),
      tmdbID: randomMovie.id,
      release_date: randomMovie.release_date,
      reviewedDate: faker.date.recent(30).toISOString().split('T')[0],
      title: randomMovie.title,
    };

    const token = await createIdTokenfromCustomToken(uid)

    await fetch(`${TMREV_BASE_URL}/movie/review`, {
      method: 'POST',
      body: JSON.stringify(review),
      headers: {
        authorization: token,
        'Content-Type': 'application/json',
      } as any
    })
  
    return review
  } catch (error) {
    console.error(error)
  }
}

export {createReview}