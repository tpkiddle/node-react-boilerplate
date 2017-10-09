# Node React Boilerplate
A Node React Boilerplate built with Node 7, Express and MongoDB with server side React views.

#### Getting started
1. Clone this repository - `git clone https://github.com/tpkiddle/node-react-boilerplate.git`
2. Run `sudo npm run bootstrap` to install the correct versions of node and npm locally or just `npm install` to install packages
3. Create a new `.env` config file and store it in `{root}/.env`
4. Start the app with `npm start` or `node bin/www`. By default the site can be viewed at `http://127.0.0.1:3000/`

#### Running tests
1. Run `npm test`.

#### Checking code coverage
3. To check coverage statistics manually, run `npm cover`. Coverage reports are generated in `./build/coverage/`.

#### Typical dotEnv file
PORT=3000
SITE_NAME=MyApp
ENCRYPTION_KEY=mtZxVgm4u5pv3M3OoHiWAGDXrzQnE4pR
COOKIE_SECRET=bGF1cmVuLXdlZHMtYWxleDpjb29raWU
SESSION_SECRET=YWxleC13ZWRzLWxhdXJlbjpzZXNzaW9u
SESSION_COOKIE_MAX_AGE=3600000
MONGO_HOST=localhost
MONGO_PORT=27017
MONGO_USER=dev_user
MONGO_PASS=devUser01
MONGO_DATABASE_NAME=dbname
REDIS_HOST=localhost
REDIS_PORT=6379
