import React from 'react';
import '../build/styles/App.css';
import { Row, Col, Container } from 'reactstrap';
import SearchBar from './Searchbar';
import ResultNav from './Result/ResultNav';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="app">
        <Container>
          <h1 className="app__title">React Forecast</h1>
          <Row>
            <Col>
              <SearchBar />
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
