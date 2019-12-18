import React from 'react'

import { useParams } from 'react-router'
import { useDispatch } from 'react-redux'
import { push } from 'connected-react-router'

import { useTranslation } from 'react-i18next'

import { Typography } from '@material-ui/core'
import { ArrowBack } from '@material-ui/icons'

import { Uniform } from '../../../../bits/uniforms/Uniform'
import { useDataItemFromStore } from '../../../../bits/redux-rest-services/useDataItemFromStore'
import { useService } from '../../../../bits/redux-rest-services/useService'

import Page from '../../../../bits/Page'
import Button from '../../../../pieces/Button'
import CheckCollectionPermissions from '../../../../bits/CheckCollectionPermissions'

const EditCollectionPage = (props) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const { collectionName } = useParams()
  const collectionData = useDataItemFromStore('collections', { query: { name: collectionName } })
  const { create } = useService('actions', { collectionName })

  const schema = collectionData && collectionData.schema

  const goBack = () => dispatch(push(`/collections/${collectionName}`))

  const onSubmit = (data) => create({}, { data }).then(goBack)

  return (
    <CheckCollectionPermissions
      collectionData={collectionData}
      checks={['create']}
    >
      <Page
        usePaper={true}
        childrenAbove={
          <Button
            onClick={goBack}
            variant={'text'}
            startIcon={<ArrowBack />}
          >
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
    </CheckCollectionPermissions>
  )
}

EditCollectionPage.propTypes = {}

export default EditCollectionPage