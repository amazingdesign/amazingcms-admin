import React from 'react'
import PropTypes from 'prop-types'

import { useService } from '../bits/redux-rest-services/useService'

import Dropzone from '../bits/Dropzone'

const FileUploaderDropzone = ({ bucketName, serviceName, acceptDesc, buttonProps, dropzoneProps }) => {
  const { sendFiles, find } = useService(serviceName, { bucketName })

  const onFilesSubmit = (acceptedFiles, rejectedFiles) => {
    if (acceptedFiles.length === 0) return

    const formData = new FormData()
    acceptedFiles.forEach((file) => {
      formData.append(bucketName, file, file.name)
    })

    return sendFiles({}, { data: formData }).then(() => find({ pageSize: Number.MAX_SAFE_INTEGER }))
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

FileUploaderDropzone.defaultProps = {
  bucketName: 'fs',
  serviceName: 'uploader',
}

FileUploaderDropzone.propTypes = {
  buttonProps: PropTypes.object,
  dropzoneProps: PropTypes.object,
  bucketName: PropTypes.string.isRequired,
  serviceName: PropTypes.string.isRequired,
  acceptDesc: PropTypes.arrayOf(PropTypes.string),
}

export default FileUploaderDropzone