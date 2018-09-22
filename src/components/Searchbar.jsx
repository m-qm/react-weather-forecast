import React from 'react';
import { Input } from 'reactstrap';

/* eslint react/prop-types: 0 */
const Searchbar = ({ handleSearch }) => (
  <Input
    type="search"
    placeholder="City / Region"
    onChange={evt => {
      handleSearch(evt.target.value.toLowerCase());
    }}
    autoFocus
  />
);

export default Searchbar;
