import SYSInitial from './modules/SYSInitial'
import config from './config.json'
import Formarter from './modules/Formarter'
import fs from 'fs'
// import Auth from './modules/API/Auth'
import './modules/API/Express'
import DBRead from './modules/DBRead'
import AddDB from './modules/AddDB'
import DBWrite from './modules/DBWrite'
import UserAccount from './modules/API/UserAccount'
import MakeID from './modules/API/MakeID'
// import ReRollAuth from './modules/API/ReRollAuthCode'
// import DelAccount from './modules/API/DelAccount'
// import AddAccount from './modules/API/AddAccount'

const getResult = await Promise.resolve(async () => { console.log(await SYSInitial(Formarter.formatPath(config.workingPath))) }).catch()
getResult().catch(() => {})

// console.log(await AddDB('test1', ['id', 'username', 'lastlogin']))
// console.log(await DBWrite.addData('test1', { id: '1011', username: 'bambang', lastlogin: '1099281' }))
// console.log(await DBWrite.addData('test1', { id: '1012', username: 'agus', lastlogin: '1099281' }))
// console.log(JSON.parse(JSON.stringify(await DBRead('test1'))).length)
const a = await DBRead('test1')
console.log(a)
fs.writeFileSync(`${Formarter.formatPath(config.workingPath)}/databases/test1-unformarted.json`, JSON.stringify(a))
let cout: number = 0
setInterval(() => {
  DBWrite.addData('test1', { id: MakeID(8), username: MakeID(5), lastlogin: `${Date.now()}` }).then(() => {
    cout++
    console.log(cout)
  }).catch((err) => {
    console.log(err)
  })
}, 10000000)
// console.log(await ReRollAuth())
// console.log(await Auth('user', 'admin'))
// console.log(await UserAccount.checkPermission('wRAuj5c5bjUn6QXEOt', [0, 0, 0, 1, 0]))
