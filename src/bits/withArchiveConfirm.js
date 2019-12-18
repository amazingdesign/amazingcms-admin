import React from 'react'
import PropTypes from 'prop-types'

import withConfirm from 'material-ui-confirm'
import { useTranslation } from 'react-i18next'

const withArchiveConfirm = (WrappedComponent) => {

  const WithArchiveConfirm = ({ confirm, ...otherProps }) => {

    const { t } = useTranslation()

    const archiveConfirm = (action, params) => confirm(
      action,
      {
        confirmationText: t('Ok'),
        cancellationText: t('Cancel'),
        title: t('Are you sure?'),
        description: t('This will archive this item! You can unarchive it later!'),
        ...params,
      }
    )

    WithArchiveConfirm.propTypes = {
      confirm: PropTypes.func.isRequired,
    }

    return (
      <WrappedComponent
        confirm={archiveConfirm}
        {...otherProps}
      />
    )

  }

  return withConfirm(WithArchiveConfirm)
}

export default withArchiveConfirm