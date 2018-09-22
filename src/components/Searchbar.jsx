import React from 'react';
import { Input } from 'reactstrap';

/* eslint react/prop-types: 0 */
const Searchbar = ({ handleSearch, datalistRef }) => (
  <Input
    type="search"
    placeholder="City / Region"
    onChange={evt => {
      handleSearch(evt.target.value.toLowerCase().split(',')[0]);
    }}
    autoFocus
    list={datalistRef}
  />
);

export default Searchbar;
