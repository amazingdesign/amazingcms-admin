import React from 'react'
import PropTypes from 'prop-types'

import FileIcon, { defaultStyles } from 'react-file-icon'
import mime from 'mime-types'

const styles = {
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
}

const MimeTypeIcon = ({ mimetype, ...otherProps }) => {
  const ext = mime.extension(mimetype) || mimetype.split('/')[0]

  return (
    <div style={styles.root}>
      <FileIcon
        extension={ext}
        {...defaultStyles[ext]}
        {...otherProps}
      />
    </div>
  )
}

MimeTypeIcon.propTypes = {
  mimetype: PropTypes.string.isRequired,
}

export default MimeTypeIcon