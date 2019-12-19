import React from 'react'
import PropTypes from 'prop-types'

import { useTranslation } from 'react-i18next'

import IconMessage from '../bits/IconMessage'

import { useCollectionPrivileges } from './useCollectionPrivileges'

const CheckCollectionPermissions = ({ children, checks, collectionData }) => {
  const { t } = useTranslation()

  const userCan = useCollectionPrivileges(collectionData)

  console.log(userCan)

  const userPassAllChecks = checks.reduce(
    (r, check) => r && userCan[check],
    true
  )

  return (
    !userPassAllChecks ?
      <IconMessage
        icon={'block'}
        message={t('This route is forbidden!')}
      />
      :
      typeof children === 'function' ?
        children({ userCan })
        :
        children
  )
}

CheckCollectionPermissions.defaultProps = {
  checks: ['list'],
}

CheckCollectionPermissions.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func,
  ]),
  collectionData: PropTypes.object.isRequired,
  checks: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default CheckCollectionPermissions