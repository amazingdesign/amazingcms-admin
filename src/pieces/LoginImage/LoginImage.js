import React from 'react'

import bg from './unlock.svg'

const LoginImage = (props) => (
  <div
    style={{
      width: '80%',
      margin: '2rem auto',
      backgroundPosition: 'center',
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      // eslint-disable-next-line no-undef
      backgroundImage: `url(${bg}`,
    }}
  >
  </div>
)

LoginImage.propTypes = {}

export default LoginImage