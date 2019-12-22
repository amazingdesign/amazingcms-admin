import _ from 'lodash'

import i18n from './i18n'

import { flashErrorMessage } from 'redux-flash'

const t = i18n.t.bind(i18n)

export const addErrorHandler = (servicesDeclarations) => servicesDeclarations.map(
  (serviceDeclaration) => ({
    ...serviceDeclaration,
    onError: (...all) => {
      console.log(...all)
      serviceDeclaration.onError && serviceDeclaration.onError(...all)

      errorHandler(serviceDeclaration)(...all)
    },
  })
)

export const errorHandler = ({ name: serviceName }) => ({ name: actionName, method }, dispatch, getState) => {
  const state = getState()

  const error = _.get(state, `${serviceName}.${actionName}.error`)

  if (!error) return

  dispatch(flashErrorMessage(makeErrorMessage(error)))
}

const makeErrorMessage = ({ code, data, message, name, type }) => {
  switch (type) {
    case 'ENTITY_WITH_THE_SAME_VALUE_EXISTS':
      return t('There is a record with the same value of field that should be unique! Check unique fields!')
    default:
      return message
  }
}

export default errorHandler