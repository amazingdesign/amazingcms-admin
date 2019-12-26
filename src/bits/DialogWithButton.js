import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import { Button as MUIButton } from '@material-ui/core'
import Dialog from './Dialog'

const DialogWithButton = (props) => {
  const [isDialogOpen, setIsDialogOpen] = useState(props.open)
  useEffect(() => {
    setIsDialogOpen(props.open)
  }, [props.open])

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

  const Button = props.buttonComponent || MUIButton

  return (
    <>
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
    </>
  )
}


DialogWithButton.defaultProps = {
  open: false,
}

DialogWithButton.propTypes = {
  buttonComponent: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string,
  ]),
  buttonProps: PropTypes.object,
  dialogProps: PropTypes.object,
  title: PropTypes.string,
  openDialogProp: PropTypes.string,
  closeDialogProp: PropTypes.string,
  children: PropTypes.node,
  label: PropTypes.string,
  open: PropTypes.bool.isRequired,
}

export default DialogWithButton