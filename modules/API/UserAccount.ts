import fs from 'fs'
import Formarter from '../Formarter'
import config from '../../config.json'

type userType = string | Array<string | number | number[]>

async function getAccount (AuthCode: string): Promise<userType> {
  const dbValue = JSON.parse(fs.readFileSync(`${Formarter.formatPath(config.workingPath)}/account.json`, 'utf-8'))
  const user = dbValue.filter((user: any) => user[4] === AuthCode)
  if (user.length >= 1) {
    return user[0]
  } else {
    return 'User not found'
  }
}

async function checkPermission (AuthCode: string, requiredPermission: number[]): Promise<string> {
  if (requiredPermission.length !== 5) return 'Invalid Required Permission'
  let pass: boolean = true
  const user: userType = await getAccount(AuthCode)
  if (typeof (user) === 'object') {
    const userPermission: number[] = JSON.parse(JSON.stringify(user[3]))
    let cout: number = 0
    userPermission.forEach((permission) => {
      if (permission < requiredPermission[cout]) {
        pass = false
      };
      cout++
    })
    return (pass) ? 'Authorized' : 'Unauthorized'
  } else {
    return 'User not found'
  }
}

const UserAccount = {
  getAccount,
  checkPermission
}

export default UserAccount
