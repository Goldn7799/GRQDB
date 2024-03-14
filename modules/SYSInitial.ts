import fs from 'fs'

const SYSInitial = async (rootPath: string): Promise<boolean | string> => {
  try {
    fs.readdirSync(rootPath, 'utf-8')
  } catch (err: any) {
    try {
      fs.mkdirSync(rootPath)
      try {
        fs.readdirSync(rootPath + '/volumes', 'utf-8')
      } catch (err: any) {
        try {
          fs.mkdirSync(rootPath + '/volumes')
          try {
            fs.readdirSync(rootPath + '/databases', 'utf-8')
          } catch (err: any) {
            try {
              fs.mkdirSync(rootPath + '/databases')
            } catch (error: any) {
              return error
            }
          }
        } catch (error: any) {
          return error
        }
      }
    } catch (error: any) {
      return error
    }
  }
  return true
}

export default SYSInitial
