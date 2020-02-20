/* eslint-disable max-lines */
import React, { useState } from 'react'
import PropTypes from 'prop-types'

import Grid from '@material-ui/core/Grid'

import { connectField } from 'uniforms'

import Input from './Input'
import SimpleMDEEditor from './Input/SimpleMDEEditor'
import ReactMDEEditor from './Input/ReactMDEEditor'
import FullScreenButton from './FullScreenButton'
import ToggleEditorButton from './ToggleEditorButton'

const editorComponents = [ReactMDEEditor, SimpleMDEEditor]

const MDEditorField = (props) => {
  const [editorComponentIndex, setEditorComponentIndex] = useState(Number(props.defaultEditor) || 0)
  const [isFullScreen, setIsFullScreen] = useState(false)

  const toggleEditor = () => {
    const newEditorComponentIndex = editorComponentIndex + 1
    newEditorComponentIndex === editorComponents.length ?
      setEditorComponentIndex(0)
      :
      setEditorComponentIndex(newEditorComponentIndex)

  }

  const mainContainerStyle = (
    isFullScreen ?
      {
        position: 'fixed',
        zIndex: 99999,
        width: '100vw',
        height: '100vh',
        top: 0,
        left: 0,
        backgroundColor: '#fff',
        padding: 16,
        boxSizing: 'border-box',
        overflowY: 'scroll',
      }
      :
      {
        marginTop: '1rem',
      }
  )

  return (
    <div style={mainContainerStyle}>
      <Grid container spacing={4}>
        <Grid xs={6} item container>
          <FullScreenButton
            isFullScreen={isFullScreen}
            setIsFullScreen={setIsFullScreen}
          />
        </Grid>
        <Grid xs={6} item container>
          <ToggleEditorButton
            toggleEditor={toggleEditor}
          />
        </Grid>
      </Grid>
      <Grid container spacing={4}>
        <Grid xs={12} item container>
          <Input
            editorComponent={editorComponents[editorComponentIndex]}
            {...props}
          />
        </Grid>
      </Grid>
    </div>
  )

}

MDEditorField.propTypes = {
  classes: PropTypes.object,
  defaultEditor: PropTypes.number,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
}

export default connectField(MDEditorField)