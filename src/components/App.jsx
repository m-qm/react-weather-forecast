import React from 'react';
import '../build/styles/App.css';
import { Row, Col, Container } from 'reactstrap';
import axios from 'axios';
import SearchBar from './Searchbar';
import ResultNav from './Result/ResultNav';

const API_KEY = 'fbac2a1b66c21f764ad32d558e42b58c';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { activeTab: 0 };

    this.handleTabChange = this.handleTabChange.bind(this);
    this.handleFetch = this.handleFetch.bind(this);
  }

  handleTabChange(activeTab) {
    this.setState({ activeTab });
  }

  /* eslint class-methods-use-this: 0 */
  handleFetch(id) {
    console.log(id);
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/forecast?id=${id}&appid=${API_KEY}`
      )
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const { activeTab } = this.state;

    return (
      <div className="app">
        <Container>
          <h1 className="app__title">React Forecast</h1>
          <Row>
            <Col>
              <SearchBar handleFetch={this.handleFetch} />

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
