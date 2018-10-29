# Using the Sample Game in DAO.Casino SDK

## Requirements

- installed DC-CLI
- npm.js
- node.js (10 or newer)
- installed yarn
  If you use Windows, call `npm install --global windows-build-tools.` This command installs components necessary for this operation system.

## Quick start

1. Clone the sample game repository and start the DC-CLI in it:

```javascript
git clone --depth=1 https://github.com/DaoCasino/dc-sdk-example ./myDapp
cd ./myDapp

npm i & npm run start
or
yarn install & yarn start
```

2. Start the relevant bankroller for the network you want to use (Ropsten, Local, etc).

```javascript
node ./bin/daemon <privateKey> [options]
```

where <privateKey> is the private key reserved for bankroller, and [options] defines the blockchain network.

## DApp Core files

Your dapp core files

- ./contracts/myDAppGame.sol (contains the basic logic for this sample)
- dapp/dapp.logic.js
- dapp/\*
- dapp/assets/js/tutorial.js (this is where you are supposed to configure your game settings)

## Detailed Documentation

- https://developers.dao.casino/docs/2.%20Developer%20Sandbox/2.3.%20Game%20Dev%20Process.html#dapp-structure-overview
