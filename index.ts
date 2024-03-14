import SYSInitial from './modules/SYSInitial'
import config from './config.json'
import Formarter from './modules/Formarter'
import DBWrite from './modules/DBWrite'
// import DBAdd from './modules/DBAdd'
// import DBRemove from './modules/DBRemove'
import DBRead from './modules/DBRead'

const getResult = await Promise.resolve(async () => { console.log(await SYSInitial(Formarter.formatPath(config.workingPath))) }).catch()
getResult().catch(() => {})

console.log(await DBWrite.removeData('babi', 3))
console.log(await DBRead('babi'))
