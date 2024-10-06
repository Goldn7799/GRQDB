import fs from 'fs'
import Formarter from '../Formarter'
import config from '../../config.json'

async function Auth (username: string, password: string): Promise<string> {
  const dbValue = JSON.parse(fs.readFileSync(`${Formarter.formatPath(config.workingPath)}/account.json`, 'utf-8'))
  const selectedUser = dbValue.filter((userData: Array<string | number | number[]>) => userData[0] === username)[0]
  if (selectedUser === undefined) return 'Username not found'
  if (selectedUser[1] === password) {
    const userIndex = dbValue.findIndex((userData: Array<string | number | number[]>) => userData[0] === username)
    dbValue[userIndex][2] = Date.now()
    fs.writeFileSync(`${Formarter.formatPath(config.workingPath)}/account.json`, JSON.stringify(dbValue))
    return dbValue[userIndex][4]
  } else {
    return 'Unauthorized'
  }
}

export default Auth
