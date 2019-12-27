
import { store } from '../store'

export const getDataOfPopulatedFields = (populateSchema, parentFieldName = '') => {
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

export default getDataOfPopulatedFields