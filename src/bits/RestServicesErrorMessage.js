import React from 'react'
import PropTypes from 'prop-types'

import { useSelector } from 'react-redux'

import DefaultErrorMessage from './ErrorMessage'

const RestServicesErrorMessage = ({ component, serviceName, children, ...otherProps }) => {
  const ErrorMessage = component || DefaultErrorMessage
  const isError = useSelector(state => (
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
  serviceName: PropTypes.string.isRequired,
}

export default RestServicesErrorMessage