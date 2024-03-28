import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import config from '../../config.json'
import Auth from './Auth'
import AddDB from '../AddDB'
import UserAccount from './UserAccount'
import RemoveDB from '../RemoveDB'
import DBRead from '../DBRead'
import DBWrite from '../DBWrite'

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
  const { id } = req.params
  const { auth, table } = req.body
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

app.delete('/database/manage/:id', (req, res) => {
  const { id } = req.params
  const { auth } = req.body
  if ((typeof (id) !== 'string' || id === undefined || id === '') || (typeof (auth) !== 'string' || auth === undefined || auth.length <= 1)) return res.sendStatus(400)
  const Rauth: string = auth
  UserAccount.checkPermission(Rauth, [0, 1, 0, 0, 0]).then((response) => {
    if (response.includes('Authorized')) {
      const Rid: string = id
      RemoveDB(Rid).then((response) => {
        if (response.includes('not found')) return res.sendStatus(404)
        res.send(response)
      }).catch((error) => {
        console.log('Error during manage database [DELETE] : ' + error)
      })
    } else {
      res.sendStatus(401)
    }
  }).catch((error) => {
    console.log('Error during manage database [DELETE] : ' + error)
    res.sendStatus(500)
  })
})

app.get('/database/action/:id/:auth', (req, res) => {
  const { id, auth } = req.params
  if ((typeof (id) !== 'string' || id === undefined || id === '') || (typeof (auth) !== 'string' || auth === undefined || auth.length <= 1)) return res.sendStatus(400)
  const Rauth: string = auth
  UserAccount.checkPermission(Rauth, [0, 0, 1, 0, 0]).then((response) => {
    if (response.includes('Authorized')) {
      const Rid: string = id
      DBRead(Rid).then((response) => {
        if (typeof (response) === 'string') return res.sendStatus(404)
        res.send(response)
      }).catch((error) => {
        console.log('Error during action database [GET] : ' + error)
      })
    } else {
      res.sendStatus(401)
    }
  }).catch((error) => {
    console.log('Error during action database [GET] : ' + error)
    res.sendStatus(500)
  })
})

app.post('/database/action/:id', (req, res) => {
  const { id } = req.params
  const { auth, value } = req.body
  if ((typeof (id) !== 'string' || id === undefined || id === '') || (typeof (auth) !== 'string' || auth === undefined || auth.length <= 1) || (typeof (value) !== 'object' || value === undefined)) return res.sendStatus(400)
  const Rauth: string = auth
  UserAccount.checkPermission(Rauth, [0, 0, 0, 1, 0]).then((response) => {
    if (response.includes('Authorized')) {
      const Rid: string = id
      const Rvalue: Record<string, string | number> = value
      DBWrite.addData(Rid, Rvalue).then((response) => {
        if (response.includes('not found')) return res.sendStatus(404)
        if (response.includes('Invalid')) return res.sendStatus(400)
        res.send(response)
      }).catch((error) => {
        console.log('Error during action database [POST] : ' + error)
      })
    } else {
      res.sendStatus(401)
    }
  }).catch((error) => {
    console.log('Error during action database [POST] : ' + error)
    res.sendStatus(500)
  })
})

app.put('/database/action/:id', (req, res) => {
  const { id } = req.params
  const { auth, newValue, dataId } = req.body
  if ((typeof (id) !== 'string' || id === undefined || id.length <= 0) || (typeof (auth) !== 'string' || auth === undefined || auth.length <= 1) || (typeof (newValue) !== 'object' || newValue === undefined) || (typeof (dataId) !== 'number' || dataId === undefined)) return res.sendStatus(400)
  const Rauth: string = auth
  UserAccount.checkPermission(Rauth, [0, 0, 0, 1, 0]).then((response) => {
    if (response.includes('Authorized')) {
      const Rid: string = id
      const RdataId: number = dataId
      const Rvalue: Record<string, string | number> = newValue
      DBWrite.replaceData(Rid, RdataId, Rvalue).then((response) => {
        if (response.includes('not found')) return res.sendStatus(404)
        if (response.includes('Invalid')) return res.sendStatus(400)
        res.send(response)
      }).catch((error) => {
        console.log('Error during action database [PUT] : ' + error)
      })
    } else {
      res.sendStatus(401)
    }
  }).catch((error) => {
    console.log('Error during action database [PUT] : ' + error)
    res.sendStatus(500)
  })
})

app.patch('/database/action/:id', (req, res) => {
  const { id } = req.params
  const { auth, newValue, dataId } = req.body
  if ((typeof (id) !== 'string' || id === undefined || id.length <= 0) || (typeof (auth) !== 'string' || auth === undefined || auth.length <= 1) || (typeof (newValue) !== 'object' || newValue === undefined) || (typeof (dataId) !== 'number' || dataId === undefined)) return res.sendStatus(400)
  const Rauth: string = auth
  UserAccount.checkPermission(Rauth, [0, 0, 0, 1, 0]).then((response) => {
    if (response.includes('Authorized')) {
      const Rid: string = id
      const RdataId: number = dataId
      const Rvalue: Record<string, string | number> = newValue
      DBWrite.editData(Rid, RdataId, Rvalue).then((response) => {
        if (response.includes('not found')) return res.sendStatus(404)
        if (response.includes('Invalid')) return res.sendStatus(400)
        res.send(response)
      }).catch((error) => {
        console.log('Error during action database [PATCH] : ' + error)
      })
    } else {
      res.sendStatus(401)
    }
  }).catch((error) => {
    console.log('Error during action database [PATCH] : ' + error)
    res.sendStatus(500)
  })
})

app.delete('/database/action/:id', (req, res) => {
  const { id } = req.params
  const { auth, dataId } = req.body
  if ((typeof (id) !== 'string' || id === undefined || id === '') || (typeof (auth) !== 'string' || auth === undefined || auth.length <= 1) || (typeof (dataId) !== 'number' || dataId === undefined)) return res.sendStatus(400)
  const Rauth: string = auth
  UserAccount.checkPermission(Rauth, [0, 0, 0, 0, 1]).then((response) => {
    if (response.includes('Authorized')) {
      const Rid: string = id
      const RdataId: number = dataId
      DBWrite.removeData(Rid, RdataId).then((response) => {
        if (response.includes('not found')) return res.sendStatus(404)
        res.send(response)
      }).catch((error) => {
        console.log('Error during action database [DELETE] : ' + error)
      })
    } else {
      res.sendStatus(401)
    }
  }).catch((error) => {
    console.log('Error during action database [DELETE] : ' + error)
    res.sendStatus(500)
  })
})

app.listen(8080, () => {
  console.log('listen to port 8080')
})
