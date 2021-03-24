const SET_STATE = `SET_STATE`;

const initialState = {
  searchTerm: "",
};

export default function infoReducer(state = initialState, action) {
  switch (action.type) {
    case SET_STATE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

export const setStateRedux = (payload = {}) => ({
  type: SET_STATE,
  payload,
});
