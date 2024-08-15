import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import socketService from "../services/socketService";
import carIcon from "../assets/icons/car.png";

// Custom vehicle icon
const vehicleIcon = new L.Icon({
  iconUrl: carIcon,
  iconSize: [38, 38],
  iconAnchor: [15, 15],
  popupAnchor: [0, 0],
});

const MapView = () => {
  const [position, setPosition] = useState(null);
  const [path, setPath] = useState([]);

  useEffect(() => {
    // get vehicle's real-time location
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (pos) => {
          const { latitude, longitude, accuracy } = pos.coords;
          console.log(
            `Latitude: ${latitude}, Longitude: ${longitude}, Accuracy: ${accuracy} meters`
          );

          const newPosition = [latitude, longitude];
          setPosition(newPosition);
          setPath((currentPath) => [...currentPath, newPosition]);
        },
        (error) => {
          console.error("Error getting location: ", error);
        },
        {
          enableHighAccuracy: true, // Request high accuracy GPS data
          timeout: 20000, // Wait up to 20 seconds for a location fix
          maximumAge: 0, // Do not use cached location
        }
      );

      return () => {
        navigator.geolocation.clearWatch(watchId); // Clear the watch when component unmounts
      };
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  if (!position) {
    return <div>Loading map...</div>; // Show loading state until position is available
  }

  return (
    <MapContainer
      center={position}
      zoom={15}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; Locationizer"
      />
      <Marker position={position} icon={vehicleIcon}></Marker>
      <Polyline positions={path} color="blue" />
    </MapContainer>
  );
};

export default MapView;
