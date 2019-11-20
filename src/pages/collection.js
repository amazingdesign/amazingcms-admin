import React from 'react'

import { useParams } from 'react-router'

import CollectionTable from '../pieces/CollectionTable'

const styles = {
  root: {
    position: 'relative',
    minHeight: 400,
  },
  content: {
    padding: '2rem',
  },
}

const CollectionPage = (props) => {

  const { collectionName } = useParams()

  return (
    <div style={styles.root}>
      <div style={styles.content}>
        <CollectionTable
          collectionName={collectionName}
        />
      </div>
    </div>
  )
}

CollectionPage.propTypes = {}

export default CollectionPage