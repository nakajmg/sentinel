import React from 'react'
import PerformanceList from '../components/PerformanceList'

/**
 * @param {Object} props
 * @param {Object} props.store
 * @return {ReactComponent}
 */
function IndexContainer ({store}) {
  return (
    <PerformanceList items={store.perfData}/>
  )
}

export default IndexContainer
