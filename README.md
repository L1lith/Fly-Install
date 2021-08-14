  # Fly Install
Manage NPM dependencies during runtime

## Exports
There are two main classes, one for installing dependencies to existing projects, and another for temporarily installing dependencies. All of the installation methods are async.

#### FlyInstaller
The FlyInstaller installs dependencies to an existing package.json, and it defaults to the working directory of the node process.

```js
const {FlyInstaller} = require('fly-install')

async run(){
    const installer = new FlyInstaller()
    console.log(installer.installRequire('react')) // Returns the react package even if it wasn't previously installed
}
```

#### TempInstaller
The TempInstaller is the same as the FlyInstaller except it will automatically install it's dependencies to a temporary directory (they are deleted when the process exits).

## Installer Methods
Both the TempInstaller and FlyInstaller have the same methods described below:

#### install
Installs the package (but does not return it)

#### installRequire
Installs the package if it is not already installed, and returns the package either way

#### require
Returns an installed package

#### uninstall
Uninstalls a package