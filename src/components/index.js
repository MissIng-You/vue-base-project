
// import all compontents
import box from './box'
import login from './login'
import navigation from './navigation'
import cascadingMenu from './cascading-menu'
import list from './list'
import pagination from './pagination'

import fireCard from './fire-card'
import fireCardList from './fire-card-list'

import Vuetable from './table/Vuetable'
import VuetablePagination from './table/VuetablePagination'

const customBootstrap = {
  box,
  login,
  navigation,
  cascadingMenu,
  list,
  pagination,
  fireCard,
  fireCardList,
  vuetable: Vuetable,
  'vuetable-pagination': VuetablePagination
}

// export all compontents
export default customBootstrap
