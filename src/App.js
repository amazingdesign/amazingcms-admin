import React, { useEffect } from 'react'

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
import Kit from '@bit/amazingdesign.react-redux-mui-starter.kit';

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
  const routeFromDb = useSelector((state) => state.routeFromDb.get.data)

  useEffect(() => {
    dispatch(checkIfLoggedInAsyncAction())
    // eslint-disable-next-line
  }, [])
  useEffect(() => {
    if(isUserLoggedIn) dispatch(restServices.actions.routeFromDb.get())
    // eslint-disable-next-line
  }, [isUserLoggedIn])

  const languages = [
    { code: 'pl', name: t('Polish') },
    { code: 'en', name: t('English') },
  ]

  const routes = [
    {
      name: t('Home'),
      path: ['/', '/dashboard'],
      component: React.lazy(() => import('./pages/dashboard')),
      icon: 'dashboard',
    },
    {
      name: t('Profile'),
      path: '/profile',
      component: React.lazy(() => import('./pages/profile')),
      icon: 'people',
      separator: { below: true },
    },
    {
      name: t('Google'),
      link: 'https://google.com',
      icon: 'search',
      separator: { below: true },
    },
  ].concat(routeFromDb || [])

  const profileMenuRoutes = [
    {
      name: t('Profile'),
      path: '/profile',
      component: React.lazy(() => import('./pages/profile')),
      icon: 'people',
      separator: { below: true },
    },
    {
      name: t('Logout'),
      icon: 'logout',
      onClick: () => dispatch(logOutAsyncAction()),
    },
  ]

  return (
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
    >
      <DisplayFlashToasts />
    </Kit>
  )
}

export default App