// this is form official uniforms docd
// https://uniforms.tools/docs/tutorials-creating-custom-field

import React from 'react'
import PropTypes from 'prop-types'

import { connectField } from 'uniforms'
import DialogWithButton from '../DialogWithButton'
import FilesEditor from '../../pieces/FilesEditor'
import { FileCard } from '../../pieces/FilesGrid'

import { useTheme } from '@material-ui/core/styles'

import tinycolor from 'tinycolor2'

const styles = {
  root: {
    margin: '1rem 0',
    padding: '1rem',
    borderRadius: 4,
  },
  cardWrapper: { display: 'flex', justifyContent: 'center' },
}

function FileField({ onChange, value, label, bucketName, dropzoneProps }) {
  const theme = useTheme()
  const bgColor = tinycolor(theme.palette.background.paper).darken(2).toRgbString()

  return (
    <div style={{ ...styles.root, backgroundColor: bgColor }}>
      <div style={styles.cardWrapper}>
        <FileCard
          file={value}
          bucketName={bucketName}
        />
      </div>
      <DialogWithButton
        label={label}
        closeDialogProp={'onClick'}
      >
        <FilesEditor
          bucketName={bucketName}
          onClick={onChange}
          dropzoneProps={dropzoneProps}
        />
      </DialogWithButton>
    </div>
  )
}

FileField.defaultProps = {
  label: 'Choose file',
  bucketName: 'photos',
}

FileField.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  bucketName: PropTypes.string.isRequired,
  dropzoneProps: PropTypes.object,
}

export default connectField(FileField)