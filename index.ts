import SYSInitial from './modules/SYSInitial'
import config from './config.json'
import Formarter from './modules/Formarter'

const getResult = await Promise.resolve(async () => { console.log(await SYSInitial(Formarter.formatPath(config.workingPath))) }).catch()
getResult().catch(() => {})
