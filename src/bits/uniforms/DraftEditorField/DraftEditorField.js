import React from 'react'
import PropTypes from 'prop-types'

import { connectField } from 'uniforms'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

import { useTranslation } from 'react-i18next'

import FileButton from './FileButton'
import toolbar from './toolbar'

const isEmptyObject = (obj) => Object.entries(obj).length === 0 && obj.constructor === Object

const DraftEditorField = ({ onChange, value, label, serviceName, bucketName, ...otherProps }) => {
  const { i18n } = useTranslation()

  const contentState = (
    typeof value !== 'object' || isEmptyObject(value) ?
      null
      :
      value
  )

  return (
    <div>
      <h2>{label}</h2>
      <Editor
        toolbar={toolbar}
        toolbarCustomButtons={[<FileButton key={'file-button'} />]}

        initialContentState={contentState}
        onContentStateChange={onChange}

        localization={{
          locale: i18n.language,
        }}
        editorStyle={{
          borderRadius: 2,
          border: '1px solid #F1F1F1',
          padding: '0 15px',
        }}
        wrapperStyle={{
          marginBottom: 20,
        }}
        stripPastedStyles={true}

        {...otherProps}
      />
    </div>
  )
}

DraftEditorField.defaultProps = {
  bucketName: 'photos',
  serviceName: 'uploader',
}

DraftEditorField.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  bucketName: PropTypes.string.isRequired,
  serviceName: PropTypes.string.isRequired,
}

export default connectField(DraftEditorField)