import { promise as exec } from 'exec-sh'

const validModes = ['install', 'uninstall']

function installPackage(
  provider = 'pnpm',
  packageName,
  directory = null,
  mode = 'install',
  options = {}
) {
  if (typeof packageName != 'string' || packageName.length < 1)
    throw new Error('Please supply a valid package name')
  if (directory === null) {
    directory = process.cwd()
  } else if (typeof directory !== 'string') {
    throw new Error('Please supply a valid directory')
  }
  if (!validModes.includes(mode)) throw new Error('Invalid Mode Specified')
  const { silent = false } = options
  const execOptions = {
    cwd: directory
  }
  if (silent === true) {
    //execOptions.silent = true
    execOptions.stdio = 'pipe'
  } else {
    execOptions.stdio = 'inherit'
  }
  return exec(provider + ' ' + mode + ' ' + packageName, execOptions)
}

export default installPackage
