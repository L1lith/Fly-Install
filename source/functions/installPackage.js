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
  const { silent } = options
  const execOptions = {
    cwd: directory
  }
  if (silent === true) {
    //execOptions.silent = true
    execOptions.stdio = 'pipe'
  } else if (silent === false) {
    execOptions.stdio = 'inherit'
  } else {
    execOptions.stdio = ['pipe', 'ignore', 'inherit'] // default to showing errors only
  }
  return exec(provider + ' ' + mode + ' ' + packageName, execOptions)
}

export default installPackage
