# Getting Started
This is a docker-compose file to setup a local mongodb instance.

### Recommend  
 - Its very recommended to have [MongoDB Compass](https://www.mongodb.com/try/download/compass) installed its a great tool provided by the MongoDB team

### Must haves
 - Docker and Docker-Compose installed follow this guide
   - [Linux](https://docs.docker.com/desktop/install/linux-install/)
   - [Mac](https://docs.docker.com/desktop/install/mac-install/)
   - [Windows](https://docs.docker.com/desktop/install/windows-install/)

## Lets get Started
 - copy the same `cred.json` file that was used for [tmrev-api](https://github.com/tmrev/tmrev-api)
 - now setting up the `.env.local` file.
   - the file should be create in the root of the tmrev-admin folder
   - [tmdb api key](https://developer.themoviedb.org/docs)
   - firebase api key you can find that here https://console.developers.google.com/apis/credentials?project=[PROJECT_ID] using your firebase project id

Your file should look:

ENV FILE
```
TMDB_API_KEY="***"
TMDB_BASE_URL="https://api.themoviedb.org/3/"

TMREV_API_BASE_URL="http://localhost:8080"

# Found here
# https://console.developers.google.com/apis/credentials?project=[PROJECT_ID]
FIREBASE_API_KEY="***"
```   

enter this command in the root directory of the project

```bash
docker-compose up -d
```

```bash
cd tmrev-admin

yarn dev
```



You now should be able to connected to your dockerized instance of mongodb from [MongoDB Compass](https://www.mongodb.com/try/download/compass) using `mongodb://127.0.0.1:27017` as the url.