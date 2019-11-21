/* eslint-disable react/display-name */
import React from 'react'

import { Avatar, Chip } from '@material-ui/core'

const renderAvatar = (field) => (rowData) => <Avatar src={rowData[field.name]} />

const renderChips = (field) => (rowData) => {
  const value = rowData[field.name]

  if (!value) return null

  return (
    <>
      {
        Array.isArray(value) ?
          value.map((val) => <Chip style={{ margin: '0.5rem' }} key={val} label={val} />)
          :
          <Chip style={{ margin: '0.25rem' }} label={value} />
      }
    </>
  )
}

const renderChipsLookup = (field) => (rowData) => {
  const value = rowData[field.name]

  if (!value) return null

  return (
    <>
      {
        Array.isArray(value) ?
          value.map((val) => <Chip style={{ margin: '0.5rem' }} key={val} label={field.lookup[val]} />)
          :
          <Chip style={{ margin: '0.25rem' }} label={field.lookup[value]} />
      }
    </>
  )
}

const mapFieldToFunc = {
  'avatar': renderAvatar,
  'chips': renderChips,
  'chips-lookup': renderChipsLookup,
}

export const renderField = (field) => {
  const renderFunc = mapFieldToFunc[field.columnRenderType]

  return renderFunc && renderFunc(field)
}

export default renderField