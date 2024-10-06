import fs from 'fs'
import Formarter from './Formarter'
import config from '../config.json'

interface dbStructure {
  table: string[]
  row: Array<Array<string | number>>
}

async function addData (id: string, value: Record<string, string | number>): Promise<string> {
  const start = Date.now()
  try {
    const dbList = fs.readdirSync(`${Formarter.formatPath(config.workingPath)}/databases`, 'utf-8')
    if (dbList.includes(`${id}.json`)) {
      const dbValue: dbStructure = JSON.parse(fs.readFileSync(`${Formarter.formatPath(config.workingPath)}/databases/${id}.json`, 'utf-8'))
      const valueTable: string[] = Object.keys(value)
      if (JSON.stringify(valueTable) === JSON.stringify(dbValue.table)) {
        const readyPost: Array<string | number> = []
        valueTable.forEach((table) => {
          readyPost.push(value[table])
        })
        dbValue.row.push(readyPost)
        try {
          fs.writeFileSync(`${Formarter.formatPath(config.workingPath)}/databases/${id}.json`, JSON.stringify(dbValue))
          const end = Date.now()
          return `Success Write value into ${id} [${end - start}ms]`
        } catch (err) {
          return `${err}`
        }
      } else {
        const end = Date.now()
        return `Invalid Table structure [${end - start}ms]`
      }
    } else {
      const end = Date.now()
      return `Database not found [${end - start}ms]`
    }
  } catch (err) {
    return `${err}`
  }
}

async function removeData (id: string, dataId: number): Promise<string> {
  const start = Date.now()
  if (isNaN(dataId)) {
    const end = Date.now()
    return `invalid NaN dataId [${start - end}ms]`
  };
  try {
    const dbList = fs.readdirSync(`${Formarter.formatPath(config.workingPath)}/databases`, 'utf-8')
    if (dbList.includes(`${id}.json`)) {
      const dbValue: dbStructure = JSON.parse(fs.readFileSync(`${Formarter.formatPath(config.workingPath)}/databases/${id}.json`, 'utf-8'))
      dbValue.row.splice(dataId, 1)
      try {
        fs.writeFileSync(`${Formarter.formatPath(config.workingPath)}/databases/${id}.json`, JSON.stringify(dbValue))
        const end = Date.now()
        return `Success Deleting data number ${dataId} in ${id} [${end - start}ms]`
      } catch (err) {
        return `${err}`
      }
    } else {
      const end = Date.now()
      return `Database not found [${start - end}ms]`
    }
  } catch (err) {
    return `${err}`
  }
}

async function replaceData (id: string, dataID: number, newValue: Record<string, string | number>): Promise<string> {
  const start = Date.now()
  if (isNaN(dataID)) {
    const end = Date.now()
    return `invalid NaN dataId [${start - end}ms]`
  };
  try {
    const dbList = fs.readdirSync(`${Formarter.formatPath(config.workingPath)}/databases`, 'utf-8')
    if (dbList.includes(`${id}.json`)) {
      const dbValue: dbStructure = JSON.parse(fs.readFileSync(`${Formarter.formatPath(config.workingPath)}/databases/${id}.json`, 'utf-8'))
      const valueTable: string[] = Object.keys(newValue)
      if (dbValue.row.length < dataID) return 'Invalid dataID'
      if (JSON.stringify(valueTable) === JSON.stringify(dbValue.table)) {
        const readyPost: Array<string | number> = []
        valueTable.forEach((table) => {
          readyPost.push(newValue[table])
        })
        dbValue.row.splice(dataID, 1, readyPost)
        try {
          fs.writeFileSync(`${Formarter.formatPath(config.workingPath)}/databases/${id}.json`, JSON.stringify(dbValue))
          const end = Date.now()
          return `Success Write new value into ${id} [${end - start}ms]`
        } catch (err) {
          return `${err}`
        }
      } else {
        const end = Date.now()
        return `Invalid Table structure [${end - start}ms]`
      }
    } else {
      const end = Date.now()
      return `Database not found [${end - start}ms]`
    }
  } catch (err) {
    return `${err}`
  }
}

async function editData (id: string, dataID: number, newValue: Record<string, string | number>): Promise<string> {
  const start = Date.now()
  if (isNaN(dataID)) {
    const end = Date.now()
    return `invalid NaN dataId [${start - end}ms]`
  };
  try {
    const dbList = fs.readdirSync(`${Formarter.formatPath(config.workingPath)}/databases`, 'utf-8')
    if (dbList.includes(`${id}.json`)) {
      const dbValue: dbStructure = JSON.parse(fs.readFileSync(`${Formarter.formatPath(config.workingPath)}/databases/${id}.json`, 'utf-8'))
      const valueTable: string[] = Object.keys(newValue)
      if (dbValue.row.length < dataID) return 'Invalid dataID'
      let tableCheckPass: boolean = true
      valueTable.forEach((keys) => {
        if (!dbValue.table.includes(keys)) {
          tableCheckPass = false
        }
      })
      if (!tableCheckPass) return 'Invalid Table Structure'
      const currentData: Array<string | number> = dbValue.row[dataID]
      valueTable.forEach((table) => {
        const index = dbValue.table.findIndex((keys) => keys === table)
        currentData[index] = newValue[table]
      })
      dbValue.row.splice(dataID, 1, currentData)
      try {
        fs.writeFileSync(`${Formarter.formatPath(config.workingPath)}/databases/${id}.json`, JSON.stringify(dbValue))
        const end = Date.now()
        return `Success Write new value into ${id} [${end - start}ms]`
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

const DBWrite = {
  addData,
  removeData,
  replaceData,
  editData
}

export default DBWrite
