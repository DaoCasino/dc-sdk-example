const addressFunctions = {
  rinkeby: () => "0xCD184E71b763d86d4766cbA902B0d34DF4BA0c16",
  ropsten: () => "0x76acfE4A87381E6Ff1B5c68d404CD49837f53184",
  mainnet: () => "",
  local: () => "http://localhost:8545/contracts->Game"
}

module.exports = {
  slug: "DCGame_ex_v1",

  // if you want to change filename  - change it too in /scripts/config/paths
  logic: "./dapp.logic.js",

  about: "./README.md",

  getContract: blockchainNetwork => ({
    address: addressFunctions[blockchainNetwork]()
  }),

  rules: {
    depositX: 2
  }
}
