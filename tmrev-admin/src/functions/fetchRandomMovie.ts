require("dotenv").config();


const BASE_URL = process.env.TMDB_BASE_URL
const API_KEY = process.env.TMDB_API_KEY

async function getRandomMovie() {
  try {
    // Generate a random page number
    // Max page number is 500
    const randomPage = Math.floor(Math.random() * 500) + 1;

    // fetch random discover page
    const pageUrl = `${BASE_URL}/discover/movie?api_key=${API_KEY}&page=${randomPage}`
    const pageResponse = await fetch(pageUrl)
    const pageData = await pageResponse.json()
    const movies = pageData.results

    // Select a random movie from the result
    const randomIndex = Math.floor(Math.random() * movies.length);
    const randomMovie = movies[randomIndex];


    // return random movie
    return randomMovie
  } catch (error) {
    console.error(error);
  }
}

export { getRandomMovie }