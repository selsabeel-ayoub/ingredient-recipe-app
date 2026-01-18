import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

export const GRID = {
  columns: 3,
  padding: 20,
  gap: 10,
};

// (Total Width - Outer Padding - Gaps between items) / Columns
export const ITEM_SIZE = (screenWidth - (GRID.padding * 2) - (GRID.gap * (GRID.columns - 1))) / GRID.columns;