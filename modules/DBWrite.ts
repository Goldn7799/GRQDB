import fs from 'fs'
import Formarter from './Formarter'
import config from '../config.json'

interface dbStructure {
  table: string[]
  row: string[][]
}

async function addData (id: string, value: Record<string, string>): Promise<string> {
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
          return `Success Write value into ${id}`
        } catch (err: any) {
          return err
        }
      } else {
        return 'Invalid Table structure'
      }
    } else {
      return 'Database not found'
    }
  } catch (err: any) {
    return err
  }
}

async function removeData (id: string, dataId: number): Promise<string> {
  try {
    const dbList = fs.readdirSync(`${Formarter.formatPath(config.workingPath)}/databases`, 'utf-8')
    if (dbList.includes(`${id}.json`)) {
      const dbValue: dbStructure = JSON.parse(fs.readFileSync(`${Formarter.formatPath(config.workingPath)}/databases/${id}.json`, 'utf-8'))
      dbValue.row.splice(dataId, 1)
      try {
        fs.writeFileSync(`${Formarter.formatPath(config.workingPath)}/databases/${id}.json`, JSON.stringify(dbValue))
        return `Success Deleting data number ${dataId} in ${id}`
      } catch (err: any) {
        return err
      }
    } else {
      return 'Database not found'
    }
  } catch (err: any) {
    return err
  }
}

const DBWrite = {
  addData,
  removeData
}

export default DBWrite
