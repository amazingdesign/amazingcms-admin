import React, { useMemo } from 'react'

import { mapValues } from 'lodash'

import { useDispatch } from 'react-redux'

import { instances } from 'redux-rest-services'
import RestServicesLoader from './RestServicesLoader'
import RestServicesErrorMessage from './RestServicesErrorMessage'

export const useService = (serviceName, options) => {
  if (!serviceName) throw Error('you must specify service name!')

  const instance = instances[0]
  if (!instance) throw Error('redux-rest-services main instance not found!')

  const service = instance[serviceName]
  if (!service) throw Error(`service "${serviceName}" not found!`)

  const dispatch = useDispatch()

  const boundActions = useMemo(() => mapValues(
    service.actions,
    (action) => (...all) => dispatch(action(...all))
  ), [service.actions])

  const Loader = (props) => <RestServicesLoader serviceName={serviceName} {...props} />
  const ErrorMessage = (props) => <RestServicesErrorMessage serviceName={serviceName} {...props} />

  return {
    ...boundActions,
    Loader,
    ErrorMessage,
  }
}