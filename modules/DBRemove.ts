import fs from 'fs'
import Formarter from './Formarter'
import config from '../config.json'

async function DBRemove (id: string): Promise<string> {
  try {
    const dbList = fs.readdirSync(`${Formarter.formatPath(config.workingPath)}/databases`, 'utf-8')
    if (dbList.includes(`${id}.json`)) {
      try {
        fs.rmSync(`${Formarter.formatPath(config.workingPath)}/databases/${id}.json`)
        return 'Success Removing database'
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

export default DBRemove
