import React from 'react';
import { Link } from 'react-router-dom';
import { Card, PageTitle } from '../components/UIKit.jsx';

// Dados mocados (com URLs do Pexels/Pixabay como instruído)
const categorias = [
  { id: 'frutas', nome: 'Frutas' },
  { id: 'legumes', nome: 'Legumes' },
  { id: 'ervas', nome: 'Ervas Medicinais' },
  { id: 'temperos', nome: 'Temperos' },
];

const mockPlantasCompleto = [
  // Frutas
  { id: 'banana', nome: 'Banana', categoria: 'frutas', imageUrl: 'https://images.pexels.com/photos/2280926/pexels-photo-2280926.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { id: 'melancia', nome: 'Melancia', categoria: 'frutas', imageUrl: 'https://images.pexels.com/photos/1313267/pexels-photo-1313267.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { id: 'abacaxi', nome: 'Abacaxi', categoria: 'frutas', imageUrl: 'https://images.pexels.com/photos/28353017/pexels-photo-28353017.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { id: 'mamao', nome: 'Mamão Papaya', categoria: 'frutas', imageUrl: 'https://images.pexels.com/photos/10869540/pexels-photo-10869540.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { id: 'laranja', nome: 'Laranja', categoria: 'frutas', imageUrl: 'https://images.pexels.com/photos/161559/background-bitter-breakfast-bright-161559.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { id: 'morango', nome: 'Morango', categoria: 'frutas', imageUrl: 'https://images.pexels.com/photos/1788912/pexels-photo-1788912.jpeg?auto=compress&cs=tinysrgb&w=600' },
  // Legumes
  { id: 'cenoura', nome: 'Cenoura', categoria: 'legumes', imageUrl: 'https://images.pexels.com/photos/1306559/pexels-photo-1306559.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { id: 'beterraba', nome: 'Beterraba', categoria: 'legumes', imageUrl: 'https://images.pexels.com/photos/29436276/pexels-photo-29436276.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { id: 'abobrinha', nome: 'Abobrinha', categoria: 'legumes', imageUrl: 'https://images.pexels.com/photos/34476508/pexels-photo-34476508.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { id: 'batata-doce', nome: 'Batata Doce', categoria: 'legumes', imageUrl: 'https://images.pexels.com/photos/7456548/pexels-photo-7456548.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { id: 'berinjela', nome: 'Berinjela', categoria: 'legumes', imageUrl: 'https://images.pexels.com/photos/5529605/pexels-photo-5529605.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { id: 'pimentao', nome: 'Pimentão', categoria: 'legumes', imageUrl: 'https://images.pexels.com/photos/2893635/pexels-photo-2893635.jpeg?auto=compress&cs=tinysrgb&w=600' },
  // Ervas Medicinais
  { id: 'anis-estrelado', nome: 'Anis-estrelado', categoria: 'ervas', imageUrl: 'https://images.pexels.com/photos/30112806/pexels-photo-30112806.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { id: 'erva-doce', nome: 'Erva-doce', categoria: 'ervas', imageUrl: 'https://images.pexels.com/photos/6045502/pexels-photo-6045502.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { id: 'boldo', nome: 'Boldo', categoria: 'ervas', imageUrl: 'https://images.pexels.com/photos/4098469/pexels-photo-4098469.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { id: 'capim-limao', nome: 'Capim-limão', categoria: 'ervas', imageUrl: 'https://images.pexels.com/photos/6021461/pexels-photo-6021461.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { id: 'salvia', nome: 'Sálvia', categoria: 'ervas', imageUrl: 'https://images.pexels.com/photos/33209626/pexels-photo-33209626.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { id: 'erva-cidreira', nome: 'Erva-cidreira', categoria: 'ervas', imageUrl: 'https://cdn.pixabay.com/photo/2020/05/25/13/43/melissa-5218673_1280.jpg' },
  // Temperos
  { id: 'cebolinha', nome: 'Cebolinha', categoria: 'temperos', imageUrl: 'https://cdn.pixabay.com/photo/2016/03/28/22/46/chives-1287096_1280.jpg' },
  { id: 'salsa', nome: 'Salsa', categoria: 'temperos', imageUrl: 'https://cdn.pixabay.com/photo/2018/06/03/13/09/parsley-3450411_1280.jpg' },
  { id: 'manjericao', nome: 'Manjericão', categoria: 'temperos', imageUrl: 'https://cdn.pixabay.com/photo/2016/03/10/18/44/top-view-1248955_1280.jpg' },
  { id: 'hortela', nome: 'Hortelã', categoria: 'temperos', imageUrl: 'https://cdn.pixabay.com/photo/2017/06/12/19/23/moroccan-mint-2396530_1280.jpg' },
  { id: 'louro', nome: 'Louro', categoria: 'temperos', imageUrl: 'https://cdn.pixabay.com/photo/2017/09/23/19/24/laurel-2779880_1280.jpg' },
  { id: 'alecrim', nome: 'Alecrim', categoria: 'temperos', imageUrl: 'https://cdn.pixabay.com/photo/2020/06/04/14/52/rosemary-5259098_1280.jpg' },
];

const PlantasPage = () => {
  return (
    <div>
      <PageTitle>Tipos de Plantas</PageTitle>
      <p className="text-center text-gray-400 mb-8 -mt-4">
        Explore as frutas, legumes, hortaliças e temperos que você pode cultivar.
      </p>

      <div className="space-y-12">
        {/* Itera sobre as CATEGORIAS */}
        {categorias.map((categoria) => {
          // Filtra as plantas para cada categoria
          const plantasDaCategoria = mockPlantasCompleto.filter(
            (planta) => planta.categoria === categoria.id
          );

          return (
            <section key={categoria.id}>
              {/* Subtítulo da Categoria */}
              <h2 className="text-3xl font-bold text-green-400 mb-6 border-b-2 border-green-700 pb-2">
                {categoria.nome}
              </h2>
              
              {/* Grid de cards, seguindo o layout do protótipo */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {plantasDaCategoria.map((planta) => (
                  <Link to={`/plantas/${planta.id}`} key={planta.id}>
                    {/* O Card do UIKit não tem imagem, então usamos Card como wrapper */}
                    <Card className="p-0 overflow-hidden hover:bg-gray-700 transition-colors duration-200 h-full flex flex-col">
                      <img 
                        src={planta.imageUrl} 
                        alt={planta.nome}
                        className="w-full h-40 object-cover" // Imagem no topo
                      />
                      <div className="p-4 flex-grow">
                        <h3 className="text-lg font-bold text-white">{planta.nome}</h3>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
};

export default PlantasPage;





