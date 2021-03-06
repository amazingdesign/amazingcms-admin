import React from 'react'
import PropTypes from 'prop-types'

import { Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    minHeight: 400,
    padding: '2rem',
  },
  content: {},
  paper: {
    padding: '2rem',
  },
  [theme.breakpoints.down('sm')]: {
    root: {
      padding: '2rem 0.5rem',
    },
    paper: {
      padding: '1.5rem',
    },
  },
}))

const Page = (props) => {
  const classes = useStyles()

  return (
    <div style={props.style} className={classes.root}>
      {props.childrenAbove}
      <div className={classes.content}>
        {
          props.usePaper ?
            <Paper
              className={classes.paper}
              {...props.paperProps}
            >
              {props.children}
            </Paper>
            :
            props.children
        }
      </div>
      {props.childrenBelow}
    </div>
  )
}

Page.propTypes = {
  style: PropTypes.object,
  paperProps: PropTypes.object,
  usePaper: PropTypes.bool,
  children: PropTypes.node,
  childrenAbove: PropTypes.node,
  childrenBelow: PropTypes.node,
}

export default Page