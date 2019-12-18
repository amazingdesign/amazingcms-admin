import React from 'react'

import tinycolor from 'tinycolor2'

import { useTheme } from '@material-ui/core/styles'
import { FormLabel } from '@material-ui/core'

import ReactSelectField from './ReactSelectField'

function MuiReactSelectField(props) {
  const MUITheme = useTheme()

  const primary25 = tinycolor(MUITheme.palette.primary.main).lighten(75).toRgbString()
  const primary = tinycolor(MUITheme.palette.primary.main).lighten(75).toRgbString()

  const theme = (theme) => ({
    ...theme,
    borderRadius: 0,
    colors: {
      ...theme.colors,
      primary25: primary25,
      primary: primary,
    },
  })

  return (
    <ReactSelectField
      theme={theme}
      labelComponent={FormLabel}
      {...props}
    />
  )
}

export default MuiReactSelectField