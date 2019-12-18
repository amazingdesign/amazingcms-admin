import React from 'react'
import PropTypes from 'prop-types'

import { useTranslation } from 'react-i18next'

import ArchiveToggle from './ArchiveToggle'
import SchemaSearch from './SchemaSearch'

const CollectionSearch = ({ onChange, query, collectionData }) => {
  const { t } = useTranslation()

  return (
    <div>
      <ArchiveToggle
        query={query}
        onChange={onChange}
      />
      <SchemaSearch
        query={query}
        onChange={onChange}
        collectionData={collectionData}
        label={t('Search')}
      />
    </div>
  )
}

CollectionSearch.defaultProps = {
  query: {},
}

CollectionSearch.propTypes = {
  onChange: PropTypes.func.isRequired,
  query: PropTypes.object.isRequired,
  collectionData: PropTypes.object.isRequired,
}

export default CollectionSearch