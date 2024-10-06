import fs from 'fs'

async function tes (): Promise<any> {
  try {
    fs.readFileSync('./index.ts', 'utf-8')
    const rawFileList: string[] = fs.readdirSync('./', 'utf-8')
    return rawFileList.filter((file) => file.includes('.ts'))
  } catch (err: NodeJS.ErrnoException | any) {
    return err
  }
}

console.log(await tes())
