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
import getDataOfPopulatedFields from '../../../pieces/getDataOfPopulatedFields'

const SystemCollectionPage = (props) => {
  const dispatch = useDispatch()

  const { collectionName } = useParams()
  const collectionsServiceName = 'system-collections'
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

  const onCreate = (event, rowData) => dispatch(push(`/system-collections/${collectionName}/new`))
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
          isSystemCollection={true}
          collectionData={collectionData}
          collectionsServiceName={collectionsServiceName}
          serviceName={collectionName}
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

SystemCollectionPage.propTypes = {}

export default SystemCollectionPage