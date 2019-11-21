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

  const service = instance[serviceName]
  if (!service) throw Error(`service "${serviceName}" not found!`)

  const dispatch = useDispatch()

  const boundActions = useMemo(() => mapValues(
    service.actions,
    (action) => (params, fetchOptions) => dispatch(
      action({ ...globalParams, ...params }, { ...globalFetchOptions, ...fetchOptions })
    )
  ), [serviceName, JSON.stringify(globalParams), JSON.stringify(globalFetchOptions)])

  const Loader = (props) => <RestServicesLoader serviceName={serviceName} {...props} />
  const ErrorMessage = (props) => <RestServicesErrorMessage serviceName={serviceName} {...props} />

  return {
    ...boundActions,
    Loader,
    ErrorMessage,
  }
}