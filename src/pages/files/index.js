import React from 'react'

import { useParams } from 'react-router'

import FilesEditor from '../../bits/FilesEditor'

const FilesPage = (props) => {
  const { bucketName } = useParams()

  return (
    <FilesEditor
      bucketName={bucketName || 'files'}
      dropzoneProps={{
        // there is no accept prop so all files will be accepted
        maxSize: 10485760, // 10 MB
      }}
    />
  )
}

FilesPage.propTypes = {}

export default FilesPage