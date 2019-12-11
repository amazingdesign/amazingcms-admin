import React from 'react'

import { useParams } from 'react-router'
import { useDispatch } from 'react-redux'
import { push } from 'connected-react-router'

import { useTranslation } from 'react-i18next'

import { Typography } from '@material-ui/core'

import { Uniform } from '../../../../bits/uniforms/Uniform'
import { useDataItemFromStore } from '../../../../bits/redux-rest-services/useDataItemFromStore'
import { useServiceLoaded } from '../../../../bits/redux-rest-services/useServiceLoaded'

import Page from '../../../../bits/Page'
import Button from '../../../../pieces/Button'

const EditCollectionPage = (props) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const { collectionName, id } = useParams()
  const collectionData = useDataItemFromStore('collections', { query: { name: collectionName } })
  const { ErrorMessage, Loader, update, data } = useServiceLoaded('actions', { raw: true, collectionName, id })

  const schema = collectionData && collectionData.schema

  const goBack = () => dispatch(push(`/collections/${collectionName}`))

  const onSubmit = (data) => update({}, { data }).then(goBack)

  return (
    <Page
      usePaper={true}
      childrenAbove={
        <Button onClick={goBack}>
          {t('Go back!')}
        </Button>
      }
    >
      <ErrorMessage message={t('Error occurred!')}>
        <Loader>
          <Typography variant={'h5'}>
            {t('Edit item')}
          </Typography>
          <Uniform
            schema={schema}
            model={data}
            onSubmit={onSubmit}
          />
        </Loader>
      </ErrorMessage>
    </Page>
  )
}

EditCollectionPage.propTypes = {}

export default EditCollectionPage