import fs from 'fs'
import Formarter from './Formarter'
import config from '../config.json'

interface dbStructure {
  table: string[]
  row: string[][]
}

async function addData (id: string, value: Record<string, string>): Promise<string> {
  const start = Date.now()
  try {
    const dbList = fs.readdirSync(`${Formarter.formatPath(config.workingPath)}/databases`, 'utf-8')
    if (dbList.includes(`${id}.json`)) {
      const dbValue: dbStructure = JSON.parse(fs.readFileSync(`${Formarter.formatPath(config.workingPath)}/databases/${id}.json`, 'utf-8'))
      const valueTable: string[] = Object.keys(value)
      if (JSON.stringify(valueTable) === JSON.stringify(dbValue.table)) {
        const readyPost: string[] = []
        valueTable.forEach((table) => {
          readyPost.push(value[table])
        })
        dbValue.row.push(readyPost)
        try {
          fs.writeFileSync(`${Formarter.formatPath(config.workingPath)}/databases/${id}.json`, JSON.stringify(dbValue))
          const end = Date.now()
          return `Success Write value into ${id} [${end - start}ms]`
        } catch (err: any) {
          return err
        }
      } else {
        const end = Date.now()
        return `Invalid Table structure [${end - start}ms]`
      }
    } else {
      const end = Date.now()
      return `Database not  [${end - start}ms]`
    }
  } catch (err: any) {
    return err
  }
}

async function removeData (id: string, dataId: number): Promise<string> {
  const start = Date.now()
  try {
    const dbList = fs.readdirSync(`${Formarter.formatPath(config.workingPath)}/databases`, 'utf-8')
    if (dbList.includes(`${id}.json`)) {
      const dbValue: dbStructure = JSON.parse(fs.readFileSync(`${Formarter.formatPath(config.workingPath)}/databases/${id}.json`, 'utf-8'))
      dbValue.row.splice(dataId, 1)
      try {
        fs.writeFileSync(`${Formarter.formatPath(config.workingPath)}/databases/${id}.json`, JSON.stringify(dbValue))
        const end = Date.now()
        return `Success Deleting data number ${dataId} in ${id} [${end - start}ms]`
      } catch (err: any) {
        return err
      }
    } else {
      const end = Date.now()
      return `Database not found [${start - end}ms`
    }
  } catch (err: any) {
    return err
  }
}

async function replaceData (id: string, dataID: number, newValue: Record<string, string>): Promise<string> {
  const start = Date.now()
  try {
    const dbList = fs.readdirSync(`${Formarter.formatPath(config.workingPath)}/databases`, 'utf-8')
    if (dbList.includes(`${id}.json`)) {
      const dbValue: dbStructure = JSON.parse(fs.readFileSync(`${Formarter.formatPath(config.workingPath)}/databases/${id}.json`, 'utf-8'))
      const valueTable: string[] = Object.keys(newValue)
      if (dbValue.row.length < dataID) return 'Invalid dataID'
      if (JSON.stringify(valueTable) === JSON.stringify(dbValue.table)) {
        const readyPost: string[] = []
        valueTable.forEach((table) => {
          readyPost.push(newValue[table])
        })
        dbValue.row.splice(dataID, 1, readyPost)
        try {
          fs.writeFileSync(`${Formarter.formatPath(config.workingPath)}/databases/${id}.json`, JSON.stringify(dbValue))
          const end = Date.now()
          return `Success Write new value into ${id} [${end - start}ms]`
        } catch (err: any) {
          return err
        }
      } else {
        const end = Date.now()
        return `Invalid Table structure [${end - start}ms]`
      }
    } else {
      const end = Date.now()
      return `Database not found [${end - start}ms]`
    }
  } catch (err: any) {
    return err
  }
}

const DBWrite = {
  addData,
  removeData,
  replaceData
}

export default DBWrite
