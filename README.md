
# Using the Sample Game in DAO.Casino SDK 


## Requirements
 - installed DC-CLI
 - npm.js
 - node.js (10 or newer)
 - truffle.js (`npm i -g truffle`)
 If you use Windows, call `npm install --global windows-build-tools.` This command installs components necessary for this operation system.

## Quick start
1. Clone the sample game repository and start the DC-CLI in it:  
```javascript
git clone --depth=1 https://github.com/DaoCasino/dc-sdk-sample ./myDapp
cd ./myDapp
npm i && npm start
```
2. Start the relevant bankroller for the network you want to use (Ropsten, Local, etc).    
```javascript
node ./bin/deamon <privateKey> [options]
```  
where <privateKey> is the private key reserved for bankroller, and [options] defines the blockchain network. 


## DApp Core files
Your dapp core files 
- ./contracts/myDAppGame.sol (contains the basic logic for this sample)
- dapp/dapp.logic.js
- dapp/* 
- dapp/assets/js/tutorial.js


## Detailed Documentation
- https://github.com/DaoCasino/dc-monorepo/tree/development/packages/Documentation/2.%20Developer%20Sandbox
- https://github.com/DaoCasino/dc-monorepo/edit/development/packages/Documentation/2.%20Developer%20Sandbox/2.3.%20Game%20Dev%20Process.md
