import {createSlice} from '@reduxjs/toolkit';
import {GlobalString} from './global.constants';


// Define a type for the slice state
interface PathState {
  value: string;
}

// Define the initial state using that type
const initialState: PathState = {
  value: GlobalString.HOME_PATH,
};

const pathUpdate = createSlice({
  name: 'path',
  initialState,
  reducers: {
    updatePath: (state, payload) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value = payload.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {updatePath} = pathUpdate.actions;

export default pathUpdate.reducer;
