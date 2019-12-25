import React from 'react'

import { useParams } from 'react-router'
import { useDispatch } from 'react-redux'
import { push } from 'connected-react-router'

import Page from '../../../bits/Page'
import { useQsParams } from '../../../bits/useQsParams'
import { useCollectionPrivileges } from '../../../bits/useCollectionPrivileges'
import CheckCollectionPermissions from '../../../bits/CheckCollectionPermissions'
import { useDataItemFromStore } from '../../../bits/redux-rest-services/useDataItemFromStore'

import { store } from '../../../store'
import CollectionTable from '../../../pieces/CollectionTable'
import CollectionSearch from '../../../pieces/CollectionSearch'

const getDataOfPopulatedFields = (populateSchema, parentFieldName = '') => {
  const parentFieldNameWithDot = parentFieldName ? parentFieldName + '.' : ''

  return Object.entries(populateSchema || {}).reduce(
    (r, [fieldName, populateDefinition]) => {
      // @TODO moleculer can have object also here in more complex populations
      if (!['string', 'object'].includes(typeof populateDefinition)) return r
      const populateAction = typeof populateDefinition === 'string' ? populateDefinition : populateDefinition.action

      const isSystemCollection = !populateAction.includes('__')
      const serviceName = isSystemCollection ? 'system-collections' : 'collections'
      const splitActionBy = isSystemCollection ? '.' : '__'
      const collectionName = populateAction.split(splitActionBy)[0]
      const allCollectionsData = store.getState()[serviceName].find.data
      const populatedCollectionData = (
        allCollectionsData &&
        allCollectionsData.find(
          (collectionData) => collectionData.name === collectionName
        )
      ) || []

      const nestedPopulatedFields = (
        populatedCollectionData.populateSchema ?
          getDataOfPopulatedFields(populatedCollectionData.populateSchema, `${parentFieldNameWithDot}${fieldName}`)
          :
          {}
      )

      const fieldNameWithParent = `${parentFieldNameWithDot}${fieldName}`

      return { ...r, ...nestedPopulatedFields, [fieldNameWithParent]: populatedCollectionData }
    },
    {}
  )
}

const CollectionPage = (props) => {
  const dispatch = useDispatch()

  const { collectionName } = useParams()
  const collectionsServiceName = 'collections'
  const collectionData = useDataItemFromStore(collectionsServiceName, { query: { name: collectionName } })
  const populatedFieldsCollectionsData = getDataOfPopulatedFields(collectionData.populateSchema)

  const userCan = useCollectionPrivileges(collectionData)

  // params from URL are strings
  // passing strings as initial saves render
  const [params, setParams] = useQsParams({
    page: '1',
    pageSize: '10',
    query: { _archived: { $in: ['false', ''] } },
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