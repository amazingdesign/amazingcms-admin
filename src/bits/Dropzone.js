/* eslint-disable max-lines */
import React, { useMemo, useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import formatBytes from '@bit/amazingdesign.utils.format-bytes'

import { useDropzone } from 'react-dropzone'
import { useTranslation } from 'react-i18next'
import { Button, Typography } from '@material-ui/core'

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out',
}

const activeStyle = {
  borderColor: '#2196f3',
}

const acceptStyle = {
  borderColor: '#00e676',
}

const rejectStyle = {
  borderColor: '#ff1744',
}

const makeFileListItem = (file) => (
  <li style={{ fontSize: 'small' }} key={file.path}>
    <Typography style={{ fontSize: 'small' }} noWrap={true} component={'p'}>
      {file.path} - {formatBytes(file.size)}
    </Typography>
  </li>
)

function Dropzone({ acceptDesc, dropzoneProps, onSubmit, buttonProps }) {
  const { t } = useTranslation()

  const [acceptedFiles, setAcceptedFiles] = useState([])
  const [rejectedFiles, setRejectedFiles] = useState([])
  const resetState = () => {
    setAcceptedFiles([])
    setRejectedFiles([])
  }

  const {
    acceptedFiles: acceptedFilesDropzone,
    rejectedFiles: rejectedFilesDropzone,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({ ...dropzoneProps })

  useEffect(() => {
    setAcceptedFiles(acceptedFiles.concat(acceptedFilesDropzone))
    setRejectedFiles(rejectedFiles.concat(rejectedFilesDropzone))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [acceptedFilesDropzone, rejectedFilesDropzone])

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isDragActive ? activeStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {}),
  }), [
    isDragActive,
    isDragAccept,
    isDragReject,
  ])

  const acceptedFilesItems = acceptedFiles.map(makeFileListItem)
  const rejectedFilesItems = rejectedFiles.map(makeFileListItem)

  return (
    <section className="container">
      <div {...getRootProps({ className: 'dropzone', style })}>
        <input {...getInputProps()} />
        <p>
          {t('Drag and drop some files here, or click to select files')}
        </p>
        {
          dropzoneProps.accept &&
          <em>
            {t('Only files listed here will be accepted')}:
            {
              acceptDesc ?
                acceptDesc.join(', ') :
                dropzoneProps && dropzoneProps.accept.join(', ')
            }
          </em>
        }
        {
          dropzoneProps.maxSize &&
          <em>
            {t('Max size of file is')}: {formatBytes(dropzoneProps.maxSize)}
          </em>
        }
      </div>
      <aside>
        {
          acceptedFiles.length > 0 ?
            <>
              <h4>{t('Files ready to be send')}:</h4>
              <ol>
                {acceptedFilesItems}
              </ol>
            </>
            :
            null
        }
        {
          rejectedFiles.length > 0 ?
            <>
              <h4>{t('Rejected files')}:</h4>
              <ol>
                {rejectedFilesItems}
              </ol>
            </>
            :
            null
        }
      </aside>
      {
        onSubmit && acceptedFiles.length > 0 ?
          <Button
            style={{ margin: '1rem 0 0.5rem 0' }}
            fullWidth={true}
            variant={'contained'}
            color={'primary'}
            onClick={() => onSubmit(acceptedFiles, rejectedFiles)}
            {...buttonProps}
          >
            {t('SEND FILES')}
          </Button>
          :
          null
      }
      {
        acceptedFiles.length > 0 || rejectedFiles.length > 0 ?
          < Button
            fullWidth={true}
            onClick={resetState}
            {...buttonProps}
          >
            {t('RESET CHOSEN FILES')}
          </Button>
          :
          null
      }
    </section >
  )
}

Dropzone.propTypes = {
  onSubmit: PropTypes.func,
  buttonProps: PropTypes.object,
  dropzoneProps: PropTypes.object,
  acceptDesc: PropTypes.arrayOf(PropTypes.string),
}

export default Dropzone