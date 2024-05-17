const { MongoClient, ObjectId } = require('mongodb')


const url = 'mongodb://127.0.0.1:27017'

const client = new MongoClient(url)


function connectDB() {
  client.connect().then(() => {
    console.log('mongodb connected') 
  }).catch((err) => {
    console.error(err)
  })
}

const createUserEmailIndex = async () => {
  const UsersDb = client.db('tmrev').collection('users')
  await UsersDb.createIndex({ email: 1 }, { unique: true })
  console.log('createUserEmailIndex created')
}

const createUserUidIndex = async () => {
  const UsersDb = client.db('tmrev').collection('users')
  await UsersDb.createIndex({ uuid: 1 }, { unique: true })
  console.log('createUserUidIndex created')
}

const createMovieReviewIndex = async () => {
  const MoviesDb = client.db('tmrev').collection('reviews')
  await MoviesDb.createIndex({ userId: 1 })
  console.log('createMovieReviewIndex created')
}

const createTextSearchIndex = async () => {
  const MoviesDb = client.db('tmrev').collection('reviews')
  await MoviesDb.createIndex({ title: 'text', content: 'text' })
  console.log('createTextSearchIndex created')
}

async function createIndexes() {

  await connectDB()

  await createUserEmailIndex()
  await createUserUidIndex()
  await createMovieReviewIndex()
  await createTextSearchIndex()

  await client.close(true)
  console.log('mongodb closed')
   
  process.exit()
}

createIndexes()

