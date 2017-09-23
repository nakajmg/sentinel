import React from 'react'
import IndexContainer from './container/IndexContainer'

export default [
  {
    path: '/performance/:id',
    component({params}) {
      return <div>/performance/{params.id}</div>
    }
  },
  {
    path: '/',
    component: IndexContainer
  }
]
