/* global DCLib */

DCLib.defineDAppLogic(process.env.DAPP_SLUG, function (payChannel) {
  const MAX_RAND_NUM = 3

  let history = []

  var Roll = function (userBet, userNum, random_hash) {
    if (userNum < 1 || userNum > MAX_RAND_NUM) {
      console.warn('Invalid usernum, min:1 , max ' + MAX_RAND_NUM + '')
      return
    }

    // convert 1BET to 100000000
    userBet = DCLib.Utils.bet2dec(userBet)
    // generate random number
    console.log(random_hash, userBet, MAX_RAND_NUM)
    const randomNum = DCLib.numFromHash(random_hash, 1, MAX_RAND_NUM)

    let profit = -userBet
    // if user win
    if (userNum * 1 === randomNum * 1) {
      profit = userBet * 2 - userBet
    }
    // add result to paychannel
    payChannel.addTX(profit)

    // console log current paychannel state
    payChannel.printLog()

    // push all data to our log
    // just FOR DEBUG
    const rollItem = {
      // !IMPORTANT Time can be different on client and bankroller sides
      // not use time in your primary game logic
      timestamp   : new Date().getTime(),

      user_bet    : userBet,
      profit      : profit,
      user_num    : userNum,
      balance     : payChannel.getBalance(),
      random_hash : random_hash,
      random_num  : randomNum
    }
    history.push(rollItem)

    return rollItem
  }

  return {
    Game: Roll,
    history: history
  }
})
