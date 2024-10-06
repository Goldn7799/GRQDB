import fs from 'fs'
import Formarter from '../Formarter'
import config from '../../config.json'
import MakeID from './MakeID'

async function ReRollAuth (): Promise<string> {
  const start = Date.now()
  const dbValue = JSON.parse(fs.readFileSync(`${Formarter.formatPath(config.workingPath)}/account.json`, 'utf-8'))
  let cout = 0
  dbValue.forEach(() => {
    dbValue[cout][4] = MakeID(18)
    cout++
  })
  try {
    fs.writeFileSync(`${Formarter.formatPath(config.workingPath)}/account.json`, JSON.stringify(dbValue))
    const end = Date.now()
    return `Success ReRoll ${cout} account auth code [${end - start}ms]`
  } catch (err) {
    return `${err}`
  }
}

export default ReRollAuth
