import { faker }  from'@faker-js/faker';
import { initFirebase } from'./initFirebase'
import { getAuth }  from"firebase-admin/auth";
import { createIdTokenfromCustomToken } from'./exchangeCustomToken';
import axios from 'axios';
import { createReview } from './createReview';
require("dotenv").config();

const createTmrevUser = async (numberOfReviews?: number) => {
  const TMREV_BASE_URL = process.env.TMREV_API_BASE_URL

  initFirebase()

  try {
    console.log('making the sausage')
    const email = faker.internet.email()
    const password = faker.internet.password()
    const firstName = faker.name.firstName()
    const lastName = faker.name.lastName()

    const userRecord = await getAuth().createUser({
      email,
      password,
      displayName: `${firstName} ${lastName}`,
      emailVerified: faker.datatype.boolean()
    })

    const token = await createIdTokenfromCustomToken(userRecord.uid)

    const generatePhotoUrl = async () => {
      const response = await axios.get('https://randomuser.me/api/?results=1')
      return response.data.results[0].picture.thumbnail
    }

    const user = {
      email,
      firstName,
      lastName,
      following: [],
      followers: [],
      public: faker.datatype.boolean(),
      bio: faker.lorem.sentence(),
      location: faker.address.city(),
      link: null,
      uuid: userRecord.uid,
      photoUrl: await generatePhotoUrl()
    }

    await axios.post(`${TMREV_BASE_URL}/user`, {...user}, {
      headers: {
        authorization: token,
      }
    })

    if(numberOfReviews) {
      const array = Array.from({length: numberOfReviews}, (_, index) => index);

      const reviewPromise = array.map(() => createReview(user.uuid))

      await Promise.allSettled(reviewPromise)
    }

    return user
  } catch (error) {
    console.error('create user', error)
  }
}

export {createTmrevUser as createUser}