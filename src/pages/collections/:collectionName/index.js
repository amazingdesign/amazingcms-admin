import React from 'react'

import { useParams } from 'react-router'
import { useDispatch } from 'react-redux'
import { push } from 'connected-react-router'

import { useTranslation } from 'react-i18next'

import { Button } from '@material-ui/core'

import CollectionTable from '../../../pieces/CollectionTable'
import Page from '../../../pieces/Page'

const CollectionPage = (props) => {
  const { t } = useTranslation()

  const dispatch = useDispatch()

  const { collectionName } = useParams()

  const onAdd = (event, rowData) => dispatch(push(`/collections/${collectionName}/new`))

  return (
    <Page>
      <Button
        onClick={onAdd}
        variant={'contained'}
        color={'primary'}
        fullWidth={true}
      >
        {t('Add new!')}
      </Button>
      <br />
      <br />
      <CollectionTable
        collectionName={collectionName}
      />
    </Page>
  )
}

CollectionPage.propTypes = {}

export default CollectionPage