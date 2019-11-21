import React from 'react'

import { useParams } from 'react-router'
import { useDispatch } from 'react-redux'
import { push } from 'connected-react-router'

import { useTranslation } from 'react-i18next'

import { Typography } from '@material-ui/core'

import { Uniform } from '../../../../bits/uniforms/Uniform'
import { useDataItemFromStore } from '../../../../bits/redux-rest-services/useDataItemFromStore'
import { useService } from '../../../../bits/redux-rest-services/useService'

import Page from '../../../../pieces/Page'
import Button from '../../../../pieces/Button'

const EditSystemCollectionPage = (props) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const { collectionName } = useParams()
  const collectionData = useDataItemFromStore('system-collections', { query: { name: collectionName } })
  const { create } = useService(collectionName)

  const schema = collectionData && collectionData.schema

  const goBack = () => dispatch(push(`/system-collections/${collectionName}`))

  const onSubmit = (data) => create({}, { data }).then(goBack)

  return (
    <Page
      usePaper={true}
      childrenAbove={
        <Button onClick={goBack}>
          {t('Go back!')}
        </Button>
      }
    >
      <Typography variant={'h5'}>
        {t('Add new item')}
      </Typography>
      <Uniform
        schema={schema}
        onSubmit={onSubmit}
      />
    </Page>
  )
}

EditSystemCollectionPage.propTypes = {}

export default EditSystemCollectionPage