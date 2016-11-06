
// ------------------ NEW_AUTH------------------

export const NEW_AUTH = 'NEW_AUTH';
export const newUserAuth = (user) => ({
	type: NEW_AUTH,
	userCredentials: user
});

