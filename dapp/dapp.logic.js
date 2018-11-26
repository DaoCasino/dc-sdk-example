module.exports = function() {
  return {
    play: function(userBets, gameData, randoms) {
      const userNum = gameData.custom.playerNumbers
      const randomNum = randoms[0]

      let profit = -userBets[0]

      // if user win
      if (userNum * 1 === randomNum * 1) {
        profit = userBets[0] * 2
      }

      // return player profit
      return { profit }
    },
    customDataFormat: function(gameDataCustom) {
      return [{ t: "uint256", v: gameDataCustom.playerNumbers }]
    }
  }
}
