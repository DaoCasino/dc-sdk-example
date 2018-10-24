import View from 'view/tutorial'
document.addEventListener('DCLib::ready', e => {
  console.groupCollapsed('DCLib config')
  console.table(DCLib.config)
  console.groupEnd()
  console.log('DCLib.web3.version:', DCLib.web3.version)

  View.init()
})
