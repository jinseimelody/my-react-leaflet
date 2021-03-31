import { LatLngExpression } from "leaflet";

export interface IBranch {
    name: string,
    address: string,
    lat: number,
    lng: number,
}

export interface IProvince {
    name: string,
    branchs: IBranch[]
    polygons: LatLngExpression[][]
}

export interface IArea {
    name: string,
    provinces: IProvince[]
    fillColor: string
}