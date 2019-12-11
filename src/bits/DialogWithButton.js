import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { Button } from '@material-ui/core'
import Dialog from './Dialog'

const DialogWithButton = (props) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const openDialog = () => setIsDialogOpen(true)
  const closeDialog = () => setIsDialogOpen(false)

  const mergeFunctions = (first, second) => (
    (typeof first === 'function') && (typeof second === 'function') ?
      (...all) => [first(...all), second(...all)]
      :
      second
  )

  const childrenWithProps = React.Children.map(
    props.children,
    child => React.cloneElement(
      child,
      {
        [props.openDialogProp]: mergeFunctions(child.props[props.openDialogProp], openDialog),
        [props.closeDialogProp]: mergeFunctions(child.props[props.closeDialogProp], closeDialog),
      }
    )
  )

  return (
    <div>
      <Button
        fullWidth={true}
        onClick={openDialog}

        {...props.buttonProps}
      >
        {props.label}
      </Button>
      <Dialog
        title={props.title}
        isDialogOpen={isDialogOpen}
        handleClose={closeDialog}

        {...props.dialogProps}
      >
        {childrenWithProps}
      </Dialog>
    </div>
  )
}


DialogWithButton.propTypes = {
  buttonProps: PropTypes.object,
  dialogProps: PropTypes.object,
  title: PropTypes.string,
  openDialogProp: PropTypes.string,
  closeDialogProp: PropTypes.string,
  children: PropTypes.node,
  label: PropTypes.string,
}

export default DialogWithButton