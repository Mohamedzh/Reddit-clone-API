import { config } from "dotenv";
import { DataSource } from "typeorm";
import { Comment } from "./Entities/comment";
import { Post } from "./Entities/post";
import { Vote } from "./Entities/vote";
import { Tag } from "./Entities/tag";
import { User } from "./Entities/user";

config()
const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.pghost,
    port: Number(process.env.pgport),
    username: process.env.pguser,
    password: process.env.pgpassword,
    database: process.env.database,
    synchronize: true,
    logging: false,
    entities: [Post, Comment, Vote, Tag, User],
    migrations: ["migration/*.ts"],
    subscribers: [],
})

export default AppDataSource;