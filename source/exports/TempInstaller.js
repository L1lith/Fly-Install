import { dirSync } from 'tmp'
import { writeFileSync } from 'fs'
import { join } from 'path'
import FlyInstaller from './FlyInstaller'
import protectClass from '../functions/protectClass'

class TempInstaller extends FlyInstaller {
  constructor(args) {
    const directory = dirSync().name
    writeFileSync(join(directory, 'package.json'), JSON.stringify({ name: 'fly-require-temp' }))
    super(directory, ...args)
  }
}

export default protectClass(TempInstaller)
