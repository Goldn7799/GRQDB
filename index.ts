import SYSInitial from './modules/SYSInitial'
import config from './config.json'
import Formarter from './modules/Formarter'
import Auth from './modules/API/Auth'
// import DelAccount from './modules/API/DelAccount'
// import AddAccount from './modules/API/AddAccount'

const getResult = await Promise.resolve(async () => { console.log(await SYSInitial(Formarter.formatPath(config.workingPath))) }).catch()
getResult().catch(() => {})

console.log(await Auth('user', 'admin'))
