import React from 'react'
import PropTypes from 'prop-types'

import SimpleMDE from 'react-simplemde-editor'
import 'easymde/dist/easymde.min.css'

import BackgroundFieldWrapper from '../BackgroundFieldWrapper'


const SimpleMDEEditor = (props) => {
  const {
    value,
    onChange,
  } = props

  return (
    <BackgroundFieldWrapper
      style={{
        backgroundColor: '#fff',
        margin: 0,
        padding: 0,
      }}
    >
      <SimpleMDE
        value={value}
        onChange={onChange}
        options={{
          autofocus: false,
          spellChecker: false,
          toolbar: [
            'bold',
            'italic',
            'strikethrough',
            'heading',
            '|',
            'code',
            'quote',
            'horizontal-rule',
            '|',
            'unordered-list',
            'ordered-list',
            'clean-block',
            '|',
            'image',
            'link',
            'table',
            '|',
            'guide',
          ],
        }}
      />
    </BackgroundFieldWrapper>
  )
}

SimpleMDEEditor.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default SimpleMDEEditor