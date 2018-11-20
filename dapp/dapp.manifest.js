const addressFunctions = {
  rinkeby: () => "0x868944cd75d4b70b6fb59254e998d5f757d7de0c",
  ropsten: () => "0x2d52802d5339EA8FBbDC21BA2ED651744dF8a6eA",
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
