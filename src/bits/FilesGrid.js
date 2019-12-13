/* eslint-disable max-lines */
import React from 'react'
import PropTypes from 'prop-types'

import { useTranslation } from 'react-i18next'

import withConfirm from 'material-ui-confirm'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import { Button, Tooltip } from '@material-ui/core'
import { Delete as DeleteIcon, Link as LinkIcon, CloudDownload as CloudDownloadIcon } from '@material-ui/icons'

import { makeSrc } from './amazing-cms/makeDownloaderSrc'

import FileCard from './FileCard'

const makeActions = ({ bucketName, confirm, onDelete, t }) => (file) => [
  <Tooltip key={'delete'} title={'Delete'}>
    <Button size={'small'} color={'primary'} onClick={() => {
      confirm(
        () => (onDelete(file._id)),
        {
          confirmationText: t('Ok'),
          cancellationText: t('Cancel'),
          title: t('Are you sure?'),
          description: t('This will permanently delete this item!'),
        }
      )()
    }}>
      <DeleteIcon />
    </Button>
  </Tooltip>,
  <Tooltip key={'download'} title={'Download'}>
    <Button size={'small'} color={'primary'} onClick={() => window.open(makeSrc(bucketName)(file))}>
      <CloudDownloadIcon />
    </Button>
  </Tooltip>,
  <Tooltip key={'copyLink'} title={'Copy download link'}>
    <CopyToClipboard text={makeSrc(bucketName, file)} >
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

const FilesGrid = ({ data, confirm, onClick, onDelete, bucketName }) => {
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
            {makeActions({ bucketName, confirm, onDelete, t })(file)}
          </FileCard>
        ))
      }
    </div >
  )
}

FilesGrid.propTypes = {
  data: PropTypes.array,
  bucketName: PropTypes.string,
  onDelete: PropTypes.func,
  onClick: PropTypes.func,
  confirm: PropTypes.func.isRequired,
}

export default withConfirm(FilesGrid)