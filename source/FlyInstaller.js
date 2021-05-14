import exists from 'path-exists'
import { sanitize } from 'sandhands'
import installPackage from './functions/installPackage'
import getPackageEntry from './functions/getPackageEntry'
import { join } from 'path'

const packageManagers = ['pnpm', 'npm']

const optionsFormat = {
  _: {
    useLocalFallback: Boolean,
    packageManager: {
      _: String,
      validate: provider => (packageManagers.includes(provider) ? true : 'invalid package manager')
    }
  },
  allOptional: true
}

const defaultOptions = {
  useLocalFallback: true,
  packageManager: 'pnpm'
}

class FlyInstaller {
  constructor(directory = null, options = {}) {
    if (directory !== null && typeof directory !== 'string')
      throw new Error('Directory must be a string or null')
    this.directory = directory === null ? process.cwd() : directory
    sanitize(options, optionsFormat)
    this.options = { ...defaultOptions, ...options }
  }
  async setup() {
    if ((await exists(this.directory)) !== true)
      throw new Error('The install directory does not exist')
  }
  require(packageName) {
    const { useLocalFallback = true } = this.options
    let output = null
    let error = null
    if (useLocalFallback === true) {
      try {
        return require(packageName)
      } catch (e) {
        if (this.directory !== null) {
          let modulePath = this.directory
          if (!modulePath.includes('node_modules')) modulePath = join(modulePath, 'node_modules')
          modulePath = join(modulePath, packageName)
          const entryPath = join(modulePath, getPackageEntry(modulePath))
          return require(entryPath)
        } else {
          throw e
        }
      }
    } else {
      if (this.directory !== null) {
        let modulePath = this.directory
        if (!modulePath.includes('node_modules')) modulePath = join(modulePath, 'node_modules')
        modulePath = join(modulePath, packageName)
        const entryPath = join(modulePath, getPackageEntry(modulePath))
        return require(entryPath)
      } else {
        throw new Error('No source specified')
      }
    }
  }
  install(packageName) {
    //if (this.directory === null) throw new Error('No directory specified')
    return installPackage(this.options.packageManager, packageName, this.directory)
  }
}

export default FlyInstaller
