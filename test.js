const { tempInstaller } = require('./dist/temp-install')

async function run() {
  const installer = tempInstaller()
  console.log(installer, tempInstaller)
  await installer.install('react')
  console.log(installer.require('react'))
}

run()
  .then(() => {
    console.log('Exiting Gracefully')
    process.exit(0)
  })
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
