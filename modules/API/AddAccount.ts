import fs from 'fs'
import Formarter from '../Formarter'
import config from '../../config.json'

async function AddAccount (username: string, password: string, permission: 'low' | 'medium' | 'high'): Promise<string> {
  const dbValue = JSON.parse(fs.readFileSync(`${Formarter.formatPath(config.workingPath)}/account.json`, 'utf-8'))
  if (JSON.stringify(dbValue).includes(username)) return 'Username already used'
  const user = [username, password, null, (permission === 'low') ? [0, 0, 1, 0, 0] : (permission === 'medium') ? [0, 0, 1, 1, 0] : (permission === 'high') ? [1, 1, 1, 1, 1] : [0, 0, 0, 0, 0]]
  dbValue.push(user)
  try {
    fs.writeFileSync(`${Formarter.formatPath(config.workingPath)}/account.json`, JSON.stringify(dbValue))
    return `Success Adding new User ${username}`
  } catch (err: any) {
    return err
  }
}

export default AddAccount
