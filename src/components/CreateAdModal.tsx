import { FormEvent, useState } from 'react';
import axios from 'axios';
import * as Dialog from '@radix-ui/react-dialog';
import * as Checkbox from '@radix-ui/react-checkbox';
import * as Select from '@radix-ui/react-select';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { CaretDown, Check, GameController } from 'phosphor-react';

import { Input } from './Form/Input';
import { HourSelect } from './Form/HourSelect';

interface GameProps {
  id: string;
  title: string;
}

interface Props {
  data: GameProps[];
}

export function CreateAdModal({ data }: Props) {
  const [gamesInput, setGamesInput] = useState('');
  const [weekDays, setWeekDays] = useState<string[]>([]);
  const [hourStart, setHourStart] = useState<string | null>(null);
  const [hourEnd, setHourEnd] = useState<string | null>(null);
  const [useVoiceChannel, setUseVoiceChannel] = useState(false);
  
  async function handleCreateAd(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const data = Object.fromEntries(formData);

    if (!data.name) return;
    
    try {
      await axios.post(`http://localhost:3333/games/${gamesInput}/ads`, {
        "name": data.name,
        "discord": data.discord,
        "weekDays": weekDays.map(Number),
        "useVoiceChannel": useVoiceChannel,
        "yearsPlaying": Number(data.yearsPlaying),
        "hourStart": hourStart,
        "hourEnd": hourEnd
      });

      alert("Anúncio criado com sucesso!");
    } catch (err) {
      console.log(err);
      alert('Erro ao criar o anúncio!');
    }
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/60 inset-0 fixed" />

      <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25">
        <Dialog.Title className="text-4xl font-black">Publique seu anúncio</Dialog.Title>

        <form onSubmit={handleCreateAd} className="mt-8 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="game" className="font-semibold">Qual o game?</label>
            <Select.Root onValueChange={setGamesInput}>
              <Select.SelectTrigger 
                id="game"
                name="game"
                aria-label="Game"
                className={`bg-zinc-900 py-3 px-4 rounded text-sm flex justify-between ${
                  gamesInput ? "text-white" : "text-zinc-500"
                }`}
              >
                <Select.SelectValue placeholder="Selecione o game que deseja jogar" />
                <Select.SelectIcon>
                  <CaretDown size={24} className="text-zinc-400" />
                </Select.SelectIcon>
              </Select.SelectTrigger>

              <Select.SelectPortal>
                <Select.SelectContent className="bg-zinc-900 rounded overflow-hidden">
                  <Select.SelectScrollUpButton>
                    <CaretDown size={24} />
                  </Select.SelectScrollUpButton>

                  <Select.SelectViewport className="py-2 px-1">
                    <Select.SelectGroup>
                      {data.map((item) => (
                        <Select.SelectItem
                          key={item.id}
                          value={item.id}
                          className="flex items-center justify-between py-2 px-3 m-1 bg-zinc-900 text-zinc-500 cursor-pointer rounded hover:bg-zinc-800 hover:text-white"
                        >
                          <Select.SelectItemText>
                            {item.title}
                          </Select.SelectItemText>
                          <Select.SelectItemIndicator>
                            <Check size={24} className="text-emerald-500" />
                          </Select.SelectItemIndicator>
                        </Select.SelectItem>
                      ))}
                    </Select.SelectGroup>
                  </Select.SelectViewport>
                </Select.SelectContent>
              </Select.SelectPortal>
            </Select.Root>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="font-semibold">Seu nome (ou nickname)</label>
            <Input id="name" name="name" placeholder="Qual seu nickname no game?" />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="yearsPlaying" className="font-semibold">Joga há quantos anos?</label>
              <Input id="yearsPlaying" name="yearsPlaying" type="number" placeholder="Tudo bem ser ZERO" />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-semibold" htmlFor="discord">Qual seu Discord?</label>
              <Input id="discord" name="discord" placeholder="Usuario#0000" />
            </div>
          </div>

          <div className="flex gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="weekdays" className="font-semibold">Quando costuma jogar?</label>

            <ToggleGroup.Root 
              type="multiple"
              className="grid grid-cols-4 gap-2"
              value={weekDays}
              onValueChange={setWeekDays}
            >
              <ToggleGroup.Item value="0" 
                title="Domingo"
                className={`w-8 h-8 rounded ${weekDays.includes('0') ? 'bg-violet-500' : 'bg-zinc-900'}`}
              >
                D 
              </ToggleGroup.Item>
              <ToggleGroup.Item value="1" 
                title="Segunda"
                className={`w-8 h-8 rounded ${weekDays.includes('1') ? 'bg-violet-500' : 'bg-zinc-900'}`}
              >
                S
              </ToggleGroup.Item>
              <ToggleGroup.Item value="2" 
                title="Terça"
                className={`w-8 h-8 rounded ${weekDays.includes('2') ? 'bg-violet-500' : 'bg-zinc-900'}`}
              >
                T
              </ToggleGroup.Item>
              <ToggleGroup.Item value="3" 
                title="Quarta"
                className={`w-8 h-8 rounded ${weekDays.includes('3') ? 'bg-violet-500' : 'bg-zinc-900'}`}
              >
                Q
              </ToggleGroup.Item>
              <ToggleGroup.Item value="4"
                title="Quinta"
                className={`w-8 h-8 rounded ${weekDays.includes('4') ? 'bg-violet-500' : 'bg-zinc-900'}`}
              >
                Q
              </ToggleGroup.Item>
              <ToggleGroup.Item value="5" 
                title="Sexta"
                className={`w-8 h-8 rounded ${weekDays.includes('5') ? 'bg-violet-500' : 'bg-zinc-900'}`}
              >
                S
              </ToggleGroup.Item>
              <ToggleGroup.Item value="6" 
                title="Sábado"
                className={`w-8 h-8 rounded ${weekDays.includes('6') ? 'bg-violet-500' : 'bg-zinc-900'}`}
              >
                S
              </ToggleGroup.Item>
            </ToggleGroup.Root>
          </div>

          <div className="flex flex-col gap-2 flex-1">
            <label htmlFor="hourStart" className="font-semibold">Qual horário do dia?</label>
            <div className="flex flex-row justify-between gap-2">
              {/* <Input id="hourStart" name="hourStart" type="time" placeholder="Até" /> */}
              {/* <Input id="hourEnd" name="hourEnd" type="time" placeholder="Até" /> */}
              <HourSelect 
                id="hourStart" 
                aria="Horário inicial" 
                placeholder="De" 
                state={hourStart} 
                setState={setHourStart} 
              />
              <HourSelect
                id="hourEnd" 
                aria="Horário final" 
                placeholder="Até"
                state={hourEnd} 
                setState={setHourEnd} 
              />
            </div>
          </div>
          </div>

          <label className="mt-2 flex items-center gap-2 text-sm" htmlFor="checkbox">
            <Checkbox.Root 
              className="w-6 h-6 p-1 rounded bg-zinc-900" id="checkbox"
              onCheckedChange={(checked) => {
                if (checked === true) {
                  setUseVoiceChannel(true);
                } else {
                  setUseVoiceChannel(false);
                }
              }}
            >
              <Checkbox.Indicator>
                <Check className="w-4 h-4 text-emerald-400"/>
              </Checkbox.Indicator>
            </Checkbox.Root>
            Costumo me conectar ao chat de voz
          </label>

          <footer className="mt-4 flex justify-end gap-4">
            <Dialog.Close 
              className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600"
            >
              Cancelar
            </Dialog.Close>
            <button type="submit" className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-800">
              <GameController size={24} />
              Encontrar duo
            </button>
          </footer>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  )
}