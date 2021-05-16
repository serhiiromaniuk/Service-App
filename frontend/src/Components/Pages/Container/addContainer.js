import React, { useState } from 'react'
import AddIcon from '@material-ui/icons/Add'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
// import PropTypes from 'prop-types'
import Switch from '@material-ui/core/Switch'
import TextField from '@material-ui/core/TextField'
import Tooltip from '@material-ui/core/Tooltip'
import axios from 'axios'
import { api, opt, getUserData, encryptText } from '../../Utils'
import './style.css'; 

const initialState = {
  name: '',
  body: ''
}

const AddContainer = props => {
  const [container, setContainer] = useState(initialState)
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

  const handleCreate = () => {
    const url = api.post.block.container.create;
    const auth_token = getUserData();
    const uuid = auth_token.token;
    const urlUser = api.get.auth.user.uuid;

    axios.get(urlUser + uuid, opt).then(
        function(res) {
            const data = {
              'owner': res.data.uuid,
              'name':  container.name,
              'body':  encryptText(container.body, res.data.uuid)
            };
            axios.post(url, data, opt)
              .then(
                function(res) {
                  console.log('RESPONSE DATA' + res.data)
                }
              ).catch(
                function(error) {
                    console.log(error)
                }
            );
        }
    ).catch(
        function(error) {
            console.log(error)
        }
    );

    setContainer(initialState)
  }

  const handleChange = name => ({ target: { value } }) => {
    setContainer({ ...container, [name]: value })
  }

  const addButtonStyle = {
    marginLeft: '36px',
  };

  return (
    <div>
      <Tooltip title="Add Container" style={addButtonStyle}>
          <Button variant="contained" aria-label="add" onClick={handleClickOpen} >
            <AddIcon />
            Add a new Container
          </Button>
      </Tooltip>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add a new Container</DialogTitle>
        <DialogContent>
          <DialogContentText>Fill Containers Name and Body</DialogContentText>
          <TextField
            id="standard-basic"
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            value={container.name}
            onChange={handleChange('name')}
          />
          <TextField
            id="standard-basic"
            margin="dense"
            label="Body"
            type="text"
            fullWidth
            value={container.body}
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
          <Button onClick={handleCreate} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default AddContainer;
