import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import {
  ListItem,
  ListItemText,
  LinearProgress,
  ListItemSecondaryAction,
  IconButton,
} from '@material-ui/core'
import { Pause, PlayArrow, CheckCircle, Cancel } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'

import { muxUpload, resumeUpload, pauseUpload } from './muxUpload'

const useStyles = makeStyles({
  root: {
    width: 'calc(100% - 25px)',
    margin: '10px 0',
  },
})

const MUXSingleUpload = ({ file, uploadingText, errorUploadingText, successUploadingText }) => {
  const classes = useStyles()

  const [progress, setProgress] = useState(0)
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)
  const [paused, setPaused] = useState(null)
  const [uploader, setUploader] = useState(false)

  const pauser = pauseUpload(uploader, setPaused)
  const resumer = resumeUpload(uploader, setPaused)

  useEffect(() => {
    const uploader = muxUpload({ setProgress, setError, setSuccess })(file)
    setUploader(uploader)
    return () => uploader.pause()
  }, [])

  const status = error ? errorUploadingText : success ? successUploadingText : `${uploadingText} (${progress}%)`

  return (
    <ListItem>
      <ListItemText
        primary={<LinearProgress
          classes={{ root: classes.root }}
          variant={'determinate'}
          value={Number(progress) > 100 ? 100 : Number(progress)}
        />}
        secondary={`${status} - ${file.name}`}
      />
      <ListItemSecondaryAction>
        {
          success ?
            <CheckCircle />
            :
            error ?
              <Cancel />
              :
              <IconButton
                onClick={paused ? resumer : pauser}
              >
                {
                  paused ?
                    <PlayArrow />
                    :
                    <Pause />
                }
              </IconButton>
        }

      </ListItemSecondaryAction>
    </ListItem>
  )
}

MUXSingleUpload.defaultProps = {
  uploadingText: 'Uploading:',
  errorUploadingText: 'Error!',
  successUploadingText: 'Success!',
}

MUXSingleUpload.propTypes = {
  file: PropTypes.object.isRequired,
  uploadingText: PropTypes.string,
  errorUploadingText: PropTypes.string,
  successUploadingText: PropTypes.string,
}

export default MUXSingleUpload