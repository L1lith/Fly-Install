const { expect } = require('chai')
const { flyInstaller } = require('../../dist/fly-install')
const { readFile } = require('fs/promises')
const { join } = require('path')

let installer
describe('The fly installer functions properly', () => {
  before(function () {
    // runs before all tests in this file regardless where this line is defined.
  })
  it('can install a package successfully', async () => {
    installer = flyInstaller(join(__dirname, '..'))
    await installer.install('ms')
  }).timeout(60 * 1000) // Wait at least one minute before timing out
  it('can require the installed package successfully', async () => {
    const testLib = await installer.require('ms')
    expect(testLib).to.be.a('function')
  })
  it("adds the package to the temp dir's dependencies", async () => {
    const package = JSON.parse(await readFile(join(installer.directory, 'package.json')))
    expect(package).to.have.own.property('dependencies')
    expect(package.dependencies).to.have.own.property('ms')
  })
  it('can require the package.json of the library', async () => {
    const package = JSON.parse(
      await readFile(join(installer.directory, 'node_modules', 'ms', 'package.json'))
    )
    expect(package.name).to.equal('ms')
  })
  it('can uninstall the dependency', async () => {
    await installer.uninstall('ms')
  }).timeout(60 * 1000) // Wait at least one minute before timing out
})
