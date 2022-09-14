import './styles/main.css'
import Logo from './assets/logo.svg';
import { MagnifyingGlassPlus } from 'phosphor-react';

function App() {
  return (
    <div className="max-w-6xl mx-auto flex flex-col items-center m-16">
      <img src={Logo} />

      <h1 className="text-6xl text-white font-black mt-16">
        Seu <span className="text-transparent bg-nlw-gradient bg-clip-text">duo</span> está aqui
      </h1>

      <div className="grid grid-cols-6 gap-6 my-8">
        {['Game 1', 'Game 2', 'Game 3', 'Game 4', 'Game 5', 'Game 6'].map((game) => (
          <a href="" className="relative w-44 h-60 bg-violet-500 rounded-lg overflow-hidden">

            <div className="w-full bg-subtitle-gradient pb-4 px-4 pt-16 absolute bottom-0">
              <strong className="font-bold text-white block">{game}</strong>
              <span className="text-zinc-500 text-sm block">4 anúncios</span>
            </div>
          </a>
        ))}
      </div>

      <div className="bg-nlw-gradient pt-1 self-stretch rounded-lg overflow-hidden">
        <div className="bg-[#2A2624] px-8 py-6 flex justify-between items-center">
          <div>
            <strong className="text-2xl text-white font-black block">Não encontrou seu duo?</strong>
            <span className="text-zinc-400 block">Publique um anúncio para encontrar novos players!</span>
          </div>

          <button className="py-3 px-4 bg-violet-500 text-white hover:bg-violet-600 rounded flex items-center gap-3 border-0">
            <MagnifyingGlassPlus size={24} />
            Publicar anúncio
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
