# velocity-exchange
## First-time set-up
### Installation

- Run [`install.sh`](https://github.com/anhbanlinhle/velocity-exchange/blob/main/install.sh)

### Configuration
#### Client
- Clone [`.env.template`](https://github.com/anhbanlinhle/velocity-exchange/blob/main/client/.env.template) into `/client/.env`
- Fill the empty fields (if any)

#### Server
- Clone [`.env.example`](https://github.com/anhbanlinhle/velocity-exchange/blob/main/server/.env.example) into `/server/.env`
- Fill the empty fields (if any)

#### Database
- Open MySQL
- Execute [`backup.sql`](https://github.com/anhbanlinhle/velocity-exchange/blob/main/server/database/release/backup.sql)
## Boot the application
Run MySQL Server

### Backend module

```sh
cd server
npm start
```

### Frontend module

```sh
cd client
npm run dev
```

## Technologies

This project was built with:

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Vite](https://vitejs.dev/)
- [React](https://react.dev/)
