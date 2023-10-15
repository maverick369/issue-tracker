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

## Configuration

Create a `.env` file. Rename the [.env.sample](.env.sample) file to `.env`

## Installation

```bash
# Install all dependencies
$ npm install

# Run PostgreSQL locally with Docker Compose in detached / background mode
$ docker-compose up -d
```

## Running the app

```bash
# development
$ npm run start
dop
# watch mode
$ npm run start:dev
```

Run [http://localhost:3000](http://localhost:3000)
