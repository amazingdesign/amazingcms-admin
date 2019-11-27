import makeRestServices, { crudActionsDeclarations } from 'redux-rest-services'

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
      name: 'users',
      url: `${window._env_.REACT_APP_API_URL}/users/:id`,
      actionsDeclarations: crudActionsDeclarations,
    },
    {
      name: 'groups',
      url: `${window._env_.REACT_APP_API_URL}/groups/:id`,
      actionsDeclarations: crudActionsDeclarations,
    },
    {
      name: 'privileges',
      url: `${window._env_.REACT_APP_API_URL}/privileges/:id`,
      actionsDeclarations: crudActionsDeclarations,
    },
    {
      name: 'orders',
      url: `${window._env_.REACT_APP_API_URL}/orders/:id`,
      actionsDeclarations: crudActionsDeclarations,
    },
    {
      name: 'payments',
      url: `${window._env_.REACT_APP_API_URL}/payments/:id`,
      actionsDeclarations: crudActionsDeclarations,
    },
    {
      name: 'events',
      url: `${window._env_.REACT_APP_API_URL}/events/:id`,
      actionsDeclarations: crudActionsDeclarations,
    },
    {
      name: 'events-log',
      url: `${window._env_.REACT_APP_API_URL}/events-log/:id`,
      actionsDeclarations: crudActionsDeclarations,
    },
    {
      name: 'languages',
      url: `${window._env_.REACT_APP_API_URL}/languages/:id`,
      actionsDeclarations: crudActionsDeclarations,
    },
  ],
  (...all) => axios(...all).then(response => response.data)
)

export default restServices