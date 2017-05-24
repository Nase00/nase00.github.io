export const handleAction = (state, action, reducers) =>
  reducers[action.type] ? reducers[action.type]() : state;

export const genRGB = (r, g, b) => `rgb(${r}, ${g}, ${b})`;
