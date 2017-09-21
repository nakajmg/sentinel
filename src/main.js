import Sentinel from './Sentinel.js'
(() => {
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#post').addEventListener('click', e => {
      const sentinel = new Sentinel()
      document.querySelector('#patch').addEventListener('click', e => {
        sentinel.sendPerformanceTiming()
          .then(console.log)
      })
    })
  })
  // const res = await postData()
  // const json = await getData()
  // console.log(json)
})()

/*
送るデータ
- timing
- 日時
- UA

*/
