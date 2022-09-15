import './styles/main.css'
import Logo from './assets/logo.svg';
import { GameCard } from './components/GameCard';
import { useEffect, useState } from 'react';
import { AdForm } from './components/AdForm';

interface Game {
  id: string;
  title: string;
  imageUrl: string;
  _count: {
    ads: number;
  };
}

function App() {
  const [games, setGames] = useState<Array<Game>>([]);

  useEffect(() => {
    fetch('http://localhost:3333/games').then(response => response.json()).then(data => setGames(data));
  }, []);

  return (
    <div className="max-w-6xl mx-auto flex flex-col items-center m-16">
      <img src={Logo} />

      <h1 className="text-6xl text-white font-black mt-16">
        Seu <span className="text-transparent bg-nlw-gradient bg-clip-text">duo</span> está aqui
      </h1>

      <div className="grid grid-cols-6 gap-6 my-8">
        {games.map((game) => (
          <GameCard key={game.id} {...game} adsCount={game._count.ads} />
        ))}
      </div>

      <AdForm />
    </div>
  )
}

export default App
