import fs from 'fs'
import Formarter from './Formarter'
import config from '../config.json'

interface dbStructure {
  table: string[]
  row: string[][]
}

async function DBAdd (id: string, table: string[]): Promise<string> {
  async function next (): Promise<string> {
    const value: dbStructure = {
      table,
      row: []
    }
    try {
      fs.writeFileSync(`${Formarter.formatPath(config.workingPath)}/databases/${id}.json`, JSON.stringify(value))
      return `Success Adding Database ${id}`
    } catch (err: any) {
      return err
    }
  }
  try {
    const data = fs.readFileSync(`${Formarter.formatPath(config.workingPath)}/databases/${id}.json`, 'utf-8')
    if (data.includes('"table"') && data.includes('"row"')) {
      return 'Database ID already used'
    } else {
      return await next()
    }
  } catch (err: string | any) {
    return await next()
  }
}

export default DBAdd
