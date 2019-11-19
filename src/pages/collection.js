import React from 'react'
import { useParams } from 'react-router'

const CollectionPage = (props) => (
  <div>
    {JSON.stringify(useParams())}
  </div>
)

CollectionPage.propTypes = {}

export default CollectionPage