import React from 'react'
import PropTypes from 'prop-types'

import { useDispatch } from 'react-redux'
import { push } from 'connected-react-router'

import { useTranslation } from 'react-i18next'

import { useQsParams } from '../../bits/useQsParams'
import { useServiceLoaded } from '../../bits/redux-rest-services/useServiceLoaded'
import withArchiveConfirm from '../../bits/withArchiveConfirm'

import CollectionTableStateless from './CollectionTableStateless'

const CollectionTable = ({
  collectionsServiceName,
  serviceName,
  collectionData,
  startPage,
  startPageSize,
  confirm,
  isSystemCollection,
  display,
  ...otherProps
}) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const collectionName = collectionData.name

  const [params, setParams] = useQsParams({ page: startPage, pageSize: startPageSize })
  const onChangePage = (page) => setParams({ ...params, page: page + 1 })
  const onChangeRowsPerPage = (pageSize) => setParams({ ...params, pageSize })

  const {
    ErrorMessage,
    find,
    delete: remove,
    data,
    isLoading,
  } = useServiceLoaded(
    (isSystemCollection ? 'system-collection-' : '') + serviceName,
    isSystemCollection ? params : { collectionName, query: { _archived: { $in: [true, false, undefined] } }, ...params }
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
  const onDuplicate = (event, rowData) => (
    dispatch(push(`/${collectionsServiceName}/${collectionName}/duplicate/${rowData._id}`))
  )
  const onArchive = (event, rowData) => {
    confirm(() => (
      remove({ id: rowData._id, collectionName })
        .then(() => find({ collectionName, page: params.page, pageSize: params.pageSize }))
    ))()
  }
  const onRollback = (event, rowData) => {
    confirm(
      () => (
        remove({ id: rowData._id, collectionName })
          .then(() => find({ collectionName, page: params.page, pageSize: params.pageSize }))
      ),
      { description: t('This will restore archived item!') }
    )()
  }

  return (
    <ErrorMessage actionName={'find'} message={t('Error occurred!')}>
      <CollectionTableStateless
        isLoading={isLoading}
        collectionData={collectionData}
        data={rows && dataPromise}
        title={collectionData.displayName || collectionName}
        onChangePage={onChangePage}
        onChangeRowsPerPage={onChangeRowsPerPage}
        options={{ pageSize: Number(params.pageSize) }}
        actions={[
          ...(!display.remove ? [] : [(rowData) => ({
            icon: rowData._archived ? 'settings_backup_restore' : 'archive',
            tooltip: rowData._archived ? t('Rollback') : t('Archive'),
            onClick: rowData._archived ? onRollback : onArchive,
          })]),
          ...(!display.duplicate ? [] : [(rowData) => ({
            icon: 'file_copy',
            tooltip: t('Duplicate'),
            onClick: onDuplicate,
            hidden: Boolean(rowData._archived),
          })]),
          ...(!display.edit ? [] : [(rowData) => ({
            icon: 'edit',
            tooltip: t('Edit'),
            onClick: onEdit,
            hidden: Boolean(rowData._archived),
          })]),
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
  display: {
    edit: true,
    duplicate: true,
    remove: true,
  },
}

CollectionTable.propTypes = {
  confirm: PropTypes.func.isRequired,
  startPage: PropTypes.number.isRequired,
  startPageSize: PropTypes.number.isRequired,
  collectionData: PropTypes.object.isRequired,
  collectionsServiceName: PropTypes.string.isRequired,
  serviceName: PropTypes.string.isRequired,
  isSystemCollection: PropTypes.bool.isRequired,
  display: PropTypes.object.isRequired,
}

export default withArchiveConfirm(CollectionTable)