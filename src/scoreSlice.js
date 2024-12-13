import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  left: {
    bonus: 0,
    jiejv: 0,
    linshi: 0,
  },
  mid: {
    event: 0,
    other: 0,
  },
};

const scoreSlice = createSlice({
  name: 'scores',
  initialState,
  reducers: {
    updateLeftScore(state, action) {
      const { category, score } = action.payload;
      state.left[category] = score;
    },
    updateMidScore(state, action) {
      const { category, score } = action.payload;
      state.mid[category] = score;
    },
  },
});

export const { updateLeftScore, updateMidScore } = scoreSlice.actions;
export default scoreSlice.reducer;
