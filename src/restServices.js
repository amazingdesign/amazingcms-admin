import makeRestServices, { crudActionsDeclarations } from 'redux-rest-services'

import axios from './axios'

export const restServices = makeRestServices(
  [
    {
      name: 'routeFromDb',
      url: 'https://react-redux-mui-sarter.firebaseio.com/routes/routeFromDb.json',
      actionsDeclarations: crudActionsDeclarations,
    },
  ],
  (...all) => axios(...all).then(response => response.data)
)

export default restServices