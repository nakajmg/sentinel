import Sentinel from './Sentinel.js'
(() => {
  document.addEventListener('DOMContentLoaded', () => {
    const sentinel = new Sentinel({serverIp: '192.168.0.8'})
    document.querySelector('#patch').addEventListener('click', e => {
      sentinel.sendNavigationTiming()
        .then(console.log)
      sentinel.sendResourceTiming()
    })
  })
})()
