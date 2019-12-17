import React from 'react'
import PropTypes from 'prop-types'

import Icon from '@bit/amazingdesign.react-redux-mui-starter.icon'

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
    width: 'inherit',
    height: 'inherit',
  },
  text: {
    textAlign: 'center',
    color: 'rgba(0, 0, 0, 0.26)',
  },
}

const IconMessage = (props) => (
  <div
    style={styles.main}
  >
    <Icon
      color={'disabled'}
      style={styles.icon}
    >
      {props.icon}
    </Icon>
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

IconMessage.propTypes = {
  icon: PropTypes.string.isRequired,
  message: PropTypes.string,
  subMessage: PropTypes.string,
}

export default IconMessage