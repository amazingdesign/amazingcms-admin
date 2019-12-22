import React from 'react'
import PropTypes from 'prop-types'

import { useSelector } from 'react-redux'

import DefaultLoadingIndicator from '@bit/amazingdesign.react-redux-mui-starter.loading-indictor'

const RestServicesLoader = ({ component, serviceName, children, doNotRenderChildrenWhenLoading, ...otherProps }) => {
  const LoadingIndicator = component || DefaultLoadingIndicator
  const isLoading = useSelector(state => (
    state &&
    state[serviceName] &&
    state[serviceName].isLoading
  ))

  return (
    isLoading ?
      <>
        <LoadingIndicator {...otherProps} />
        {
          doNotRenderChildrenWhenLoading ?
            null
            :
            children
        }
      </>
      :
      children
  )
}

RestServicesLoader.propTypes = {
  children: PropTypes.node,
  component: PropTypes.func,
  serviceName: PropTypes.string.isRequired,
  doNotRenderChildrenWhenLoading: PropTypes.bool,
}

export default RestServicesLoader