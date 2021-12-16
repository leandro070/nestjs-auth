Repository which contains a NestJS server.

# Start dockerized

You can start up the project using Docker. This will start up a MySQL instance, a Redis instance and finally a build of the project.
Inside the folder /db/config/db-dump/ there is a dump of the DB with what is necessary for run project.
Just run:

```bash
docker-compose up -d
```

# Development

### Installation

```bash
$ npm install
```

### Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
