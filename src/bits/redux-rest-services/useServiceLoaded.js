import { useEffect } from 'react'

import { useSelector } from 'react-redux'
import { useService } from './useService'

// eslint-disable-next-line max-params
export const useServiceLoaded = (name, globalParams, globalFetchOptions) => {
  const { id } = globalParams
  const method = id ? 'get' : 'find'

  const service = useService(name, globalParams, globalFetchOptions)
  const data = useSelector(state => state[name][method].data)
  const isLoading = useSelector(state => state[name].isLoading)
  const isError = useSelector(state => state[name].isError)
  const touched = useSelector(state => state[name].touched)

  useEffect(() => {
    if (id) {
      service.get()
    } else {
      service.find()
    }
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