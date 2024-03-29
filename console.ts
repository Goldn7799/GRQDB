import * as readline from 'readline'
import fs from 'fs'
import SYSInitial from './modules/SYSInitial'
import Formarter from './modules/Formarter'
import config from './config.json'
import AddDB from './modules/AddDB'
import DBRead from './modules/DBRead'
import RemoveDB from './modules/RemoveDB'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

interface temporaryS {
  db: string
  username: string
}

const root: string = Formarter.formatPath(config.workingPath)
const temporary: temporaryS = {
  db: 'root',
  username: ''
}

SYSInitial(Formarter.formatPath(config.workingPath)).then(() => { login() }).catch(() => {})

function login (): any {
  rl.question('Password : ', (password) => {
    const account = JSON.parse(fs.readFileSync(`${root}/account.json`, 'utf-8'))
    if (password === account[0][1]) {
      console.log(`Logged in to ${account[0][0]} at ${Date()}`)
      temporary.username = account[0][0]
      terminal()
    } else {
      console.log('<- UNAUTHORIZED ->')
      rl.close()
    }
  })
}

function checkDB (id: string): boolean {
  const dbList = fs.readdirSync(`${root}/databases`, 'utf-8')
  return dbList.includes(`${id}.json`)
}

function listDB (): string[] {
  return fs.readdirSync(`${root}/databases`, 'utf-8')
}

function terminal (): any {
  rl.question(`${temporary.username}@${temporary.db} => `, (command) => {
    const prefix: string = command.split(' ')[0]
    const option: string[] = command.split(' ')
    option.shift()

    switch (prefix) {
      case 'use':
        if (`${option[0]}` === '' || `${option[0]}0` === 'undefined0') {
          console.log('Usage : use <database id>')
          terminal()
        } else {
          if (!checkDB(option[0])) {
            console.log(`Database ${option[0]} Not Found`)
            terminal()
          } else {
            console.log(`Using database ${option[0]}`)
            temporary.db = option[0]
            terminal()
          }
        }
        break
      case 'list':
        listDB().forEach((db) => {
          if (db.includes('.json')) console.log(db.replace('.json', ''))
        })
        terminal()
        break
      case 'add':
        if (`${option[0]}` === '' || `${option[0]}0` === 'undefined0' || `${option[1]}` === '' || `${option[1]}0` === 'undefined0') {
          console.log('Usage : add <database id> <table>')
          console.log('Table Example : username;timestamp;')
          terminal()
        } else {
          const table: string[] = option[1].split(';')
          AddDB(option[0], table).then((res) => {
            console.log(res)
            terminal()
          }).catch((err: any) => {
            console.log(err)
            terminal()
          })
        }
        break
      case 'remove':
        if (`${option[0]}` === '' || `${option[0]}0` === 'undefined0') {
          console.log('Usage : remove <database id>')
          terminal()
        } else {
          if (temporary.db === option[0]) temporary.db = 'root'
          RemoveDB(option[0]).then((res) => {
            console.log(res)
            terminal()
          }).catch((err: any) => {
            console.log(err)
            terminal()
          })
        }
        break
      case 'read':
        if (temporary.db === 'root') {
          listDB().forEach((db) => {
            if (db.includes('.json')) console.log(db.replace('.json', ''))
          })
          console.log("To read inside database, first use 'use <database id>' command")
          terminal()
        } else {
          if (!checkDB(temporary.db)) {
            console.log(`Database ${temporary.db} Not Found`)
            terminal()
          } else {
            DBRead(temporary.db).then((res) => {
              console.log(res)
              terminal()
            }).catch((err: any) => {
              console.log(err)
              terminal()
            })
          }
        }
        break
      case 'write':
        if (temporary.db === 'root') {
          listDB().forEach((db) => {
            if (db.includes('.json')) console.log(db.replace('.json', ''))
          })
          console.log("To write something to database, first use 'use <database id>' command")
          terminal()
        } else {
          if (!checkDB(temporary.db)) {
            console.log(`Database ${temporary.db} Not Found`)
            terminal()
          } else {
            if (`${option[0]}` === '' || `${option[0]}0` === 'undefined0' || `${option[1]}` === '' || `${option[1]}0` === 'undefined0') {
              console.log('Usage : write [add|del] <value> <id(for del, edit, and replace)>')
              terminal()
            } else { }
          }
        }
        break
      default:
        console.log(`command not found : ${command}`)
        console.log("try run 'help'")
        terminal()
        break
    }
  })
}
