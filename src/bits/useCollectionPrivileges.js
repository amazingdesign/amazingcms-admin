
import { mapValues } from 'lodash'

import { useSelector } from 'react-redux'

export const useCollectionPrivileges = (collectionData) => {
  const userPrivileges = useSelector(state => state.auth.userData.privileges)

  return mapValues(
    (
      collectionData &&
      collectionData.requiredPrivileges
    ) || {},
    (privileges) => Boolean(privileges.find(privilege => userPrivileges.includes(privilege)))
  )
}

export default useCollectionPrivileges