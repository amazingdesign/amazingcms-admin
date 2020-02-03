import React from 'react'
import PropTypes from 'prop-types'

import { pickBy, mapValues, mapKeys } from 'lodash'

import { Search } from '@material-ui/icons'

import DefaultSubmitField from '@bit/amazingdesign.react-redux-mui-starter.default-submit-field'

import { Uniform } from '../../bits/uniforms/Uniform'

const REPLACER = '~NESTED~SEPARATOR~' // no . or []
const nestedFieldSafeName = (name) => name && name.replace(/\./g, REPLACER)
const nestedFieldDotName = (name) => (
  name && name.replace(new RegExp(REPLACER.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), '.')
)

const escapeRegExp = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // $& means the whole matched string
// eslint-disable-next-line no-useless-escape
const unEscapeRegExp = (string) => string.replace(/\\([\.\*\+\?\^\$\{\}\(\)\|\[\]\/\\])/g, '$1')

const pickFieldsFromSchemaToBeSearchFields = (tableFields) => (fieldSchema, fieldName) => {
  return (
    tableFields.find(field => nestedFieldSafeName(field.name) === fieldName) &&
    tableFields.find(field => nestedFieldSafeName(field.name) === fieldName).columnRenderType !== 'boolean-icon' &&
    tableFields.find(field => nestedFieldSafeName(field.name) === fieldName).columnRenderType !== 'boolean' &&
    tableFields.find(field => nestedFieldSafeName(field.name) === fieldName).columnRenderType !== 'date' &&
    tableFields.find(field => nestedFieldSafeName(field.name) === fieldName).columnRenderType !== 'date-time' &&
    tableFields.find(field => nestedFieldSafeName(field.name) === fieldName).columnRenderType !== 'time-from-now' &&
    tableFields.find(field => nestedFieldSafeName(field.name) === fieldName).columnRenderType !== 'avatar'
  )
}

const getPopulatedPathProperties = (populatedFieldsCollectionsData) => {
  return Object.entries(populatedFieldsCollectionsData || {}).reduce(
    (r, [fieldName, collectionData]) => {
      const nestedFieldsSchema = (
        collectionData &&
        collectionData.schema &&
        Object.entries(collectionData.schema.properties || {}).reduce(
          (r, [nestedFieldName, nestedFieldSchema]) => ({
            ...r,
            [nestedFieldSafeName(`${fieldName}.${nestedFieldName}`)]: nestedFieldSchema,
          }),
          {}
        )
      )
      return { ...r, ...nestedFieldsSchema }
    },
    {}
  )
}

const filterSchemaByTableFields = (colledctionDataWithPopulatedFieldsProperties) => {
  const { tableFields, schema } = colledctionDataWithPopulatedFieldsProperties

  const tableFieldsSchemaProps = pickBy(
    schema.properties,
    pickFieldsFromSchemaToBeSearchFields(tableFields)
  )

  const mappedSchemaProps = mapValues(
    tableFieldsSchemaProps,
    (value, key) => {
      // clear fields like email formated
      if (value && value.uniforms && value.uniforms.type) {
        return {
          ...value,
          uniforms: { ...value.uniforms, type: undefined },
        }
      }
      // clear disabled
      if (value && value.uniforms && value.uniforms.disabled) {
        return {
          ...value,
          uniforms: { ...value.uniforms, disabled: undefined },
        }
      }

      return value
    }
  )

  return {
    ...schema,
    required: undefined,
    properties: mappedSchemaProps,
  }
}

const transformValuesToQuery = (values, collectionData) => {
  const { schema: { properties: fieldsDeclarations } } = collectionData

  const query = mapValues(
    values,
    (value, fieldName) => {
      if(value === '') return undefined

      const { type } = fieldsDeclarations[fieldName]
      const valueTrimmed = typeof value === 'string' ? value.trim() : value

      switch (type) {
        case 'string':
          return { $regex: escapeRegExp(valueTrimmed), $options: 'i' }
        case 'array':
          return { $in: valueTrimmed }
        default:
          return valueTrimmed
      }
    }
  )

  const queryWithDots = mapKeys(
    query,
    (value, fieldName) => nestedFieldDotName(fieldName)
  )

  return queryWithDots
}

const transformQueryToValues = (query, collectionData) => {
  const { tableFields } = collectionData
  const tableFieldsNames = tableFields.map(field => field.name)

  const queryFiltered = pickBy(
    query,
    (value, key) => tableFieldsNames.includes(key)
  )

  const values = mapValues(
    queryFiltered,
    (value, key) => {    
      if (typeof value !== 'object') return value

      if (value.$regex || value.$regex === '') return unEscapeRegExp(value.$regex)
      if (value.$in) return value.$in

      return value
    }
  )

  const valuesWithSafeNames = mapKeys(
    values,
    (value, fieldName) => nestedFieldSafeName(fieldName)
  )

  return valuesWithSafeNames
}

const decideToUseQueryByPopulation = (query, collectionData) => {
  if (!collectionData) return false
  if (!collectionData.populateSchema) return false

  const nestedQueryKeys = Object.keys(query)
    .filter((path) => path.split('.')[1])
    .map((path) => path.split('.')[0])

  const populatedFields = Object.keys(collectionData.populateSchema)

  if (populatedFields.find(populateFieldName => nestedQueryKeys.includes(populateFieldName))) {
    return true
  }

  return false
}

const SchemaSearch = ({ query, onChange, collectionData, populatedFieldsCollectionsData, label }) => {
  const schema = collectionData && collectionData.schema
  const populatedPathsProperties = getPopulatedPathProperties(populatedFieldsCollectionsData)
  const collectionDataWithPopulatedProperties = {
    ...collectionData,
    schema: {
      ...collectionData.schema,
      properties: { ...collectionData.schema.properties, ...populatedPathsProperties },
    },
  }
  const filteredSchema = filterSchemaByTableFields(collectionDataWithPopulatedProperties)

  const model = transformQueryToValues(query, collectionDataWithPopulatedProperties)

  const onSubmit = (values) => {
    const query = transformValuesToQuery(values, collectionDataWithPopulatedProperties)
    const otherQueryParams = (
      decideToUseQueryByPopulation(query, collectionDataWithPopulatedProperties) ?
        { queryByPopulation: true }
        :
        {}
    )

    onChange(query, otherQueryParams)
  }

  return (
    <div>
      {
        schema &&
        <Uniform
          model={model}
          schema={filteredSchema}
          onSubmit={onSubmit}
          // @HACK this disable validation
          // do not need validation here because in most cases 
          // user search not exact words so it is compared by LIKE
          onValidate={(model, error, callback) => callback(null)}
          submitField={() => (
            <DefaultSubmitField
              startIcon={<Search />}
              variant={'text'}
              label={label}
            />
          )}
        />
      }
    </div>
  )
}

SchemaSearch.propTypes = {
  label: PropTypes.string.isRequired,
  query: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  collectionData: PropTypes.object.isRequired,
  populatedFieldsCollectionsData: PropTypes.object.isRequired,
}

export default SchemaSearch