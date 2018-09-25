import React from 'react';
import { Card, Nav, CardHeader, CardBody } from 'reactstrap';
import ResultNavItem from './ResultNavItem';
import CurrentResult from './CurrentResult';
import ForecastResult from './ForecastResult';
import {
  days,
  unixToTime,
  unixToDateTime,
  normalizeDay,
} from '../../conversions';

/* eslint react/prop-types: 0 */
const navLabels = [
  'Current',
  'Today',
  'Tomorrow',
  days[normalizeDay(2)],
  days[normalizeDay(3)],
  days[normalizeDay(4)],
];
const TYPES = {
  TEMPERATURE: 'temp',
  HUMIDITY: 'humidity',
  WIND: 'wind speed',
  PRESSURE: 'pressure',
};

/**
 * Returns an object containing child objects in format {dataType:dataArray}
 * @param {Array} weatherData
 * @param {number} day
 * @returns {Object}
 */
const genChartData = (weatherData, day) => {
  const generatedData = {};
  /* Extract all data for the days we need */
  const dayData = weatherData.filter(
    data => new Date(unixToDateTime(data.dt)).getDay() === day
  );

  /* Extract all data for the types we need */
  Object.values(TYPES).forEach(dataType => {
    const chartData = [];
    dayData.forEach(data => {
      chartData.push({ time: unixToTime(data.dt) });
      /* Add second key after to give it the type name */
      chartData[chartData.length - 1][dataType] =
        dataType === 'wind speed' ? data.wind.speed : data.main[dataType];
    });
    /* Wrap weatherData in an object with the type as key */
    generatedData[dataType] = chartData;
  });
  return generatedData;
};

/* eslint no-unused-vars: 0 */
const Result = ({ activeTab, handleTabChange, forecast, current }) => (
  <Card>
    <CardHeader>
      <Nav tabs>
        {navLabels.map((navLabel, tabIndex) => (
          <ResultNavItem
            label={navLabel}
            key={navLabel}
            active={activeTab === tabIndex}
            handleTabChange={handleTabChange}
            tabIndex={tabIndex}
          />
        ))}
      </Nav>
    </CardHeader>
    <CardBody>
      {Object.keys(current).length === 0 ? (
        ''
      ) : (
        <div>
          {!activeTab ? (
            <CurrentResult
              main={current.main}
              weather={current.weather[0]}
              wind={current.wind}
              sys={current.sys}
            />
          ) : (
            <ForecastResult
              data={genChartData(forecast, normalizeDay(activeTab - 1))}
              types={Object.values(TYPES)}
            />
          )}
        </div>
      )}
    </CardBody>
  </Card>
);

export default Result;
