import React from 'react';
import { Container, Row } from 'reactstrap';

/* eslint react/prop-types: 0 */
const ForecastResult = ({ temperature, humidity, pressure }) => (
  <Container>
    {console.log(temperature, humidity, pressure)}
    <Row />
    <Row />
    <Row />
  </Container>
);
export default ForecastResult;
