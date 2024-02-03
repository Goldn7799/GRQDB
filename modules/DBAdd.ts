import fs from 'fs'
import Formarter from './Formarter'
import config from '../config.json'

const DBAdd = async (id: string, type: 'object' | 'array'): Promise<boolean> => {
  fs.readFile(`${Formarter.formatPath(config.workingPath)}/databases/${id}.json`, 'utf-8', (err, _) => {
    if (err === null) {
      fs.writeFile()
    };
  })
  return true
}

export default DBAdd
