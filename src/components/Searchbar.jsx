import React from 'react';
import { Input } from 'reactstrap';

/* eslint react/prop-types: 0 */
const Searchbar = ({ handleSearch }) => (
  <Input type="search" placeholder="City Name" onChange={handleSearch} />
);

export default Searchbar;
