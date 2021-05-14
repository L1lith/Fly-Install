import { dir } from 'tmp-promise'
import { writeFile } from 'fs/promises'
import { join } from 'path'
import FlyInstaller from '../FlyInstaller'

async function createTempInstaller(...args) {
  const directory = (await dir()).path
  await writeFile(join(directory, 'package.json'), JSON.stringify({ name: 'fly-require-temp' }))
  const installer = new FlyInstaller(directory, ...args)
  await installer.setup()
  return installer
}

export default createTempInstaller
