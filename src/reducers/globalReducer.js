const initialState = {
  user: undefined,
  navOpen: false,
  logoTransparent: false,
  about: false
}

export default (state = initialState, action) => {
  switch(action.type) {
    case 'AUTH':
      return {
        ...state,
        user: action.payload
      }
    case 'OPEN_NAV':
      if (!state.navOpen) return { ...state, navOpen: true }
      return state;
    case 'CLOSE_NAV':
      if (state.navOpen) return { ...state, navOpen: false }
      return state;
    case 'IS_TRANSPARENT':
      return {
        ...state,
        navOpen: false,
        logoTransparent: true
      }
    case 'IS_NOT_TRANSPARENT':
      return {
        ...state,
        navOpen: false,
        logoTransparent: false
      }
    default:
      return state;
  }
}