/* eslint-disable react/prop-types */
import React, { Children } from 'react'

import { ListItem as ListItemMaterial, IconButton } from '@material-ui/core'
import { ExpandLess, ExpandMore, Delete } from '@material-ui/icons'

import { connectField, joinName } from 'uniforms'
import { ListDelField, AutoField } from 'uniforms-material'

const styles = {
  root: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
  },
  fieldsColumn: {
    width: '100%',
  },
  toolboxColumn: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 16,
  },
}

const ListItem = ({ dense, divider, disableGutters, removeIcon, ...props }) => (
  <ListItemMaterial
    dense={dense}
    divider={divider}
    disableGutters={disableGutters}
  >
    <div style={styles.root}>
      <div style={styles.fieldsColumn}>
        {
          props.children ?
            (
              Children.map(props.children, child =>
                React.cloneElement(child, {
                  name: joinName(props.name, child.props.name),
                  label: null,
                }),
              )
            )
            :
            (
              <AutoField {...props} />
            )
        }
      </div>
      <div style={styles.toolboxColumn}>
        <IconButton
          disabled={props.moveUpDisabled}
          onClick={props.moveUp}
        >
          {props.moveUpIcon || <ExpandLess />}
        </IconButton>
        <IconButton
          disabled={props.moveDownDisabled}
          onClick={props.moveDown}
        >
          {props.moveDownIcon || <ExpandMore />}
        </IconButton>
        <ListDelField
          name={props.name}
          icon={<Delete />}
        />
      </div>
    </div>
  </ListItemMaterial>
)

ListItem.defaultProps = {
  dense: true,
}

export default connectField(ListItem, {
  includeInChain: false,
  includeParent: true,
})