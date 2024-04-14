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

### 2. Enviroment variables
- Clone the `/client/.env.template` file into `/client/.env`
- Fill in empty fields (if any)

### 3. Boot the application

#### The Back-end

```sh
cd backend
npm start
```

#### The front-end

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
