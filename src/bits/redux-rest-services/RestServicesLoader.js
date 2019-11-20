import React from 'react'
import PropTypes from 'prop-types'

import { useSelector } from 'react-redux'

import DefaultLoadingIndicator from '@bit/amazingdesign.react-redux-mui-starter.loading-indictor'

const RestServicesLoader = ({ component, serviceName, children, ...otherProps }) => {
  const LoadingIndicator = component || DefaultLoadingIndicator
  const isLoading = useSelector(state => (
    state &&
    state[serviceName] &&
    state[serviceName].isLoading
  ))

  return (
    isLoading ?
      <LoadingIndicator {...otherProps} />
      :
      children
  )
}

RestServicesLoader.propTypes = {
  children: PropTypes.node,
  component: PropTypes.func,
  serviceName: PropTypes.string.isRequired,
}

export default RestServicesLoader