import React from 'react'

import { useParams } from 'react-router'

import { useTranslation } from 'react-i18next'
import { useServiceLoaded } from '../../bits/redux-rest-services/useServiceLoaded'

import Page from '../../pieces/Page'
import FileUploaderDropzone from '../../pieces/FileUploaderDropzone'
import FilesGrid from '../../pieces/FilesGrid'

const FilesPage = (props) => {
  const { t } = useTranslation()

  const { collectionName } = useParams()

  const {
    Loader,
    ErrorMessage,
    data,
  } = useServiceLoaded('uploader', { pageSize: Number.MAX_SAFE_INTEGER })

  return (
    <>

      <Page usePaper={true} style={{ minHeight: 250 }}>
        <Loader>
          <FileUploaderDropzone
            dropzoneProps={{
              accept: ['image/jpeg', 'image/png'],
              maxSize: 10485760, // 10 MB
            }}
          />
        </Loader>
      </Page>

      <Page>
        <ErrorMessage actionName={'find'} message={t('Error occurred!')}>
          <Loader>
            <FilesGrid
              data={data}
            />
          </Loader>
        </ErrorMessage>
      </Page>

    </>
  )
}

FilesPage.propTypes = {}

export default FilesPage
