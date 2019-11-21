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

  const collectionsData = useSelector((state) => state.collections.find.data)
  const systemCollectionsData = useSelector((state) => state['system-collections'].find.data)

  const collectionsRoutes = useMemo(() => (
    collectionsData &&
    collectionsData.map &&
    collectionsData.map(collectionData => ({
      name: collectionData.displayName || collectionData.name,
      path: ['/collections/:collectionName'],
      pathWithParams: `/collections/${collectionData.name}`,
      component: React.lazy(() => import('./pages/collections/:collectionName')),
      icon: collectionData.icon || 'data_usage',
    }))
  ), [collectionsData])
  const systemCollectionsRoutes = useMemo(() => (
    systemCollectionsData &&
    systemCollectionsData.map &&
    systemCollectionsData.map(collectionData => ({
      name: collectionData.displayName || collectionData.name,
      path: ['/system-collections/:collectionName'],
      pathWithParams: `/system-collections/${collectionData.name}`,
      component: React.lazy(() => import('./pages/system-collections/:collectionName')),
      icon: collectionData.icon || 'settings_input_svideo',
    }))
  ), [systemCollectionsData])

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

  const languages = [
    { code: 'pl', name: t('Polish') },
    { code: 'en', name: t('English') },
  ]

  const routes = (
    systemCollectionsRoutes &&
    collectionsRoutes &&
    systemCollectionsRoutes.concat(collectionsRoutes)
  ) || []

  const routerRoutes = routes.concat([
    {
      name: 'Collection add',
      path: ['/collections/:collectionName/new'],
      component: React.lazy(() => import('./pages/collections/:collectionName/new')),
    },
    {
      name: 'Collection edit',
      path: ['/collections/:collectionName/:id'],
      component: React.lazy(() => import('./pages/collections/:collectionName/:id')),
    },
    {
      name: 'System collection add',
      path: ['/system-collections/:collectionName/new'],
      component: React.lazy(() => import('./pages/system-collections/:collectionName/new')),
    },
    {
      name: 'System collection edit',
      path: ['/system-collections/:collectionName/:id'],
      component: React.lazy(() => import('./pages/system-collections/:collectionName/:id')),
    },
  ])

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
        routerRoutes={routerRoutes}

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