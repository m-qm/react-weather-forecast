import React from 'react';
import { NavItem, NavLink } from 'reactstrap';

/* eslint react/prop-types: 0 */
const ResultNavItem = ({ label, active, tabIndex, handleTabChange }) => (
  <NavItem>
    <NavLink onClick={() => handleTabChange(tabIndex)} active={active}>
      {label}
    </NavLink>
  </NavItem>
);
export default ResultNavItem;
