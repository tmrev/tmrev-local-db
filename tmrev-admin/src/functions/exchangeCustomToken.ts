import {getAuth} from "firebase-admin/auth"
import axios from 'axios';

const createIdTokenfromCustomToken = async (uid: string) => {
  try {
    const customToken = await getAuth().createCustomToken(uid);

    const res = await axios.post(
      `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyCustomToken?key=${process.env.FIREBASE_API_KEY}`,
      {
        token: customToken,
        returnSecureToken: true
      }
    );

    return res.data.idToken as string;

  } catch (e) {
    console.error('token exchange',e);
  }
}

export {createIdTokenfromCustomToken}