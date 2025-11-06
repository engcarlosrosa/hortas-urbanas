import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Card } from '../components/UIKit';

// Correção para o problema do ícone de marcador padrão
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
});

L.Marker.prototype.options.icon = DefaultIcon;

// Componente MapPage
const MapPage = () => {
  const defaultPosition = [-23.5505, -46.6333]; // São Paulo

  return (
    <Card>
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">Mapa de Hortas</h2>
        <p className="text-gray-300 mb-4">"A busca de dados está temporariamente desativada até que hajam dados a serem lidos do db."</p>
        <div className="w-full h-96 bg-gray-700 rounded-lg">
          <MapContainer center={defaultPosition} zoom={13} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {/* Nenhum marcador será exibido por enquanto */}
          </MapContainer>
        </div>
      </div>
    </Card>
  );
};

export default MapPage;
