import cookieParser from 'cookie-parser';
import cors from 'cors';
import { config } from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import { ErrorMiddleware } from './middlewares/error.js';
import { mongoDataBase } from './utils/mongoDb.js';

//*------------------------------ routes imports---------------------------
import userRoutes from './routes/user.js';




config()
mongoDataBase(process.env.MONGO_URL as string);
const app = express()
const port = process.env.SERVER || 8001
const corsOptions = {
    origin: 'http://localhost:5173/',
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: ['Content-Type', 'Origin', 'X-Requested-With', 'Accept', 'x-client-key', 'x-client-token', 'x-client-secret', 'Authorization'],


}
//*----------------------- middlewares-----------------------------
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(cors(corsOptions))
app.use(cookieParser())
app.use(morgan('dev'))
//--------preflights-------
app.options('*', cors(corsOptions))

//*------------------------ routes----------------------------

app.use('/api/v1/user', userRoutes)



//*----------------------- server listening-------------------
app.use(ErrorMiddleware)
app.listen((port), () => {
    console.log(`server is running on the ${port}`)
})