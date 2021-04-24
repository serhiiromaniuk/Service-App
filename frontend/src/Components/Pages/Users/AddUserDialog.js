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
import { backend } from '../../Utils'
 
const initialUser = {
  username: '',
  email: '',
  country: '',
  password: ''
}

const AddUserDialog = props => {
  const [user, setUser] = useState(initialUser)
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

  const handleCreateUser = () => {
    const url = backend.post.create_user
    axios.post(url, {
      'username': user.username,
      'email':    user.email,
      'country':  user.country,
      'password': user.password
    }).then((res) => console.log('RESPONSE DATA' + res.data))

    setUser(initialUser)
  }

  const handleChange = name => ({ target: { value } }) => {
    setUser({ ...user, [name]: value })
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
        <DialogTitle id="form-dialog-title">Add User</DialogTitle>
        <DialogContent>
          <DialogContentText>Add user info</DialogContentText>
          <TextField
            margin="dense"
            label="Username"
            type="text"
            fullWidth
            value={user.username}
            onChange={handleChange('username')}
          />
          <TextField
            id="standard-basic"
            margin="dense"
            label="Email"
            type="text"
            fullWidth
            value={user.email}
            onChange={handleChange('email')}
          />
          <TextField
            id="standard-basic"
            margin="dense"
            label="Country"
            type="text"
            fullWidth
            value={user.country}
            onChange={handleChange('country')}
          />
          <TextField
            id="standard-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            margin="dense"
            fullWidth
            value={user.password}
            onChange={handleChange('password')}
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
          <Button onClick={handleCreateUser} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

AddUserDialog.propTypes = {
  addUserHandler: PropTypes.func.isRequired
}

export default AddUserDialog
