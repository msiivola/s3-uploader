# S3 upload testing

## Project setup

Install dependencies:

    npm install


## Start application locally

First set up environment variables (for local use only) by renaming **.env.example** to **.env**, then in that file filling in the values for the variables. This file would not be used in or passed on to production. Note that the app itself has no awareness of where its environment variables are coming from. It just gets them.

Start the server locally, reading in the server configuration from the .env file:

    npm run start_local

Run Vue app on port 8080:

    npm run serve

Follow the instructions after the above command for what address to open in the browser.

## Compiles and minifies Vue code for production
```
npm run build
```

## Lints and fixes files
```
npm run lint
```

## Start application in a Docker container

TODO.

## Customize Vue configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
