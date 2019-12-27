import { useEffect, useMemo } from 'react'

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

  const loadAction = useMemo(() => {
    console.debug('useServiceLoaded', method, name, globalParams, globalFetchOptions)
    return service[method]
  }, [service, method])
  const resetAction = useMemo(() => (
    () => dispatch(service.syncActions[method].RECEIVES_DATA(null, null))
  ), [service.syncActions, dispatch, method])

  const globalParamsString = useMemo(() => JSON.stringify(globalParams), [globalParams])
  const globalFetchOptionsString = useMemo(() => JSON.stringify(globalFetchOptions), [globalFetchOptions])
  useEffect(() => {
    // reset data sync to prevent persisting old data on eg. new routes 
    resetAction()

    // batch multiple param changes into one call
    callDebounce(loadAction)

    return () => callDebounce.cancel()
  }, [loadAction, resetAction, globalParamsString, globalFetchOptionsString])

  return {
    ...service,
    data,
    isLoading,
    isError,
    touched,
  }
}

export default useServiceLoaded