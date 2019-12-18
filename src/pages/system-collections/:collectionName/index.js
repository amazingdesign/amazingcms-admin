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

const SystemCollectionPage = (props) => {
  const dispatch = useDispatch()

  const { collectionName } = useParams()
  const [params, setParams] = useQsParams({
    page: 1,
    pageSize: 10,
    query: {},
  }, collectionName)

  const collectionsServiceName = 'system-collections'
  const collectionData = useDataItemFromStore(collectionsServiceName, { query: { name: collectionName } })
  const userCan = useCollectionPrivileges(collectionData)

  const onCreate = (event, rowData) => dispatch(push(`/system-collections/${collectionName}/new`))

  return (
    <Page>
      <CheckCollectionPermissions collectionData={collectionData}>
        <CollectionSearch
          onChange={(query) => setParams({ ...params, query: { ...params.query, ...query } })}
          query={params.query}
          collectionData={collectionData}
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