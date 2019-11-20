import React from 'react'

import { useParams } from 'react-router'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { push } from 'connected-react-router'

import CollectionTable from '../../../pieces/CollectionTable'

const styles = {
  root: {
    position: 'relative',
    minHeight: 400,
  },
  content: {
    padding: '2rem',
  },
}

const CollectionPage = (props) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const { collectionName } = useParams()

  const onEdit = (event, rowData) => dispatch(push(`/collections/${collectionName}/${rowData._id}`))
  return (
    <div style={styles.root}>
      <div style={styles.content}>
        <CollectionTable
          collectionName={collectionName}
          actions={[
            {
              icon: 'edit',
              tooltip: t('Edit'),
              onClick: onEdit,
            },
          ]}
        />
      </div>
    </div>
  )
}

CollectionPage.propTypes = {}

export default CollectionPage