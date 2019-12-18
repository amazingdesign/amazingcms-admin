import React from 'react'
import PropTypes from 'prop-types'

import { pickBy, mapValues } from 'lodash'

import { Search } from '@material-ui/icons'

import DefaultSubmitField from '@bit/amazingdesign.react-redux-mui-starter.default-submit-field'

import { Uniform } from '../../bits/uniforms/Uniform'

const filterSchemaByTableFields = (collectionData) => {
  const { tableFields, schema } = collectionData
  const tableFieldsNames = tableFields.map(field => field.name)

  const newSchemaProperties = pickBy(
    schema.properties,
    (fieldSchema, fieldName) => tableFieldsNames.includes(fieldName)
  )

  return {
    ...schema,
    required: undefined,
    properties: newSchemaProperties,
  }
}

const transformValuesToQuery = (values, collectionData) => {
  const { schema: { properties: fieldsDeclarations } } = collectionData

  const query = mapValues(
    values,
    (value, key) => {
      const { type } = fieldsDeclarations[key]

      switch (type) {
        case 'string':
          return { $regex: value }
        case 'array':
          return { $in: value }
        default:
          return value
      }
    }
  )

  return query
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

      if (value.$regex || value.$regex === '') return value.$regex
      if (value.$in) return value.$in

      return value
    }
  )

  return values
}

const SchemaSearch = ({ query, onChange, collectionData, label }) => {
  const schema = collectionData && collectionData.schema
  const filteredSchema = filterSchemaByTableFields(collectionData)

  const model = transformQueryToValues(query, collectionData)
  const onSubmit = (values) => {
    onChange(transformValuesToQuery(values, collectionData))
  }
  return (
    <div>
      {
        schema &&
        <Uniform
          model={model}
          schema={filteredSchema}
          onSubmit={onSubmit}
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
}

export default SchemaSearch