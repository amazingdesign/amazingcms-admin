import React from 'react'
import PropTypes from 'prop-types'

import { useService } from '../bits/redux-rest-services/useService'

import Dropzone from '../bits/Dropzone'

const FileUploaderDropzone = ({ accept, acceptDesc, buttonProps, dropzoneProps }) => {
  const { sendFiles } = useService('uploader')

  const onFilesSubmit = (acceptedFiles, rejectedFiles) => {
    if (acceptedFiles.length === 0) return

    const formData = new FormData()
    acceptedFiles.forEach((file) => {
      formData.append('fs', file, file.name)
    })

    return sendFiles({}, { data: formData })
  }

  return (
    <>
      <Dropzone
        onSubmit={onFilesSubmit}
        buttonProps={buttonProps}
        dropzoneProps={dropzoneProps}
        acceptDesc={acceptDesc}
      />
    </>
  )
}

FileUploaderDropzone.propTypes = {
  buttonProps: PropTypes.object,
  dropzoneProps: PropTypes.object,
  accept: PropTypes.arrayOf(PropTypes.string),
  acceptDesc: PropTypes.arrayOf(PropTypes.string),
}

export default FileUploaderDropzone