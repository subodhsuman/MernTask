import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv';
import ConnetDB from './database/db.js';
import router from './Router/index.js';
import cookieParser from "cookie-parser";

dotenv.config()
const app = express()
app.use(cors());
app.use(express.json())
app.use(cookieParser());
app.use(router)
const port = 3001

ConnetDB()
app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.listen(port,() => {
  console.log(`server is listening on port ${port}`)
})

// Handling Error
process.on("unhandledRejection", err => {
  console.log(`An error occurred: ${err.message}`)
  server.close(() => process.exit(1))
})