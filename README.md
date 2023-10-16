# Stonly Task - Issue Tracker

Create a simple issue tracker

## Task description

An issue should have a title, description and one of three states: open, pending and closed. Once an
issue is pending it cannot be set back to open, similarly if an issue is closed it cannot be set back to
pending or open.

The minimal requirement is to provide a list view where you can see the issues and change their
state. Use JavaScript (can be transpiled, but don't go crazier than ECMA stage 3). Other than that,
you're in charge. Choose whatever tools you're comfortable with and add whatever features you
think would make sense. Do it as if it was your regular job assignment. Oh, and we really like tests.

It should take you about 3-5 hours.

## Used technologies
- NestJS
- TypeScript
- PostgreSQL
- TypeORM
- Docker

## Installation

1. Rename the [.env.sample](.env.sample) file to `.env`

2. Install all dependencies:
```bash
$ npm install
```

3. Run PostgreSQL locally with Docker Compose in detached / background mode:
```bash
$ docker-compose up -d app-db
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```

Run [http://localhost:3000/docs](http://localhost:3000/docs) in your web browser.

## Testing

The application has been deployed on a test site. You can find it at: [https://issues.maverick.usermd.net/docs/](https://issues.maverick.usermd.net/docs/)

### Open API

Open API (Swagger) documentation:
[https://issues.maverick.usermd.net/docs/](https://issues.maverick.usermd.net/docs/)

or locally:
[http://localhost:3000/docs/](https://localhost:3000/docs/)

### CURL examples

Examples of requests are also available in: `/test/http/`

#### Create an issue:
```bash
$ curl --request POST \
  --url http://localhost:3000/issues \
  --header 'Content-Type: application/json' \
  --data '{
	"title": "Test Issue",
	"description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
	"state": 1
}'
```

#### Get all issues:

```bash
# default limit (also max): 100 items
$ curl --request GET \
  --url http://localhost:3000/issues
```


```bash
# with offset and limit query parameters:
$ curl --request GET \
  --url 'http://localhost:3000/issues?offset=50&limit=100'
```


#### Get an issue:
```bash
$ curl --request GET \
  --url http://localhost:3000/issues/1
```

#### Update an issue:
```bash
$ curl --request PATCH \
  --url http://localhost:3000/issues/1 \
  --header 'Content-Type: application/json' \
  --data '{
	"title": "Test Issue",
	"description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
	"state": 2
}'
```

#### Update the state of an issue:
```bash
$ curl --request PATCH \
  --url http://localhost:3000/issues/1 \
  --header 'Content-Type: application/json' \
  --data '{
	"state": 3
}'
```

#### Remove an issue:
```bash
$ curl --request DELETE \
--url http://localhost:3000/issues/1
```

### Unit tests and e2e tests

Run unit tests:
```bash
$ npm run test
```

Run e2e tests:
```bash
$ npm run test:e2e
```
