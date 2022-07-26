import express, { json, urlencoded } from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import "reflect-metadata";
import AppDataSource from './data-source';
import postsRouter from './routes/posts';
import usersRouter from './routes/users';
import tagsRouter from './routes/tags'

const app = express();

config();
app.use(cors());
app.use(morgan("dev"));
app.use(helmet());
app.use(json());
app.use(urlencoded({ extended: false }));
app.use('/posts', postsRouter)
app.use('/users', usersRouter);
app.use('/tags', tagsRouter);
// app.get('/', (req, res) => {
//     res.json({msg: "it's alive"})
// })

app.listen(process.env.port, async () => {
    console.log("listening on port " + process.env.port)
    try {
        await AppDataSource.initialize()
        console.log("DB connection established" )
    }
    catch (e) {
        throw new Error (`error occured: ${e as Error}`)
    }
})  