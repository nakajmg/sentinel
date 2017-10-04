import IndexContainer from './container/IndexContainer'
import PerformanceContainer from './container/PerformanceContainer'

export default [
  {
    name: 'performance',
    path: '/performance/:id',
    component: PerformanceContainer
  },
  {
    name: 'root',
    path: '/',
    component: IndexContainer
  }
]
