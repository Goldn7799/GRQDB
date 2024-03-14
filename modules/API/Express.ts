import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import config from '../../config.json'
import Auth from './Auth'

const app = express()
app.use(cors({
  origin: config.API.allowedIps
}))
app.use(bodyParser.json({
  limit: config.API.postSizeLimit
}))

app.post('/login', (req, res) => {
  const { username, password } = req.body
  if ((username === undefined || username === '') || (password === undefined || password === '')) return res.sendStatus(400)
  Auth(`${username}`, `${password}`).then((authRes) => {
    if (authRes.includes('not found')) return res.sendStatus(404)
    if (authRes.includes('Unauthorized')) return res.sendStatus(401)
    res.send(authRes)
  }).catch((error) => {
    console.log('Error during login : ' + error)
    res.sendStatus(500)
  })
})

app.listen(8080, () => {
  console.log('listen to port 8080')
})
