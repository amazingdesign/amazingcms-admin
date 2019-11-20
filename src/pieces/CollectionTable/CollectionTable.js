import React, { useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'

import { useSelector } from 'react-redux'

import { useTranslation } from 'react-i18next'

import { useQsParams } from '../../bits/useQsParams'
import { useService } from '../../bits/redux-rest-services/useService'

import CollectionTableStateless from './CollectionTableStateless'

const CollectionTable = ({ collectionName, startPage, startPageSize }) => {
  const { t } = useTranslation()

  const [params, setParams] = useQsParams({ page: startPage, pageSize: startPageSize })
  const onChangePage = (page) => setParams({ ...params, page: page + 1 })
  const onChangeRowsPerPage = (pageSize) => setParams({ ...params, pageSize })

  // COLLECTION DATA
  const collectionsData = useSelector(state => state.collections.find.data)
  const collectionData = useMemo(() => (
    collectionsData &&
    collectionsData.find(collectionData => collectionData.name === collectionName)
  ), [collectionsData])

  // COLLECTION ITEMS
  const { ErrorMessage, find } = useService('actions')
  const isLoading = useSelector(state => state.actions.find.isLoading)
  const data = useSelector(state => state.actions.find.data && state.actions.find.data)
  const rows = data && data.rows
  const totalCount = data && data.total
  const dataPromise = (query) => (
    new Promise((resolve, reject) => {
      resolve({
        data: rows,
        page: params.page - 1,
        totalCount: totalCount,
      })
    })
  )

  useEffect(() => {
    find({ collectionName, page: params.page, pageSize: params.pageSize })
  }, [find, collectionName, params.page, params.pageSize])

  return (
    <ErrorMessage message={t('Error occurred!')}>
      <CollectionTableStateless
        isLoading={isLoading}
        collectionData={collectionData}
        data={rows && dataPromise}
        title={collectionData.displayName || collectionData.name}
        onChangePage={onChangePage}
        onChangeRowsPerPage={onChangeRowsPerPage}
        options={{ pageSize: Number(params.pageSize) }}
      />
    </ErrorMessage>
  )
}

CollectionTable.defaultProps = {
  startPage: 1,
  startPageSize: 10,
}

CollectionTable.propTypes = {
  startPage: PropTypes.number.isRequired,
  startPageSize: PropTypes.number.isRequired,
  collectionName: PropTypes.string.isRequired,
}

export default CollectionTable