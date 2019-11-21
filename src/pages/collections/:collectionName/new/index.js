import React from 'react'

import { useParams } from 'react-router'
import { useTranslation } from 'react-i18next'

import { Typography } from '@material-ui/core'

import { Uniform } from '../../../../bits/uniforms/Uniform'
import { useCollectionData } from '../../../../bits/useCollectionData'
import { useService } from '../../../../bits/redux-rest-services/useService'

import Page from '../../../../pieces/Page'

const EditCollectionPage = (props) => {
  const { t } = useTranslation()

  const { collectionName } = useParams()
  const collectionData = useCollectionData(collectionName)
  const { create } = useService('actions', { collectionName })

  const schema = collectionData && collectionData.validator

  return (
    <Page usePaper={true}>
      <Typography variant={'h5'}>
        {t('Add new item')}
      </Typography>
      <Uniform
        schema={schema}
        onSubmit={(data) => create({}, { data })}
      />
    </Page>
  )
}

EditCollectionPage.propTypes = {}

export default EditCollectionPage