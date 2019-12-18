import React from 'react'

import { useParams } from 'react-router'
import { useDispatch } from 'react-redux'
import { push } from 'connected-react-router'

import { useTranslation } from 'react-i18next'

import Page from '../../../bits/Page'
import { useQsParams } from '../../../bits/useQsParams'
import { useCollectionPrivileges } from '../../../bits/useCollectionPrivileges'
import CheckCollectionPermissions from '../../../bits/CheckCollectionPermissions'
import { useDataItemFromStore } from '../../../bits/redux-rest-services/useDataItemFromStore'

import Button from '../../../pieces/Button'
import CollectionTable from '../../../pieces/CollectionTable'
import CollectionSearch from '../../../pieces/CollectionSearch/CollectionSearch'

const CollectionPage = (props) => {
  const { t } = useTranslation()

  const dispatch = useDispatch()

  const { collectionName } = useParams()
  const [params, setParams] = useQsParams({
    page: 1,
    pageSize: 10,
    query: {},
  }, collectionName)

  const collectionsServiceName = 'collections'
  const collectionData = useDataItemFromStore(collectionsServiceName, { query: { name: collectionName } })
  const userCan = useCollectionPrivileges(collectionData)

  const onAdd = (event, rowData) => dispatch(push(`/collections/${collectionName}/new`))

  return (
    <Page>
      <CheckCollectionPermissions collectionData={collectionData}>
        {
          userCan.create &&
          <Button onClick={onAdd}>
            {t('Add new!')}
          </Button>
        }
        <CollectionSearch
          onChange={(query) => setParams({ ...params, query: { ...params.query, ...query } })}
          query={params.query}
          collectionData={collectionData}
        />
        <CollectionTable
          params={params}
          setParams={setParams}
          isSystemCollection={false}
          collectionData={collectionData}
          collectionsServiceName={collectionsServiceName}
          serviceName={'actions'}
          display={{
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