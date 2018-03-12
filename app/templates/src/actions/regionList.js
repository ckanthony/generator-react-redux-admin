import * as ActionTypes from '../constants/actionTypes'
import api from '../utils/api'

const searchKeys = [
  'title',
  'currency_code',
  'currency_sign',
]

const urlPath = 'regions'

export const fetchItems = (params = {}) => async (dispatch) => {
  dispatch({ type: ActionTypes.REGIONLIST_FETCHITEMS_LOAD })
  try {
    const {
      current = 1,
      pageSize,
      sort = 'created_at',
      order = 'descend',
      search,
    } = params
    const $skip = (current - 1) * pageSize
    const $limit = pageSize
    const $sort = { [sort]: order === 'descend' ? -1 : 1 }
    const $or = (search && searchKeys.map(key => ({ [key]: { $like: `%${search}%` } }))) || null
    const query = {
      $skip,
      $limit,
      $sort,
    }
    $or && (query.$or = $or)
    const result = await api.get(`${urlPath}`, query)
    const {
      data: items,
      total,
    } = result
    dispatch({
      type: ActionTypes.REGIONLIST_FETCHITEMS_SUCCEED,
      items,
      total,
    })
  } catch (error) {
    dispatch({
      type: ActionTypes.REGIONLIST_FETCHITEMS_FAIL,
      fetchItemsError: error.message,
    })
  }
}

export const changeTable = params => (dispatch) => {
  const { pagination = {}, filters = {}, sorter = {} } = params
  dispatch({
    type: ActionTypes.REGIONLIST_CHANGETABLE_CHANGE,
    pagination,
    filters,
    sorter,
  })
}

export const searchTable = ({ isSearching }) => (dispatch) => {
  dispatch({
    type: ActionTypes.REGIONLIST_SEARCHTABLE_SEARCH,
    isSearching,
  })
}

export const editSearch = params => (dispatch) => {
  const { search } = params
  dispatch({
    type: ActionTypes.REGIONLIST_SEARCHTABLE_EDIT,
    search,
  })
}
