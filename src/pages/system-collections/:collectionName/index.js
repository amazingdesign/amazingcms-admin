import React from 'react'

import { useParams } from 'react-router'
import { useDispatch } from 'react-redux'
import { push } from 'connected-react-router'

import { useTranslation } from 'react-i18next'

import Page from '../../../bits/Page'
import { useDataItemFromStore } from '../../../bits/redux-rest-services/useDataItemFromStore'

import Button from '../../../pieces/Button'
import CollectionTable from '../../../pieces/CollectionTable'
import CheckCollectionPermissions from '../../../bits/CheckCollectionPermissions'
import { useCollectionPrivileges } from '../../../bits/useCollectionPrivileges'

const SystemCollectionPage = (props) => {
  const { t } = useTranslation()

  const dispatch = useDispatch()

  const { collectionName } = useParams()

  const collectionsServiceName = 'system-collections'
  const collectionData = useDataItemFromStore(collectionsServiceName, { query: { name: collectionName } })
  const userCan = useCollectionPrivileges(collectionData)

  const onAdd = (event, rowData) => dispatch(push(`/system-collections/${collectionName}/new`))

  return (
    <Page>
      <CheckCollectionPermissions collectionData={collectionData}>
        {
          userCan.create &&
          <Button onClick={onAdd}>
            {t('Add new!')}
          </Button>
        }
        <CollectionTable
          isSystemCollection={true}
          collectionData={collectionData}
          collectionsServiceName={collectionsServiceName}
          serviceName={collectionName}
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

SystemCollectionPage.propTypes = {}

export default SystemCollectionPage