import React from 'react';
import { Card, Nav, CardHeader, CardBody } from 'reactstrap';
import ResultNavItem from './ResultNavItem';
import CurrentResult from './CurrentResult';

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
            ''
          )}
        </div>
      )}
    </CardBody>
  </Card>
);

export default Result;
// : (
// <ForecastResult day={activeTab} weather="" />
// )}
