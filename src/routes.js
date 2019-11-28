
import React from 'react'

import { logOutAsyncAction } from './auth'

export const makeRoutes = (collectionsData, systemCollectionsData, dispatch, t) => {
  const collectionsRoutes = (
    collectionsData &&
    collectionsData.map &&
    collectionsData.map(collectionData => ({
      name: collectionData.displayName || collectionData.name,
      path: ['/collections/:collectionName'],
      pathWithParams: `/collections/${collectionData.name}`,
      component: React.lazy(() => import('./pages/collections/:collectionName')),
      icon: collectionData.icon || 'data_usage',
    }))
  )

  const systemCollectionsRoutes = (
    systemCollectionsData &&
    systemCollectionsData.map &&
    systemCollectionsData.map(collectionData => ({
      name: collectionData.displayName || collectionData.name,
      path: ['/system-collections/:collectionName'],
      pathWithParams: `/system-collections/${collectionData.name}`,
      component: React.lazy(() => import('./pages/system-collections/:collectionName')),
      icon: collectionData.icon || 'settings_input_svideo',
    }))
  )

  const systemRoutesWithSeparatorAtEnd = (
    systemCollectionsRoutes &&
    systemCollectionsRoutes.map(
      (route, i, arr) => (
        i === (arr.length - 1) ?
          {
            ...route,
            separator: {
              ...route.separator,
              below: true,
            },
          }
          :
          route
      )
    )
  ) || []

  const mainMenuRoutes = (
    systemRoutesWithSeparatorAtEnd &&
    collectionsRoutes &&
    systemRoutesWithSeparatorAtEnd.concat(collectionsRoutes)
  ) || []

  const routerRoutes = mainMenuRoutes.concat([
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
      name: 'Collection duplicate',
      path: ['/collections/:collectionName/duplicate/:id'],
      component: React.lazy(() => import('./pages/collections/:collectionName/duplicate/:id')),
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
    {
      name: 'System collection duplicate',
      path: ['/system-collections/:collectionName/duplicate/:id'],
      component: React.lazy(() => import('./pages/system-collections/:collectionName/duplicate/:id')),
    },
  ])

  const profileMenuRoutes = [
    {
      name: t('Logout'),
      icon: 'logout',
      onClick: () => dispatch(logOutAsyncAction()),
    },
  ]

  return {
    mainMenuRoutes,
    routerRoutes,
    profileMenuRoutes,
  }
}

export default makeRoutes