import React from 'react'
import PropTypes from 'prop-types'

import { useTranslation } from 'react-i18next'

import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab'

const STATES = {
  archived: JSON.stringify({ $in: ['true'] }),
  notArchived: JSON.stringify({ $in: ['false', ''] }),
  both: JSON.stringify({ $in: ['true', 'false', ''] }),
}

const ArchiveToggle = ({ onChange, query }) => {
  const { t } = useTranslation()

  const toggleArchived = (value) => {
    onChange({ _archived: value && JSON.parse(value) })
  }

  if (
    !query._archived ||
    !Object.values(STATES).includes(JSON.stringify(query._archived))
  ) {
    toggleArchived(STATES.notArchived)
  }


  return (
    <>
      <ToggleButtonGroup
        style={{ width: '100%' }}
        size={'small'}
        value={JSON.stringify(query._archived)}
        exclusive={true}
        onChange={(e, value) => toggleArchived(value)}
      >
        <ToggleButton style={{ width: '100%' }} value={STATES.notArchived}>
          {t('Not archived')}
        </ToggleButton>,
        <ToggleButton style={{ width: '100%' }} value={STATES.archived}>
          {t('Archived')}
        </ToggleButton>,
        <ToggleButton style={{ width: '100%' }} value={STATES.both}>
          {t('Both')}
        </ToggleButton>,
      </ToggleButtonGroup>
    </>
  )
}

ArchiveToggle.defaultProps = {
  query: {},
}

ArchiveToggle.propTypes = {
  onChange: PropTypes.func.isRequired,
  query: PropTypes.object.isRequired,
}

export default ArchiveToggle