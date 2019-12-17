import React from 'react'
import PropTypes from 'prop-types'

import { useTranslation } from 'react-i18next'

import IconMessage from '../bits/IconMessage'

import { useCollectionPrivileges } from './useCollectionPrivileges'

const CheckCollectionPermissions = ({ children, checks, collectionData }) => {
  const { t } = useTranslation()

  const userCan = useCollectionPrivileges(collectionData)

  const userPassAllChecks = checks.reduce(
    (r, check) => r && userCan[check],
    true
  )

  console.log(userCan, userPassAllChecks)

  return (
    !userPassAllChecks ?
      <IconMessage
        icon={'block'}
        message={t('This route is forbidden!')}
      />
      :
      children
  )
}

CheckCollectionPermissions.defaultProps = {
  checks: ['list'],
}

CheckCollectionPermissions.propTypes = {
  children: PropTypes.node,
  collectionData: PropTypes.object.isRequired,
  checks: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default CheckCollectionPermissions