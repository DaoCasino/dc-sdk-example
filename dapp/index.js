import 'config/dclib'

import SW from 'ServiceWorker/SW'

import View from 'view/tutorial'

console.groupCollapsed('⚙︎ ENV Settings')
console.table(process.env)
console.groupEnd()

document.addEventListener('DCLib::ready', e => {
  console.groupCollapsed('DCLib config')
  console.table( DCLib.config )
  console.groupEnd()
  console.log('DCLib.web3.version:', DCLib.web3.version)

  View.init()
})


// Register Service Worker
if (process.env.DAPP_SW_ACTIVE) SW.register()
