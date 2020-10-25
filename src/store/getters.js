export default {
  size: state => state.size,
  isBlacksMove: state => state.isBlacksMove,
  blind: state => state.blind,
  colorless: state => state.colorless,
  captives: state => ({ ...state.captives }),
  names: state => ({ ...state.names }),
  showCoords: state => state.showCoords
};
