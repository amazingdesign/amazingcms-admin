import React, { useEffect, useMemo } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { history } from './store'
import {
  logInAsyncAction,
  checkIfLoggedInAsyncAction,
  sendForgotPasswordEmailAsyncAction,
  resetPasswordAsyncAction,
} from './auth'
import { restServices } from './restServices'

import { useTranslation } from 'react-i18next'

import DisplayFlashToasts from '@bit/amazingdesign.react-redux-mui-starter.display-flash-toasts'
import Kit from '@bit/amazingdesign.react-redux-mui-starter.kit'
import { useQsParams } from './bits/useQsParams'
import { makeSrc } from './bits/amazing-cms/makeDownloaderSrc'

import CopyrightFooter from './pieces/CopyrightFooter'
import PasswordReset from './pieces/PasswordReset'
import LoginImage from './pieces/LoginImage'

import { createValidator } from './validator'
import { makeRoutes } from './routes'
import { theme } from './theme'

const LANGUAGES = JSON.parse(window._env_.REACT_APP_LANGUAGES)
const TITLE = window._env_.REACT_APP_TITLE

const App = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation(null, { useSuspense: false })

  const [params, setParams] = useQsParams()

  const onLoginSubmit = ({ email, password }) => dispatch(logInAsyncAction(email, password))
  const onForgottenPassSubmit = ({ email }) => dispatch(sendForgotPasswordEmailAsyncAction(email))
  const onPasswordResetSubmit = ({ password }) => (
    dispatch(resetPasswordAsyncAction(password, { passwordResetToken: params.passwordResetToken }))
      .then(() => setParams({}))
  )

  const loginContent = (
    params.passwordResetToken &&
    <PasswordReset
      createValidator={createValidator}
      onSubmit={onPasswordResetSubmit}
    />
  )

  const isUserLoggedIn = useSelector((state) => state.auth.isUserLoggedIn)
  const userAvatarFile = useSelector((state) => state.auth && state.auth.userData && state.auth.userData.avatar)
  const userPrivileges = useSelector((state) => state.auth && state.auth.userData && state.auth.userData.privileges)

  const userAvatarSrc = userAvatarFile && makeSrc('photos', { width: 50, height: 50 })(userAvatarFile)

  const collectionsData = useSelector((state) => state.collections.find.data)
  const systemCollectionsData = useSelector((state) => state['system-collections'].find.data)

  const {
    mainMenuRoutes,
    routerRoutes,
    profileMenuRoutes,
  } = useMemo(() => {
    return makeRoutes(collectionsData, systemCollectionsData, userPrivileges, dispatch, t)
  }, [collectionsData, systemCollectionsData, userPrivileges, dispatch, t])

  const languages = LANGUAGES.map(lang => ({
    ...lang,
    name: t(lang.name),
  }))

  useEffect(() => {
    document.title = TITLE
    dispatch(checkIfLoggedInAsyncAction())
    // eslint-disable-next-line
  }, [])
  useEffect(() => {
    if (isUserLoggedIn) {
      dispatch(restServices.actions.collections.find())
      dispatch(restServices.actions['system-collections'].find())
    }
    // eslint-disable-next-line
  }, [isUserLoggedIn])

  return (
    <>
      <Kit
        theme={theme}
        languages={languages}
        isUserLoggedIn={isUserLoggedIn}
        onLoginSubmit={onLoginSubmit}
        onForgottenPassSubmit={onForgottenPassSubmit}

        history={history}
        profileMenuRoutes={profileMenuRoutes}
        mainMenuRoutes={mainMenuRoutes}
        routerRoutes={routerRoutes}

        userAvatarSrc={userAvatarSrc}
        appTitle={TITLE}
        footer={<CopyrightFooter />}
        loginAside={<LoginImage />}

        loginContent={loginContent}
      />
      <DisplayFlashToasts />
    </>
  )
}

export default App