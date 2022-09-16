import { FormEvent, useEffect, useState } from 'react';
import { ArrowDown, ArrowUp, Check, GameController } from 'phosphor-react';
import axios from 'axios';
import * as Dialog from '@radix-ui/react-dialog';
import * as Select from '@radix-ui/react-select';
import * as Checkbox from '@radix-ui/react-checkbox';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { Game } from '../interfaces/game';
import { Input } from './Form/Input';
import { NewAd } from './NewAd';

interface AdFormProps {
  onSave: () => void;
}

export function AdForm({ onSave }: AdFormProps) {
  const [games, setGames] = useState<Array<Game>>([]);
  const [gameId, setGameId] = useState<string>();
  const [weekDays, setWeekDays] = useState<Array<number>>([]);
  const [useVoiceChannel, setUseVoiceChannel] = useState<boolean>(false);

  useEffect(() => {
    axios('http://localhost:3333/games').then(response => setGames(response.data));
  }, []);

  async function handleNewAd(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const data: any = {
      ...Object.fromEntries(formData),
      weekDays,
      useVoiceChannel
    };
    data.yearsPlaying = parseInt(data.yearsPlaying);

    try {
      await axios.post(`http://localhost:3333/games/${gameId}/ads`, data);
      alert('Anúncio criado com sucesso!');
      onSave();
    } catch(_e) {
      alert('Erro ao criar anúncio! Tente novamente!');
    }
  }

  return (
    <Dialog.Root>
      <NewAd />

      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/60 inset-0 fixed" />

        <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black">
          <Dialog.Title className="text-3xl font-black">Publique um anúncio</Dialog.Title>

          <form className="mt-8 flex flex-col gap-4" onSubmit={handleNewAd}>
            <div className="flex flex-col gap-2">
              <label htmlFor="game" className="font-semibold">Qual o game?</label>
              <Select.Root value={gameId} onValueChange={(value) => setGameId(value)}>
                <Select.Trigger className="bg-zinc-900 py-3 px-4 rounded text-sm flex justify-between items-center">
                  <Select.Value placeholder="Selecione o game que deseja jogar" />
                  <Select.Icon>
                    <ArrowDown />
                  </Select.Icon>
                </Select.Trigger>
                <Select.Portal>
                  <Select.Content>
                    <Select.ScrollUpButton>
                      <ArrowUp />
                    </Select.ScrollUpButton>
                    <Select.Viewport className="bg-zinc-900 text-white py-1 px-2 rounded">
                      {games.map((game) => (
                        <Select.Item key={game.id} value={game.id} className="p-2 hover:bg-zinc-800">
                          <Select.ItemText>
                            {game.title}
                          </Select.ItemText>
                        </Select.Item>
                      ))}
                    </Select.Viewport>
                  </Select.Content>
                </Select.Portal>
              </Select.Root>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="font-semibold">Seu nome (ou nickname)</label>
              <Input
                type="text"
                id="name"
                name="name"
                placeholder="Como te chamam dentro do game?"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="yearsPlaying" className="font-semibold">Joga há quantos anos?</label>
                <Input
                  type="number"
                  id="yearsPlaying"
                  name="yearsPlaying"
                  placeholder="Tudo bem ser ZERO"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="discord" className="font-semibold">Qual seu discord?</label>
                <Input
                  type="text"
                  id="discord"
                  name="discord"
                  placeholder="Usuario#0000"
                />
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="weekDays" className="font-semibold">Quando costuma jogar?</label>

                <ToggleGroup.Root
                  type="multiple"
                  value={weekDays.map(String)}
                  className="rounded overflow-hidden"
                  onValueChange={(values) => setWeekDays(values.map((value) => parseInt(value)))}
                >
                  {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((weekDay, index) => (
                    <ToggleGroup.Item
                      key={index}
                      value={index.toString()}
                      className={`w-7 h-11 ${weekDays.includes(index) ? 'bg-violet-500' : 'bg-zinc-900'}`}
                    >
                      {weekDay}
                    </ToggleGroup.Item>
                  ))}
                </ToggleGroup.Root>
              </div>

              <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="hourStart">Qual horário do dia?</label>
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    type="time"
                    id="hourStart"
                    name="hourStart"
                    placeholder="De"
                  />
                  <Input
                    type="time"
                    id="hourEnd"
                    name="hourEnd"
                    placeholder="Até"
                  />
                </div>
              </div>
            </div>

            <label className="mt-2 flex gap-2 text-sm items-center">
              <Checkbox.Root checked={useVoiceChannel} className="w-6 h-6 rounded bg-zinc-900" onCheckedChange={(checked) => setUseVoiceChannel(checked === true ? true : false)}>
                <Checkbox.Indicator>
                  <Check className="w-4 h-4 text-emerald-400 m-auto" />
                </Checkbox.Indicator>
              </Checkbox.Root>
              Costume me conectar ao chat de voz
            </label>

            <footer className="mt-4 flex justify-end gap-4">
              <Dialog.Close className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600">Cancelar</Dialog.Close>
              <button type="submit" className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600">
                <GameController size={24} />
                Encontrar duo
              </button>
            </footer>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
