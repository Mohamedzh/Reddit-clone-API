import { config } from "dotenv";
import { DataSource } from "typeorm";
import { Comment } from "./Entities/comments";
import { Post } from "./Entities/posts";
import { Vote } from "./Entities/vote";
import { User } from "./Entities/users";
import { Tag } from "./Entities/tags";

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
    entities: [Post, User, Comment, Vote, Tag],
    migrations: ["migration/*.ts"],
    subscribers: [],
})

export default AppDataSource;