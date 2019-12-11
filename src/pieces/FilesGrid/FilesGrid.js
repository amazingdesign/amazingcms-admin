import React from 'react'
import PropTypes from 'prop-types'

import formatBytes from '@bit/amazingdesign.utils.format-bytes'

import { Button, Typography, Tooltip } from '@material-ui/core'
import { Delete as DeleteIcon, Link as LinkIcon, CloudDownload as CloudDownloadIcon } from '@material-ui/icons'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import FileCard from './FileCard'

const makeSrc = (file) => window._env_.REACT_APP_API_URL + '/downloader/' + file._id

const makeDesc = (file) => [
  <Typography key={'title'} style={{ fontSize: 'small' }} noWrap={true} component={'p'}>
    <b>Title:</b> {file.filename}
  </Typography>,
  <Typography key={'createdAt'} style={{ fontSize: 'small' }} noWrap={true} component={'p'}>
    <b>Created at:</b> {file.uploadDate}
  </Typography>,
  <Typography key={'type'} style={{ fontSize: 'small' }} noWrap={true} component={'p'}>
    <b>Type:</b> {file.metadata.mimetype}
  </Typography>,
  <Typography key={'size'} style={{ fontSize: 'small' }} noWrap={true} component={'p'}>
    <b>Size:</b> {formatBytes(file.length)}
  </Typography>,
]

const makeActions = (props) => (file) => [
  <Tooltip key={'delete'} title={'Delete'}>
    <Button size={'small'} color={'primary'} onClick={props.onDelete}>
      <DeleteIcon />
    </Button>
  </Tooltip>,
  <Tooltip key={'download'} title={'Download'}>
    <Button size={'small'} color={'primary'} onClick={() => window.open(makeSrc(file))}>
      <CloudDownloadIcon />
    </Button>
  </Tooltip>,
  <Tooltip key={'copyLink'} title={'Copy download link'}>
    <CopyToClipboard text={makeSrc(file)} >
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

const FilesGrid = ({ data, bucketName, onDelete }) => (
  <div style={styles.root}>
    {
      data &&
      data.map((file) => (
        <FileCard
          key={file._id}
          src={makeSrc(file)}
          title={file.filename}
          desc={makeDesc(file)}
        >
          {makeActions({ onDelete })(file)}
        </FileCard>
      ))
    }
  </div >
)

FilesGrid.propTypes = {
  data: PropTypes.array,
  bucketName: PropTypes.string,
  onDelete: PropTypes.func,
}

export default FilesGrid