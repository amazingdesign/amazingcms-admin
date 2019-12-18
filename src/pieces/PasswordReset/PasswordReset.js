import React from 'react'
import PropTypes from 'prop-types'

import { Typography } from '@material-ui/core'

import { AutoForm, AutoField, ErrorField } from 'uniforms-material'
import { useTranslation } from 'react-i18next'

import DefaultSubmitField from '@bit/amazingdesign.react-redux-mui-starter.default-submit-field'

import createPasswordResetSchema from './passwordResetSchema'

const PasswordReset = ({ header, onSubmit, createValidator, customErrors }) => {
  const { t, i18n } = useTranslation(undefined, { useSuspense: false })

  return (
    <div>
      <Typography variant="h4" gutterBottom={true}>
        {header || t('Type new password!')}
      </Typography>
      <AutoForm
        schema={createPasswordResetSchema({ i18n, createValidator })}
        onChange={console.log}
        onSubmit={onSubmit}
      >
        <AutoField name={'password'} />
        <ErrorField
          name={'password'}
          errorMessage={
            (customErrors && customErrors['password']) ||
            t('Cant be empty and must be the same in both fields!')
          }
        />
        <AutoField name={'passwordRetype'} />
        <ErrorField
          name={'passwordRetype'}
          errorMessage={
            (customErrors && customErrors['password']) ||
            t('Cant be empty and must be the same in both fields!')
          }
        />
        <DefaultSubmitField label={t('CHANGE')} />
      </AutoForm>
    </div>
  )
}

PasswordReset.propTypes = {
  header: PropTypes.string,
  customErrors: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  createValidator: PropTypes.func.isRequired,
}

export default PasswordReset