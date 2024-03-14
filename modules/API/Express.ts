import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import config from '../../config.json'

const app = express()
app.use(cors({
  origin: config.API.allowedIps
}))
app.use(bodyParser.json({
  limit: config.API.postSizeLimit
}))
