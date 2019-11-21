import React from 'react'
import PropTypes from 'prop-types'

import { useSelector } from 'react-redux'

import DefaultErrorMessage from '../ErrorMessage'

const RestServicesErrorMessage = ({ component, serviceName, actionName, children, ...otherProps }) => {
  const ErrorMessage = component || DefaultErrorMessage
  const isError = useSelector(state => (
    actionName ?
      state &&
      state[serviceName] &&
      state[serviceName][actionName] &&
      state[serviceName][actionName].isError
      :
      state &&
      state[serviceName] &&
      state[serviceName].isError
  ))

  return (
    isError ?
      <ErrorMessage {...otherProps} />
      :
      children
  )
}

RestServicesErrorMessage.propTypes = {
  children: PropTypes.node,
  component: PropTypes.func,
  actionName: PropTypes.string,
  serviceName: PropTypes.string.isRequired,
}

export default RestServicesErrorMessage