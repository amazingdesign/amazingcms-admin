import React from 'react'

import { useParams } from 'react-router'

import { useTranslation } from 'react-i18next'

import { Typography } from '@material-ui/core'

import { Uniform } from '../../../../bits/uniforms/Uniform'
import { useDataItemFromStore } from '../../../../bits/redux-rest-services/useDataItemFromStore'
import { useServiceLoaded } from '../../../../bits/redux-rest-services/useServiceLoaded'

import Page from '../../../../bits/Page'
import CheckCollectionPermissions from '../../../../bits/CheckCollectionPermissions'

const EditCollectionPage = (props) => {
  const { t } = useTranslation()

  const { collectionName } = useParams()
  const collectionData = useDataItemFromStore('collections', { query: { name: collectionName } })
  const { ErrorMessage, Loader, create, data, find } = useServiceLoaded('actions', { raw: true, collectionName })

  const singletonData = data && data.rows && data.rows[0]

  const schema = collectionData && collectionData.schema

  const onSubmit = (data) => create({}, { data }).then(() => find({ raw: undefined }))

  return (
    <CheckCollectionPermissions
      collectionData={collectionData}
      checks={['update']}
    >
      <Page
        usePaper={true}
      >
        <ErrorMessage message={t('Error occurred!')}>
          <Loader>
            <Typography variant={'h5'}>
              {t('Edit item')}
            </Typography>
            <Uniform
              schema={schema}
              model={singletonData}
              onSubmit={onSubmit}
              submitLabel={t('Submit')}
            />
          </Loader>
        </ErrorMessage>
      </Page>
    </CheckCollectionPermissions>
  )
}

EditCollectionPage.propTypes = {}

export default EditCollectionPage