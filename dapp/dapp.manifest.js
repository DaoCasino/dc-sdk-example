const addressFunctions = {
  rinkeby: () => "0x868944cd75d4b70b6fb59254e998d5f757d7de0c",
  ropsten: () => "0xf4dac7a329bcabc02c62d438d1f2dd226680b6f6",
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
