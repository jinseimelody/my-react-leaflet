import './Style.css';

import React from 'react';
import { LatLng, LatLngExpression, LatLngTuple, PathOptions } from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, Polygon } from 'react-leaflet'
import { Button, Col, Container, Form, Row } from 'react-bootstrap';

import { Helpers } from './Helpers';
import { IArea } from './interfaces';

import Mockup from './data.json';

export interface IProp {
}

export interface IState {
  position: LatLngExpression,
  positions: LatLngExpression[],
  data: IArea[],
  areaList: string[]
}

class App extends React.Component <IProp, IState> {
  
  constructor(props: IProp) {
    super(props);
    const mockup =  Mockup as IArea[];
    const areaList = mockup.map(x => x.name);
    this.state = {
      position: [16.47577527324589, 107.57557221556877],
      positions: [],
      data: mockup,
      areaList: areaList
    }
  }

  renderMap() {
    let markers:any = [];
    let polygons:any = [];
    
    this.state.data.forEach(area => {
      const provinces = area.provinces;
      let fillColor = area.fillColor;
      if (Helpers.isNullOrEmpty(fillColor)) {
        fillColor = "red";
      }
  
      provinces.forEach(province => {
        const branchs = province.branchs;
        const polygonSet = province.polygons;

        branchs.forEach(branch => {
          let position: LatLngExpression = [branch.lat, branch.lng];
          markers.push(
            <Marker position={position}>
              <Popup>
                {branch.name}
              </Popup>
            </Marker>
          );
        });

        polygonSet.forEach((polygon: LatLngExpression[])  => {
          let latLngSet: LatLngExpression[] = [];
          
          polygon.forEach((position: LatLngExpression) => {
            const latLng = position as LatLngTuple;
            latLngSet.push(new LatLng(latLng[1], latLng[0]));
          });

          const poligonOptions: PathOptions = { 
            color: 'purple',
            stroke: false,
            fillColor: fillColor
          };
          polygons.push(
            <Polygon pathOptions={poligonOptions} positions={latLngSet} />
          );
        });
      });
    });

    return (
      <MapContainer className="Map" center={this.state.position} zoom={5} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers}
        {polygons}
      </MapContainer>
    );
  }

  renderForm() {
    let options = this.state.areaList.map(x => {
      return (
        <option>{x}</option>
      );
    });

    return (
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Khu vực</Form.Label>
          <Form.Control size="sm" as="select">
            {options}
          </Form.Control>
        </Form.Group>
      </Form>
    );
  }

  render() {
    let markers:any = [];
    let polygons:any = [];
    
    this.state.data.forEach(area => {
      const provinces = area.provinces;
      let fillColor = area.fillColor;
      if (Helpers.isNullOrEmpty(fillColor)) {
        fillColor = "red";
      }
  
      provinces.forEach(province => {
        const branchs = province.branchs;
        const polygonSet = province.polygons;

        branchs.forEach(branch => {
          let position: LatLngExpression = [branch.lat, branch.lng];
          markers.push(
            <Marker position={position}>
              <Popup>
                {branch.name}
              </Popup>
            </Marker>
          );
        });

        polygonSet.forEach((polygon: LatLngExpression[])  => {
          let latLngSet: LatLngExpression[] = [];
          
          polygon.forEach((position: LatLngExpression) => {
            const latLng = position as LatLngTuple;
            latLngSet.push(new LatLng(latLng[1], latLng[0]));
          });

          const poligonOptions: PathOptions = { 
            color: 'purple',
            stroke: false,
            fillColor: fillColor
          };
          polygons.push(
            <Polygon pathOptions={poligonOptions} positions={latLngSet} />
          );
        });
      });
    });

    return (
      <Container>
        <Row>
          <Col md={8}>
            {this.renderMap()}
          </Col>
          <Col md={4} >
            {this.renderForm()}
          </Col>
        </Row>
        {/* <Row>
          <Col md={12}>
            <h4>Console:</h4>
            <div className="border rounded px-2">
              {JSON.stringify(this.state)}
            </div>
          </Col>
        </Row> */}
      </Container>
    );
  }
}

export default App;
