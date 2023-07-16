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

async function initDB() {

  await connectDB()

  

  await client.close(true)
  console.log('mongodb closed')
   
  process.exit()
}

initDB()

