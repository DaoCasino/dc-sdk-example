const template = `<div id="tutorial_app" class="show-step-0">
    <h1>Basic Dapp flow example </h1>
    <hr>

    <!-- intro -->
    <div class="step step-0 intro">
      <h2>Before youre start</h2>
      <p>
        This "wizard" provide you on basic steps of Dapp lifecycle
        <br>
        <ul>
        <li>Import the dc-webapi library from the mono repository <code>import { Game, Account } from 'dc-webapi'</code></li>
          <li>Start with create an object within the "Account" class to manage the account and initialize the Ethereum account
            <code>
              <br/>Account window.acc = new Account();
              <br/>await window.acc.init("1111", "private key")
            </code>
          </li>
          <li>Init Dapp 
          <code>
          <br/>window.game = new Game({
            <br/>name: dappManifest.slug,
            <br/>contract: dappManifest.contract,
            <br/> account: window.acc,
            <br/> gameLogicFunction: GameLogic,
            <br/>rules: dappManifest.rules
          })
          </code>
          </li>
          <li>Start and find bakroller 
            <code>await window.game.connect({ playerDeposit: 10, gameData: [] })</code>
          </li>
          <li>Connect to bankroller 
            <code>await window.game.start()</code>
          </li>
          <li>Play 
            <code>
              <br/>const gameOneResult = await window.game.play({
               userBet: 2,
               gameData: [2],
               rndOpts:[[10,30],[100,500]]
               })
            </code>
          </li>
          <li>Disconnect 
            <code>
              await window.game.disconnect()
            </code>
          </li>
        </ul>
        <br>
        realization in code placed: <code>./dapp/model/app.js</code>
      </p>

      <p>Do not forget read our documentation <a target="_blank" href="https://developers.dao.casino/">https://developers.dao.casino/docs/</a> </p>

      <p>TIP: Open chromeDevTools and see console for more information</p>

      <button class="next">Start</button>
    </div>

    <!-- init acc -->
    <div class="step step-1">
      <h2>First you need to send ethereum account in DCLib </h2>
      
      <div class="init">
        <input name="privkey" type="text" placeholder="Insert privatekey" required minlength="66" maxlength="66" />
        <button>Init Account</button>
      </div>
      <div class="initied">
        <code>window.acc._Eth._account</code>
        <p>OK, your account info:</p>
        <pre id="acc_info" style="white-space: inherit"></pre>
      </div>
    </div>
    
    <!-- init Dapp -->
    <div class="step step-2">
      <h2>Second - init your Dapp</h2>
      
      <p>Code Example<pre>window.game = new Game({
    name: dappManifest.slug,
    contract: dappManifest.contract,
    account: window.acc,
    gameLogicFunction: GameLogic,
    rules: dappManifest.rules
  })
      </pre></p>


      <p>See files:
        <br>
        <b>dapp/config/dapp.contract.js</b> - contract address and ABI, generates automaicaly when <code>truffle migrate</code>. In <code>package.json</code> you can find paths
  <pre>"paths": {
    "dapp": {
      "contract_abi": "./dapp/config/dapp.contract.json"
    },
    "truffle": {
      "contracts_directory": "./contracts",
      "migrations_directory": "./migrations",
      "contracts_build_directory": "./dapp/config/contracts/"
    }
  },
        </pre>

        <br>
        <br>
        
        <b>dapp/dapp.logic.js</b> - this is core dapp/game logic constructor for client and bankroller.
        Reqired to return a one function, called <code>Game</code>
        <pre>
          return {
            Game: yourFunction
          }
        </pre>
        <br>
        <br>
        <b>dapp/dapp.manifest.js</b> - this is a config file for bankroller.
        Whit dapp.logis.js automoved when changed in bankroller docker container 
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

      <table class="play-log">
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
