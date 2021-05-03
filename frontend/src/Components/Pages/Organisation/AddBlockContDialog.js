import React, { useState } from 'react'

import AddIcon from '@material-ui/icons/Add'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import IconButton from '@material-ui/core/IconButton'
import PropTypes from 'prop-types'
import Switch from '@material-ui/core/Switch'
import TextField from '@material-ui/core/TextField'
import Tooltip from '@material-ui/core/Tooltip'
import axios from 'axios'
import { api, opt } from '../../Utils'
 
const initialState = {
  name:  '',
  body: '' 
}

const AddBlockContDialog = props => {
  const [state, setState] = useState(initialState)
  const [open, setOpen] = React.useState(false)

  const [switchState, setSwitchState] = React.useState({
    addMultiple: false,
  })

  const handleSwitchChange = name => event => {
    setSwitchState({ ...switchState, [name]: event.target.checked })
  }

  const resetSwitch = () => {
    setSwitchState({ addMultiple: false })
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    resetSwitch()
  }

  const handleCreation = () => {
    const url = api.post.block.container.create;
    const data = state;
    
    console.log(data)
    axios.post(url, data, opt)
      .then(
        function(res) {
          console.log('RESPONSE DATA: ' + res)
        }
      ).catch(
        function(res) {
          console.log('ERROR DATA: ' + res)
        }
      );
    setState(initialState)
  }

  const handleChange = name => ({ target: { value } }) => {
    setState({ ...state, [name]: value })
  }

  return (
    <div>
      <Tooltip title="Add">
        <IconButton aria-label="add" onClick={handleClickOpen}>
          <AddIcon />
        </IconButton>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add Organisation</DialogTitle>
        <DialogContent>
          <DialogContentText>Fill organisation properties</DialogContentText>
          <TextField
            margin="dense"
            label="Container Name"
            type="text"
            fullWidth
            value={state.name}
            onChange={handleChange('name')}
          />
          <TextField
            id="standard-basic"
            margin="dense"
            label="Container Body"
            type="text"
            fullWidth
            value={state.body}
            onChange={handleChange('body')}
          />
        </DialogContent>
        <DialogActions>
          <Tooltip title="Add multiple">
            <Switch
              checked={switchState.addMultiple}
              onChange={handleSwitchChange('addMultiple')}
              value="addMultiple"
              inputProps={{ 'aria-label': 'secondary checkbox' }}
            />
          </Tooltip>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCreation} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default AddBlockContDialog;
