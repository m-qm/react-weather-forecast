import React from 'react';
import { Card, Nav, CardHeader, CardBody } from 'reactstrap';
import ResultNavItem from './ResultNavItem';
import CurrentResult from './CurrentResult';
import ForecastResult from './ForecastResult';
import unixToTime from '../../conversions';

/* eslint react/prop-types: 0 */
const d = new Date().getDay();
const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
const normalzDay = increm => (d + increm) % 7;
const navLabels = [
  'Current',
  'Today',
  'Tomorrow',
  days[normalzDay(2)],
  days[normalzDay(3)],
  days[normalzDay(4)],
];
const CHART_TYPES = {
  TEMPERATURE: 'temp',
  HUMIDITY: 'humidity',
  PRESSURE: 'pressure',
};
const generateChartData = (dataType, weatherData, day) => {
  /* Extract all data for the for the day we need */
  const dayData = weatherData.filter(
    data => new Date(data.dt_txt).getDay() === day
  );
  /* Extract all data for the type we need */
  const chartData = [];
  dayData.forEach(data => {
    chartData.push({
      time: unixToTime(data.dt),
      value: data.main[dataType],
    });
  });
  return chartData;
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
              temperature={generateChartData(
                CHART_TYPES.TEMPERATURE,
                forecast,
                normalzDay(d + activeTab - 1)
              )}
              humidity={generateChartData(
                CHART_TYPES.HUMIDITY,
                forecast,
                normalzDay(d + activeTab - 1)
              )}
              pressure={generateChartData(
                CHART_TYPES.PRESSURE,
                forecast,
                normalzDay(d + activeTab - 1)
              )}
            />
          )}
        </div>
      )}
    </CardBody>
  </Card>
);

export default Result;
