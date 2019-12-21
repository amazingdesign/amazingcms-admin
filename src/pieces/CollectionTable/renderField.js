/* eslint-disable react/display-name */
import React from 'react'

import _ from 'lodash'

import { Avatar, Chip } from '@material-ui/core'

import Icon from '@bit/amazingdesign.react-redux-mui-starter.icon'

import { formattedDate, formattedDateTime, timeFromNow } from '../../dateTime'

const renderStringified = (field) => (rowData) => JSON.stringify(rowData[field.name])

const renderDate = (field) => (rowData) => formattedDate(rowData[field.name])
const renderDateTime = (field) => (rowData) => formattedDateTime(rowData[field.name])
const renderTimeFromNow = (field) => (rowData) => timeFromNow(rowData[field.name])

const renderCurrency = (field) => (rowData) => {
  const value = rowData[field.name] || 0
  return String(value.toFixed(2))
}

const renderAvatar = (field) => (rowData) => <Avatar src={rowData[field.name]} />

const renderChips = (field) => (rowData) => {
  const value = _.get(rowData, field.name)

  if (!value) return null

  return (
    Array.isArray(value) ?
      value.map((val) => <Chip style={{ margin: '0.5rem' }} key={val} label={val} />)
      :
      <Chip style={{ margin: '0.25rem' }} label={value} />
  )
}

const renderChipsLookup = (field) => (rowData) => {
  const value = _.get(rowData, field.name)

  if (!value) return null

  return (
    Array.isArray(value) ?
      value.map((val) => <Chip style={{ margin: '0.5rem' }} key={val} label={field.lookup[val]} />)
      :
      <Chip style={{ margin: '0.25rem' }} label={field.lookup[value]} />
  )
}

const renderBool =(field) => (rowData) => {
  const value = _.get(rowData, field.name)

  return String(value)
}

const renderBoolIcon =(field) => (rowData) => {
  const value = _.get(rowData, field.name)

  if(value) return <Icon>fas fa-check-circle</Icon>

  return <Icon>fas fa-times-circle</Icon>
}

const mapFieldToFunc = {
  'boolean': renderBool,
  'boolean-icon': renderBoolIcon,
  'avatar': renderAvatar,
  'chips': renderChips,
  'chips-lookup': renderChipsLookup,
  'date': renderDate,
  'date-time': renderDateTime,
  'time-from-now': renderTimeFromNow,
  'currency': renderCurrency,
  'stringify': renderStringified,
}

export const renderField = (field) => {
  const renderFunc = mapFieldToFunc[field.columnRenderType]

  return renderFunc && renderFunc(field)
}

export default renderField