import './styles/main.css'
import axios from 'axios';
import Logo from './assets/logo.svg';
import { GameCard } from './components/GameCard';
import { useEffect, useState } from 'react';
import { AdForm } from './components/AdForm';
import { Game } from './interfaces/game';

function App() {
  const [games, setGames] = useState<Array<Game>>([]);
  const [reloadGames, setReloadGames] = useState<boolean>(true);

  useEffect(() => {
    if (reloadGames) {
      axios('http://localhost:3333/games').then((response) => setGames(response.data));
      setReloadGames(false);
    }
  }, [reloadGames]);

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

      <AdForm onSave={() => setReloadGames(true)} />
    </div>
  )
}

export default App
