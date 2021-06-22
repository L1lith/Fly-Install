import exists from 'path-exists'
import { sanitize } from 'sandhands'
import installPackage from '../functions/installPackage'
import getPackageEntry from '../functions/getPackageEntry'
import { join } from 'path'
import protectClass from '../functions/protectClass'

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
  constructor(...args) {
    if (args.length > 2) throw new Error('Received too many arguments')
    const [directory = null, options = {}] = args
    if (directory !== null && typeof directory !== 'string')
      throw new Error('Directory must be a string or null')
    this.directory = directory === null ? process.cwd() : directory
    sanitize(options, optionsFormat)
    this.options = { ...defaultOptions, ...options }
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
  async installRequire(packageName) {
    try {
      return await this.require(packageName)
    } catch (error) {
      if (error?.message === 'No source specified') {
        // Continue
      } else {
        throw error
      }
    }
    return await this.install(packageName)
  }
  install(packageName, options = {}) {
    //if (this.directory === null) throw new Error('No directory specified')
    return installPackage(
      this.options.packageManager,
      packageName,
      this.directory,
      'install',
      options
    )
  }
  uninstall(packageName, options = {}) {
    //if (this.directory === null) throw new Error('No directory specified')
    return installPackage(
      this.options.packageManager,
      packageName,
      this.directory,
      'uninstall',
      options
    )
  }
}

export default protectClass(FlyInstaller)
