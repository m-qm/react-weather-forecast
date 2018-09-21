import React from 'react';
import { Card, Nav, CardHeader, CardBody, CardText } from 'reactstrap';
import ResultNavItem from './ResultNavItem';

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
  'Today',
  'Tomorrow',
  days[normalzDay(2)],
  days[normalzDay(3)],
  days[normalzDay(4)],
  'Graphs',
];

const ResultNav = () => (
  <Card>
    <CardHeader>
      <Nav tabs>
        {navLabels.map(navLabel => (
          <ResultNavItem label={navLabel} key={navLabel} />
        ))}
      </Nav>
    </CardHeader>
    <CardBody>
      <CardText>Body</CardText>
    </CardBody>
  </Card>
);

export default ResultNav;
