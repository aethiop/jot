import useGun from "../hooks/useGun";
const { user, SEA } = useGun();
export async function authUser(dispatch, payload) {
	user.auth(payload.key);
	if (user.is) {
		user.get("profile")
			.get("name")
			.on((username) => {
				dispatch({
					type: "AUTH",
					payload: {
						username: username,
						key: JSON.stringify(user.is),
					},
				});
			});
	}
}
export async function createUser(dispatch, payload) {
	var key = await SEA.pair();
	authUser(dispatch, { key: key, username: payload.username });
	user.get("profile").get("name").put(payload.username);
}

export async function logoutUser(dispatch) {
	user.leave();
	dispatch({ type: "AUTH_LOGOUT" });
}
