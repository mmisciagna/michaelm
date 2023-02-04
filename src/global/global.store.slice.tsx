import {createSlice} from '@reduxjs/toolkit';
import {GlobalString} from './global.constants';
import {SHOWCASES} from '../global/content/showcases';


// Define a type for the slice state
interface StoreState {
  path: string;
  showcase: Showcase;
}

// Define the initial state using that type
const initialState: StoreState = {
  path: GlobalString.HOME_PATH,
  showcase: SHOWCASES[0],
};

const storeUpdate = createSlice({
  name: 'store',
  initialState,
  reducers: {
    updatePath: (state, payload) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.path = payload.payload;
    },
    updateShowcase: (state, payload) => {
      state.showcase = payload.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {updatePath, updateShowcase} = storeUpdate.actions;

export default storeUpdate.reducer;
