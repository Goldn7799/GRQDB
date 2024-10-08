import fs from 'fs'
import MakeID from './API/MakeID'

async function SYSInitial (rootPath: string): Promise<boolean | string> {
  try {
    fs.readdirSync(rootPath, 'utf-8')
  } catch (err) {
    try {
      fs.mkdirSync(rootPath)
      console.log('Created /data-store at ' + rootPath)
    } catch (error) {
      return `${error}`
    }
  }
  try {
    fs.readFileSync(rootPath + '/account.json', 'utf-8')
  } catch (err) {
    try {
      /*
      username: string,
      password: string,
      lastlogin: timestamp,
      permission: [
        AddDB,
        RemoveDB,
        DBRead,
        DBWrite,
        DBDelete
      ]
      */
      fs.writeFileSync(rootPath + '/account.json', JSON.stringify([
        ['user', 'admin', null, [1, 1, 1, 1, 1], MakeID(18)]
      ]))
      console.log('Created account.json at ' + rootPath + '/data-store')
    } catch (error) {
      return `${error}`
    }
  }
  try {
    fs.readdirSync(rootPath + '/databases', 'utf-8')
  } catch (err) {
    try {
      fs.mkdirSync(rootPath + '/databases')
      console.log('Created /databases at ' + rootPath + '/data-store')
    } catch (error) {
      return `${error}`
    }
  }
  try {
    fs.readdirSync(rootPath + '/volumes', 'utf-8')
  } catch (err) {
    try {
      fs.mkdirSync(rootPath + '/volumes')
      console.log('Created /volumes at ' + rootPath + '/data-store')
    } catch (error) {
      return `${error}`
    }
  }
  return true
}

export default SYSInitial
