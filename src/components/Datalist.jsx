import React from 'react';

/* eslint react/prop-types: 0 */
const Datalist = ({ datalistRef, options }) => (
  <datalist id={datalistRef}>
    {options.map(option => (
      <option key={option.id} value={`${option.name}, ${option.country}`} />
    ))}
  </datalist>
);

export default Datalist;
