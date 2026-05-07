import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { Card } from '../components/UIKit';
import { getTerrenos } from '../services/firestoreService.js';
import { useNavigate } from 'react-router-dom';

// Correção para o ícone de marcador padrão do Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
});

L.Marker.prototype.options.icon = DefaultIcon;

const MapPage = () => {
  const navigate = useNavigate();
  const defaultPosition = [-23.5505, -46.6333]; // São Paulo

  const [terrenos, setTerrenos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTerrenos = async () => {
      try {
        setLoading(true);
        const dados = await getTerrenos();
        // Filtra terrenos que possuem coordenadas válidas
        const terrenosComCoords = dados.filter(t => t.latitude && t.longitude);
        setTerrenos(terrenosComCoords);
      } catch (error) {
        console.error("Erro ao carregar mapa:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTerrenos();
  }, []);

  return (
    <Card>
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4 text-white">Mapa de Hortas e Terrenos</h2>
        
        <div className="w-full h-[500px] bg-gray-800 rounded-xl overflow-hidden relative border border-gray-700 shadow-2xl">
          <MapContainer 
            center={defaultPosition} 
            zoom={12} 
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            {terrenos.map((terreno) => (
              <Marker key={terreno.id} position={[terreno.latitude, terreno.longitude]}>
                <Popup>
                  <div className="flex flex-col gap-2 min-w-[180px] p-1">
                    <strong className="text-gray-900 text-base border-b pb-1">{terreno.titulo}</strong>
                    <p className="text-gray-600 text-xs leading-tight">{terreno.endereco}</p>
                    <button 
                      onClick={() => navigate(`/cadastrar-horta/${terreno.id}`)}
                      className="mt-2 py-2 bg-green-600 text-white rounded-md text-[10px] font-black hover:bg-green-700 uppercase transition-all shadow-md"
                    >
                      Registrar Impacto ESG
                    </button>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>

          {/* Botão Flutuante para Reportar Novo Terreno */}
          <button 
            onClick={() => navigate('/reportar')} 
            className="absolute bottom-6 right-6 z-[1000] bg-green-500 text-white w-14 h-14 rounded-full shadow-2xl flex items-center justify-center text-3xl hover:bg-green-600 hover:scale-110 transition-all border-2 border-white/20"
          >
            +
          </button>
        </div>
      </div>
    </Card>
  );
};

export default MapPage;