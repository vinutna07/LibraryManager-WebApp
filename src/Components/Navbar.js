import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { Link } from "react-router-dom";
import { SignOut } from "aws-amplify-react/dist/Auth";

class Navbar extends Component {
  state = {
    auth: true,
    anchorEl: null
  };

  handleChange = event => {
    this.setState({ auth: event.target.checked });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

 

  render() {
    const { auth, anchorEl } = this.state;
    const open = Boolean(anchorEl);
    return (
      <div className="library-title">
        <h1>Library Manager</h1>
        <IconButton
          aria-owns={open ? "menu-appbar" : null}
          aria-haspopup="true"
          onClick={this.handleMenu}
          style={{ position: "absolute", right: "100px", color: "#0c0725" }}
        >
          <AccountCircle />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          open={open}
          onClose={this.handleClose}
        >
          <MenuItem
            style={{
              "font-weight": "600",
              "font-family": "Noto Sans KR, sans-serif"
            }}
            onClick={this.handleClose}
          >
            Library
          </MenuItem>

          <MenuItem
            style={{
              "font-weight": "600",
              "font-family": "Noto Sans KR, sans-serif"
            }}
          >
            <SignOut
              style={{
                "border": "none !important",
                "background-color": "white !important",
                "padding": "10px 20px !important",
                "display": "inline-block !important",
                "cursor": "pointer !important"
              }}
            />
          </MenuItem>
        </Menu>
      </div>
    );
  }
}

export default Navbar;