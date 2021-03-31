import React from 'react';
import { ProductCard, IProduct } from '../../components/index';

import Mockup from './data.json';
import { Col, Row } from 'react-bootstrap';

export interface IProp {
}

export interface IState {
  data: IProduct[]
}

class Products extends React.Component <IProp, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      data: Mockup as IProduct[]
    }
  }

  render() {
    const products: any = [];
    this.state.data.forEach((product, index) => {
      products.push(
        <Col md={3}>
          <ProductCard
            name={product.name}
            address={product.address}
            price={product.price}
            oldPrice={product.oldPrice}
            imageUrl={product.imageUrl}
            rating={product.rating}
          ></ProductCard>
        </Col>
      );
    });

    return (
      <Row>
        {products}
      </Row>
    );
  }
}

export default Products;
