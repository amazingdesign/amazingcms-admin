import React, { useMemo } from 'react'

import { useStore } from 'react-redux'

import { getService } from './getService'
import RestServicesLoader from './RestServicesLoader'
import RestServicesErrorMessage from './RestServicesErrorMessage'

export const useService = (serviceName, globalParams, globalFetchOptions) => {
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