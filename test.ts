import fs from 'fs'

async function tes (): Promise<any> {
  try {
    fs.readFileSync('./index.ts', 'utf-8')
    return fs.readdirSync('./', 'utf-8')
  } catch (err: NodeJS.ErrnoException | any) {
    return err
  }
}

console.log(await tes())
