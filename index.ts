import SYSInitial from './modules/SYSInitial'
import config from './config.json'
import Formarter from './modules/Formarter'
import AddDB from './modules/AddDB'
import DBRead from './modules/DBRead'
import DBWrite from './modules/DBWrite'
import RemoveDB from './modules/RemoveDB'
import './modules/API/Express'

const getResult = await Promise.resolve(async () => { console.log(await SYSInitial(Formarter.formatPath(config.workingPath))) }).catch()
getResult().catch(() => {})

// EXAMPLE
// console.log(await RemoveDB('test1'))
// console.log(await AddDB('test1', ['id', 'username', 'lastlogin']))
// console.log(await DBWrite.addData('test1', { id: '1011', username: 'bambang', lastlogin: Date.now() }))
// const asss = await DBRead('test1')
// fs.writeFileSync('./idk.json', JSON.stringify(asss))
// console.log(await DBRead('test1'))
// console.log(await DBWrite.editData('test1', 0, { id: '1111' }))
// console.log(await DBRead('test1'))
// console.log(JSON.parse(JSON.stringify(await DBRead('test1'))).length)
// const a = await DBRead('test1')
// console.log(a)
// fs.writeFileSync(`${Formarter.formatPath(config.workingPath)}/databases/test1-unformarted.json`, JSON.stringify(a))
// let cout: number = 0
// setInterval(() => {
//   DBWrite.addData('test1', { id: MakeID(8), username: MakeID(5), lastlogin: Date.now() }).then(() => {
//     cout++
//     console.log(cout)
//   }).catch((err) => {
//     console.log(err)
//   })
// }, 1000000)
// console.log(await ReRollAuth())
// console.log(await Auth('user', 'admin'))
// console.log(await UserAccount.checkPermission('wRAuj5c5bjUn6QXEOt', [0, 0, 0, 1, 0]))

const GRQDB = {
  AddDB,
  DBWrite,
  DBRead,
  RemoveDB
}

export default GRQDB
