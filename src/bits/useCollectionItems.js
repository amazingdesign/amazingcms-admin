import { useEffect } from 'react'

import { useSelector } from 'react-redux'
import { useService } from './redux-rest-services/useService'

// eslint-disable-next-line max-params
export const useCollectionItems = (collectionName, id, params, fetchOptions) => {
  const method = id ? 'get' : 'find'

  const service = useService('actions')
  const data = useSelector(state => state.actions[method].data)
  const isLoading = useSelector(state => state.actions.isLoading)
  const isError = useSelector(state => state.actions.isError)
  const touched = useSelector(state => state.actions.touched)

  useEffect(() => {
    if (id) {
      service.get({ collectionName, id, ...params }, fetchOptions)
    } else {
      service.find({ collectionName, ...params }, fetchOptions)
    }
  }, [collectionName, id])

  return {
    ...service,
    data,
    isLoading,
    isError,
    touched,
  }
}

export default useCollectionItems