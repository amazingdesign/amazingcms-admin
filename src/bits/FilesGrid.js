/* eslint-disable max-lines */
import React from 'react'
import PropTypes from 'prop-types'

import { useTranslation } from 'react-i18next'

import { CopyToClipboard } from 'react-copy-to-clipboard'

import { Button, Tooltip } from '@material-ui/core'
import { Delete as DeleteIcon, Link as LinkIcon, CloudDownload as CloudDownloadIcon } from '@material-ui/icons'

import { makeSrc } from './amazing-cms/makeDownloaderSrc'
import withDeleteConfirm from './withDeleteConfirm'

import FileCard from './FileCard'

const makeActions = ({ bucketName, confirm, onDelete, display, t }) => (file) => [
  display.remove &&
  <Tooltip key={'delete'} title={t('Delete')}>
    <Button size={'small'} color={'primary'} onClick={() => {
      confirm(() => (onDelete(file._id)))()
    }}>
      <DeleteIcon />
    </Button>
  </Tooltip>,
  display.download &&
  <Tooltip key={'download'} title={t('Download')}>
    <Button size={'small'} color={'primary'} onClick={() => window.open(makeSrc(bucketName)(file))}>
      <CloudDownloadIcon />
    </Button>
  </Tooltip>,
  display.link &&
  <Tooltip key={'copyLink'} title={t('Copy download link')}>
    <CopyToClipboard text={makeSrc(bucketName)(file)} >
      <Button size={'small'} color={'primary'}>
        <LinkIcon />
      </Button>
    </CopyToClipboard>
  </Tooltip>,
]

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
}

const FilesGrid = ({ data, confirm, onClick, onDelete, bucketName, display }) => {
  const { t } = useTranslation()

  return (
    <div style={styles.root}>
      {
        data &&
        data.map((file) => (
          <FileCard
            key={file._id}
            file={file}
            bucketName={bucketName}
            onClick={onClick}
          >
            {makeActions({ bucketName, confirm, onDelete, display, t })(file)}
          </FileCard>
        ))
      }
    </div >
  )
}

FilesGrid.defaultProps = {
  display: {
    remove: true,
    download: true,
    link: true,
  },
}

FilesGrid.propTypes = {
  data: PropTypes.array,
  bucketName: PropTypes.string,
  onDelete: PropTypes.func,
  onClick: PropTypes.func,
  confirm: PropTypes.func.isRequired,
  display: PropTypes.object.isRequired,
}

export default withDeleteConfirm(FilesGrid)