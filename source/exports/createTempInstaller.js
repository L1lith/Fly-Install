import { dirSync } from 'tmp'
import { writeFileSync } from 'fs'
import { join } from 'path'
import FlyInstaller from '../FlyInstaller'

function createTempInstaller(...args) {
  const directory = dirSync().name
  writeFileSync(join(directory, 'package.json'), JSON.stringify({ name: 'fly-require-temp' }))
  return new FlyInstaller(directory, ...args)
}

export default createTempInstaller
