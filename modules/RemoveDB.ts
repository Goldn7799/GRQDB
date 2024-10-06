import fs from 'fs'
import Formarter from './Formarter'
import config from '../config.json'

async function RemoveDB (id: string): Promise<string> {
  const start = Date.now()
  try {
    const dbList = fs.readdirSync(`${Formarter.formatPath(config.workingPath)}/databases`, 'utf-8')
    if (dbList.includes(`${id}.json`)) {
      try {
        fs.rmSync(`${Formarter.formatPath(config.workingPath)}/databases/${id}.json`)
        const end = Date.now()
        return `Success Removing database ${id} [${end - start}ms]`
      } catch (err) {
        return `${err}`
      }
    } else {
      const end = Date.now()
      return `Database not found [${end - start}ms]`
    }
  } catch (err) {
    return `${err}`
  }
}

export default RemoveDB
