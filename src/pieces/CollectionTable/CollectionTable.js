import React from 'react'
import PropTypes from 'prop-types'

import withConfirm from 'material-ui-confirm'

import { useDispatch } from 'react-redux'
import { push } from 'connected-react-router'

import { useTranslation } from 'react-i18next'

import { useQsParams } from '../../bits/useQsParams'
import { useDataItemFromStore } from '../../bits/redux-rest-services/useDataItemFromStore'
import { useServiceLoaded } from '../../bits/redux-rest-services/useServiceLoaded'

import CollectionTableStateless from './CollectionTableStateless'

const CollectionTable = ({
  collectionsServiceName,
  serviceName,
  collectionName,
  startPage,
  startPageSize,
  confirm,
  isSystemCollection,
  ...otherProps
}) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const [params, setParams] = useQsParams({ page: startPage, pageSize: startPageSize })
  const onChangePage = (page) => setParams({ ...params, page: page + 1 })
  const onChangeRowsPerPage = (pageSize) => setParams({ ...params, pageSize })

  const collectionData = useDataItemFromStore(collectionsServiceName, { query: { name: collectionName } })

  const {
    ErrorMessage,
    find,
    delete: remove,
    data,
    isLoading,
  } = useServiceLoaded(
    (isSystemCollection ? 'system-collection-' : '') + serviceName,
    isSystemCollection ? params : { collectionName, ...params }
  )

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

  const onEdit = (event, rowData) => dispatch(push(`/${collectionsServiceName}/${collectionName}/${rowData._id}`))
  const onDelete = (event, rowData) => {
    confirm(
      () => (
        remove({ id: rowData._id, collectionName })
          .then(() => find({ collectionName, page: params.page, pageSize: params.pageSize }))
      ),
      {
        confirmationText: t('Ok'),
        cancellationText: t('Cancel'),
        title: t('Are you sure?'),
        description: t('This will permanently delete this item!'),
      }
    )()
  }

  return (
    <ErrorMessage actionName={'find'} message={t('Error occurred!')}>
      <CollectionTableStateless
        isLoading={isLoading}
        collectionData={collectionData}
        data={rows && dataPromise}
        title={collectionData.displayName || collectionData.name}
        onChangePage={onChangePage}
        onChangeRowsPerPage={onChangeRowsPerPage}
        options={{ pageSize: Number(params.pageSize) }}
        actions={[
          {
            icon: 'edit',
            tooltip: t('Edit'),
            onClick: onEdit,
          },
          {
            icon: 'delete',
            tooltip: t('Delete'),
            onClick: onDelete,
          },
        ]}
        {...otherProps}
      />
    </ErrorMessage>
  )
}

CollectionTable.defaultProps = {
  startPage: 1,
  startPageSize: 10,
  collectionsServiceName: 'collections',
  serviceName: 'actions',
  isSystemCollection: false,
}

CollectionTable.propTypes = {
  confirm: PropTypes.func.isRequired,
  startPage: PropTypes.number.isRequired,
  startPageSize: PropTypes.number.isRequired,
  collectionName: PropTypes.string.isRequired,
  collectionsServiceName: PropTypes.string.isRequired,
  serviceName: PropTypes.string.isRequired,
  isSystemCollection: PropTypes.bool.isRequired,
}

export default withConfirm(CollectionTable)