import React from 'react'
import PropTypes from 'prop-types'

import { List, Typography } from '@material-ui/core'

import MUXSingleUpload from './MUXSingleUpload'

const MUXUploader = ({ files, doNotRefreshText, uploadingText, errorUploadingText, successUploadingText }) => {
  return (
    <>
      <Typography variant={'h6'}>
        {doNotRefreshText}
      </Typography>
      <List>
        {
          files && files.map((file, i) => (
            <MUXSingleUpload
              key={i}
              file={file}
              uploadingText={uploadingText}
              errorUploadingText={errorUploadingText}
              successUploadingText={successUploadingText}
            />
          ))
        }
      </List>
    </>
  )
}

MUXUploader.defaultProps = {
  doNotRefreshText: 'Do not refresh or exit page during upload!',
}


MUXUploader.propTypes = {
  files: PropTypes.arrayOf(PropTypes.object).isRequired,
  doNotRefreshText: PropTypes.string,
  uploadingText: PropTypes.string,
  errorUploadingText: PropTypes.string,
  successUploadingText: PropTypes.string,
}

export default MUXUploader