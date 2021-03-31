/* eslint-disable @typescript-eslint/no-useless-constructor */
import React from 'react';
import './ProductCard.css';
import { Card } from 'react-bootstrap';
import { Helpers } from '../../Helpers';

export interface IProduct {
  name?: string,
  price?: number,
  oldPrice?: number,
  address?: string,
  rating?: number,
  imageUrl?: string
}

export interface IProductState {
}

class ProductCard extends React.Component <IProduct, IProductState> {
  constructor(props: IProduct) {
    super(props);
  }

  render() {
    return (
      <Card className="product-container mb-3">
        <Card.Img variant="top" src={this.props.imageUrl} />
        <Card.Body>
          <Card.Title className="product-title">{this.props.name}</Card.Title>
          <h4 className="text-danger">
            <sup>đ</sup>
            {Helpers.numberWithCommas(this.props.price)}
          </h4>
          <Card.Text className="text-muted text-decoration-line-through">
            <sup>đ</sup>
            {Helpers.numberWithCommas(this.props.oldPrice)}
          </Card.Text>
          <Card.Text className="text-right">
            <div className="float-left">
            </div>
            {this.props.address}
          </Card.Text>
        </Card.Body>
    </Card>
    );
  }
}

export default ProductCard;
