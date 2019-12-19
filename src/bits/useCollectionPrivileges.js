
import { mapValues } from 'lodash'

import { useSelector } from 'react-redux'

export const privilegesChecker = (userPrivileges, requiredPrivileges) => {
  const requiredPrivilegesAreSet = (
    requiredPrivileges &&
    requiredPrivileges.list &&
    Array.isArray(requiredPrivileges.list) &&
    requiredPrivileges.list.length !== 0
  )

  return requiredPrivilegesAreSet ?
    requiredPrivileges.list.find(privilege => userPrivileges.includes(privilege))
    :
    // no requiredPrivileges === access
    true
}

export const useCollectionPrivileges = (collectionData) => {
  const userPrivileges = useSelector(state => state.auth.userData.privileges)

  const userCan = mapValues(
    (
      collectionData &&
      collectionData.requiredPrivileges
    ) || {},
    (privileges) => Boolean(privilegesChecker(userPrivileges, privileges))
  )

  return new Proxy(
    userCan,
    {
      get(target, name) {
        return target[name] || true
      },
    }
  )
}

export default useCollectionPrivileges