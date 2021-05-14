import FlyInstaller from '../FlyInstaller'

async function createFlyInstaller(...args) {
  const installer = new FlyInstaller(...args)
  await installer.setup()
  return installer
}

export default createFlyInstaller
