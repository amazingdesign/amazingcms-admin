import React from 'react'
import PropTypes from 'prop-types'

import { Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    minHeight: 400,
  },
  content: {
    padding: '2rem',
  },
  paper: {
    padding: '2rem',
  },
  [theme.breakpoints.down('sm')]: {
    content: {
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
    <div className={classes.root}>
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
    </div>
  )
}

Page.propTypes = {
  paperProps: PropTypes.object,
  usePaper: PropTypes.bool,
  children: PropTypes.node,
}

export default Page