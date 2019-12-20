
import { mapValues } from 'lodash'

import { useSelector } from 'react-redux'

export const privilegesChecker = (userPrivileges, requiredPrivilegesItem) => {
  const requiredPrivilegesAreSet = (
    requiredPrivilegesItem &&
    Array.isArray(requiredPrivilegesItem) &&
    requiredPrivilegesItem.length !== 0
  )

  // no requiredPrivileges === access
  if (!requiredPrivilegesAreSet) return true

  // no access fo anyone
  if (requiredPrivilegesItem.includes['$NONE']) return false

  return requiredPrivilegesItem.find(privilege => userPrivileges.includes(privilege))

}

export const useCollectionPrivileges = (collectionData) => {
  const userPrivileges = useSelector(state => state.auth.userData.privileges)

  const userCan = mapValues(
    (
      collectionData &&
      collectionData.requiredPrivileges
    ) || {},
    (requiredPrivilegesItem) => Boolean(privilegesChecker(userPrivileges, requiredPrivilegesItem))
  )

  return new Proxy(
    userCan,
    {
      get(target, name) {
        return target[name] === undefined ? true : target[name]
      },
    }
  )
}

export default useCollectionPrivileges