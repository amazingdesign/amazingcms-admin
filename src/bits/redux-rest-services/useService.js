import React, { useMemo } from 'react'

import { useStore } from 'react-redux'

import { getService } from './getService'
import RestServicesLoader from './RestServicesLoader'
import RestServicesErrorMessage from './RestServicesErrorMessage'

const isOptionsObject = (obj) => (
  obj.globalParams !== undefined ||
  obj.globalFetchOptions !== undefined
)

// eslint-disable-next-line max-params
export const useService = (serviceName, secondArg = {}, thirdArg = {}, fourthArg = {}) => {
  // fallback - useService can be used with options as second arg
  // or as before 0.1.0 with 4 args  (name, globalParams, globalFetchOptions, options)
  const {
    globalParams,
    globalFetchOptions,
  } = isOptionsObject(secondArg) ? secondArg : { globalParams: secondArg, globalFetchOptions: thirdArg, ...fourthArg }

  const store = useStore()
  const service = getService(store, serviceName, globalParams, globalFetchOptions)

  const Loader = useMemo(() => {
    const Loader = (props) => <RestServicesLoader serviceName={serviceName} {...props} />
    return Loader
  }, [serviceName])
  const ErrorMessage = useMemo(() => {
    const ErrorMessage = (props) => <RestServicesErrorMessage serviceName={serviceName} {...props} />
    return ErrorMessage
  }, [serviceName])

  return useMemo(() => ({
    ...service,
    Loader,
    ErrorMessage,
  }), [service, Loader, ErrorMessage])
}