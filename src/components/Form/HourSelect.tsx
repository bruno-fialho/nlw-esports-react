import { Dispatch } from 'react';
import * as Select from '@radix-ui/react-select';
import { CaretDown, Check, GameController, Placeholder } from 'phosphor-react';

const DATA = [
  '00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00',
  '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00',
  '20:00', '21:00', '22:00', '23:00', '24:00'
]

interface Props {
  id: string;
  aria: string;
  placeholder: string;
  state: string | null;
  setState: Dispatch<React.SetStateAction<string | null>>
}

export function HourSelect({ id, aria, placeholder, state, setState }: Props) {
  return (
    <Select.Root onValueChange={setState}>
      <Select.SelectTrigger 
        id={id}
        name={id}
        aria-label={aria}
        className={`bg-zinc-900 py-3 px-4 rounded text-sm w-full flex justify-between ${
          state ? "text-white" : "text-zinc-500"
        }`}
      >
        <Select.SelectValue placeholder={placeholder} />
        <Select.SelectIcon>
          <CaretDown size={16} className="text-zinc-400" />
        </Select.SelectIcon>
      </Select.SelectTrigger>

      <Select.SelectPortal>
        <Select.SelectContent className="bg-zinc-900 rounded overflow-hidden">
          <Select.SelectScrollUpButton>
            <CaretDown size={16} />
          </Select.SelectScrollUpButton>

          <Select.SelectViewport className="py-2 px-1">
            <Select.SelectGroup>
              {DATA.map((item) => (
                <Select.SelectItem
                  key={item}
                  value={item}
                  className="flex items-center justify-between py-2 px-3 m-1 bg-zinc-900 text-sm text-zinc-500 cursor-pointer rounded hover:bg-zinc-800 hover:text-white"
                >
                  <Select.SelectItemText>
                    {item}
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
  )
}