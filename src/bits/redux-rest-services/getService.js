/* eslint-disable max-params */
import memoizee from 'memoizee'
import { mapValues } from 'lodash'
import { instances } from 'redux-rest-services'

const parseJSON = (paramsJSON) => {
  let parsedParams = JSON.stringify(paramsJSON) === paramsJSON ? paramsJSON : {}

  try {
    parsedParams = JSON.parse(paramsJSON)
  } catch (error) {
    console.error('Unable to parse globalParams using instead:', paramsJSON)
  }

  return parsedParams
}

const makeBoundActions = memoizee((dispatch, serviceActions, globalParamsJSON, globalFetchOptionsJSON) => {
  let globalParams = parseJSON(globalParamsJSON)
  let globalFetchOptions = parseJSON(globalFetchOptionsJSON)

  return mapValues(
    serviceActions,
    (action) => (params, fetchOptions) => dispatch(
      action({ ...globalParams, ...params }, { ...globalFetchOptions, ...fetchOptions })
    )
  )
})

const makeDataGetters = memoizee((store, serviceName) => ({
  getData: () => store.getState()[serviceName].data,
  getRawData: () => store.getState()[serviceName].rawData,
  getIsLoading: () => store.getState()[serviceName].isLoading,
  getIsError: () => store.getState()[serviceName].isError,
  getTouched: () => store.getState()[serviceName].touched,
}))

const makeResponse = memoizee((dataGetters, boundActions, syncActions) => ({
  ...dataGetters,
  ...boundActions,
  syncActions,
}))

export const getService = (store, serviceName, globalParams, globalFetchOptions) => {
  if (!store || typeof store !== 'object') throw Error('you have to pass store!')
  if (!serviceName) throw Error('you must specify service name!')

  const instance = instances[0]
  if (!instance) throw Error('redux-rest-services main instance not found!')

  const serviceActions = instance.actions[serviceName]
  const syncActions = instance.syncActions[serviceName]
  if (!serviceActions || !syncActions) throw Error(`service "${serviceName}" not found!`)

  const boundActions = makeBoundActions(
    store.dispatch,
    serviceActions,
    JSON.stringify(globalParams),
    JSON.stringify(globalFetchOptions)
  )

  const dataGetters = makeDataGetters(store, serviceName)

  return makeResponse(dataGetters, boundActions, syncActions)
}