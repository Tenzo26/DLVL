import { API } from "../config";
import axios from "axios";

export const forgot1 = async (email, userId) => {
	const config = {
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
	};

	let res;

	if (email) {
		res = await axios.post(`${API}/forgot1`, { email }, config);
	} else if (userId) {
		res = await axios.post(`${API}/forgot1`, { userId }, config);
	}

	return res;
};

export const forgot2 = async (userId, newPassword) => {
	const config = {
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
	};

	const res = await axios.post(
		`${API}/forgot2`,
		{ userId, newPassword },
		config
	);

	return res;
};

export const adminSignup = (user) => {
	return fetch(`${API}/signup/admin/dlvladmin`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify(user),
	})
		.then((response) => {
			return response.json();
		})
		.catch((error) => {
			console.log(error);
		});
};

export const signup = (user) => {
	return fetch(`${API}/signup`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify(user),
	})
		.then((response) => {
			return response.json();
		})
		.catch((error) => {
			console.log(error);
		});
};

export const signin = (user) => {
	return fetch(`${API}/signin`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify(user),
	})
		.then((response) => {
			return response.json();
		})
		.catch((error) => {
			console.log(error);
		});
};

export const authenticate = (data, next) => {
	if (typeof window !== "undefined") {
		localStorage.setItem("jwt", JSON.stringify(data));
		next();
	}
};

export const signout = (next) => {
	if (typeof window !== "undefined") {
		localStorage.removeItem("jwt");
		next();
		return fetch(`${API}/signout`, {
			method: "GET",
		})
			.then((response) => {
				console.log("signout", response);
			})
			.catch((err) => console.log(err));
	}
};

export const isAuthenticated = () => {
	if (typeof window == "undefined") {
		return false;
	}

	if (localStorage.getItem("jwt")) {
		return JSON.parse(localStorage.getItem("jwt"));
	} else {
		return false;
	}
};
