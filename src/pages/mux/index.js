import React, { useState } from 'react'

import { useTranslation } from 'react-i18next'

import Page from '../../bits/Page'
import Dropzone from '../../bits/Dropzone'
import MUXUploader from './MUXUploader'

const MuxPage = (props) => {
  const { t } = useTranslation()
  const [files, setFiles] = useState([])
  return (
    <Page
      usePaper={true}
    >
      {
        files && files.length === 0 ?
          <Dropzone
            onSubmit={setFiles}
          />
          :
          <MUXUploader
            files={files}
            doNotRefreshText={t('Do not refresh or exit page during upload!')}
            uploadingText={t('Uploading')}
            errorUploadingText={t('Error!')}
            successUploadingText={t('Success!')}
          />
      }
    </Page>
  )
}

MuxPage.propTypes = {}

export default MuxPage