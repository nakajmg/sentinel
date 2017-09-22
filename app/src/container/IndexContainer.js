import React from 'react'
import PerformanceList from '../components/PerformanceList'

function IndexContainer ({store}) {
  console.log(store)
  return (
    <PerformanceList items={store.perfData}/>
  )
}

export default IndexContainer
