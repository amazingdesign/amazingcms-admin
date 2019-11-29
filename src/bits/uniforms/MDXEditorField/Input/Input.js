import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'

import BackgroundFieldWrapper from '../BackgroundFieldWrapper'

const styles = theme => ({
  root: {
    backgroundColor: '#fff',
    border: 'none',
    borderRadius: 4,
  },
})

const Input = (props) => {
  const {
    name,
    value,
    onChange,
    isFullScreen,
    editorComponent,
    ...custom
  } = props

  const Editor = editorComponent

  return (
    <BackgroundFieldWrapper style={{
      marginTop: 0,
      display: 'flex',
    }
    }>
      <Editor 
        value={value}
        name={name}
        onChange={onChange}
        isFullScreen={isFullScreen}
        {...custom}
      />
    </BackgroundFieldWrapper>
  )
}

Input.propTypes = {
  isFullScreen: PropTypes.bool,
  name: PropTypes.string.isRequired,
  label: PropTypes.node.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  editorComponent: PropTypes.func.isRequired,
}


export default withStyles(styles)(Input)