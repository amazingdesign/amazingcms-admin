/* eslint-disable max-lines */
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
import MDEditorField from './MDEditorField'

export const mapFieldNameToField = (fieldName) => {
  switch (fieldName) {
    case 'MDEditorField':
      return MDEditorField
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

const prepareKey = (key) => (
  key &&
  (key.slice(0, 2) === '_$' ? key.slice(1) : key)
)

export const mapJSONSchemaToUniformsSchema = (object) => (
  object &&
  Object.entries(object)
    .reduce(
      (r, [key, value]) => {
        const preparedKey = prepareKey(key)

        if (typeof value !== 'object') return { ...r, [preparedKey]: value }
        if (Array.isArray(value)) return { ...r, [preparedKey]: value }
        if (value === null) return { ...r, [preparedKey]: value }

        if (key !== 'uniforms') return { ...r, [preparedKey]: mapJSONSchemaToUniformsSchema(value) }

        return { ...r, [preparedKey]: modifyUniformsProperty(value) }
      },
      {}
    )
)

export default mapJSONSchemaToUniformsSchema