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


#### Core components
Express JS<br />
Reddis (for session persistence)<br />
Mongo DB (for this PoC only; no doubt the choice of DB will change)<br />
React (for server-side and front end templating)<br />
Jasmine w. Chai (for tests)<br />
Istanbul (for code coverage)<br />

#### Typical dotEnv file
PORT=3000 <br />
SITE_NAME=MyApp <br />
ENCRYPTION_KEY=mtZxVgm4u5pv3M3OoHiWAGDXrzQnE4pR <br />
COOKIE_SECRET=bGF1cmVuLXdlZHMtYWxleDpjb29raWU <br />
SESSION_SECRET=YWxleC13ZWRzLWxhdXJlbjpzZXNzaW9u <br />
SESSION_COOKIE_MAX_AGE=3600000 <br />
MONGO_HOST=localhost <br />
MONGO_PORT=27017 <br />
MONGO_USER=dev_user <br />
MONGO_PASS=devUser01 <br />
MONGO_DATABASE_NAME=dbname <br />
REDIS_HOST=localhost <br />
REDIS_PORT=6379 <br />
