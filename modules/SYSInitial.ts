import fs from 'fs'
import DBTemplate from '../DBTemplate.json'

const SYSInitial = async (rootPath: string): Promise<boolean> => {
  fs.readdir(rootPath, 'utf-8', (err, _) => {
    if (err !== null) {
      fs.mkdirSync(rootPath)
    };
    fs.readdir(rootPath + '/volumes', 'utf-8', (err, _) => {
      if (err !== null) {
        fs.mkdirSync(rootPath + '/volumes')
      };
      fs.readdir(rootPath + '/databases', 'utf-8', (err, _) => {
        if (err !== null) {
          fs.mkdirSync(rootPath + '/databases')
        };
        fs.readFile(rootPath + '/sys-database.json', 'utf-8', (err, _) => {
          if (err !== null) {
            fs.writeFileSync(rootPath + '/sys-database.json', JSON.stringify(DBTemplate.sysdatabase))
          };
        })
      })
    })
  })
  return true
}

export default SYSInitial
