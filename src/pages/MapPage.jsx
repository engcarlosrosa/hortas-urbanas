import React, { useState, useEffect } from 'react'; // <-- Importar hooks
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { Card } from '../components/UIKit';
import { getTerrenos } from '../services/firestoreService.js'; // <-- Importar função

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

  // --- NOVOS ESTADOS ---
  const [terrenos, setTerrenos] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- NOVO EFEITO PARA BUSCAR DADOS ---
  useEffect(() => {
    const fetchTerrenos = async () => {
      try {
        setLoading(true);
        const dados = await getTerrenos();
        // Filtra apenas os terrenos que TÊM coordenadas
        const terrenosComCoords = dados.filter(t => t.latitude && t.longitude);
        setTerrenos(terrenosComCoords);
      } catch (error) {
        console.error("Erro ao buscar terrenos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTerrenos();
  }, []);
  // --- FIM DA NOVA SEÇÃO ---

  return (
    <Card>
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">Mapa de Hortas e Terrenos</h2>
        
        {loading && <p className="text-gray-300 mb-4">Carregando pontos no mapa...</p>}
        
        {!loading && terrenos.length === 0 && (
          <p className="text-gray-300 mb-4">Nenhum terreno reportado (com coordenadas) encontrado.</p>
        )}
        
        <div className="w-full h-96 bg-gray-700 rounded-lg">
          <MapContainer center={defaultPosition} zoom={13} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            {/* --- RENDERIZAÇÃO DOS MARCADORES --- */}
            {terrenos.map((terreno) => (
              <Marker 
                key={terreno.id} 
                position={[terreno.latitude, terreno.longitude]}
              >
                <Popup>
                  <strong className="text-gray-800">{terreno.titulo}</strong><br />
                  <span className="text-gray-600">{terreno.endereco}</span>
                </Popup>
              </Marker>
            ))}
            {/* --- FIM DA RENDERIZAÇÃO --- */}
          </MapContainer>
        </div>
      </div>
    </Card>
  );
};

export default MapPage;