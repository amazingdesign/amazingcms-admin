import { useMemo } from 'react'

import { useSelector } from 'react-redux'

export const useDataItemFromStore = (name, { query } = {}) => {
  const data = useSelector(state => state[name].find.data)

  const filteredData = useMemo(() => (
    data &&
    data.find(item => (
      Object.keys(query || {})
        .reduce(
          (r, key) => r && (item[key] === query[key]),
          true
        )
    ))
  ), [data, query])

  return filteredData
}

export default useDataItemFromStore