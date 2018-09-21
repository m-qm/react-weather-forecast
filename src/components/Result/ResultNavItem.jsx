import React from 'react';
import { NavItem, NavLink } from 'reactstrap';

/* eslint react/prop-types: 0 */
const ResultNavItem = ({ label }) => (
  <NavItem>
    <NavLink
      onClick={() => {
        console.log(label);
      }}
      active
    >
      {label}
    </NavLink>
  </NavItem>
);
export default ResultNavItem;
