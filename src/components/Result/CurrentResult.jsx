import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import unixToTime from '../../conversions';

/* eslint react/prop-types: 0 */
const CurrentResult = ({ weather, sys, main, wind }) => (
  <Container>
    <img src={`http://openweathermap.org/img/w/${weather.icon}.png`} alt="" />
    <h4>{`${weather.description}`}</h4>
    <Row>
      <Col xs="6">
        <h6>Temperature</h6>
      </Col>
      <Col xs="6">{`${main.temp}°C`}</Col>
      <Col xs="6">
        <h6>Humidity</h6>
      </Col>
      <Col xs="6">{`${main.humidity}%`}</Col>
      <Col xs="6">
        <h6>Pressure</h6>
      </Col>
      <Col xs="6">{`${main.pressure}`}</Col>
      <Col xs="6">
        <h6>Sunrise</h6>
      </Col>
      <Col xs="6">{`${unixToTime(sys.sunrise)}`}</Col>
      <Col xs="6">
        <h6>Sunset</h6>
      </Col>
      <Col xs="6">{`${unixToTime(sys.sunset)}`}</Col>
      <Col xs="6">
        <h6>Wind Degrees</h6>
      </Col>
      <Col xs="6">{`${wind.deg}°`}</Col>
      <Col xs="6">
        <h6>Wind Speed</h6>
      </Col>
      <Col xs="6">{`${wind.speed}m/s`}</Col>
    </Row>
  </Container>
);
export default CurrentResult;
