import * as readline from 'readline'
import fs from 'fs'
import SYSInitial from './modules/SYSInitial'
import Formarter from './modules/Formarter'
import config from './config.json'
import AddDB from './modules/AddDB'
import DBRead from './modules/DBRead'
import RemoveDB from './modules/RemoveDB'
import DBWrite from './modules/DBWrite'
import ReRollAuth from './modules/API/ReRollAuthCode'
import DelAccount from './modules/API/DelAccount'
import AddAccount from './modules/API/AddAccount'

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

function login (): void {
  console.log('------[ WELCOME ]------')
  console.log('|> GRQDB [ V1.0 ]')
  console.log('-----------------------')
  console.log('')
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

function terminal (): void {
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
          console.log('Table Example : username;timestamp;password')
          terminal()
        } else {
          const table: string[] = option[1].split(';')
          AddDB(option[0], table).then((res) => {
            console.log(res)
            terminal()
          }).catch((err) => {
            console.log(`${err}`)
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
          }).catch((err) => {
            console.log(`${err}`)
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
            }).catch((err) => {
              console.log(`${err}`)
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
            const theValue: string = `${command}`.replaceAll(`${prefix} ${option[0]} `, '')
            const theValueThree: string = `${theValue}`.replaceAll(` ${option[option.length - 1]}`, '')
            if ((`${option[0]}` === '' || `${option[0]}0` === 'undefined0' || `${theValue}` === '' || `${theValue}0` === 'undefined0')) {
              console.log('Usage : write [add|del|edit|replace] <JSON or id of table for del option> <id(for edit, and replace)>')
              terminal()
            } else {
              if (temporary.db === 'root') {
                listDB().forEach((db) => {
                  if (db.includes('.json')) console.log(db.replace('.json', ''))
                })
                console.log("To write inside database, first use 'use <database id>' command")
                terminal()
              } else if (!checkDB(temporary.db)) {
                console.log(`Database ${temporary.db} Not Found`)
                terminal()
              } else {
                if (`${option[0]}` === 'add') {
                  if (!`${option[option.length - 1]}`.includes('}')) {
                    console.log("add option didn't use 3rd option")
                    terminal()
                  } else {
                    try {
                      const value: Record<string, string | number> = JSON.parse(`${theValue}`)
                      DBWrite.addData(temporary.db, value).then((res) => {
                        console.log(res)
                        terminal()
                      }).catch((err) => {
                        console.log(`${err}`)
                        terminal()
                      })
                    } catch {
                      console.log('Try using valid JSON data. Example {"lorem": "ipsum"}')
                      terminal()
                    }
                  }
                } else if (`${option[0]}` === 'del') {
                  DBWrite.removeData(temporary.db, Number(option[1])).then((res) => {
                    console.log(res)
                    terminal()
                  }).catch((err) => {
                    console.log(`${err}`)
                    terminal()
                  })
                } else if (`${option[0]}` === 'edit') {
                  if (`${option[option.length - 1]}`.includes('}')) {
                    console.log('please insert Data ID')
                    terminal()
                  } else {
                    try {
                      const value: Record<string, string | number> = JSON.parse(`${theValueThree}`)
                      DBWrite.editData(temporary.db, Number(option[option.length - 1]), value).then((res) => {
                        console.log(res)
                        terminal()
                      }).catch((err) => {
                        console.log(`${err}`)
                        terminal()
                      })
                    } catch {
                      console.log('Try using valid JSON data. Example {"lorem": "ipsum"}')
                      terminal()
                    }
                  }
                } else if (`${option[0]}` === 'replace') {
                  if (`${option[option.length - 1]}`.includes('}')) {
                    console.log('please insert Data ID')
                    terminal()
                  } else {
                    try {
                      const value: Record<string, string | number> = JSON.parse(`${theValueThree}`)
                      DBWrite.replaceData(temporary.db, Number(option[option.length - 1]), value).then((res) => {
                        console.log(res)
                        terminal()
                      }).catch((err) => {
                        console.log(`${err}`)
                        terminal()
                      })
                    } catch {
                      console.log('Try using valid JSON data. Example {"lorem": "ipsum"}')
                      terminal()
                    }
                  }
                } else {
                  console.log('Please Select option add, del, edit or replace')
                }
              }
            }
          }
        }
        break
      case 'addacc':
        if (`${option[0]}` === '' || `${option[0]}0` === 'undefined0' || `${option[1]}` === '' || `${option[1]}0` === 'undefined0' || `${option[2]}` === '' || `${option[2]}0` === 'undefined0') {
          console.log('Usage : addacc <username> <password> <permission [medium|high|low]>')
          terminal()
        } else {
          let permission: 'low' | 'medium' | 'high' = 'low'
          const next = () => {
            AddAccount(`${option[0]}`, `${option[1]}`, permission).then((log) => {
              console.log(log)
              terminal()
            }).catch((err) => {
              console.log(err)
              terminal()
            })
          }
          if (`${option[2].toLocaleLowerCase()}` === 'low') {
            permission = 'low'
            next()
          } else if (`${option[2].toLocaleLowerCase()}` === 'medium') {
            permission = 'medium'
            next()
          } else if (`${option[2].toLocaleLowerCase()}` === 'high') {
            permission = 'high'
            next()
          } else {
            console.log('Please select permission (low|medium|high)')
            terminal()
          }
        }
        break
      case 'delacc':
        if (`${option[0]}` === '' || `${option[0]}0` === 'undefined0') {
          console.log('Usage : delacc <username>')
          terminal()
        } else {
          DelAccount(`${option[0]}`).then((log) => {
            console.log(log)
            terminal()
          }).catch((err) => {
            console.log(err)
            terminal()
          })
        }
        break
      case 'rerollacc':
        ReRollAuth().then((log) => {
          console.log(log)
          terminal()
        }).catch((err) => {
          console.log(err)
          terminal()
        })
        break
      case 'accdata':
        console.log(JSON.parse(fs.readFileSync(`${Formarter.formatPath(config.workingPath)}/account.json`, 'utf-8')))
        terminal()
        break
      case 'help':
        console.log(`
          use <database id> - To Select Database
          list - To list avaiable Database
          add <database id> <table> - To create a New Database
          remove - To Remove Database
          read - To show data in selected Database
          write write [add|del|edit|replace] <JSON|id> <data id> - for edit data on database
          accdata - show users data on API Account
          addacc <username> <password> <permission [medium|high|low]> - to create new User for API
          delacc <username> - to delete user on API Account
          rerollacc - to re roll Auth Code for all API Account
        `)
        terminal()
        break
      case 'exit':
        rl.close()
        console.log('Good Bye..')
        break
      default:
        console.log(`command not found : ${command}`)
        console.log("try run 'help'")
        terminal()
        break
    }
  })
}
