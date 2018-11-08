# Smart contracts

:warning: *Documentation in progress*

For interaction with the Ethereum network, dapps need to have a back-end called "smart contracts". Contracts allow for operations to move the ether and tokens, distribution of funds, arbitration facilities.

## Table of Contents

- [Game Channel](#game-channel)
- [Contracts](#contracts)
- [Test](#tests)

## Game channel

For scaling, increasing speed and reducing transaction costs, dao.casino uses technology called "[game channel](https://medium.com/@dao.casino)".

### Opening

```js
openChannel(id, player, bankroller, playerDeposit, bankrollDeposit, session, time, gameData, N, E ,sign)
```

To open the channel, the player sends data about the opening of the channel and the signature of this data to the bankroller. The bankroll checks the data and calls the `openChannel` function. After tokens are written off from the parties' accounts and deposited on the contract.

### Update

```js
updateChannel(id, playerBalance, bankrollBalance, session, sign)
```

During the game, the parties exchange the signatures of the data necessary to update the channel state in blockchain. At any time, any of the participants can load the state into the smart contract by calling the function `updateChannel`, signed by the other party and thereby fixing the state. After that, the contract will not accept the status of the older one loaded.

### Closing

Closing the channel distributes funds between the player based on the channel state. Closing the channel can occur after the time of the channel has expired or by mutual consent of the parties.

#### closing by time

```js
closeByTime(id)
```

Closing the channel by time is called by function `closeByTime`,

#### closing by consert

```js
closeByConsent(id, playerBalance, bankrollBalance, session, close, sign)
```

To close the channel by agreement, one of the parties must provide the signed data to the other party. In case the second party agrees, it is called`closeByConsert` function.

### Dispute

We have implemented a mechanism for solving controversial situations(disputes) for our games smart contracts. In case of fraud, cheated party can send a request to open a dispute. After dispute is opened, other side has a temporary window (*n blocks*), to provide evidence of fair play. In case of failure to provide proof, the game ends in favor of the deceived party.

#### open dispute

```js
openDispute(id, session, disputeSeed, disputeBet, gameData, sign)
```

The dispute can be opened both by the player and the bankroller. 
To open a dispute, the initiating participant needs to update 
the channel status to the latest, signed by both partiсipants. 
After that, he should provide the contract with information about 
the last game. The other side will be given a safe time to resolve the dispute. 
The contract will validate the input data and, in case of success, create a dispute.

#### close dispute

```js
closeDispute(id, N, E, rsaSign)
```

During the safe time, the other participant can either update the channel state 
to the actual one (signed by both parties) with a large session number or provide data 
to the smart contract for the round of the game. After that funds will be redistributed 
based on the state and result of the game and channel will be closed.

#### close by dispute
```js
closeByDispute(id)
```

In case of expiration of the safe time, the other participant does not provide the evidence, 
the contract will play the game (if the initiator was a player) or conduct the game according 
to logic using the previously given random from the bankroller (if the initiator is a bankroller)

## Contracts

The dao.casino protocol contains several types of contracts:

### core contracts

|name|description|status|
|---|---|---|
|`ERC20.sol`|Token contract ERC20|:white_check_mark: Complete|
|`RSA.sol`|Contract for verify RSA sign|:warning: In progress|

### core games contracts

|name|description|status|
|---|---|---|
|`oneStepGame.sol`|Core for "one step" game (Dice)|:warning: In progress|
|`multiStepGame.sol`|Core for "multi step" game (Find the Ethereum)|:warning: In progress|

### whitelists

|name|description|status|
|---|---|---|
|`referrer.sol`|Referrer registration contract|:warning: In progress|
|`PlayerWL.sol`|player's whitelists|:warning: In progress|
|`GameWL.sol`|game's whitelists|:warning: In progress|

### game contracts

|name|description|status|
|---|---|---|
|`dice.sol`|Game contract *Dice*|:warning: In progress|
|`findTheEthereum.sol`|Game contract *Find The Ethereum* |:warning: In progress|

### dependencies

|name|description|status|
|---|---|---|
|`SafeMath.sol`|Safe math library|:white_check_mark: Complete|
|`interfaces.sol`|interfaces for interactions|:warning: In progress|

## Tests 

- [environment test](https://github.com/DaoCasino/Protocol/blob/master/test/diceTest.js#L69)
    - [add game to whitelist](https://github.com/DaoCasino/Protocol/blob/master/test/diceTest.js#L71)
    - [add player to whitelist](https://github.com/DaoCasino/Protocol/blob/master/test/diceTest.js#L83)
    - [approve to dice game contract](https://github.com/DaoCasino/Protocol/blob/master/test/diceTest.js#L116)
    - [generate RSA keys](https://github.com/DaoCasino/Protocol/blob/master/test/diceTest.js#L138)
- [payment channel test](https://github.com/DaoCasino/Protocol/blob/master/test/diceTest.js#L166)
    - [open channel](https://github.com/DaoCasino/Protocol/blob/master/test/diceTest.js#L176)
    - [update channel](https://github.com/DaoCasino/Protocol/blob/master/test/diceTest.js#249)
    - [close channel](https://github.com/DaoCasino/Protocol/blob/master/test/diceTest.js#301)
- [game channel test](https://github.com/DaoCasino/Protocol/blob/master/test/diceTest.js#L361)
    - [sign game data](https://github.com/DaoCasino/Protocol/blob/master/test/diceTest.js#L454)
    - [generate random number](https://github.com/DaoCasino/Protocol/blob/master/test/diceTest.js#L479)
    - [calculate game result](https://github.com/DaoCasino/Protocol/blob/master/test/diceTest.js#L483)
- [dispute test #1](https://github.com/DaoCasino/Protocol/blob/master/test/diceTest.js#L580)
    - [open dispute from player](https://github.com/DaoCasino/Protocol/blob/master/test/diceTest.js#L816)
    - [update channel](https://github.com/DaoCasino/Protocol/blob/master/test/diceTest.js#L771)
    - [close dispute from bankroller](https://github.com/DaoCasino/Protocol/blob/master/test/diceTest.js#L831)
- [dispute test #2](https://github.com/DaoCasino/Protocol/blob/master/test/diceTest.js#L868)
    - [open dispute from bankroller](https://github.com/DaoCasino/Protocol/blob/master/test/diceTest.js#L1135)
    - [close dispute from player](https://github.com/DaoCasino/Protocol/blob/master/test/diceTest.js#L1163)


### Running

Using Truffle framework for running test

```sh
npm install -g Truffle
```

Run develop mode

```sh
truffle develop
```

in develop mode run command

```sh
compile

...contract compile...

test
```

## Links

[contracts docs](https://dao.casino/Protocol/)