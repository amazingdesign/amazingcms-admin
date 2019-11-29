import { useState, useEffect } from 'react'

import { useDispatch } from 'react-redux'
import { push } from 'connected-react-router'

import qs from 'qs'

export const useQsParams = (defaultParams) => {
  const dispatch = useDispatch()
  const { search } = window.location

  const qsParams = qs.parse(search, { ignoreQueryPrefix: true })
  const initialParams = { ...defaultParams, ...qsParams }

  const [params, setParams] = useState(initialParams)
  
  useEffect(() => {
    dispatch(push(qs.stringify(params, { addQueryPrefix: true })))
  }, [params])

  return [params, setParams]
}

export default useQsParams