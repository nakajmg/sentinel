import IndexContainer from './container/IndexContainer'
import PerformanceContainer from './container/PerformanceContainer'

export default [
  {
    path: '/performance/:id',
    component: PerformanceContainer
  },
  {
    path: '/',
    component: IndexContainer
  }
]
