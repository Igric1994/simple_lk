const express = require("express");
const app = express();
const mongoose = require("mongoose");
const session = require('express-session');
const userRouter = require("./routes/userRouter.js");
const authRouter = require("./routes/authRouter.js");
require('dotenv').config();
// const redis = require('redis');
// const RedisStore = require('connect-redis').default;

// // Создаем клиент с правильными параметрами
// const redisClient = redis.createClient({
//   socket: {
//     host: process.env.REDIS_HOST || 'redis',
//     port: 6379,
//     reconnectStrategy: (retries) => {
//       if (retries > 10) {
//         console.log("Too many retries, exiting...");
//         return new Error("Could not connect to Redis");
//       }
//       return Math.min(retries * 100, 5000);
//     }
//   }
// });

// // Обработчики событий
// redisClient.on('error', (err) => {
//   console.error('Redis error:', err);
// });

// redisClient.on('connect', () => {
//   console.log('Connected to Redis');
// });

// // Явное подключение
// (async () =>{
//   console.log("Waiting for Redis to be ready...");
//     await new Promise(resolve => setTimeout(resolve, 5000));

//     await redisClient.connect().catch(err => {
//       console.log('Redis connection failed:', err);
//     });
// })()

app.set("view engine", "hbs");
app.set("views", __dirname + "/views");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// const redisStore = new RedisStore({
//     client: redisClient,
//     ttl: 86400
// });

// app.use(session({
//     // store: redisStore,
//     secret: process.env.SESSION_SECRET, // для подписи cookie
//     name: 'sessionId', // имя cookie
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//       httpOnly: true,
//       secure: false, // true для HTTPS
//       maxAge: 1000 * 60 * 60
//     }
// }));

app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use(express.static('uploads/avatar')); 


app.use('/', (req, res) => res.redirect('/auth/'));

app.use(function (req, res, next) {
    console.log("bad request");
    res.status(404).send("Not Found");
});



// exports.requireAuth = (req, res, next) => {
//     if (!req.session.user) {
//       return res.status(401).json({ error: 'Не авторизован' });
//     }
//     next();
// }

mongoose.connection.on("error", (err) => {
  console.error("Mongoose ошибка подключения:", err);
});

async function main() {
    try{
        await mongoose.connect(`mongodb://${process.env.MONGO_HOST || '127.0.0.1'}:27017/usersdb`);
        app.listen(3000);
        console.log("Сервер ожидает подключения...");
    }
    catch(err) {
        return console.log(err);
    }
}
main(); // запускаем приложение

 
// прослушиваем прерывание работы программы (ctrl-c)
process.on("SIGINT", async() => {
    await mongoose.disconnect();
    console.log("Приложение завершило работу");
    process.exit();
});

process.on('uncaughtException', (err) => {
    console.log('Uncaught Exception:', err);
    process.exit(1);
});
  
process.on('unhandledRejection', (err) => {
    console.log('Unhandled Rejection:', err);
});