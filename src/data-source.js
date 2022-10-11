"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const typeorm_1 = require("typeorm");
const comment_1 = require("./Entities/comment");
const post_1 = require("./Entities/post");
const vote_1 = require("./Entities/vote");
const tag_1 = require("./Entities/tag");
(0, dotenv_1.config)();
const AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: process.env.pghost,
    port: Number(process.env.pgport),
    username: process.env.pguser,
    password: process.env.pgpassword,
    database: process.env.database,
    synchronize: true,
    logging: false,
    entities: [post_1.Post, comment_1.Comment, vote_1.Vote, tag_1.Tag],
    migrations: ["migration/*.ts"],
    subscribers: [],
});
exports.default = AppDataSource;
