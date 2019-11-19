import React from 'react'

const LoginImage = (props) => (
  <div
    style={{
      width: '100%',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      // eslint-disable-next-line no-undef
      backgroundImage: `url(${process.env.PUBLIC_URL}/img/login-bg.svg)`,
    }}
  >
  </div>
)

LoginImage.propTypes = {}

export default LoginImage