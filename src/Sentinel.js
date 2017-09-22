import 'whatwg-fetch'
import nanoid from 'nanoid'
import UAParser from 'ua-parser-js'

export default class Sentinel {
  /**
   * @constructor
   */
  constructor(ip) {
    /**
     * @private
     * @type {string}
     */
    this.ip = ip
    /**
     * @private
     * @type {string}
     */
    this.id = nanoid()
    /**
     * @public
     * @type {string}
     */
    this.url = `http://${this.ip}:5889/perf`

    this._initializePerfData({url: this.url, id: this.id})
  }

  /**
   * @public
   * @return {Promise<Object, Error>}
   * @desc Send performance.timing
   */
  sendPerformanceTiming() {
    const url = `${this.url}/${this.id}`
    return this._patch(url, {
      timing: window.performance.timing
    })
  }

  /**
   * @private
   * @param {Object} param
   * @param {string} param.url
   * @param {string} param.id
   * @return {Promise<Object, Error>}
   */
  _initializePerfData({url, id}) {
    const ua = new UAParser(window.navigator.userAgent)
    const json = {
      id,
      timing: {},
      date: Date.now(),
      env: ua.getResult()
    }
    return this._post(url, json)
  }

  /**
   * @private
   * @param {string} url
   * @return {Promise<Object, Error>}
   */
  _get(url) {
    return this._request(url)
  }

  /**
   * @private
   * @param {string} url
   * @param {Object} json
   * @return {Promise<Object, Error>}
   */
  _post(url, json) {
    return this._request(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(json)
    })
  }

  /**
   * @private
   * @param {string} url
   * @param {Object} json - to send data
   * @return {Promise<Object, Error>}
   */
  _patch(url, json) {
    return this._request(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(json)
    })
  }

  /**
   * @private
   * @param {string} url
   * @param {Object} options
   * @return {Promise<Object, Error>}
   */
  _request(url, options = {}) {
    return fetch(url, options).then(res => res.json())
  }

}

// fetch('http://localhost:5889/timing?_sort=id&_order=desc')
