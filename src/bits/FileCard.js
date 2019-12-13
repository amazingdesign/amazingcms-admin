import React from 'react'
import PropTypes from 'prop-types'

import formatBytes from '@bit/amazingdesign.utils.format-bytes'

import { Typography } from '@material-ui/core'

import { makeSrc } from './amazing-cms/makeDownloaderSrc'

import MimeTypeIcon from './MimeTypeIcon'
import MediaCard from './MediaCard'

const makeThumbnailSrc = (bucketName, file) => (
  makeSrc(bucketName)(file) +
  '?resize=' +
  encodeURIComponent(JSON.stringify({ height: 280 }))
)

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


const FileCard = ({ file, bucketName, onClick, ...otherProps }) => {
  if(!file || !file.metadata) return null

  const isFileAnImage = ['image/jpeg', 'image/png'].includes(file.metadata.mimetype)

  const src = (
    isFileAnImage ?
      makeThumbnailSrc(bucketName, file)
      :
      null
  )

  const mediaContent = (
    !isFileAnImage ?
      <MimeTypeIcon
        size={100}
        mimetype={file.metadata.mimetype}
      />
      :
      null
  )

  return (
    <MediaCard
      key={file._id}
      src={src}
      mediaContent={mediaContent}
      title={file.filename}
      desc={makeDesc(file)}
      onClick={() => onClick && onClick(file)}
      {...otherProps}
    />
  )
}

FileCard.propTypes = {
  file: PropTypes.object,
  onClick: PropTypes.func,
  bucketName: PropTypes.string.isRequired,
}

export default FileCard