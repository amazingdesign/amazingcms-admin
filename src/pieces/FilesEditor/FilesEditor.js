import React from 'react'
import PropTypes from 'prop-types'

import { useTranslation } from 'react-i18next'
import { useServiceLoaded } from '../../bits/redux-rest-services/useServiceLoaded'

import Page from '../../pieces/Page'
import FileUploaderDropzone from '../../pieces/FileUploaderDropzone'
import FilesGrid from '../../pieces/FilesGrid'

const FilesEditor = (props) => {
  const { t } = useTranslation()

  const {
    Loader,
    ErrorMessage,
    data,
    find,
    delete: remove,
    isLoading,
  } = useServiceLoaded(
    'uploader',
    {
      pageSize: Number.MAX_SAFE_INTEGER,
      bucketName: props.bucketName,
    }
  )

  return (
    <>
      {
        !isLoading &&
        <Page usePaper={true} style={{ minHeight: 250 }}>
          <FileUploaderDropzone
            dropzoneProps={props.dropzoneProps}
            bucketName={props.bucketName}
          />
        </Page>
      }

      <Page>
        <ErrorMessage actionName={'find'} message={t('Error occurred!')}>
          <Loader>
            <FilesGrid
              data={data}
              onDelete={(id) => remove({ id }).then(() => find({ pageSize: Number.MAX_SAFE_INTEGER }))}
              bucketName={props.bucketName}
            />
          </Loader>
        </ErrorMessage>
      </Page>

    </>
  )
}

FilesEditor.defaultProps = {
  bucketName: 'fs',
  dropzoneProps: {
    accept: ['image/jpeg', 'image/png'],
    maxSize: 10485760, // 10 MB
  },
}

FilesEditor.propTypes = {
  bucketName: PropTypes.string.isRequired,
  dropzoneProps: PropTypes.object.isRequired,
}

export default FilesEditor