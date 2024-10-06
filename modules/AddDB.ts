import fs from 'fs'
import Formarter from './Formarter'
import config from '../config.json'

interface dbStructure {
  table: string[]
  row: Array<Array<string | number>>
}

async function AddDB (id: string, table: string[]): Promise<string> {
  const start = Date.now()
  async function next (): Promise<string> {
    const value: dbStructure = {
      table,
      row: []
    }
    try {
      fs.writeFileSync(`${Formarter.formatPath(config.workingPath)}/databases/${id}.json`, JSON.stringify(value))
      const end = Date.now()
      return `Success Adding Database ${id} [${end - start}ms]`
    } catch (err) {
      return `${err}`
    }
  }
  try {
    const data = fs.readFileSync(`${Formarter.formatPath(config.workingPath)}/databases/${id}.json`, 'utf-8')
    if (data.includes('"table"') && data.includes('"row"')) {
      const end = Date.now()
      return `Database ID already used [${end - start}ms]`
    } else {
      return await next()
    }
  } catch (err) {
    return await next()
  }
}

export default AddDB
