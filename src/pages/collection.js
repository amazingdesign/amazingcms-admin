import React, { useEffect } from 'react'

import { useSelector } from 'react-redux'

import { useParams } from 'react-router'
import { useTranslation } from 'react-i18next'

import { useService } from '../bits/useService'

const styles = {
  root: {
    position: 'relative',
    minHeight: 400,
  },
}

const CollectionPage = (props) => {
  const { t } = useTranslation()
  const { collectionName } = useParams()
  const { Loader, ErrorMessage, find } = useService('actions')
  const data = useSelector(state => state.actions.find.data)

  useEffect(() => {
    find({ collectionName: collectionName })
  }, [find])

  return (
    <div style={styles.root}>
      <ErrorMessage message={t('Error occurred!')}>
        <Loader>
          ala
        </Loader>
      </ErrorMessage>
    </div>
  )
}

CollectionPage.propTypes = {}

export default CollectionPage