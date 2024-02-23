import {onRequest} from "firebase-functions/v2/https";
import express from 'express';
import cors from 'cors';
import { dbConnection } from "./config/dbConnection";
import router from "./routes";
import errorCatch from "./middleware/errorCatch";
import * as dotenv from 'dotenv';

dotenv.config();

const app = express()
// body parser
app.use(express.json());
// set cors accept all
app.use(cors())
// server port
const server_port = process.env.SERVER_PORT || 3001;
// confirm DB connection
dbConnection()
// API root route
app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to Renaldi health-care rest API"
    })
})
// call server router
app.use(router)
// middleware for catch error
app.use(errorCatch)
//server listening
app.listen(server_port, ()=> {
  console.log(`server listening at http://localhost:${server_port}`)
});
// firebase functions
exports.app = onRequest(app)