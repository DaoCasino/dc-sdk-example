/* global alert */

import "../style/tutorial.less"
import { dapp } from "../../dapp.logic.js"
import manifest from "../../dapp.manifest.js"
import template from "./tutorials_template.js"
import DCWebapi from "dc-webapi"

const playerPrivateKeys = {
  ropsten: "0xf67dfe6039ee029ae771d7e2da5a4324532ecc62cb59a292efc9cf49fd1b549e",
  rinkeby: "0x3F8B1B2FC40E744DA0D5D748654E19C5018CC2D43E1FD3EF9FD89E6F7FC652A0",
  local: ""
}

const WALLET_PWD = "1234"

export default new class View {
  init() {
    document.getElementById("tutorial_mount_point").innerHTML = template
    this.root = document.getElementById("tutorial_app")
    this.setEvents()
  }

  setEvents() {
    this.root.querySelector(".step-0 button").onclick = () => {
      this.showStep1()
    }
  }
  showStep(num) {
    this.root.className = "show-step-" + num
  }
  showStep1() {
    this.button_access = document.getElementById("body-init").style.display =
      "none"
    this.isNetworkChecked = false
    this.networkChoosed = ""
    const that = this
    document
      .getElementById("choose-network-button")
      .addEventListener("click", e => {
        console.log("click")
        const inputs = document
          .getElementById("choose-network-form")
          .getElementsByTagName("input")
        for (let i = 0; i < inputs.length; i++) {
          if (inputs[i].checked) {
            document.getElementById("body-init").style.display = "block"
            that.isNetworkChecked = true
            that.networkChoosed = inputs[i].value
            console.log(that.isNetworkChecked, that.networkChoosed)
          }
        }
      })
    this.showStep(1)
    const privkey_input = this.root.querySelector(
      '.step-1 input[name="privkey"]'
    )

    if (window.localStorage.last_privkey) {
      privkey_input.value = window.localStorage.last_privkey
    } else {
      setTimeout(() => {
        if (!privkey_input.value) {
          privkey_input.value = playerPrivateKeys[that.DC_NETWORK]
        }
      }, 7777)
    }

    const btn = document
      .getElementById("init-account-button")
      .addEventListener("click", e => {
        console.log(that.isNetworkChecked, that.networkChoosed)
        if (that.isNetworkChecked && that.networkChoosed) {
          this.root.querySelector(".step-1 .init").style.display = "none"

          setTimeout(async () => {
            try {
              that.DC_NETWORK = that.networkChoosed
              console.log(that.DC_NETWORK)
              const webapi = new DCWebapi({
                platformId: "DC_sdk",
                blockchainNetwork: that.DC_NETWORK
              })
              window.webapi = webapi
              webapi.account.init(
                WALLET_PWD,
                playerPrivateKeys[that.DC_NETWORK]
              )
              window.localStorage.last_privkey =
                playerPrivateKeys[that.DC_NETWORK]
            } catch (e) {
              console.log(e)
              this.root.querySelector(".step-1 .init").style.display = "block"
              alert("invalid key")
              return
            }

            document.getElementById("acc_info").innerHTML = JSON.stringify(
              window.webapi.account.address
            )
            this.root.querySelector(".step-1").classList.add("initied")
            setTimeout(() => {
              this.showStep2()
            }, 3333)
          }, 33)
        }
      })
  }

  showStep2() {
    this.showStep(2)
    const btn = this.root.querySelector(".step-2 button")
    btn.onclick = async () => {
      btn.disabled = true

      window.game = window.webapi.createGame({
        name: manifest.slug,
        contract: manifest.getContract(this.DC_NETWORK),
        gameLogicFunction: dapp,
        rules: manifest.rules
      })
      const log = document.getElementById("log")
      window.game.on("webapi::status", data => {
        log.style.display = "block"
        log.innerHTML += `<p><b>INFO</b>: ${JSON.stringify(data)}</p>`
      })

      log.style.display = "block"
      this.showStep3()
    }
  }
  showStep3() {
    this.showStep(3)

    const btn = this.root.querySelector(".step-3 button")
    btn.onclick = async () => {
      btn.disabled = true
      const deposit = this.root.querySelector('.step-3 input[name="deposit"]')
        .value
      try {
      } catch (e) {
        console.error(e)
      }
      // const connection = await App.startGame(deposit)
      let connection = ""
      try {
        await window.game.start()
        await window.game.connect({
          playerDeposit: deposit,
          gameData: [0, 0]
        })
      } catch (e) {
        btn.disabled = false
        console.error(e)
        console.warn("Cant connect, please repeat...")
        return
      }
      connection = "success"
      console.info("Connect result: success")
      this.showStep4(connection)
    }
  }

  showStep4(connection) {
    this.showStep(4)

    // const table = document.querySelector('.step-4 table.play-log tbody')
    let playCnt = 0

    const endBtn = this.root.querySelector(".step-4 button.next")
    endBtn.disabled = true
    endBtn.onclick = async () => {
      this.showStep5()
      this.disconnect()
    }

    const btn = this.root.querySelector(".step-4 button.play")
    btn.onclick = async () => {
      btn.disabled = true
      btn.innerHTML = "wait..."

      const bet = +document.querySelector('.step-4 input[name="bet"]').value
      const choice = +document.querySelector(
        '.step-4 input[name="choice"]:checked'
      ).value
      try {
        const result = await window.game.play({
          userBet: bet,
          gameData: [choice],
          rndOpts: [[1, 3]]
        })
        let td1 = document.createElement("td")
        let td2 = document.createElement("td")
        let td3 = document.createElement("td")
        let td4 = document.createElement("td")
        let td5 = document.createElement("td")
        let td6 = document.createElement("td")
        let tr = document.createElement("tr")
        document
          .getElementById("play-table-results")
          .getElementsByTagName("tbody")[0]
          .appendChild(tr)

        td3.innerHTML = 0

        tr.appendChild(td1)
        tr.appendChild(td2)
        tr.appendChild(td3)
        tr.appendChild(td4)
        tr.appendChild(td5)
        tr.appendChild(td6)

        for (let i in result) {
          switch (i) {
            case "balances":
              td6.innerHTML = `player ${result[i].player} 
                               bankroller ${result[i].bankroller}`
              break
            case "params":
              td1.innerHTML = result[i].userBet
              td2.innerHTML = result[i].gameData[0]
              break
            case "profit":
              td5.innerHTML = result[i]
              break
            case "randomNums":
              td4.innerHTML = result[i][0]
              break
          }
        }
        // console.log(result)
      } catch (e) {
        console.error(e)
      }
      console.info("Play result:")

      endBtn.disabled = false
      if (playCnt++ > 3) {
        setTimeout(() => {
          this.showStep5()
        }, 3333)
        return
      }
      btn.disabled = false
      btn.innerHTML = "Play"
    }
  }

  showStep5() {
    this.showStep(5)
    this.root.querySelector(".step-5 button").onclick = this.disconnect
  }

  async disconnect() {
    const btn = document.querySelector(".step-5 button")
    btn.disabled = true
    this.root.querySelector(".step-5 .close-block").style.display = "none"
    try {
      await window.game.disconnect()
    } catch (e) {
      console.error(e)
      console.info("Disconnect result:", "error")
    }
    const disconnect = "success"
    console.info("Disconnect result:", disconnect)
    this.root.querySelector(".step-5 #close_result").innerHTML = JSON.stringify(
      disconnect
    )

    this.root.querySelector(".step-5 .outro-block").style.display = "block"
  }
}()
