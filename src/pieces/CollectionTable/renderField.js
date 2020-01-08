/* eslint-disable max-lines */
/* eslint-disable react/display-name */
import React from 'react'

import _ from 'lodash'
import isAbsoluteUrl from 'is-absolute-url'

import { Avatar, Chip, Button, IconButton } from '@material-ui/core'

import Icon from '@bit/amazingdesign.react-redux-mui-starter.icon'
import ConnectedLink from '@bit/amazingdesign.react-redux-mui-starter.connected-link'
import { replace } from '@bit/amazingdesign.utils.variables-in-string'

import { makeSrc } from '../../bits/amazing-cms/makeDownloaderSrc'

import { formattedDate, formattedDateTime, timeFromNow } from '../../dateTime'

const renderStringified = (field) => (rowData) => JSON.stringify(rowData[field.name])

const renderDate = (field) => (rowData) => formattedDate(rowData[field.name])
const renderDateTime = (field) => (rowData) => formattedDateTime(rowData[field.name])
const renderTimeFromNow = (field) => (rowData) => timeFromNow(rowData[field.name])

const renderCurrency = (field) => (rowData) => {
  const value = rowData[field.name] || 0
  return String(value.toFixed(2))
}

const renderAvatar = (field) => (rowData) => {
  const value = _.get(rowData, field.name)
  const src = value && makeSrc('photos', { width: 50, height: 50 })(rowData[field.name])

  return (
    <Avatar src={src} />
  )
}

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

const renderBool = (field) => (rowData) => {
  const value = _.get(rowData, field.name)

  return String(value)
}

const renderBoolIcon = (field) => (rowData) => {
  const value = _.get(rowData, field.name)

  const unifiedVal = (
    typeof value === 'string' ?
      value === 'true' ? true : false
      :
      value
  )

  if (unifiedVal) return <Icon>fas fa-check-circle</Icon>

  return <Icon>fas fa-times-circle</Icon>
}

const renderButtonLink = (field) => (rowData) => {
  const { button: { label, link, variant, color } } = field

  const labelReplaced = replace(label, { ...window._env_, ...rowData })
  const linkReplaced = replace(link, { ...window._env_, ...rowData })

  const LinkComponent = (
    isAbsoluteUrl(linkReplaced) ?
      (props) => <a href={linkReplaced} target={'_blank'} style={{ textDecoration: 'none' }} {...props} />
      :
      (props) => <ConnectedLink to={linkReplaced} {...props} />
  )

  const ButtonComponent = (
    variant === 'icon' ?
      // eslint-disable-next-line react/prop-types
      ({ children, ...otherProps }) => <IconButton color={color} {...otherProps}><Icon>{children}</Icon></IconButton>
      :
      (props) => <Button color={color} variant={variant} style={{ whiteSpace: 'nowrap' }} {...props} />
  )

  return (
    <LinkComponent>
      <ButtonComponent>
        {labelReplaced}
      </ButtonComponent>
    </LinkComponent >
  )
}

const mapFieldToFunc = {
  'button-link': renderButtonLink,
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