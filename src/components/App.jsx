import React from 'react';
import '../build/styles/App.css';
import { Row, Col, Container } from 'reactstrap';
import axios from 'axios';
import SearchBar from './Searchbar';
import Result from './Result/Result';

const API_KEY = 'fbac2a1b66c21f764ad32d558e42b58c';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: 0,
      forecast: [],
      current: {},
      metric: true,
    };

    this.handleTabChange = this.handleTabChange.bind(this);
    this.handleFetch = this.handleFetch.bind(this);
  }

  handleTabChange(activeTab) {
    this.setState({ activeTab });
  }

  /* eslint class-methods-use-this: 0 */
  handleFetch(id = 0) {
    const { metric } = this.state;
    const metricPrefix = metric ? '&units=metric' : '';
    const forecastPrefix = 'https://api.openweathermap.org/data/2.5/forecast';
    const curPrefix = 'https://api.openweathermap.org/data/2.5/weather';

    if (id) {
      axios
        .get(`${forecastPrefix}?id=${id}&appid=${API_KEY}${metricPrefix}`)
        .then(response => {
          this.setState({ forecast: response.data.list });
        })
        .catch(error => {
          console.log(error);
        });
      axios
        .get(`${curPrefix}?id=${id}&appid=${API_KEY}${metricPrefix}`)
        .then(response => {
          this.setState({ current: response.data });
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  render() {
    const { activeTab, forecast, current } = this.state;

    return (
      <div className="app">
        <Container>
          <h1 className="app__title">React Forecast</h1>
          <Row>
            <Col>
              <SearchBar handleFetch={this.handleFetch} />

              <Result
                activeTab={activeTab}
                handleTabChange={this.handleTabChange}
                forecast={forecast}
                current={current}
              />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
