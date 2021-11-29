import React, { createContext, useContext, useReducer } from "react";
import { initialState, AuthReducer } from "./reducer";

export const AuthContext = createContext();
export const AuthDispatchContext = createContext();

export function useAuth() {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within a AuthProvider");
	}

	return context;
}

export function useAuthDispatch() {
	const context = useContext(AuthDispatchContext);
	if (context === undefined) {
		throw new Error("useAuthDispatch must be used within a AuthProvider");
	}

	return context;
}

export const AuthProvider = ({ children }) => {
	const [user, dispatch] = useReducer(AuthReducer, initialState);

	return (
		<AuthContext.Provider value={user}>
			<AuthDispatchContext.Provider value={dispatch}>
				{children}
			</AuthDispatchContext.Provider>
		</AuthContext.Provider>
	);
};
