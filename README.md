# Node React Boilerplate
The all new Node React Boilerplate built with Node 7, Express and Mongo DB with React views.

#### Getting started

1. Clone this repository - `git clone git@github.com:tpkiddle/node-react.git`
2. Run `sudo npm run bootstrap` to install the correct versions of node and npm locally
3. Create a new `.env` config file and store it in `{root}/.env`.

#### Running tests and other build tools
Tests and other tools depend on Node 7.1.0 and Npm 3.10.9. These can be installed on your system via `sudo npm run bootstrap`.

# Running

#### Development
1. Run `npm run build`. This will build the containers and install all dependencies.
2. Run `npm start`. This will build and spin up all containers. By default the site can be viewed at `http://127.0.0.1:3000/`.

Note: when adding new dependencies you should add them to package.json and then re-run `npm run build`.

# Tests and local build tools
You can either run tests locally with npm test.

#### Locally

1. Run `npm install`
2. Run `npm test`. Coverage reports are generated in `./build/coverage/`.
3. To check coverage statistics manually, run `npm cover`.