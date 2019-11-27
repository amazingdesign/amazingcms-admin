import makeRestServices, { crudActionsDeclarations, instances } from 'redux-rest-services'

import axios from './axios'

export const restServices = makeRestServices(
  [
    {
      name: 'system-collections',
      url: `${window._env_.REACT_APP_API_URL}/system-collections`,
      actionsDeclarations: [{ name: 'find', method: 'GET' }],
    },
    {
      name: 'collections',
      url: `${window._env_.REACT_APP_API_URL}/collections/:id`,
      actionsDeclarations: crudActionsDeclarations,
      transformer: data => data && data.rows,
    },
    {
      name: 'actions',
      url: `${window._env_.REACT_APP_API_URL}/actions/:collectionName/:id`,
      actionsDeclarations: crudActionsDeclarations,
    },
    {
      name: 'system-collection-users',
      url: `${window._env_.REACT_APP_API_URL}/users/:id`,
      actionsDeclarations: crudActionsDeclarations,
    },
    {
      name: 'system-collection-groups',
      url: `${window._env_.REACT_APP_API_URL}/groups/:id`,
      actionsDeclarations: crudActionsDeclarations,
    },
    {
      name: 'system-collection-privileges',
      url: `${window._env_.REACT_APP_API_URL}/privileges/:id`,
      actionsDeclarations: crudActionsDeclarations,
    },
    {
      name: 'system-collection-orders',
      url: `${window._env_.REACT_APP_API_URL}/orders/:id`,
      actionsDeclarations: crudActionsDeclarations,
    },
    {
      name: 'system-collection-payments',
      url: `${window._env_.REACT_APP_API_URL}/payments/:id`,
      actionsDeclarations: crudActionsDeclarations,
    },
    {
      name: 'system-collection-events',
      url: `${window._env_.REACT_APP_API_URL}/events/:id`,
      actionsDeclarations: crudActionsDeclarations,
    },
    {
      name: 'system-collection-events-log',
      url: `${window._env_.REACT_APP_API_URL}/events-log/:id`,
      actionsDeclarations: crudActionsDeclarations,
    },
    {
      name: 'system-collection-languages',
      url: `${window._env_.REACT_APP_API_URL}/languages/:id`,
      actionsDeclarations: crudActionsDeclarations,
    },
    {
      name: 'system-collection-collections',
      url: `${window._env_.REACT_APP_API_URL}/collections/:id`,
      actionsDeclarations: crudActionsDeclarations,
      onReceivesData: ({ method, name }, dispatch) => {
        if (['update', 'create'].includes(name)) {
          // need to reload all collections after change
          const currentInstance = instances[0]
          dispatch(currentInstance.actions.collections.find())
        }
      },
    },
  ],
  (...all) => axios(...all).then(response => response.data)
)

export default restServices