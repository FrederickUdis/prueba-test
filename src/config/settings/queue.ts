import { Queue } from "bullmq";
import dotenv from "dotenv";
dotenv.config();

const {REDIS_HOST: host, REDIS_PORT: port, REDIS_DB: db, REDIS_QUEUE: name} = process.env

export const connectionOpts = {
    host: host,
    port: Number(port),
    db: Number(db)
};

export const docQueue = new Queue(name, {connection: connectionOpts});