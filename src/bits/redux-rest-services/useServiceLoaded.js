import { useEffect } from 'react'

import { debounce } from 'lodash'

import { useDispatch, useSelector } from 'react-redux'
import { useService } from './useService'

const call = (func) => func()
const callDebounce = debounce(call, 0)

// eslint-disable-next-line max-params
export const useServiceLoaded = (name, globalParams, globalFetchOptions) => {
  const { id } = globalParams
  const method = id ? 'get' : 'find'

  const dispatch = useDispatch()

  const service = useService(name, globalParams, globalFetchOptions)
  const data = useSelector(state => state[name][method].data)
  const isLoading = useSelector(state => state[name].isLoading)
  const isError = useSelector(state => state[name].isError)
  const touched = useSelector(state => state[name].touched)

  useEffect(() => {
    const action = id ? service.get : service.find
    const clearAdnLoadData = () => {
      dispatch(service.syncActions.find.RECEIVES_DATA(null, null))
      action()
    }

    callDebounce(clearAdnLoadData)

    return () => callDebounce.cancel()
  }, [name, JSON.stringify(globalParams), JSON.stringify(globalFetchOptions)])

  return {
    ...service,
    data,
    isLoading,
    isError,
    touched,
  }
}

export default useServiceLoaded