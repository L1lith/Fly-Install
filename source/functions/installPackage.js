import { promise as exec } from 'exec-sh'

function installPackage(provider = 'pnpm', packageName, directory = null) {
  if (typeof packageName != 'string' || packageName.length < 1)
    throw new Error('Please supply a valid package name')
  if (directory === null) {
    directory = process.cwd()
  } else if (typeof directory !== 'string') {
    throw new Error('Please supply a valid directory')
  }
  return exec(provider + ' install ' + packageName, {
    cwd: directory,
    stdio: 'inherit'
  })
}

export default installPackage
