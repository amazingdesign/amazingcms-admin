import { flashMessage, flashErrorMessage } from 'redux-flash'

import axios from './axios'
import { i18n } from './i18n'

import { makeReduxAuth } from '@bit/amazingdesign.react-redux-mui-starter.make-redux-auth'
import { makeAuthRequests } from '@bit/amazingdesign.react-redux-mui-starter.make-auth-requests'

// eslint-disable-next-line max-len
const LOG_IN_URL = window._env_.REACT_APP_LOG_IN_URL
const REFRESH_TOKEN_URL = window._env_.REACT_APP_REFRESH_TOKEN_URL
// eslint-disable-next-line max-len
const FORGOT_PASSWORD_URL = window._env_.REACT_APP_FORGOT_PASSWORD_URL

const t = i18n.t.bind(i18n)

const flashSuccessMessage = (message, options) => flashMessage(message, { ...options, props: { variant: 'success' } })

export const {
  logIn,
  logOut,
  refreshTokens,
  getAccessToken,
  checkIfLoggedIn,
  sendForgotPasswordEmail,
} = makeAuthRequests({
  loginRequestFunction: (email, password) => (
    axios
      .post(LOG_IN_URL, { email, password })
  ),
  refreshTokenRequestFunction: (refreshToken) => (
    axios
      .post(REFRESH_TOKEN_URL, { refreshToken })
  ),
  forgotPasswordRequestFunction: (email) => axios.post(FORGOT_PASSWORD_URL, { email }),
})

export const {
  logInAsyncAction,
  logOutAsyncAction,
  checkIfLoggedInAsyncAction,
  sendForgotPasswordEmailAsyncAction,
  setUserDataAction,
  userIsLoggingInAction,
  userLoginFailureAction,
  setUserIsLoggedInAction,
  setUserIsLoggedOutAction,
  reducer,
} = makeReduxAuth(
  { logIn, logOut, checkIfLoggedIn, sendForgotPasswordEmail },
  { flashMessage, flashErrorMessage, flashSuccessMessage },
  t
)