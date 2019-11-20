import { useMemo } from 'react'

import { useSelector } from 'react-redux'

export const useCollectionData = (collectionName) => {
  const collectionsData = useSelector(state => state.collections.find.data)
  const collectionData = useMemo(() => (
    collectionsData &&
    collectionsData.find(collectionData => collectionData.name === collectionName)
  ), [collectionsData])

  return collectionData
}

export default useCollectionData