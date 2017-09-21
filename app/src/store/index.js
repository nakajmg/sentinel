import 'whatwg-fetch'
import {observable, action, autorun} from 'mobx'
import PropTypes from 'prop-types'

/**
 * this is Store
 */
class Store {
  constructor() {
    this.initialize()
  }

  /**
   * observable isInitialized
   */
  @observable isInitialized = false

  @observable perfData = []

  @action.bound
  initialize() {
    return this.updatePerfData()
      .then(() => {
        this.isInitialized = true
      })
  }

  async updatePerfData() {
    const data = await this.fetchPerfData()
    return this.setPerfData(data)
  }

  fetchPerfData() {
    return fetch('http://localhost:5889/timing?_sort=id&_order=desc')
      .then(res => res.json())
  }

  @action.bound
  setPerfData(data) {
    this.perfData= data
  }


  postPerfData() {
    const timing = window.performance.timing
    return fetch('http://localhost:5889/timing', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(timing)
    })
  }

  @action.bound
  async onClickPostPerfData() {
    await this.postPerfData()
    this.updatePerfData()
  }

}

export default Store

export const propTypes = {
  store: PropTypes.shape({
    perfData: PropTypes.array,
    postPerfData: PropTypes.func
  })
}
