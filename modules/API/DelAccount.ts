import fs from 'fs'
import Formarter from '../Formarter'
import config from '../../config.json'

async function DelAccount (username: string): Promise<string> {
  let dbValue = JSON.parse(fs.readFileSync(`${Formarter.formatPath(config.workingPath)}/account.json`, 'utf-8'))
  if (!JSON.stringify(dbValue).includes(username)) return 'Username not found'
  dbValue = dbValue.filter((userData: Array<string | number | number[]>) => userData[0] !== username)
  try {
    fs.writeFileSync(`${Formarter.formatPath(config.workingPath)}/account.json`, JSON.stringify(dbValue))
    return `Success Deleting User ${username}`
  } catch (err) {
    return `${err}`
  }
}

export default DelAccount
