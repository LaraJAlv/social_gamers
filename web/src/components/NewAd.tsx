import { MagnifyingGlassPlus } from "phosphor-react";
import * as Dialog from '@radix-ui/react-dialog';

export function NewAd() {
  return (
    <div className="bg-nlw-gradient pt-1 self-stretch rounded-lg overflow-hidden">
      <div className="bg-[#2A2624] px-8 py-6 flex justify-between items-center">
        <div>
          <strong className="text-2xl text-white font-black block">Não encontrou seu duo?</strong>
          <span className="text-zinc-400 block">Publique um anúncio para encontrar novos players!</span>
        </div>

        <Dialog.Trigger className="py-3 px-4 bg-violet-500 text-white hover:bg-violet-600 rounded flex items-center gap-3 border-0">
          <MagnifyingGlassPlus size={24} />
          Publicar anúncio
        </Dialog.Trigger>
      </div>
    </div>
  );
};
