import React from 'react'
import PropTypes from 'prop-types'

import { connectField } from 'uniforms'

import { useTranslation } from 'react-i18next'

import moment from 'moment'
import 'moment/locale/pl'
import MomentUtils from '@date-io/moment'

import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers'

const styles = {
  root: {
    margin: '0.5rem 0 0.25rem 0',
  },
}

function MuiPickerField({ onChange, value, label, format, variant, fullWidth, type, ...otherProps }) {
  const { i18n } = useTranslation()

  const commonProps = {
    disableToolbar: true,
    variant: variant || 'inline',
    label: label,
    value: moment(value),
    onChange: (momentValue) => onChange(momentValue.toISOString()),
    KeyboardButtonProps: { 'aria-label': 'change date' },
    fullWidth: fullWidth || true,
  }

  return (
    <div style={styles.root}>
      <MuiPickersUtilsProvider
        utils={MomentUtils}
        locale={i18n.language}
      >
        {
          type === 'datetime' ?
            <KeyboardDateTimePicker
              format={format || 'YYYY-MM-DD HH:mm'}
              {...commonProps}
            />
            :
            <KeyboardDatePicker
              format={format || 'YYYY-MM-DD'}
              {...commonProps}
            />
        }
      </MuiPickersUtilsProvider>
    </div>
  )
}

MuiPickerField.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  format: PropTypes.string,
  variant: PropTypes.string,
  fullWidth: PropTypes.bool,
  type: PropTypes.string,
}

export default connectField(MuiPickerField)