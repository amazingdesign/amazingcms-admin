import React from 'react'
import PropTypes from 'prop-types'

import { useDispatch } from 'react-redux'
import { push } from 'connected-react-router'

import { useTranslation } from 'react-i18next'

import { useServiceLoaded } from '../../bits/redux-rest-services/useServiceLoaded'
import withArchiveConfirm from '../../bits/withArchiveConfirm'

import CollectionTableStateless from './CollectionTableStateless'

const CollectionTable = ({
  collectionsServiceName,
  serviceName,
  collectionData,
  confirm,
  isSystemCollection,
  display,
  params,
  setParams,
  onCreate,
  ...otherProps
}) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const collectionName = collectionData.name
  const populate = Object.keys(collectionData.populateSchema || {})

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
    isSystemCollection ? { populate, ...params } : { collectionName, populate, ...params }
  )

  const dataPromise = data && (() => Promise.resolve({
    data: data.rows,
    page: (params.page - 1) || 0,
    totalCount: data.total || 0,
  }))

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

  const title = collectionData.displayName || collectionName

  return (
    <ErrorMessage actionName={'find'} message={t('Error occurred!')}>
      <CollectionTableStateless
        isLoading={isLoading}
        collectionData={collectionData}
        data={dataPromise}
        title={isSystemCollection ? t(title) : title}
        onChangePage={onChangePage}
        onChangeRowsPerPage={onChangeRowsPerPage}
        options={{ pageSize: Number(params.pageSize || 10) }}
        actions={[
          ...(!display.create ? [] : [{
            isFreeAction: true,
            icon: 'add',
            tooltip: t('Add new'),
            onClick: onCreate,
          }]),
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
  collectionsServiceName: 'collections',
  serviceName: 'actions',
  isSystemCollection: false,
  display: {
    create: true,
    edit: true,
    duplicate: true,
    remove: true,
  },
}

CollectionTable.propTypes = {
  params: PropTypes.object.isRequired,
  onCreate: PropTypes.func.isRequired,
  setParams: PropTypes.func.isRequired,
  confirm: PropTypes.func.isRequired,
  collectionData: PropTypes.object.isRequired,
  collectionsServiceName: PropTypes.string.isRequired,
  serviceName: PropTypes.string.isRequired,
  isSystemCollection: PropTypes.bool.isRequired,
  display: PropTypes.object.isRequired,
}

export default withArchiveConfirm(CollectionTable)