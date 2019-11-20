import React, { useEffect, useMemo } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { history } from './store'
import {
  logOutAsyncAction,
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

const theme = {
  palette: {
    primary: {
      main: '#323330',
    },
    secondary: {
      main: '#F0DB4F',
    },
  },
}

const App = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation(null, { useSuspense: false })

  const onLoginSubmit = ({ email, password }) => dispatch(logInAsyncAction(email, password))
  const onForgottenPassSubmit = ({ email }) => dispatch(sendForgotPasswordEmailAsyncAction(email))

  const isUserLoggedIn = useSelector((state) => state.auth.isUserLoggedIn)
  const userAvatarSrc = useSelector((state) => state.auth && state.auth.userData && state.auth.userData.avatar)

  const collectionsRows = useSelector((state) => (
    state.collections.find.data &&
    state.collections.find.data.rows &&
    state.collections.find.data.rows
  ))

  const collectionsRoutes = useMemo(() => (
    collectionsRows &&
    collectionsRows.map &&
    collectionsRows.map(collectionData => ({
      name: collectionData.displayName || collectionData.name,
      path: '/collections/:collectionName',
      pathWithParams: `/collections/${collectionData.name}`,
      component: React.lazy(() => import('./pages/collection')),
      icon: 'data',
    }))
  ), [collectionsRows])

  useEffect(() => {
    dispatch(checkIfLoggedInAsyncAction())
    // eslint-disable-next-line
  }, [])
  useEffect(() => {
    if (isUserLoggedIn) dispatch(restServices.actions.collections.find())
    // eslint-disable-next-line
  }, [isUserLoggedIn])

  const languages = [
    { code: 'pl', name: t('Polish') },
    { code: 'en', name: t('English') },
  ]

  const routes = collectionsRoutes || []

  const profileMenuRoutes = [
    {
      name: t('Logout'),
      icon: 'logout',
      onClick: () => dispatch(logOutAsyncAction()),
    },
  ]

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
        mainMenuRoutes={routes}
        routerRoutes={routes}

        userAvatarSrc={userAvatarSrc}
        appTitle={'react-redux-mui-starter'}
        footer={<CopyrightFooter />}
        loginAside={<LoginImage />}
      />
      <DisplayFlashToasts />
    </>
  )
}

export default App