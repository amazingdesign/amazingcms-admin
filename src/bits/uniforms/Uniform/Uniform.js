import React, { useState, useMemo, useEffect } from 'react'
import PropTypes from 'prop-types'

import slugify from 'slugify'

import UniformStateless from './UniformStateless'

import { findFirstLevelSlugFields } from '../findFirstLevelSlugFields'

const Uniform = ({ schema, model: propsModel, ...otherProps }) => {
  const [model, setModel] = useState(propsModel)

  useEffect(() => {
    propsModel &&
      setSlugsOnChangeModel(propsModel)
  }, [propsModel])

  const slugFields = useMemo(() => findFirstLevelSlugFields(schema), [schema])
  const setSlugOnChangeModel = (newModel, { fieldName, from }) => {
    if (newModel[from] !== undefined) {
      return {
        ...newModel,
        [fieldName]: slugify(newModel.name).toLocaleLowerCase(),
      }
    }

    return newModel
  }
  const setSlugsOnChangeModel = (newModel) => {
    const newModelWithSlugs = slugFields.reduce(
      setSlugOnChangeModel,
      newModel
    )

    if (newModel !== newModelWithSlugs) {
      setModel({ ...newModelWithSlugs })
    }
  }

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