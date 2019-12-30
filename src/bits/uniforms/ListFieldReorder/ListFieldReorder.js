/* eslint-disable react/prop-types */
import React, { Children } from 'react'

import ListMaterial from '@material-ui/core/List'
import ListSubheader from '@material-ui/core/ListSubheader'

import { connectField, filterDOMProps, joinName } from 'uniforms'

import ListAddField from './ListAddField'
import ListItemField from './ListItemField'
import { moveArrayElement } from '../../utils/moveArrayElement'

const moveUp = (array, index) => moveArrayElement(array, index, -1)
const moveDown = (array, index) => moveArrayElement(array, index, 1)

const List = ({
  addIcon,
  children,
  dense,
  initialCount,
  itemProps,
  label,
  name,
  value,
  ...props
}) => ([
  <ListMaterial
    key="list"
    dense={dense}
    subheader={
      label ? <ListSubheader disableSticky>{label}</ListSubheader> : undefined
    }
    {...filterDOMProps(props)}
  >
    {children
      ? value.map((item, index) =>
        Children.map(children, child =>
          React.cloneElement(child, {
            key: index,
            label: null,
            name: joinName(
              name,
              child.props.name && child.props.name.replace('$', index),
            ),
          }),
        ),
      )
      : value.map((item, index) => (
        <ListItemField
          key={index}
          label={null}
          name={joinName(name, index)}
          moveUp={() => props.onChange(moveUp(value, index))}
          moveUpDisabled={index === 0}
          moveDownDisabled={index === (value.length - 1)}
          moveDown={() => props.onChange(moveDown(value, index))}
          {...itemProps}
        />
      ))}
    <ListAddField
      key="listAddField"
      name={`${name}.$`}
      icon={addIcon}
      initialCount={initialCount}
      fullWidth={'false'}
    />
  </ListMaterial>,
])

List.defaultProps = {
  dense: true,
}

export default connectField(List, {
  ensureValue: false,
  includeInChain: false,
})