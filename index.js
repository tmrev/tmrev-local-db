const { MongoClient } = require('mongodb')

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

  await client.db('tmrev').collection('reviews').insertOne({
    "createdAt": {
      "nanoseconds": 1681224052907,
      "seconds": 1681224052
    },
    "updatedAt": {
      "nanoseconds": 1681224052907,
      "seconds": 1681224052
    },
    "userId": "lX9PQfFHZIcTJh1CV2Emlblf7am2",
    "averagedAdvancedScore": 6.5,
    "user": {
      "$oid": "6237bab13aec6367b3a747a6"
    },
    "notes": "Mankind effing things up again, Godzilla doing his thang.  Interesting take on biollante. ",
    "tmdbID": 18289,
    "reviewedDate": "2023-04-11",
    "advancedScore": {
      "acting": 6,
      "characters": 6,
      "cinematography": 6,
      "climax": 7,
      "ending": 6,
      "music": 6,
      "personalScore": 7,
      "plot": 7,
      "theme": 7,
      "visuals": 7
    },
    "public": true,
    "release_date": "1989-12-16",
    "title": "Godzilla vs. Biollante"
  })
  console.log('complete review')
  await client.db('tmrev').collection('tmdb_movies').insertOne({
    "adult": false,
    "backdrop_path": "/rr7E0NoGKxvbkb89eR1GwfoYjpA.jpg",
    "genre_ids": [
      18,
      53,
      35
    ],
    "id": 550,
    "original_language": "en",
    "original_title": "Fight Club",
    "overview": "A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy. Their concept catches on, with underground \"fight clubs\" forming in every town, until an eccentric gets in the way and ignites an out-of-control spiral toward oblivion.",
    "popularity": 91.391,
    "poster_path": "/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
    "release_date": "1999-10-15",
    "title": "Fight Club",
    "video": false,
    "vote_average": 8.4,
    "vote_count": 25100
  })
  console.log('complete tmdb_movies')
  await client.db('tmrev').collection('users').insertOne({
    "email": "hotrod@gmail.com",
    "uuid": "lX9PQfFHZIcTJh1CV2Emlblf7am2",
    "firstName": "Ted",
    "lastName": "Teddd",
    "following": [],
    "public": true,
    "bio": "blah",
    "location": "",
    "link": null
  })
  console.log('complete users')
  await client.db('tmrev').collection('watched').insertOne({
    "liked": true,
    "posterPath": "/jRkt03dXCVKnbvcQm3ygU1cjg9Y.jpg",
    "title": "Hot Rod",
    "tmdbID": 10074,
    "createdAt": {
      "nanoseconds": 1663991894998,
      "seconds": 1663991894
    },
    "updatedAt": {
      "nanoseconds": 1663991917365,
      "seconds": 1663991917
    },
    "userId": "lX9PQfFHZIcTJh1CV2Emlblf7am2",
    "user": {
      "$oid": "6237bab13aec6367b3a747a6"
    },
  })
  console.log('complete watched')
  await client.db('tmrev').collection('watchlists').insertOne({
    "userId": "lX9PQfFHZIcTJh1CV2Emlblf7am2",
    "title": "Ted's List",
    "description": "A combination of movies that are must watch and good movies that didn't unknown in the mainstream",
    "public": true,
    "movies": [
      98,
      524,
      679,
      11770,
      769,
      329,
      680,
      103,
      9470,
      114980,
      11621,
      128,
      45317,
      27205,
      280,
      339403,
      17473,
      8068,
      273481,
      10315,
      180299,
      130267,
      9316,
      101,
      41471,
      21115,
      11782,
      8461,
      411088,
      15067,
      766,
      315011,
      106,
      254320
    ],
    "created_at": {
      " seconds": 1641440393,
      "nanoseconds": 620000000
    },
    "updated_at": {
      "nanoseconds": 760000000,
      "seconds": 1649439965
    },
    "tags": []
  })
  console.log('complete watchlist')

  await client.close(true)
  console.log('mongodb closed')
   
  process.exit()
}


initDB()

