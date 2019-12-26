import React, { useMemo } from 'react'

import { mapValues } from 'lodash'

import { useDispatch } from 'react-redux'

import { instances } from 'redux-rest-services'
import RestServicesLoader from './RestServicesLoader'
import RestServicesErrorMessage from './RestServicesErrorMessage'

export const useService = (serviceName, globalParams, globalFetchOptions) => {
  if (!serviceName) throw Error('you must specify service name!')

  const instance = instances[0]
  if (!instance) throw Error('redux-rest-services main instance not found!')

  const serviceActions = instance.actions[serviceName]
  const syncActions = instance.syncActions[serviceName]
  if (!serviceActions || !syncActions) throw Error(`service "${serviceName}" not found!`)

  const dispatch = useDispatch()

  const boundActions = useMemo(() => mapValues(
    serviceActions,
    (action) => (params, fetchOptions) => dispatch(
      action({ ...globalParams, ...params }, { ...globalFetchOptions, ...fetchOptions })
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  ), [serviceActions, JSON.stringify(globalParams), JSON.stringify(globalFetchOptions)])

  const Loader = useMemo(() => {
    const Loader = (props) => <RestServicesLoader serviceName={serviceName} {...props} />
    return Loader
  }, [serviceName])
  const ErrorMessage = useMemo(() => {
    const ErrorMessage = (props) => <RestServicesErrorMessage serviceName={serviceName} {...props} />
    return ErrorMessage
  }, [serviceName])

  return useMemo(() => ({
    ...boundActions,
    Loader,
    ErrorMessage,
    syncActions,
  }), [boundActions, syncActions, Loader, ErrorMessage])
}