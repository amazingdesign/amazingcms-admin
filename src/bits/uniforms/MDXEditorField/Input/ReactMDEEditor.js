import React from 'react'
import PropTypes from 'prop-types'

import ReactMde from 'react-mde'
import 'react-mde/lib/styles/css/react-mde-all.css'
import './ReactMDEEditor.css'

import BackgroundFieldWrapper from '../BackgroundFieldWrapper'

const ReactMDEEditor = (props) => {
  const {
    value,
    onChange,
  } = props

  const minEditorHeight = (window.innerHeight - 270)

  return (
    <BackgroundFieldWrapper
      style={{
        backgroundColor: '#fff',
        margin: 0,
        padding: 0,
      }}
    >
      <div className={'ReactMDEEditor'}>
        <ReactMde
          value={value}
          onChange={onChange}
          minEditorHeight={minEditorHeight}
        />
      </div>
    </BackgroundFieldWrapper>
  )
}

ReactMDEEditor.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default ReactMDEEditor