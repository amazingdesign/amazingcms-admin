import makeRestServices, { crudActionsDeclarations, instances } from 'redux-rest-services'

import axios from './axios'

const updateSystemCollectionsOnRecordModify = ({ method, name }, dispatch) => {
  if (['update', 'create', 'delete'].includes(name)) {
    // need to reload all collections after change
    const currentInstance = instances[0]
    dispatch(currentInstance.actions['system-collections'].find())
  }
}

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
      onReceivesData: updateSystemCollectionsOnRecordModify,
    },
    {
      name: 'system-collection-groups',
      url: `${window._env_.REACT_APP_API_URL}/groups/:id`,
      actionsDeclarations: crudActionsDeclarations,
      onReceivesData: updateSystemCollectionsOnRecordModify,
    },
    {
      name: 'system-collection-privileges',
      url: `${window._env_.REACT_APP_API_URL}/privileges/:id`,
      actionsDeclarations: crudActionsDeclarations,
      onReceivesData: updateSystemCollectionsOnRecordModify,
    },
    {
      name: 'system-collection-orders',
      url: `${window._env_.REACT_APP_API_URL}/orders/:id`,
      actionsDeclarations: crudActionsDeclarations,
      onReceivesData: updateSystemCollectionsOnRecordModify,
    },
    {
      name: 'system-collection-payments',
      url: `${window._env_.REACT_APP_API_URL}/payments/:id`,
      actionsDeclarations: crudActionsDeclarations,
      onReceivesData: updateSystemCollectionsOnRecordModify,
    },
    {
      name: 'system-collection-events',
      url: `${window._env_.REACT_APP_API_URL}/events/:id`,
      actionsDeclarations: crudActionsDeclarations,
      onReceivesData: updateSystemCollectionsOnRecordModify,
    },
    {
      name: 'system-collection-events-log',
      url: `${window._env_.REACT_APP_API_URL}/events-log/:id`,
      actionsDeclarations: crudActionsDeclarations,
      onReceivesData: updateSystemCollectionsOnRecordModify,
    },
    {
      name: 'system-collection-languages',
      url: `${window._env_.REACT_APP_API_URL}/languages/:id`,
      actionsDeclarations: crudActionsDeclarations,
      onReceivesData: updateSystemCollectionsOnRecordModify,
    },
    {
      name: 'system-collection-collections',
      url: `${window._env_.REACT_APP_API_URL}/collections/:id`,
      actionsDeclarations: crudActionsDeclarations,
      onReceivesData: ({ method, name }, dispatch) => {
        if (['update', 'create', 'delete'].includes(name)) {
          // need to reload all collections after change
          const currentInstance = instances[0]
          dispatch(currentInstance.actions.collections.find())
        }
      },
    },
    {
      name: 'uploader',
      url: `${window._env_.REACT_APP_API_URL}/uploader/:id`,
      transformer: data => data && data.rows,
      actionsDeclarations: [{
        name: 'sendFiles',
        method: 'POST',
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: console.log,
      }].concat(crudActionsDeclarations),
      onReceivesData: ({ method, name }, dispatch) => {
        if (['sendFiles', 'update', 'create', 'delete'].includes(name)) {
          // need to current collection after change
          const currentInstance = instances[0]
          dispatch(currentInstance.actions.uploader.find({ pageSize: Number.MAX_SAFE_INTEGER }))
        }
      },
    },
  ],
  (...all) => axios(...all).then(response => response.data)
)

export default restServices