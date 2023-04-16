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

enter this command in the root directory of the project

```bash
docker compose up -d
```

once completed you should enter this command next

```bash
npm install
```

```bash
node index.js
```

you should see a console log output stating the current progress.

You now should be able to connected to your dockerized instance of mongodb from [MongoDB Compass](https://www.mongodb.com/try/download/compass) using `mongodb://127.0.0.1:27017` as the url.
