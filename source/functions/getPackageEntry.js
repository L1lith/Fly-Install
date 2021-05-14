const { join } = require('path')
const { readFileSync } = require('fs')

function getPackageEntry(packageDir) {
  const packageData = JSON.parse(readFileSync(join(packageDir, 'package.json'), 'utf8'))
  return typeof packageData.main == 'string' && packageData.main.length > 0
    ? packageData.main
    : 'index.js'
}

export default getPackageEntry
