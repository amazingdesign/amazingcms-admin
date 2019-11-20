import React, { useMemo } from 'react'
import PropTypes from 'prop-types'

import MaterialTable from 'material-table'

const CollectionTableStateless = ({ collectionData, data, options, ...otherProps }) => {
  const columns = useMemo(() => (
    collectionData.fields
      .filter((field) => field.displayAsTableColumn)
      .map((field) => ({
        title: field.label,
        field: field.name,
      }))
  ), [collectionData.fields])

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