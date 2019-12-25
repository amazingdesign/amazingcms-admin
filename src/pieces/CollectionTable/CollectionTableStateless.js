import React, { useMemo } from 'react'
import PropTypes from 'prop-types'

import MaterialTable from 'material-table'

import { renderField } from './renderField'

const CollectionTableStateless = ({ collectionData, data, options, ...otherProps }) => {
  const columns = useMemo(() => (
    collectionData.tableFields
      .map((field) => ({
        title: field.label || field.name,
        field: field.name,
        render: renderField(field),
        lookup: field.lookup,
      }))
  ), [collectionData.tableFields])

  return (
    <div style={{ maxWidth: '100%' }}>
      <MaterialTable
        columns={columns}
        data={data || []}
        options={{
          pageSize: 5,
          pageSizeOptions: [5, 10, 20, 50, 100],
          search: false,
          ...options,
        }}
        localization={{
          header: { actions: '' },
        }}
        {...otherProps}
      />
    </div>
  )
}

CollectionTableStateless.propTypes = {
  options: PropTypes.object,
  collectionData: PropTypes.object.isRequired,
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.func]),
}

export default CollectionTableStateless