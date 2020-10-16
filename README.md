# Macro Tracker

This is a personal project which I've decided to undertake in lieu of the three final challenges for freeCodeCamp's [Quality Assurance Projects](https://www.freecodecamp.org/learn/quality-assurance/quality-assurance-projects/issue-tracker) certification. 

I would ideally like to complete the modules as presented, however their quality is really poor and I can't quite bring myself to walk through them just for the sake of getting the tick of approval. Instead, I've decided to build something using the same concepts and tools they are intended to teach, but it'll be something I'm actually likely to use and I'll push things further to build a more full-featured solution. 

I _will_ submit this project as to freeCodeCamp in order to receive the qualification, which at the time of writing can be done by supplying literally any URL at all—not exactly rigorous.

## Services & Architecture

The project depends on a remotely-visible instance of the app to be served to submit the assessment, and something like [REPL.it](https://repl.it/) does a good job of that. You'll also need a publicly accessible Mongo database (hosted somewhere like [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)) to store data/state for the API. The front-end will be a React SPA and data will come from an Express/MongoDB api expecting and serving JSON at `/api`.

A key focus of the freeCodeCamp module is testing, so thorough unit and integration tests will be written along the way.

As with the challenge [preceding this one](https://github.com/dvbsknd/FCC-issue-tracker) I'll try and work towards an MVC-ish architecture, with controllers being Express- and MongoDB-agnostic. Unlike with that challenge, I'll be using `Promises` rather than callbacks wherever possible. In future challenges I'll move to `async/await`.

## Local Development

You'll need an `.env` file with:

1. `PORT`
1. `MONGO_URI`

The rest is pretty straightforward, with `npm` for package management and `nodemon` for development server. Use `npm run dev` for starting up the local server.

## Dependencies

Notable packages and concepts include:

1. [Express](https://www.npmjs.com/package/express)
1. [Helmet](https://www.npmjs.com/package/helmet) and [CORS](https://www.npmjs.com/package/cors) for setting appropriate headers
1. [MongoDB](https://www.npmjs.com/package/mongodb)
1. [Mocha](https://www.npmjs.com/package/mocha) to run tests
1. [Chai](https://www.npmjs.com/package/chai) with [HTTP](https://www.npmjs.com/package/chai-http) to assert
1. [Nodemon](https://www.npmjs.com/package/nodemon) for running a local dev server with hot-reloading
1. [ESLint](https://www.npmjs.com/package/eslint) for code-checking
1. [React](https://reactjs.org/), of course

## Goals/Todo

Development steps are documented here for tracking and articulating progress:

### Done

1. Initialise the repo and add some basic framework

### Todo

1. Try setting up a [Webpack dev server](https://github.com/webpack/webpack-dev-server)
1. Set up a [React app from scratch](https://blog.usejournal.com/creating-a-react-app-from-scratch-f3c693b84658) for the front-end and get rid of Bootstrap
1. Probably create something like a `/client/src/components` folder structure with builds going to `/public/js`, perhaps
1. Stup out an API get endpoint to give data to the SPA