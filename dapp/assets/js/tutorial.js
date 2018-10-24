/* global alert */

import '../style/tutorial.less'
import { dapp } from '../../dapp.logic.js'
import manifest from '../../dapp.manifest.js'
import template from './tutorials_template.js'
import { Game, Account } from 'dc-webapi'
;(async () => {
  window.acc = new Account()
  await window.acc.init(
    '1111',
    '0x8d5366123cb560bb606379f90a0bfd4769eecc0557f1b362dcae9012b548b1e5'
  )
})()

const DEMO_privkey =
  '0xc87509a1c067bbde78beb793e6fa76530b6382a4c0241e5e4a9ec0a0f44dc0d3'

export default new class View {
  // constructor () {

  // }

  init () {
    document.getElementById('tutorial_mount_point').innerHTML = template
    this.root = document.getElementById('tutorial_app')
    this.setEvents()
  }

  setEvents () {
    this.root.querySelector('.step-0 button').onclick = () => {
      this.showStep1()
    }
  }

  showStep (num) {
    this.root.className = 'show-step-' + num
  }

  showStep1 () {
    this.showStep(1)
    const privkey_input = this.root.querySelector(
      '.step-1 input[name="privkey"]'
    )

    if (window.localStorage.last_privkey) {
      privkey_input.value = window.localStorage.last_privkey
    } else {
      setTimeout(() => {
        if (!privkey_input.value) privkey_input.value = DEMO_privkey
      }, 7777)
    }

    const btn = this.root.querySelector('.step-1 button')
    btn.onclick = () => {
      btn.disabled = true
      this.root.querySelector('.step-1 .init').style.display = 'none'

      setTimeout(async () => {
        try {
          window.localStorage.last_privkey = privkey_input.value
        } catch (e) {
          btn.disabled = false
          this.root.querySelector('.step-1 .init').style.display = 'block'
          alert('invalid key')
          return
        }

        // const acc_info = await DCLib.Account.info()
        document.getElementById('acc_info').innerHTML = JSON.stringify(
          window.acc.address
        )
        this.root.querySelector('.step-1').classList.add('initied')
        setTimeout(() => {
          this.showStep2()
        }, 3333)
      }, 33)
    }
  }

  showStep2 () {
    this.showStep(2)

    const btn = this.root.querySelector('.step-2 button')
    btn.onclick = async () => {
      btn.disabled = true
      window.game = new Game({
        name: 'DCGame_ex_v1',
        contract: manifest.contract,
        account: window.acc,
        gameLogicFunction: dapp,
        rules: {
          depositX: 2
        }
      })
      const log = document.getElementById('log')
      log.style.display = 'block'
      this.showStep3()
    }
  }

  showStep3 () {
    this.showStep(3)

    const btn = this.root.querySelector('.step-3 button')
    btn.onclick = async () => {
      btn.disabled = true
      const deposit = this.root.querySelector('.step-3 input[name="deposit"]')
        .value
      try {
      } catch (e) {
        console.error(e)
      }
      // const connection = await App.startGame(deposit)
      let connection = ''
      try {
        await window.game.start()
        await window.game.connect({
          playerDeposit: deposit,
          gameData: []
        })
      } catch (e) {
        btn.disabled = false
        console.error(e)
        console.warn('Cant connect, please repeat...')
        return
      }
      connection = 'success'
      console.info('Connect result: success')
      this.showStep4(connection)
    }
  }

  showStep4 (connection) {
    this.showStep(4)

    const table = document.querySelector('.step-4 table.play-log tbody')
    let playCnt = 0

    const endBtn = this.root.querySelector('.step-4 button.next')
    endBtn.disabled = true
    endBtn.onclick = async () => {
      this.showStep5()
      this.disconnect()
    }

    const btn = this.root.querySelector('.step-4 button.play')
    btn.onclick = async () => {
      btn.disabled = true
      btn.innerHTML = 'wait...'

      const bet = +document.querySelector('.step-4 input[name="bet"]').value
      const choice = +document.querySelector(
        '.step-4 input[name="choice"]:checked'
      ).value
      try {
        await window.game.play({
          userBet: bet,
          gameData: [choice],
          rndOpts: [[10, 30], [100, 500]]
        })
      } catch (e) {
        console.error(e)
      }
      const play = ''
      // const play = await App.play(bet, choice)
      console.info('Play result:')
      console.info(play)
      console.table(play.bankroller.result)

      const r = play.bankroller.result
      table.insertAdjacentHTML(
        'beforeend',
        `
        <tr>
          <td>${r.user_bet}</td>
          <td>${r.user_num}</td>
          <td><div class="t" title="${r.random_hash}">${
          r.random_hash
        }</div></td>
          <td>${r.random_num}</td>
          <td>${Math.ceil(r.profit * 0.000000000000000001)}</td>
          <td>${r.balance}</td>
        </tr>
      `
      )

      endBtn.disabled = false
      if (playCnt++ > 3) {
        setTimeout(() => {
          this.showStep5()
        }, 3333)
        return
      }
      btn.disabled = false
      btn.innerHTML = 'Play'
    }
  }

  showStep5 () {
    this.showStep(5)
    this.root.querySelector('.step-5 button').onclick = this.disconnect
  }

  async disconnect () {
    const btn = document.querySelector('.step-5 button')
    btn.disabled = true
    this.root.querySelector('.step-5 .close-block').style.display = 'none'
    try {
      await window.game.disconnect()
    } catch (e) {
      console.error(e)
      console.info('Disconnect result:', 'error')
    }
    const disconnect = 'success'
    // const disconnect = await App.endGame()
    console.info('Disconnect result:', disconnect)
    this.root.querySelector('.step-5 #close_result').innerHTML = JSON.stringify(
      disconnect
    )

    this.root.querySelector('.step-5 .outro-block').style.display = 'block'
  }
}()
