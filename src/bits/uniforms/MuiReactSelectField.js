import React from 'react'

import tinycolor from 'tinycolor2'

import { useTheme } from '@material-ui/core/styles'
import { FormLabel } from '@material-ui/core'

import ReactSelectField from './ReactSelectField'

function MuiReactSelectField(props) {
  const MUITheme = useTheme()

  const primary = tinycolor(MUITheme.palette.primary.main).brighten(0).toRgbString()
  const primary25 = tinycolor(MUITheme.palette.primary.main).brighten(75).toRgbString()
  const primary50 = tinycolor(MUITheme.palette.primary.main).brighten(50).toRgbString()
  const primary75 = tinycolor(MUITheme.palette.primary.main).brighten(25).toRgbString()
  const danger = MUITheme.palette.error.main
  const dangerLight = MUITheme.palette.error.light
  const neutral0 = MUITheme.palette.grey[300]
  const neutral5 = MUITheme.palette.grey[400]
  const neutral10 = MUITheme.palette.grey[500]
  const neutral20 = MUITheme.palette.grey[600]
  const neutral30 = MUITheme.palette.grey[700]
  const neutral40 = MUITheme.palette.grey[800]
  const neutral50 = MUITheme.palette.grey[900]
  const neutral60 = MUITheme.palette.grey.A100
  const neutral70 = MUITheme.palette.grey.A200
  const neutral80 = MUITheme.palette.grey.A300
  const neutral90 = MUITheme.palette.grey.A400

  const theme = (theme) => ({
    ...theme,
    borderRadius: 0,
    colors: {
      ...theme.colors,
      primary25,
      primary50,
      primary75,
      primary,
      danger,
      dangerLight,
      neutral0,
      neutral5,
      neutral10,
      neutral20,
      neutral30,
      neutral40,
      neutral50,
      neutral60,
      neutral70,
      neutral80,
      neutral90,
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