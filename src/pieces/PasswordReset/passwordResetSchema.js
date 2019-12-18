import { JSONSchemaBridge } from 'uniforms-bridge-json-schema'

export default ({ i18n, createValidator }) => {
  const schema = {
    title: 'Login',
    type: 'object',
    properties: {
      password: {
        type: 'string',
        minLength: 1,
        uniforms: {
          type: 'password',
        },
        label: i18n.t('Password'),
      },
      passwordRetype: {
        type: 'string',
        minLength: 1,
        const: { $data: '1/password' },
        uniforms: {
          type: 'password',
        },
        label: i18n.t('Retype password'),
      },
    },
    required: ['password', 'passwordRetype'],
  }

  const schemaValidator = createValidator(schema)

  const bridge = new JSONSchemaBridge(schema, schemaValidator)

  return bridge
}