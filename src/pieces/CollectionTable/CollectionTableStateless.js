import React, { useMemo } from 'react'
import PropTypes from 'prop-types'

import MaterialTable from 'material-table'
import { Avatar, Chip } from '@material-ui/core'

const renderField = (field) => {
  if (field.columnRenderType === 'avatar') {
    // eslint-disable-next-line react/display-name
    return (rowData) => <Avatar src={rowData[field.name]} />
  }

  if (field.columnRenderType === 'chips') {
    // eslint-disable-next-line react/display-name
    return (rowData) => {
      const value = rowData[field.name]
      return (
        <>
          {
            Array.isArray(value) ?
              value.map((val) => <Chip style={{margin: '0.5rem'}} key={val} label={val} />)
              :
              <Chip style={{margin: '0.25rem'}} label={value} />
          }
        </>
      )
    }
  }

  return undefined
}

const CollectionTableStateless = ({ collectionData, data, options, ...otherProps }) => {
  const columns = useMemo(() => (
    collectionData.fields
      .filter((field) => field.displayAsTableColumn)
      .map((field) => ({
        title: field.label || field.name,
        field: field.name,
        render: renderField(field)
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