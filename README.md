# velocity-exchange
## First-time set-up
### 1. Package installation

```sh
cd server
npm ci
cd ..
cd client
npm ci
```

### 2. Config
#### 2.1. Client
- Clone the `/client/.env.template` file into `/client/.env`
- Fill in empty fields (if any)

#### 2.2. Server
1. Clone the `/server/.env.example` file into `/server/.env` and fill in empty fields
- Fill in empty fields

2. Clone the `/server/src/config/database_config_template.js` file into `/server/src/config/database.js` and fill in MySQL connection information
3. Open MySQL, execute `/server/database/release/backup.sql` and `/server/database/release/fakedata.sql` to create local database
## Boot the application
Run MySQL server

### The Back-end

```sh
cd server
npm start
```

### The front-end

```sh
cd client
npm run dev
```

## Technologies

This project is built with:

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Vite](https://vitejs.dev/)
- [React](https://react.dev/)
