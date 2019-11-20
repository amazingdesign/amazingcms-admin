import {
  AutoField,
  LongTextField,
  RadioField,
  SelectField,
  DateField,
  ListField,
  NumField,
  NestField,
  TextField,
  BoolField,
  SubmitField,
  ListItemField,
  ListDelField,
  ListAddField,
  HiddenField,
  ErrorField,
  ErrorFields,
} from 'uniforms-material'

import { mapValues } from 'lodash'

export const mapFieldNameToField = (fieldName) => {
  switch (fieldName) {
    case 'RadioField':
      return RadioField
    case 'SelectField':
      return SelectField
    case 'DateField':
      return DateField
    case 'ListField':
      return ListField
    case 'NumField':
      return NumField
    case 'NestField':
      return NestField
    case 'TextField':
      return TextField
    case 'BoolField':
      return BoolField
    case 'LongTextField':
      return LongTextField
    case 'SubmitField':
      return SubmitField
    case 'ListItemField':
      return ListItemField
    case 'ListDelField':
      return ListDelField
    case 'ListAddField':
      return ListAddField
    case 'HiddenField':
      return HiddenField
    case 'ErrorField':
      return ErrorField
    case 'ErrorFields':
      return ErrorFields
    default:
      return AutoField
  }
}

export const modifyUniformsProperty = (object) => {
  return {
    ...object,
    component: mapFieldNameToField(object.component),
  }
}

export const mapJSONSchemaToUniformsSchema = (object) => mapValues(
  object,
  (value, key) => {
    if (typeof value !== 'object') return value
    if (Array.isArray(value)) return value
    if (value === null) return value

    if (key !== 'uniforms') return mapJSONSchemaToUniformsSchema(value)

    return modifyUniformsProperty(value)
  }
)

export default mapJSONSchemaToUniformsSchema