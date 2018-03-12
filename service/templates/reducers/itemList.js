import {
  REGIONLIST_FETCHITEMS_LOAD,
  REGIONLIST_FETCHITEMS_SUCCEED,
  REGIONLIST_FETCHITEMS_FAIL,
  REGIONLIST_CHANGETABLE_CHANGE,
  REGIONLIST_SEARCHTABLE_EDIT,
  REGIONLIST_SEARCHTABLE_SEARCH,
} from '../constants/actionTypes'

export default (state = {}, action) => {
  switch (action.type) {
    case REGIONLIST_FETCHITEMS_LOAD:
      return { ...state, isFetchItemsLoading: true, fetchItemsError: null }
    case REGIONLIST_FETCHITEMS_SUCCEED:
      return {
        ...state,
        isFetchItemsLoading: false,
        items: action.items,
        pagination: { ...state.pagination, total: action.total },
      }
    case REGIONLIST_FETCHITEMS_FAIL:
      return {
        ...state,
        isFetchItemsLoading: false,
        items: null,
        fetchItemsError: action.fetchItemsError,
      }
    case REGIONLIST_CHANGETABLE_CHANGE: {
      return {
        ...state,
        pagination: action.pagination,
        filters: action.filters,
        sorter: action.sorter,
      }
    }
    case REGIONLIST_SEARCHTABLE_EDIT:
      return {
        ...state,
        search: action.search,
      }
    case REGIONLIST_SEARCHTABLE_SEARCH:
      return {
        ...state,
        isSearching: action.isSearching,
      }
    default:
      return state
  }
}
