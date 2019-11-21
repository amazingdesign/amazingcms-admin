import Ajv from 'ajv'

export const ajv = new Ajv({ allErrors: true, useDefaults: true })

export const createValidator = (schema) => {
  const validator = ajv.compile(schema)

  return model => {
    validator(model)

    if (validator.errors && validator.errors.length) {

      // eslint-disable-next-line no-throw-literal
      throw { details: validator.errors }
    }
  }
}

export default createValidator