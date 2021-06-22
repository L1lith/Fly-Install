const { expect } = require('chai')
const { details } = require('sandhands')

var flyInstall

describe('The library is exported successfully', () => {
  it('should be evaluated without throwing', () => {
    flyInstall = require('../../dist/fly-install')
  })
  it('should export the correct output', () => {
    expect(
      details(flyInstall, {
        FlyInstaller: Function,
        TempInstaller: Function
      })
    ).to.equal(null) // Expects there to be no formatting errors with the exports compared to the supplied format
  })
})
