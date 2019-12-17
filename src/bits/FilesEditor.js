import React from 'react'
import PropTypes from 'prop-types'

import { useTranslation } from 'react-i18next'

import { useServiceLoaded } from './redux-rest-services/useServiceLoaded'

import { useDataItemFromStore } from './redux-rest-services/useDataItemFromStore'
import CheckCollectionPermissions from './CheckCollectionPermissions'
import FileUploaderDropzone from './FileUploaderDropzone'
import FilesGrid from './FilesGrid'
import Page from './Page'

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

  const collectionData = useDataItemFromStore('system-collections', { query: { name: 'uploader' } })

  return (
    <CheckCollectionPermissions collectionData={collectionData}>
      {
        ({ userCan }) => (
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
                    onClick={props.onClick}
                    onDelete={(id) => remove({ id }).then(() => find({ pageSize: Number.MAX_SAFE_INTEGER }))}
                    bucketName={props.bucketName}
                    display={{
                      remove: userCan.remove,
                      download: true,
                      link: true,
                    }}
                  />
                </Loader>
              </ErrorMessage>
            </Page>
          </>
        )
      }

    </CheckCollectionPermissions>
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
  onClick: PropTypes.func,
}

export default FilesEditor