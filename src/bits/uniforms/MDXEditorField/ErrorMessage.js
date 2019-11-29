import React from 'react'
import PropTypes from 'prop-types'

import ReportIcon from '@material-ui/icons/Report'

const styles = {
  main: {
    width: '100%',
    marginTop: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  icon: {
    fontSize: 100,
  },
  text: {
    textAlign: 'center',
    color: 'rgba(0, 0, 0, 0.26)',
  },
}

const ErrorMessage = (props) => (
  <div
    style={styles.main}
  >
    <ReportIcon
      color={'disabled'}
      style={styles.icon}
    />
    <h2
      style={styles.text}
    >
      {props.message}
    </h2>
    <p
      style={styles.text}
    >
      {props.subMessage}
    </p>
  </div>
)

ErrorMessage.propTypes = {
  message: PropTypes.string,
  subMessage: PropTypes.string,
}

export default ErrorMessage