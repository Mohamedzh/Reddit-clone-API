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
import swaggerUi from 'swagger-ui-express'
const swaggerFile = require('../swagger-output.json')


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

app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.listen(process.env.PORT || 5000, async () => {
    console.log("listening on port " + process.env.port)
    try {
        await AppDataSource.initialize()
        console.log("DB connection established")
    }
    catch (e) {
        throw new Error(`error occured: ${e as Error}`)
    }
})  