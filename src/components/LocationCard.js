import React from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";

const MapFly = (props) => {
  const map = useMap();
  map.panTo(props.position);
  return null;
};

const LocationCard = ({ location }) => {
  const date = new Date(location.time._seconds * 1000);

  const position = [location.lat, location.lng];

  return (
    <div className="bg-white shadow-lg border border-gray-300 rounded-lg p-4 mb-8">
      <MapContainer
        className="h-72"
        center={position}
        zoom={14}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>Location of the sender</Popup>
        </Marker>
        <MapFly position={position} />
      </MapContainer>
      <div className="flex justify-between mt-1">
        <span>Date: {date.toLocaleDateString()}</span>
        <span>Time: {date.toLocaleTimeString().slice(0, -3)}</span>
      </div>
    </div>
  );
};

export default LocationCard;
