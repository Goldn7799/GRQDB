import fs from 'fs'
import Formarter from '../Formarter'
import config from '../../config.json'

async function Auth (username: string, password: string): Promise<string> {
  const dbValue = JSON.parse(fs.readFileSync(`${Formarter.formatPath(config.workingPath)}/account.json`, 'utf-8'))
  if (!JSON.stringify(dbValue).includes(username)) return 'Username not found'
  const selectedUser = dbValue.filter((userData: any) => userData[0] === username)[0]
  if (selectedUser[1] === password) {
    return 'Authorized'
  } else {
    return 'Unauthorized'
  }
}

export default Auth
