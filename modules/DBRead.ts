import fs from 'fs'
import Formarter from './Formarter'
import config from '../config.json'

interface dbStructure {
  table: string[]
  row: Array<Array<string | number>>
}

async function DBRead (id: string): Promise<object[] | string> {
  const start = Date.now()
  try {
    const dbList = fs.readdirSync(`${Formarter.formatPath(config.workingPath)}/databases`, 'utf-8')
    if (dbList.includes(`${id}.json`)) {
      try {
        const dbRawValue: dbStructure = JSON.parse(fs.readFileSync(`${Formarter.formatPath(config.workingPath)}/databases/${id}.json`, 'utf-8'))
        const dbValue: object[] = []
        dbRawValue.row.forEach((value) => {
          type finalType = Record<string, string | number>
          const final: finalType = {}
          let cout: number = 0
          dbRawValue.table.forEach((table) => {
            final[table] = value[cout]
            cout++
          })
          dbValue.push(final)
        })
        const end = Date.now()
        console.log(`Reading ${dbValue.length} data on ${id} [${end - start}ms]`)
        return dbValue
      } catch (err: any) {
        return err
      }
    } else {
      const end = Date.now()
      return `Database not found [${end - start}ms]`
    }
  } catch (err: any) {
    return err
  }
}

export default DBRead
