import axios from "axios"
import { getAuth } from "firebase-admin/auth"
import { createIdTokenfromCustomToken } from "./exchangeCustomToken"

type UpdateUser = {
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

const TMREV_BASE_URL = process.env.TMREV_API_BASE_URL

const updateUser = async (data: UpdateUser) => {
  try {
    
    const token = await createIdTokenfromCustomToken(data.uid)

    await getAuth().updateUser(data.uid, {
      email: data.formData.email,
      displayName: `${data.formData.firstName} ${data.formData.lastName}`,
      photoURL: data.formData.photoUrl,
    })


    await axios.put(`${TMREV_BASE_URL}/user`, 
    {
      email: data.formData.email,
      bio: data.formData.bio,
      link: data.formData.link,
      followers: data.formData.followers,
      following: data.formData.following,
      photoUrl: data.formData.photoUrl,
      firstName: data.formData.firstName,
      lastName: data.formData.lastName,
      public: data.formData.public
    }, {
      headers: {
        authorization: token,
      }
    })
  } catch (error) {
    console.error('update user', error)
  } 
}

export default updateUser