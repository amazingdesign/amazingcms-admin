import Ajv from 'ajv'
import ajvKeyWords from 'ajv-keywords'
import ajvErrors from 'ajv-errors'

export const ajv = ajvErrors(
  ajvKeyWords(
    new Ajv({ allErrors: true, jsonPointers: true, useDefaults: true, $data: true })
  )
)

export const createValidator = (schema) => {
  const validator = ajv.compile(schema)

  return model => {
    validator(model)

    if (validator.errors && validator.errors.length) {

      console.log(validator.errors)

      // eslint-disable-next-line no-throw-literal
      throw { details: validator.errors }
    }
  }
}

export default createValidator