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

import ListFieldReorder from './ListFieldReorder'
import Base64ImageField from './Base64ImageField'
import MonacoEditorField from './MonacoEditorField'
import MDXEditorField from './MDXEditorField'
import FileField from './FileField'
import DraftEditorField from './DraftEditorField'
import ReactSelectField from './ReactSelectField'
import MuiReactSelectField from './MuiReactSelectField'
import MuiPickerField from './MuiPickerField'
import UUIDField from './UUIDField'

import { mapValues } from 'lodash'

export const mapFieldNameToField = (fieldName) => {
  switch (fieldName) {
    case 'UUIDField':
      return UUIDField
    case 'MuiPickerField':
      return MuiPickerField
    case 'MuiReactSelectField':
      return MuiReactSelectField
    case 'ReactSelectField':
      return ReactSelectField
    case 'DraftEditorField':
      return DraftEditorField
    case 'FileField':
      return FileField
    case 'MDXEditorField':
      return MDXEditorField
    case 'MonacoEditorField':
      return MonacoEditorField
    case 'ListFieldReorder':
      return ListFieldReorder
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
    case 'Base64ImageField':
      return Base64ImageField
    default:
      return AutoField
  }
}

export const modifyUniformsProperty = (object) => {
  if (!object.component) return object

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