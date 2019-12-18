import { useState, useEffect, useRef } from 'react'

import { useDispatch } from 'react-redux'
import { push } from 'connected-react-router'

import qs from 'qs'

export const useQsParams = (defaultParams, page) => {
  const dispatch = useDispatch()
  const { search } = window.location

  const isInitialMount = useRef(true)

  const qsParams = qs.parse(search, { ignoreQueryPrefix: true })
  const initialParams = { ...defaultParams, ...qsParams }
  const [params, setParams] = useState(initialParams)

  // on page change reset to page defaults
  // but not on initial component mount
  useEffect(() => {
    if(isInitialMount.current){
      isInitialMount.current = false
      return
    }

    setParams(defaultParams)
  }, [page])

  useEffect(() => {
    dispatch(push(qs.stringify(params, { addQueryPrefix: true })))
  }, [JSON.stringify(params)])

  return [params, setParams]
}

export default useQsParams