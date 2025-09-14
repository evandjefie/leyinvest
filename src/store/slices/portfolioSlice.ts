import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Investment {
  id: string;
  company: string;
  symbol: string;
  openPrice: number;
  closePrice: number;
  variation: string;
}

interface PortfolioStats {
  totalValue: number;
  totalInvested: number;
  totalReturn: number;
  returnPercentage: number;
}

interface PortfolioState {
  stats: PortfolioStats;
  top5: Investment[];
  flop5: Investment[];
  loading: boolean;
  error: string | null;
}

const initialState: PortfolioState = {
  stats: {
    totalValue: 99000000,
    totalInvested: 99000000,
    totalReturn: 99000000,
    returnPercentage: 99,
  },
  top5: [
    { id: '1', company: 'SONATEL', symbol: 'SNT', openPrice: 450, closePrice: 600, variation: 'Variation' },
    { id: '2', company: 'ECOBANK', symbol: 'ECOW', openPrice: 450, closePrice: 600, variation: 'Variation' },
    { id: '3', company: 'ECOBANK', symbol: 'ECOW', openPrice: 450, closePrice: 600, variation: 'Variation' },
    { id: '4', company: 'ECOBANK', symbol: 'ECOW', openPrice: 450, closePrice: 600, variation: 'Variation' },
    { id: '5', company: 'ECOBANK', symbol: 'ECOW', openPrice: 450, closePrice: 600, variation: 'Variation' },
  ],
  flop5: [
    { id: '6', company: 'SONATEL', symbol: 'SNT', openPrice: 450, closePrice: 600, variation: 'Variation' },
    { id: '7', company: 'ECOBANK', symbol: 'ECOW', openPrice: 450, closePrice: 600, variation: 'Variation' },
    { id: '8', company: 'ECOBANK', symbol: 'ECOW', openPrice: 450, closePrice: 600, variation: 'Variation' },
    { id: '9', company: 'ECOBANK', symbol: 'ECOW', openPrice: 450, closePrice: 600, variation: 'Variation' },
    { id: '10', company: 'ECOBANK', symbol: 'ECOW', openPrice: 450, closePrice: 600, variation: 'Variation' },
  ],
  loading: false,
  error: null,
};

const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    fetchPortfolioStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchPortfolioSuccess: (state, action: PayloadAction<Partial<PortfolioState>>) => {
      state.loading = false;
      Object.assign(state, action.payload);
    },
    fetchPortfolioFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchPortfolioStart, fetchPortfolioSuccess, fetchPortfolioFailure } = portfolioSlice.actions;
export default portfolioSlice.reducer;