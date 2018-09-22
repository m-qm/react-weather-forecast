import React from 'react';
import { Card, Nav, CardHeader, CardBody, CardText } from 'reactstrap';
import ResultNavItem from './ResultNavItem';

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

const ResultNav = ({ activeTab, handleTabChange }) => (
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
      <CardText>Body</CardText>
    </CardBody>
  </Card>
);

export default ResultNav;
