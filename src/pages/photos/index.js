import React from 'react'

import { useParams } from 'react-router'

import FilesEditor from '../../bits/FilesEditor'

const FilesPage = (props) => {
  const { bucketName } = useParams()

  return (
    <FilesEditor
      bucketName={bucketName || 'photos'}
      dropzoneProps={{
        accept: ['image/jpeg', 'image/png'],
        acceptDesc: ['*.jpeg', '*.png'],
        maxSize: 10485760, // 10 MB
      }}
    />
  )
}

FilesPage.propTypes = {}

export default FilesPage