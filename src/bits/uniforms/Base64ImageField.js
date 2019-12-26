// this is form official uniforms docd
// https://uniforms.tools/docs/tutorials-creating-custom-field

import React from 'react'
import PropTypes from 'prop-types'

import { connectField } from 'uniforms'

function Base64ImageField({ onChange, value, label }) {
  const imgPlaceholder = 'https://via.placeholder.com/150.png'

  function onImageChange({ target: { files } }) {
    if (files && files[0]) {
      const file = files[0]

      if (/\.(jpe?g|png|gif)$/i.test(file.name)) {
        const reader = new FileReader()

        reader.addEventListener('load', function () {
          onChange(reader.result)
        }, false)

        reader.readAsDataURL(file)
      }
    }
  }
  
  return (
    <div className="ImageField">
      <label htmlFor="file-input">
        <div>{label}</div>
        <img
          style={{ cursor: 'pointer', width: '150px', height: '150px' }}
          src={value ? value : imgPlaceholder}
          alt={'avatar'}
        />
      </label>
      <input
        accept="image/*"
        id="file-input"
        onChange={onImageChange}
        style={{ display: 'none' }}
        type="file"
      />
    </div>
  )
}

Base64ImageField.defaultProps = {
  label: 'Choose your photo',
}

Base64ImageField.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
}

export default connectField(Base64ImageField)