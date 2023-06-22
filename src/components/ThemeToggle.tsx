import { ChangeEvent, useReducer } from 'react';
import { Colors, StorageKey } from '@/globals/constants';
import {
  determineTheme,
  getLocalStorage,
  setLocalStorage,
  setTheme,
} from '@/globals/utils';
import { Icons } from './Icons';

const TOGGLE_THEME_ACTION = 'TOGGLE_THEME';

interface State {
  isDarkTheme: boolean;
}

interface Action {
  type: string;
  payload: any;
}

const reducer = (state: State, action: Action) => {
  if (action.type === TOGGLE_THEME_ACTION) {
    setLocalStorage(StorageKey.THEME, determineTheme(action.payload));
    setTheme(determineTheme(action.payload));

    return {
      isDarkTheme: action.payload,
    };
  }
  return state;
};

export default function ThemeToggle() {
  const initialState = {
    isDarkTheme: getLocalStorage(StorageKey.THEME) === 'dark',
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="group absolute right-0 top-0">
      <input
        className="absolute right-0 top-0 block h-[var(--header-height)] w-[var(--header-height)] cursor-pointer appearance-none rounded-none border-0 p-0"
        type="checkbox"
        checked={state.isDarkTheme}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          dispatch({ type: TOGGLE_THEME_ACTION, payload: e.target.checked });
        }}
      />
      <div className="pointer-events-none relative z-10 flex items-center">
        <div className="flex h-[var(--header-height)] w-48 items-center justify-center overflow-hidden border-0 bg-bronze duration-200 ease-in-out [transition-property:width] dark:w-0 dark:border-0">
          <Icons
            type="sun"
            color={Colors['off-white']}
            className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 opacity-100 transition duration-200 ease-in-out group-hover:fill-black dark:opacity-0"
          />
        </div>
        <div className="flex h-[var(--header-height)] w-0 items-center justify-center overflow-hidden bg-off-white duration-200 ease-in-out [transition-property:width] dark:w-48">
          <Icons
            type="moon"
            color={Colors.bronze}
            className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 opacity-0 transition duration-200 ease-in-out group-hover:fill-black dark:opacity-100"
          />
        </div>
      </div>
    </div>
  );
}
