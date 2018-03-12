import {
  <%= actionName %>LIST_FETCHITEMS_LOAD,
  <%= actionName %>LIST_FETCHITEMS_SUCCEED,
  <%= actionName %>LIST_FETCHITEMS_FAIL,
  <%= actionName %>LIST_CHANGETABLE_CHANGE,
  <%= actionName %>LIST_SEARCHTABLE_EDIT,
  <%= actionName %>LIST_SEARCHTABLE_SEARCH,
} from '../constants/actionTypes'

export default (state = {}, action) => {
  switch (action.type) {
    case <%= actionName %>LIST_FETCHITEMS_LOAD:
      return { ...state, isFetchItemsLoading: true, fetchItemsError: null }
    case <%= actionName %>LIST_FETCHITEMS_SUCCEED:
      return {
        ...state,
        isFetchItemsLoading: false,
        items: action.items,
        pagination: { ...state.pagination, total: action.total },
      }
    case <%= actionName %>LIST_FETCHITEMS_FAIL:
      return {
        ...state,
        isFetchItemsLoading: false,
        items: null,
        fetchItemsError: action.fetchItemsError,
      }
    case <%= actionName %>LIST_CHANGETABLE_CHANGE: {
      return {
        ...state,
        pagination: action.pagination,
        filters: action.filters,
        sorter: action.sorter,
      }
    }
    case <%= actionName %>LIST_SEARCHTABLE_EDIT:
      return {
        ...state,
        search: action.search,
      }
    case <%= actionName %>LIST_SEARCHTABLE_SEARCH:
      return {
        ...state,
        isSearching: action.isSearching,
      }
    default:
      return state
  }
}
