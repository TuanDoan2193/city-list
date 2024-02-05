import type { City } from "@prisma/client";
import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import L from "leaflet";
import Link from "next/link";

interface MapProps {
  cities: City[];
}
const Map = (props: MapProps) => {
  const { cities } = props;

  if (!cities.length) return null;

  const positions = cities.map((city) =>
    L.latLng(parseFloat(city.lattitude), parseFloat(city.longitude)),
  );

  return (
    <MapContainer
      className="h-full w-full rounded-lg"
      bounds={L.latLngBounds(positions)}
      zoom={1}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {cities.map((city) => (
        <Marker
          key={city.id}
          position={[parseFloat(city.lattitude), parseFloat(city.longitude)]}
        >
          <Popup>
            <Link href={`/city/${city.id}`}>
              <span className="mb-2 me-2 rounded-lg bg-gray-800 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700">
                {city.name}
              </span>
            </Link>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
