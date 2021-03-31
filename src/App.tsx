/* eslint-disable @typescript-eslint/no-useless-constructor */
import './Style.css';

import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import { Map } from './components/index';
import Products from './screens/Products/Products';

export interface IProp {
}

export interface IState {
}

class App extends React.Component <IProp, IState> {
  constructor(props: IProp) {
    super(props);
  }

  render() {
    return (
      <Container>
        <div>
          <Products> </Products>
        </div>
        <Row className="mt-3">
          <Col>
            <Map></Map>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
