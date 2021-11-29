export const initialState = {
	profile: "",
	key: "",
	loading: false,
	errorMessage: null,
};

export const AuthReducer = (initialState, action) => {
	switch (action.type) {
		case "AUTH":
			return {
				...initialState,
				username: action.payload.username,
				key: action.payload.key,
				loading: true,
			};
		case "AUTH_SUCCESS":
			return {
				...initialState,
				loading: false,
			};
		case "AUTH_LOGOUT":
			return {
				...initialState,
				username: "",
				key: "",
			};

		case "LOGIN_ERROR":
			return {
				...initialState,
				loading: false,
				errorMessage: action.error,
			};

		default:
			throw new Error(`Unhandled action type: ${action.type}`);
	}
};
