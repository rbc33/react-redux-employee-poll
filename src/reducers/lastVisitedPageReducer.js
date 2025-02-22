// reducers/lastVisitedPageReducer.js
const initialState = {
	lastVisitedPage: null,
};

const lastVisitedPageReducer = (state = initialState, action) => {
	switch (action.type) {
		case "SET_LAST_VISITED_PAGE":
			return { ...state, lastVisitedPage: action.lastVisitedPage };
		default:
			return state;
	}
};

export default lastVisitedPageReducer;
