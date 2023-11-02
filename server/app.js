import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import path from 'path';
import cors from 'cors';
import helmet from "helmet";

// create express app
const app = express()
// parse requests of content-type - application/json
app.use(bodyParser.json())
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}))
// parse cookies
app.use(cookieParser());
// use helmet
app.use(helmet());
// use cors
app.use(cors());

export default app;