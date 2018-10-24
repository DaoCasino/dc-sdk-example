export default {
  slug: 'DCGame_ex_v1',

  // if you want to change filename  - change it too in /scripts/config/paths
  logic: './dapp.logic.js',

  contract: {
    address: require('../../dc-protocol/v_0.1/build/addresses.json').Game,
    abi: require('../../dc-protocol/v_0.1/build/contracts/myDAppGame.json').abi
  },
  rules: {
    depositX: 2
  }
}
