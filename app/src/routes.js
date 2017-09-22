import React from 'react'
import IndexContainer from './container/IndexContainer'

export default [
  {
    path: '/test/:id',
    component({params}) {
      return <div>/test/{params.id}</div>
    }
  },
  {
    path: '/test',
    component() {
      return <div>/test</div>
    }
  },
  {
    path: '/',
    component: IndexContainer
  }
]
