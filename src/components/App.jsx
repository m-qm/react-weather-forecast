import React from 'react';
import '../build/styles/App.css';
import { Row, Col, Container, Button } from 'reactstrap';
import axios from 'axios';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import SearchBar from './Searchbar';
import Result from './Result/Result';

const API_KEY = 'fbac2a1b66c21f764ad32d558e42b58c';
library.add(faMapMarkerAlt);

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: 0,
      forecast: [],
      current: {},
      metric: true,
      geolocation: { lat: '', long: '' },
      geoReject: false,
    };

    this.handleTabChange = this.handleTabChange.bind(this);
    this.handleFetch = this.handleFetch.bind(this);
    this.fetchGeo = this.fetchGeo.bind(this);
    this.haveGeolocation = this.haveGeolocation.bind(this);
    this.geoSuccess = this.geoSuccess.bind(this);
    this.geoError = this.geoError.bind(this);
  }

  componentDidMount() {
    this.fetchGeo();
  }

  fetchGeo() {
    if (this.haveGeolocation()) {
      this.handleFetch();
      return;
    }
    navigator.geolocation.getCurrentPosition(this.geoSuccess, this.geoError, {
      enableHighAccuracy: true,
    });
  }

  geoSuccess(pos) {
    const crd = pos.coords;
    this.setState({ geolocation: { lat: crd.latitude, long: crd.longitude } });
    this.handleFetch();
  }

  geoError(err) {
    if (err.code === 1) this.setState({ geoReject: true });
    else console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  haveGeolocation() {
    const { geolocation } = this.state;
    if (geolocation.lat === '') return false;
    return true;
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
    const querySuffix = `&appid=${API_KEY}${metricPrefix}`;
    const { geolocation } = this.state;
    const requestType = id
      ? `?id=${id}`
      : `?lat=${geolocation.lat}&lon=${geolocation.long}`;

    axios
      .get(`${forecastPrefix}${requestType}${querySuffix}`)
      .then(response => {
        this.setState({ forecast: response.data.list });
      })
      .catch(error => {
        console.log(error);
      });
    axios
      .get(`${curPrefix}${requestType}${querySuffix}`)
      .then(response => {
        this.setState({ current: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const { activeTab, forecast, current, geoReject } = this.state;

    return (
      <div className="app">
        <Container className="app__container">
          <h1 className="app__title">React Forecast</h1>
          <Button
            className="app__geo"
            color="primary"
            onClick={this.fetchGeo}
            disabled={geoReject}
          >
            <FontAwesomeIcon icon="map-marker-alt" />
          </Button>
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
