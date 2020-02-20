/* eslint-disable max-lines */
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import Grid from '@material-ui/core/Grid'

import { connectField } from 'uniforms'

import { useDebounce } from '../../useDebounce'

import Input from './Input'
import SimpleMDEEditor from './Input/SimpleMDEEditor'
import ReactMDEEditor from './Input/ReactMDEEditor'
import FullScreenButton from './FullScreenButton'
import PreviewVisibleButton from './PreviewVisibleButton'
import ToggleEditorButton from './ToggleEditorButton'
import Preview from './Preview'

import { saveTmpContent } from './mdxPreview'

const editorComponents = [ReactMDEEditor, SimpleMDEEditor]

const MDXEditorField = (props) => {
  const [tmpPreviewId, setTmpPreviewId] = useState('')
  const [editorComponentIndex, setEditorComponentIndex] = useState(Number(props.defaultEditor) || 0)
  const [isFullScreen, setIsFullScreen] = useState(false)
  const [isPreviewVisible, setIsPreviewVisible] = useState(false)
  const [isFetching, setIsFetching] = useState(true)
  const [isError, setIsError] = useState(false)

  const toggleEditor = () => {
    const newEditorComponentIndex = editorComponentIndex + 1
    newEditorComponentIndex === editorComponents.length ?
      setEditorComponentIndex(0)
      :
      setEditorComponentIndex(newEditorComponentIndex)

  }

  const value = props.value
  const debouncedValue = useDebounce(value, 1000)

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

  useEffect(
    () => {
      if (value === undefined) return
      if (!isPreviewVisible) return

      setIsFetching(true)
      setIsError(false)

      saveTmpContent(value)
        .then(data => setTmpPreviewId(data._id))
        .catch(() => setIsError(true))
        .finally(() => setIsFetching(false))
    },
    [value, debouncedValue, isPreviewVisible]
  )

  return (
    <div style={mainContainerStyle}>
      <Grid container spacing={4}>
        <Grid xs={4} item container>
          <FullScreenButton
            isFullScreen={isFullScreen}
            setIsFullScreen={setIsFullScreen}
          />
        </Grid>
        <Grid xs={4} item container>
          <PreviewVisibleButton
            isPreviewVisible={isPreviewVisible}
            setIsPreviewVisible={setIsPreviewVisible}
          />
        </Grid>
        <Grid xs={4} item container>
          <ToggleEditorButton
            toggleEditor={toggleEditor}
          />
        </Grid>
      </Grid>
      <Grid container spacing={4}>
        <Grid xs={12} sm={isPreviewVisible ? 6 : 12} item container>
          <Input
            editorComponent={editorComponents[editorComponentIndex]}
            {...props}
          />
        </Grid>
        {
          isPreviewVisible ?
            <Grid xs={12} sm={6} item container>
              <Preview
                isFetching={isFetching}
                isError={isError}
                tmpPreviewId={tmpPreviewId}
              />
            </Grid>
            :
            null
        }
      </Grid>
    </div>
  )

}

MDXEditorField.propTypes = {
  classes: PropTypes.object,
  defaultEditor: PropTypes.number,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
}

export default connectField(MDXEditorField)