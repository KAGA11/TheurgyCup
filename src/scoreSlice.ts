import { createSlice } from '@reduxjs/toolkit';

interface ScoreState {
  left: {
    bonus: number;
    jiejv: number;
    linshi: number;
  };
  mid: {
    event: number;
    other: number;
  };
}

const initialState: ScoreState = {
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
    updateLeftScore(
      state, 
      action: {
        payload: {
          category: keyof ScoreState['left'];
          score: number;
        }
      }
    ) {
      const { category, score } = action.payload;
      state.left[category] = score;
    },
    updateMidScore(
      state, 
      action: {
        payload: {
          category: keyof ScoreState['mid'];
          score: number;
        }
      }
    ) {
      const { category, score } = action.payload;
      state.mid[category] = score;
    },
  },
});

export const { updateLeftScore, updateMidScore } = scoreSlice.actions;
export default scoreSlice.reducer;
