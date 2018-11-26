import React, { Component } from "react";
import {
  Badge,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";
import PropTypes from "prop-types";

import {
  AppAsideToggler,
  AppHeaderDropdown,
  AppNavbarBrand,
  AppSidebarToggler
} from "@coreui/react";
// import logo from "../../assets/img/brand/logo.svg";
// import sygnet from "../../assets/img/brand/sygnet.svg";

const propTypes = {
  children: PropTypes.node
};

const defaultProps = {};

class DefaultHeader extends Component {
  render() {
    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{
            marginLeft: 20,
            width: 200,
            height: 30,
            alt: "Well Told Story"
          }}
          minimized={{
            width: 50,
            height: 30,
            alt: "WTS"
          }}
        />

        {/* <Nav className="d-md-down-none" navbar>
          <NavItem className="px-3">
            <NavLink href="/theme/typography">Send SMS</NavLink>
          </NavItem>
          <NavItem className="px-3">
            <NavLink href="/dashboard">Dashboard</NavLink>
          </NavItem> */}
        {/* <NavItem className="px-3">
            <NavLink href="#">Settings</NavLink>
          </NavItem> */}
        {/* </Nav> */}
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
