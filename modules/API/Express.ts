import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import config from '../../config.json'
import Auth from './Auth'
import AddDB from '../AddDB'
import UserAccount from './UserAccount'

const app = express()
app.use(cors({
  origin: config.API.allowedIps
}))
app.use(bodyParser.json({
  limit: config.API.postSizeLimit
}))

app.post('/login', (req, res) => {
  const { password, username } = req.body
  if ((typeof (username) !== 'string' || username === undefined || username === '') || (typeof (password) !== 'string' || password === undefined || password === '')) return res.sendStatus(400)
  const Rusername: string = username
  const Rpassword: string = password
  Auth(Rusername, Rpassword).then((response) => {
    if (response.includes('not found')) return res.sendStatus(404)
    if (response.includes('Unauthorized')) return res.sendStatus(401)
    res.send(response)
  }).catch((error) => {
    console.log('Error during login : ' + error)
    res.sendStatus(500)
  })
})

app.post('/database/manage/:id', (req, res) => {
  const { auth, id, table } = req.body
  if ((typeof (auth) !== 'string' || auth === undefined || auth === '') || (typeof (id) !== 'string' || id === undefined || id === '') || (typeof (table) !== 'object' || table === undefined || table.length <= 1)) return res.sendStatus(400)
  const Rauth: string = auth
  UserAccount.checkPermission(Rauth, [1, 0, 0, 0, 0]).then((response) => {
    if (response.includes('Authorized')) {
      const Rid: string = id
      const Rtable: string[] = table
      AddDB(Rid, Rtable).then((response) => {
        if (response.includes('already')) return res.sendStatus(404)
        res.send(response)
      }).catch((error) => {
        console.log('Error during manage database [POST] : ' + error)
      })
    } else {
      res.sendStatus(401)
    }
  }).catch((error) => {
    console.log('Error during manage database [POST] : ' + error)
    res.sendStatus(500)
  })
})

app.listen(8080, () => {
  console.log('listen to port 8080')
})
