import React from 'react';
import '../build/styles/App.css';
import { Row, Col, Container } from 'reactstrap';
import _ from 'lodash';
import $ from 'jquery';
import SearchBar from './Searchbar';
import ResultNav from './Result/ResultNav';

/* eslint react/no-unused-state: 0 */
class App extends React.Component {
  constructor(props) {
    super(props);

    $.getJSON('/json/cities.min.json', json => {
      this.cities = json;
    });

    this.state = {
      city: '',
      matches: [],
    };

    this.handleSearch = _.debounce(this.handleSearch.bind(this), 400);
  }

  handleSearch(city) {
    this.setState({
      city,
      matches: this.cities.filter(item =>
        item.name.toLowerCase().includes(city)
      ),
    });
  }

  render() {
    return (
      <div className="app">
        <Container>
          <h1 className="app__title">React Forecast</h1>
          <Row>
            <Col>
              <SearchBar handleSearch={this.handleSearch} />
              <ResultNav />
            </Col>
          </Row>
          Here the result display will be rendered
        </Container>
      </div>
    );
  }
}

export default App;
