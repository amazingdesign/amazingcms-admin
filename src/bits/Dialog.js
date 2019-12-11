import React from 'react'
import PropTypes from 'prop-types'

import {
  Button,
  Dialog as MuiDialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  withMobileDialog,
} from '@material-ui/core'

const styles = {
  dialog: {
    padding: 20,
  },
}

const Dialog = (props) => (
  <MuiDialog
    style={styles.dialog}
    open={props.isDialogOpen}
    fullScreen={props.fullScreen}
    fullWidth={true}
    maxWidth={'md'}
  >
    {
      props.title ?
        <DialogTitle>{props.title}</DialogTitle>
        :
        null
    }
    <DialogContent>
      {props.children}
    </DialogContent>
    <DialogActions>
      <Button
        onClick={props.handleClose}
        variant={'text'}
      >
        {props.closeLabel}
      </Button>
    </DialogActions>
  </MuiDialog>
)

Dialog.defaultProps = {
  closeLabel: 'Close',
}

Dialog.propTypes = {
  closeLabel: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.node,
  fullScreen: PropTypes.bool.isRequired,
  isDialogOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
}

export default withMobileDialog()(Dialog)