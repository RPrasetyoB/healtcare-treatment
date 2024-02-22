import {onRequest} from "firebase-functions/v2/https";
import * as express from 'express';
import "dotenv/config";
import { dbConnection } from "./config/dbConnection";

const app = express()
const server_port = process.env.SERVER_PORT || 3001;

dbConnection()

app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to Renaldi health-care rest API"
    })
})

app.listen(server_port, ()=> {
  console.log(`server listening at http://localhost:${server_port}`)
});

exports.app = onRequest(app)