import React from 'react'
import PerformanceList from '../components/PerformanceList'

/**
 * @param {Object} props
 * @param {Store} props.store
 * @return {React.Component}
 */
function IndexContainer ({store}) {
  return (
    <PerformanceList router={store.router} items={store.perfData}/>
  )
}

export default IndexContainer
