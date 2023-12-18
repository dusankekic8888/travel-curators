## Note

The database for the project is used in a docker container, so you will need tools to work with the docker

## Install dependencies

```bash
$ cd to project folder

$ yarn install
```

## Start Postgres DB on docker container

```bash
$ docker-compose up -d
```

## Run migration for DB

```bash
$ yarn migrate:dev
```

## (Optional) Add seed data

```bash
$ yarn seed:dev
```

## Running the app

```bashs
# development
$ yarn start:dev

# prod mode
$ yarn run start:prod

```

## API document

localhost:3333/swagger