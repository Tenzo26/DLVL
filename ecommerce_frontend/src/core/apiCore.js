import { API } from "../config";
import queryString from "query-string";

export const getBg = () => {
	return fetch(`${API}/getBg`, {
		method: "GET",
	})
		.then((response) => {
			console.log(response);
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const getProducts = (sortBy) => {
	return fetch(`${API}/products?sortBy=${sortBy}&order=desc&limit=6`, {
		method: "GET",
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const getCategories = () => {
	return fetch(`${API}/categories`, {
		method: "GET",
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const getFilteredProducts = (skip, limit, filters = {}) => {
	const data = {
		limit,
		skip,
		filters,
	};
	return fetch(`${API}/products/by/search`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	})
		.then((response) => {
			return response.json();
		})
		.catch((error) => {
			console.log(error);
		});
};

export const list = (params) => {
	const query = queryString.stringify(params);
	return fetch(`${API}/products/search?${query}`, {
		method: "GET",
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const read = (productId) => {
	return fetch(`${API}/product/${productId}`, {
		method: "GET",
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const listRelated = (productId) => {
	return fetch(`${API}/products/related/${productId}`, {
		method: "GET",
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const createOrder = (userId, token, createOrderData) => {
	return fetch(`${API}/order/create/${userId}`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify({ order: createOrderData }),
	})
		.then((response) => {
			return response.json();
		})
		.catch((error) => {
			console.log(error);
		});
};

// // admin show feedback
// export const getPendingFeedback = async (token) => {
// 	const config = {
// 		method: "GET",
// 		headers: {
// 			Accept: "application/json",
// 			"Content-Type": "application/json",
// 			Authorization: `Bearer ${token}`,
// 		},
// 	};

// 	const res = await fetch(`${API}/pendingFeedback`, config);
// 	const feedback = await res.json();

// 	return feedback;
// };

// // admin update feedback
// export const updateFeedback = (feedbackId, token) => {
// 	const config = {
// 		method: "POST",
// 		headers: {
// 			Accept: "application/json",
// 			"Content-Type": "application/json",
// 			Authorization: `Bearer ${token}`,
// 		},
// 	};

// 	fetch(`${API}/updateFeedback/${feedbackId}`, config);
// };

// // admin delete feedback
// export const deleteFeedback = (feedbackId, token) => {
// 	const config = {
// 		method: "DELETE",
// 		headers: {
// 			Accept: "application/json",
// 			"Content-Type": "application/json",
// 			Authorization: `Bearer ${token}`,
// 		},
// 	};

// 	fetch(`${API}/deleteFeedback/${feedbackId}`, config);
// };
