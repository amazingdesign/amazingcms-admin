import makeRestServices, { crudActionsDeclarations } from 'redux-rest-services'

import axios from './axios'

export const restServices = makeRestServices(
  [
    {
      name: 'collections',
      url: `${window._env_.REACT_APP_COLLECTIONS_URL}/:id`,
      actionsDeclarations: crudActionsDeclarations,
    },
  ],
  (...all) => axios(...all).then(response => response.data)
)

export default restServices