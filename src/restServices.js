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
  ],
  (...all) => axios(...all).then(response => response.data)
)

export default restServices