# gronk-backend
backend server for [gronk](https://github.com/ethrydevelops/gronk)
 
## what is gronk?
basically it's a frontend for your chosen llms. i have a much better and longer explanation on the [main repo](https://github.com/ethrydevelops/gronk). you'll probably also want to download that for this one to be of any use to you.

note that you might get some errors from how openrouter formats their streams (like some json.parse errors). this doesn't really cause any issues on the frontend though.

about 98% of this api is restful, but then i just gave up in the end when implementing some really minor features.

like the frontend, this is [licensed under mit](./LICENSE).

> you'll probably need a [compatible client](https://github.com/ethrydevelops/gronk) too

## setup instructions
### prerequisites

you'll need:
* nodejs
* an SQL database (you can get one for free from [neon](https://neon.com))
* a compatible frontend (if you want to use this to any meaningful capacity)

### instructions

1. clone the backend repo:
```sh
$ git clone https://github.com/ethrydevelops/gronk-backend
```

2. install all the dependencies:
```sh
$ npm i
```

3. **(recommended)** generate an SSL certificate. you can make free ones with a [letsencrypt acme client](https://letsencrypt.org/docs/client-options/). then, you can move the generated certificate + private key into a chosen directory (preferably `./certs/` since it's easiest)

> [!NOTE]
> while you *could* run the backend server on HTTP, it's not recommended as sensitive information will be passed through the server -> client frequently, otherwise making it vulnerable to MITM

4. run `knex init` and configure your database in `./knexfile.js`

5. run `knex migrate:latest` to automatically create the required tables

6. copy `COPY-TO.env` to `.env` and edit the values.

7. start the server:
```sh
$ node .
```

8. yay! your server is now online! you can now connect to it with a compatible client.