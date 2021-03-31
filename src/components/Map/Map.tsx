/* eslint-disable @typescript-eslint/no-useless-constructor */
import React from 'react';
import { LatLng, LatLngExpression, LatLngTuple, PathOptions } from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, Polygon } from 'react-leaflet';

import { IArea } from './MapInterfaces';

/*resource*/
import './Map.css';
import Mockup from '../../data.json';
import { Helpers } from '../../Helpers';

export interface IMapProps {
}

export interface IIMapState {
  position: LatLngExpression,
  positions: LatLngExpression[],
  data: IArea[],
  areaList: string[]
}


class Map extends React.Component <IMapProps, IIMapState>  {
  constructor(props: IMapProps) {
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

  // renderForm() {
  //   let options = this.state.areaList.map(x => {
  //     return (
  //       <option>{x}</option>
  //     );
  //   });

  //   return (
  //     <Form>
  //       <Form.Group controlId="formBasicEmail">
  //         <Form.Label>Khu vực</Form.Label>
  //         <Form.Control size="sm" as="select">
  //           {options}
  //         </Form.Control>
  //       </Form.Group>
  //     </Form>
  //   );
  // }

  render() {
    let markers:any = [];
    let polygons:any = [];

    this.state.data.forEach((area, areaIndex) => {
      const provinces = area.provinces;
      let fillColor = area.fillColor;
      if (Helpers.isNullOrEmpty(fillColor)) {
        fillColor = "red";
      }
  
      provinces.forEach((province, procinceIndex) => {
        const branchs = province.branchs;
        const polygonSet = province.polygons;

        branchs.forEach((branch, branchIndex) => {
          let position: LatLngExpression = [branch.lat, branch.lng];
          const key = `marker_${areaIndex}_${procinceIndex}_${branchIndex}`;
          markers.push(
            <Marker key={key} position={position}>
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
          const key = `polygon_${areaIndex}_${procinceIndex}`;
          polygons.push(
            <Polygon key={key} pathOptions={poligonOptions} positions={latLngSet} />
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
}

export default Map;
