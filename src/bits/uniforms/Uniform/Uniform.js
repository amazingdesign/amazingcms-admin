import React, { useState, useMemo, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'

import slugify from 'slugify'

import UniformStateless from './UniformStateless'

import { findFirstLevelSlugFields } from '../findFirstLevelSlugFields'

const Uniform = ({ schema, model: propsModel, ...otherProps }) => {
  const [model, setModel] = useState(propsModel)

  const slugFields = useMemo(() => findFirstLevelSlugFields(schema), [schema])
  const setSlugOnChangeModel = useCallback((newModel, { fieldName, from }) => {
    if (newModel[from] !== undefined) {
      return {
        ...newModel,
        [fieldName]: slugify(newModel.name).toLocaleLowerCase(),
      }
    }

    return newModel
  }, [])
  const setSlugsOnChangeModel = useCallback((newModel) => {
    const newModelWithSlugs = slugFields.reduce(
      setSlugOnChangeModel,
      newModel
    )

    if (newModel !== newModelWithSlugs) {
      setModel({ ...newModelWithSlugs })
    }
  }, [setSlugOnChangeModel, slugFields])

  useEffect(() => {
    propsModel && setSlugsOnChangeModel(propsModel)
  }, [propsModel, setSlugsOnChangeModel])


  return (
    <UniformStateless
      model={model}
      schema={schema}
      onChangeModel={setSlugsOnChangeModel}
      {...otherProps}
    />
  )
}

Uniform.propTypes = {
  schema: PropTypes.object.isRequired,
  model: PropTypes.object,
}

export default Uniform