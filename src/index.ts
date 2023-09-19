import { App } from "./app";
import {processQueue} from "./manager/job/worker"
import {cleanToken} from "./utils/tokenManager"
import dotenv from "dotenv";
dotenv.config();

const app = new App().express;

const port = process.env.PORT || 1337;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

cleanToken.start();
processQueue();