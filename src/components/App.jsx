import React from 'react';
import '../build/styles/App.css';
import { Row, Col, Container } from 'reactstrap';
import _ from 'lodash';
import $ from 'jquery';
import SearchBar from './Searchbar';
import ResultNav from './Result/ResultNav';
import Datalist from './Datalist';

/* eslint react/no-unused-state: 0 */
class App extends React.Component {
  constructor(props) {
    super(props);

    $.getJSON('/json/cities.min.json', json => {
      this.cities = json;
    });

    this.state = {
      matchedCities: [],
      activeTab: 0,
    };
    this.DatalistRef = 'matchedCities';

    this.handleSearch = _.debounce(this.handleSearch.bind(this), 400);
    this.handleTabChange = this.handleTabChange.bind(this);
  }

  handleTabChange(activeTab) {
    this.setState({ activeTab });
  }

  handleSearch(city) {
    const matchedCities =
      city.length < 4
        ? []
        : this.cities.filter(item => item.name.toLowerCase().startsWith(city));

    console.log(matchedCities);
    this.setState({ matchedCities });
  }

  render() {
    const { activeTab, matchedCities } = this.state;

    return (
      <div className="app">
        <Container>
          <h1 className="app__title">React Forecast</h1>
          <Row>
            <Col>
              <SearchBar
                handleSearch={this.handleSearch}
                datalistRef={this.DatalistRef}
              />
              <Datalist
                datalistRef={this.DatalistRef}
                options={matchedCities}
              />
              <ResultNav
                activeTab={activeTab}
                handleTabChange={this.handleTabChange}
              />
            </Col>
          </Row>
          Here the result display will be rendered
        </Container>
      </div>
    );
  }
}

export default App;
