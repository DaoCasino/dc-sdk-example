import emptyCircle from "../images/emptyCircle.png"
import figure from "../images/figure.png"
import emptyTriangle from "../images/emptyTriangle.png"
import filledTriangle from "../images/filledTriangle.png"
const template = `<div id="tutorial_app" class="show-step-0">
    <h1>Basic Dapp flow example </h1>
    <div style="display:none" id="loader-spinner"class="loaders-container">
    <div class="container">
     <div class="switchbox">
       <div class="switch-horisontal"><img src=${emptyCircle} width="15px" height="15px"></div>
       <div class="switch-horisontal"><img src=${emptyTriangle} width="15px" height="15px"></div>
       <div class="switch-vertical"><img src=${filledTriangle} width="15px" height="15px"></div>
       <div class="switch-vertical"><img src=${figure} width="15px" height="15px"></div>
     </div>
     </div>
   </div>
    <div id="network-index-container"><h2>current Ethereum network:</h2><h2 id="network-index"></h2></div>


    <hr>
    <!-- intro -->
    <div class="step step-0 intro">
      <h2>Before you start</h2>
      <p>
        This "wizard" provide you on basic steps of Dapp lifecycle
        <br>
        <h3><strong>Our plan</strong></h3>
        <ul>
          <li>Init account</li>
          <li>Init Dapp
          </li>
          <li>Search for bankroller
          </li>
          <li>Connect to bankroller
          </li>
          <li>Play a game
          </li>
          <li>Disconnect
          </li>
        </ul>
        <div>
          <h2><strong>First of all install and import "dc-webapi" library with the game logic and game metadata </strong></h2>
          <br/><code>npm install dc-webapi</code>
          <br/>
            <pre>

            import { dapp } from "../../dapp.logic.js"
            import manifest from "../../dapp.manifest.js"
            import DCWebapi from 'dc-webapi'
            </pre>
          </div>
      </p>

      <p>Do not forget read our documentation <a target="_blank" href="https://developers.dao.casino/">https://developers.dao.casino/docs/</a> </p>

      <p>TIP: Open chromeDevTools and see console for more information</p>

      <button class="next">Start</button>
    </div>

    <!-- init acc -->
    <div class="step step-1">
      <h2>First you need to choose Ethereum network</h2>
      <div class="chooseNet">
      <div style="display: flex;flex-direction: column;">
        <div class="network-variant network-variant-disable"><label class="network-variant-label" style="background: rgb(41, 182, 175)"></label> <span class="network-variant-name">Mainnet</span></div>
        <div class="network-variant network-variant-disable"><label class="network-variant-label" style="background: rgb(112, 87, 255);"></label> <span class="network-variant-name">Kovan</span></div>
        <div class="network-variant network-variant-enable"><label class="network-variant-label" style="background: rgb(246, 195, 67);"></label> <span class="network-variant-name">Rinkeby</span></div>
        <div class="network-variant network-variant-enable"><label class="network-variant-label" style="background: rgb(255, 74, 141);"></label> <span class="network-variant-name">Ropsten</span></div>
        <div class="network-variant network-variant-enable"><label class="network-variant-label"></label> <span class="network-variant-name">local</span></div>
      </div>
      </div>
      <br>
      <div>
        <form id="id-platform-form">
          <input type="text" id="id-platform-input" placeholder="input Platform_id">
          <button type="button" id="id-platform-button">set</button>
        </form>
        <span>Platform_id must be the same with Platform_id on bankroller</span>
      </div>
      <br>
      <div id="body-init">
      <h2>Now insert your Ethereum privacy key</h2>
      <div class="init">
        <input name="privkey" type="text" placeholder="Insert privatekey" required minlength="66" maxlength="66" />
        <button id="init-account-button" >Init Account</button>
      </div>
      <div class="initied">
        <code> window.webapi.account._account</code>
        <p>OK, your account info:</p>
        <pre id="acc_info" style="white-space: inherit"></pre>
      </div>
      </div>
    </div>

    <!-- init Dapp -->
    <div class="step step-2">
    <h2>Init dc-webapi</h2>
    <p>Code Example
    <pre>

    const WALLET_PWD = "1234"
    (async () => {
      const webapi = await new DCWebapi({
        platformId: "DC_sdk",
        blockchainNetwork: DC_NETWORK
      }).start()
      window.webapi = webapi
      window.webapi.account.init(WALLET_PWD, playerPrivateKeys[DC_NETWORK])
    })()
    </pre></p>
      <h2>Init your Dapp</h2>

      <p>
      <pre> window.game = window.webapi.createGame({
        name: manifest.slug,
        contract: manifest.getContract(DC_NETWORK),
        gameLogicFunction: dapp,
        rules: manifest.rules
      })
      </pre></p>


      <p>See files:
        <br>
        <b>dapp/dapp.logic.js</b> - contract address and ABI. This is core dapp/game logic constructor for client and bankroller.
  <pre>

  function dapp () {
    return {
      play: function (userBet, gameData, randoms) {
        const userNum = gameData[0]
        const randomNum = randoms[0]

        let profit = -userBet

        // if user win
        if (userNum * 1 === randomNum * 1) {
          profit = userBet * 2 - userBet
        }

        // return player profit
        return profit
      }
    }
  }
  export { dapp }
        </pre>

        <br>
        <br>

        <b>dapp/dapp.logic.js</b> - Reqired to paste you custom logic into the body of the dapp.logic.js function.
        <pre>

        function dapp () {
          return {
            play: yourFunction
          }
        }
        export { dapp }
        </pre>
        <br>
        <br>
        <b>dapp/dapp.manifest.js</b> - this is a config file for bankroller.
        Whith metadata of the game
      </p>

      <button class="next">Init Dapp</button>
    </div>

    <!-- find bankroller -->
    <!-- connect and openchannel -->
    <div class="step step-3">
      <h2>Now, find bankroller and open game channel</h2>

      <p>Deposit - how much BETs "freeze: in game contract</p>
      <label>
        Game Deposit:
        <input type="number" name="deposit" value="10" min="5" max="20"> <b>ERC20 tokens / BET</b>
      </label>

      <button class="next">Find bankroller and Connect</button>
    </div>


    <!-- play -->
    <div class="step step-4">
      <h2>Send bet, choice and get random</h2>

      <label>
        User bet:
        <input type="number" name="bet" value="1" min="1" max="20"> <b>ERC20 tokens / BET</b>
      </label>

      <br>
      <label>
        Guess random number from 1 to 3: &nbsp;&nbsp;
        <input type="radio" name="choice" value="1"> 1 &nbsp;&nbsp;
        <input type="radio" name="choice" value="2" checked> 2 &nbsp;&nbsp;
        <input type="radio" name="choice" value="3"> 3 &nbsp;&nbsp;
      </label>
      <br>

      <table id="play-table-results" class="play-log">
        <caption>play log:</caption>
        <thead><tr>
          <th>bet</th>
          <th>choice</th>
          <th>rnd hash</th>
          <th>rnd num</th>
          <th>profit</th>
          <th>balance</th>
        </tr></thead>
        <tbody></tbody>
      </table>
      <br>
      <button class="play">Play</button>
      <button class="next">Close Channel</button>
    </div>

    <!-- closeChannel -->
    <div class="step step-5">
      <h2>OK, time to end tutorial</h2>

      <div class="close-block">
        <p>Now, send close gamechannel transaction</p>
        <button>Close Channel</button>
      </div>


      <div class="outro-block" style="display:none">
        <pre id="close_result"></pre>
        <p>Thats all.</p>
        <p>
          More information you can find in our git and site
          <ul>
            <li><a target="_blank" href="https://developers.dao.casino/">Dev site</a></li>
            <li><a target="_blank" href="https://github.com/DaoCasinok">DaoCasino Github</a></li>
            <li><a target="_blank" href="https://github.com/DaoCasino/sdk">DaoCasino/sdk</a></li>
          </ul>
        </p>
      </div>
    </div>


    <!-- dapp status -->
    <div id="log">
      <div class="title">Dapp status:</div>
    </div>

  </div>`

export default template
