import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { LoginStyles } from "./styles";
import InputAdornment from "@material-ui/core/InputAdornment";

import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import { FormControl, Input, InputLabel, Button } from "@material-ui/core";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import IconButton from "@material-ui/core/IconButton";
import ErrorIcon from "@material-ui/icons/Error";
import VisibilityTwoToneIcon from "@material-ui/icons/VisibilityTwoTone";
import VisibilityOffTwoToneIcon from "@material-ui/icons/VisibilityOffTwoTone";
import CloseIcon from "@material-ui/icons/Close";
import axios from 'axios';

import { CustomParagraph } from '../../../Styles';
import { api, opt, makeLogin } from '../../../Utils'

class Register extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      username: "",
      email: "",
      contry: "",
      password: "",
      passwordConfrim: "",
      hidePassword: true,
      hidePasswordConfirm: true,
      error: null,
      errorOpen: false
    };
    // this.delta = this.delta.bind(this);
    this.submitRegister = this.submitRegister.bind(this);
  }


  errorClose = e => {
    this.setState({
      errorOpen: false
    });
  };

  handleChange = name => e => {
    this.setState({
      [name]: e.target.value
    });
  };

  passwordMatch = () => this.state.password === this.state.passwordConfrim;

  showPassword = () => {
    this.setState(prevState => ({ hidePassword: !prevState.hidePassword }));
  };

  showPasswordConfirm = () => {
    this.setState(prevState => ({ hidePasswordConfirm: !prevState.hidePasswordConfirm }));
  };

  isValid = () => {
    if (  this.state.username === "" 
          || this.state.email === "" 
          || this.state.country === ""
          || this.state.password === "" 
          || this.state.passwordConfrim === ""  ) {
      return false;
    }
    return true;
  };

  submitRegister = (e) => {
    e.preventDefault();
    if (!this.passwordMatch()) {
      this.setState({
        errorOpen: true,
        error: "Password are not equal"
      });
    }

    const url = api.post.auth.user.create;
    const data = {
        username: this.state.username,
        email:    this.state.email,
        country:  this.state.country,
        password: this.state.password
    };
    let externalState = this;

    axios.post(url, data, opt)
      .then(
        function(res) {
          makeLogin(res.data.uuid)
        }
      ).catch(
        function(err) {
          if (err.response.status == 400) {
            externalState.setState({
              errorOpen: true,
              error: "Some of field are not correct. `Username`: only alfanumeric, `Password`: min 6 symbols"
            });
          } else {
            externalState.setState({
              errorOpen: true,
              error: err.response.data.failed
            });
          }
        }
      );
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.main}>
        <CssBaseline />

        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <AccountCircleIcon className={classes.icon} />
          </Avatar>

          <form
            className={classes.form}
            onSubmit={() => this.submitRegister}
          >
            <CustomParagraph text='Register in Service App'/>
            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="email" className={classes.labels}>
                User Name
              </InputLabel>
              <Input
                name="username"
                type="username"
                autoComplete="username"
                className={classes.inputs}
                disableUnderline={true}
                onChange={this.handleChange("username")}
              />
            </FormControl>

            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="email" className={classes.labels}>
                Email Address
              </InputLabel>
              <Input
                name="email"
                type="email"
                autoComplete="email"
                className={classes.inputs}
                disableUnderline={true}
                onChange={this.handleChange("email")}
              />
            </FormControl>

            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="country" className={classes.labels}>
                Country of Residence
              </InputLabel>
              <Input
                name="country"
                type="country"
                autoComplete="country"
                className={classes.inputs}
                disableUnderline={true}
                onChange={this.handleChange("country")}
              />
            </FormControl>

            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="password" className={classes.labels}>
                Password
              </InputLabel>
              <Input
                name="password"
                autoComplete="password"
                className={classes.inputs}
                disableUnderline={true}
                onChange={this.handleChange("password")}
                type={this.state.hidePassword ? "password" : "input"}
                endAdornment={
                  this.state.hidePassword ? (
                    <InputAdornment position="end">
                      <VisibilityOffTwoToneIcon
                        fontSize="default"
                        className={classes.passwordEye}
                        onClick={this.showPassword}
                      />
                    </InputAdornment>
                  ) : (
                    <InputAdornment position="end">
                      <VisibilityTwoToneIcon
                        fontSize="default"
                        className={classes.passwordEye}
                        onClick={this.showPassword}
                      />
                    </InputAdornment>
                  )
                }
              />
            </FormControl>

            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="passwordConfrim" className={classes.labels}>
                Confrim Password
              </InputLabel>
              <Input
                name="passwordConfrim"
                autoComplete="passwordConfrim"
                className={classes.inputs}
                disableUnderline={true}
                onClick={this.state.showPassword}
                onChange={this.handleChange("passwordConfrim")}
                type={this.state.hidePasswordConfirm ? "password" : "input"}
                endAdornment={
                  this.state.hidePasswordConfirm ? (
                    <InputAdornment position="end">
                      <VisibilityOffTwoToneIcon
                        fontSize="default"
                        className={classes.passwordEye}
                        onClick={this.showPasswordConfirm}
                      />
                    </InputAdornment>
                  ) : (
                    <InputAdornment position="end">
                      <VisibilityTwoToneIcon
                        fontSize="default"
                        className={classes.passwordEye}
                        onClick={this.showPasswordConfirm}
                      />
                    </InputAdornment>
                  )
                }
              />
            </FormControl>
            <Button
              disabled={!this.isValid()}
              disableRipple
              fullWidth
              variant="outlined"
              className={classes.button}
              type="submit"
              onClick={this.submitRegister}
            >
              Register
            </Button>

            <Button
              disableRipple
              fullWidth
              variant="outlined"
              className={classes.register_button}
              type="button"
              onClick={() => {window.location.href = '/login'}}
            >
              Back to Login
            </Button>
          </form>

          {this.state.error ? (
            <Snackbar
              variant="error"
              key={this.state.error}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center"
              }}
              open={this.state.errorOpen}
              onClose={this.errorClose}
              autoHideDuration={100000}
            >
              <SnackbarContent
                className={classes.error}
                message={
                  <div>
                    <span style={{ marginRight: "8px" }}>
                      <ErrorIcon fontSize="large" color="error" />
                    </span>
                    <span> {this.state.error} </span>
                  </div>
                }
                action={[
                  <IconButton
                    key="close"
                    aria-label="close"
                    onClick={this.errorClose}
                  >
                    <CloseIcon color="error" />
                  </IconButton>
                ]}
              />
            </Snackbar>
          ) : null}
        </Paper>
      </div>
    );
  }
}

export default withStyles(LoginStyles)(Register);
