import React, { useState } from 'react'
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

const MuiPickerField = (
  { onChange, value, label, dateFormat, variant, fullWidth, type, error, errorMessage, name, ...otherProps }
) => {
  const { i18n } = useTranslation()

  const [isOpen, setIsOpen] = useState(false)

  const commonProps = {
    open: isOpen,
    onAccept: () => setIsOpen(false),
    disableToolbar: true,
    variant: variant || 'inline',
    error: Boolean(error),
    label: error ? errorMessage : label,
    value: moment(value || Date.now()),
    onChange: (momentValue) => onChange((moment(momentValue || Date.now())).toISOString()),
    InputAdornmentProps: { onClick: () => setIsOpen(true) },
    KeyboardButtonProps: { 'aria-label': 'change date' },
    fullWidth: fullWidth || true,
    name,
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
              format={dateFormat || 'YYYY-MM-DD HH:mm'}
              {...commonProps}
            />
            :
            <KeyboardDatePicker
              format={dateFormat || 'YYYY-MM-DD'}
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
  dateFormat: PropTypes.string,
  variant: PropTypes.string,
  fullWidth: PropTypes.bool,
  type: PropTypes.string,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  name: PropTypes.string,
}

export default connectField(MuiPickerField)