
# DAO.Casino SDK 


## Requirements
 - installed DC-CLI
 - npm.js
 - nodejs (10 or newer)
 - trufflejs (npm i -g truffle)
 If you use Windows, call `npm install --global windows-build-tools.` This command installs components necessary for this operation system.

## Quick start
1. Clone the repository.
```
git clone --depth=1 https://github.com/DaoCasino/dc-sdk-sample ./myDapp
cd ./myDapp
npm i && npm start
```
2. Start the relevant bankroller for the network you want to use (Ropsten, Local, etc).
```bankroller-core start <privateKey> [options]```
where <privateKey> is the private key reserved for bankroller, and [options] defines the blockchain network. 


## DApp Core files
Your dapp core files 
./contracts/myDAppGame.sol (contains the basic logic for this sample)
dapp/dapp.logic.js
dapp/* 

## Detailed Documentation

https://github.com/DaoCasino/dc-monorepo/tree/development/packages/Documentation/2.%20Developer%20Sandbox
