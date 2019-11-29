import React, { useEffect, useMemo } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { history } from './store'
import {
  logInAsyncAction,
  checkIfLoggedInAsyncAction,
  sendForgotPasswordEmailAsyncAction,
} from './auth'
import { restServices } from './restServices'

import { useTranslation } from 'react-i18next'

import DisplayFlashToasts from '@bit/amazingdesign.react-redux-mui-starter.display-flash-toasts'
import Kit from '@bit/amazingdesign.react-redux-mui-starter.kit'

import CopyrightFooter from './pieces/CopyrightFooter'
import LoginImage from './pieces/LoginImage'

import { makeRoutes } from './routes'
import { theme } from './theme'


const App = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation(null, { useSuspense: false })

  const onLoginSubmit = ({ email, password }) => dispatch(logInAsyncAction(email, password))
  const onForgottenPassSubmit = ({ email }) => dispatch(sendForgotPasswordEmailAsyncAction(email))

  const isUserLoggedIn = useSelector((state) => state.auth.isUserLoggedIn)
  const userAvatarSrc = useSelector((state) => state.auth && state.auth.userData && state.auth.userData.avatar)

  const collectionsData = useSelector((state) => state.collections.find.data)
  const systemCollectionsData = useSelector((state) => state['system-collections'].find.data)

  const {
    mainMenuRoutes,
    routerRoutes,
    profileMenuRoutes,
  } = useMemo(() => {
    return makeRoutes(collectionsData, systemCollectionsData, dispatch, t)
  }, [collectionsData, systemCollectionsData])

  const languages = [
    { code: 'pl', name: t('Polish') },
    { code: 'en', name: t('English') },
  ]

  useEffect(() => {
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
        appTitle={'Amazing CMS'}
        footer={<CopyrightFooter />}
        loginAside={<LoginImage />}
      />
      <DisplayFlashToasts />
    </>
  )
}

export default App