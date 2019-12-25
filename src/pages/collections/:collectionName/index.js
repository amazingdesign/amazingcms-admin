import React from 'react'

import { useParams } from 'react-router'
import { useDispatch } from 'react-redux'
import { push } from 'connected-react-router'

import Page from '../../../bits/Page'
import { useQsParams } from '../../../bits/useQsParams'
import { useCollectionPrivileges } from '../../../bits/useCollectionPrivileges'
import CheckCollectionPermissions from '../../../bits/CheckCollectionPermissions'
import { useDataItemFromStore } from '../../../bits/redux-rest-services/useDataItemFromStore'

import CollectionTable from '../../../pieces/CollectionTable'
import CollectionSearch from '../../../pieces/CollectionSearch/CollectionSearch'

const getDataOfPopulatedFields = (populateSchema) => Object.entries(populateSchema || {}).reduce(
  (r, [fieldName, populateAction]) => {
    // @TODO moleculer can have object also here in more complex populations
    if (typeof populateAction !== 'string') return r
    if (populateAction.includes('__')) {
      const collectionName = populateAction.split('__')[0]
      return { ...r, [fieldName]: useDataItemFromStore('collections', { query: { name: collectionName } }) }
    }
    const collectionName = populateAction.split('.')[0]
    return { ...r, [fieldName]: useDataItemFromStore('system-collections', { query: { name: collectionName } }) }
  },
  {}
)

const CollectionPage = (props) => {
  const dispatch = useDispatch()

  const { collectionName } = useParams()
  const collectionsServiceName = 'collections'
  const collectionData = useDataItemFromStore(collectionsServiceName, { query: { name: collectionName } })
  const populate = Object.keys(collectionData.populateSchema || {})
  const populatedFieldsCollectionsData = getDataOfPopulatedFields(collectionData.populateSchema)

  const userCan = useCollectionPrivileges(collectionData)

  const [params, setParams] = useQsParams({
    page: 1,
    pageSize: 10,
    populate,
    query: {},
  }, collectionName)

  const onCreate = (event, rowData) => dispatch(push(`/collections/${collectionName}/new`))
  const onSearchChange = (query, paramsFromQuery) => (
    setParams({ ...params, ...paramsFromQuery, query: { ...params.query, ...query } })
  )

  return (
    <Page>
      <CheckCollectionPermissions collectionData={collectionData}>
        <CollectionSearch
          onChange={onSearchChange}
          query={params.query}
          collectionData={collectionData}
          populatedFieldsCollectionsData={populatedFieldsCollectionsData}
        />
        <CollectionTable
          params={params}
          setParams={setParams}
          isSystemCollection={false}
          collectionData={collectionData}
          collectionsServiceName={collectionsServiceName}
          serviceName={'actions'}
          onCreate={onCreate}
          display={{
            create: userCan.create,
            edit: userCan.update,
            duplicate: userCan.create,
            remove: userCan.remove,
          }}
        />
      </CheckCollectionPermissions>
    </Page>
  )
}

CollectionPage.propTypes = {}

export default CollectionPage