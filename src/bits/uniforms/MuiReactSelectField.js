import React from 'react'

import { useTheme } from '@material-ui/core/styles'
import { FormLabel } from '@material-ui/core'

import ReactSelectField from './ReactSelectField'

function MuiReactSelectField(props) {
  const MUITheme = useTheme()

  const theme = (theme) => ({
    ...theme,
    borderRadius: 0,
    colors: {
      ...theme.colors,
      primary25: MUITheme.palette.secondary.main,
      primary: MUITheme.palette.primary.main,
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