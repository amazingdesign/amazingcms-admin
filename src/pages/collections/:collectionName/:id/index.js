import React from 'react'

import { useParams } from 'react-router'
import { useTranslation } from 'react-i18next'

import { Typography } from '@material-ui/core'

import { Uniform } from '../../../../bits/uniforms/Uniform'
import { useCollectionData } from '../../../../bits/useCollectionData'
import { useCollectionItems } from '../../../../bits/useCollectionItems'

import Page from '../../../../pieces/Page'

const EditCollectionPage = (props) => {
  const { t } = useTranslation()

  const { collectionName, id } = useParams()
  const collectionData = useCollectionData(collectionName)
  const { ErrorMessage, Loader, update, data } = useCollectionItems(collectionName, id)

  const schema = collectionData && collectionData.validator

  return (
    <Page usePaper={true}>
      <ErrorMessage message={t('Error occurred!')}>
        <Loader>
          <Typography variant={'h5'}>
            {t('Edit item')}
          </Typography>
          <Uniform
            schema={schema}
            model={data}
            onSubmit={(data) => update({}, { data })}
          />
        </Loader>
      </ErrorMessage>
    </Page>
  )
}

EditCollectionPage.propTypes = {}

export default EditCollectionPage