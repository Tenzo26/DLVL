import { API } from "../config";
import axios from "axios";

export const createCategory = (userId, token, category) => {
	return fetch(`${API}/category/create/${userId}`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(category),
	})
		.then((response) => {
			return response.json();
		})
		.catch((error) => {
			console.log(error);
		});
};

export const createProduct = (userId, token, product) => {
	return fetch(`${API}/product/create/${userId}`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: product,
	})
		.then((response) => {
			return response.json();
		})
		.catch((error) => {
			console.log(error);
		});
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

export const listOrders = (userId, token) => {
	return fetch(`${API}/order/list/${userId}`, {
		method: "GET",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const getStatusValues = (userId, token) => {
	return fetch(`${API}/order/status-values/${userId}`, {
		method: "GET",
		headers: {
			Accept: "application/json",
			Authorization: `Bearer ${token}`,
		},
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const updateOrderStatus = (userId, token, orderId, status) => {
	return fetch(`${API}/order/${orderId}/status/${userId}`, {
		method: "PUT",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify({ status, orderId }),
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const getProducts = () => {
	return fetch(`${API}/products?limit=undefined`, {
		method: "GET",
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const deleteProduct = (productId, userId, token) => {
	return fetch(`${API}/product/${productId}/${userId}`, {
		method: "DELETE",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const getProduct = (productId) => {
	return fetch(`${API}/product/${productId}`, {
		method: "GET",
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const updateProduct = (productId, userId, token, product) => {
	return fetch(`${API}/product/${productId}/${userId}`, {
		method: "PUT",
		headers: {
			Accept: "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: product,
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const createFeedback = (userId, token, product) => {
	return fetch(`${API}/product/create/${userId}`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: product,
	})
		.then((response) => {
			return response.json();
		})
		.catch((error) => {
			console.log(error);
		});
};

// create feedback
export const _createFeedback = (token, userId, content) => {
	const body = { userId, content };
	const config = {
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	};
	return axios
		.post(`${API}/createFeedback`, body, config)
		.then((response) => {
			return response;
		})
		.catch((error) => {
			console.log(error);
		});
};

// admin show feedback
export const getPendingFeedback = async (token) => {
	const config = {
		method: "GET",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	};

	const res = await fetch(`${API}/pendingFeedback`, config);
	const feedback = await res.json();

	return feedback;
};

// admin update feedback
export const updateFeedback = (feedbackId, token) => {
	const config = {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	};

	fetch(`${API}/updateFeedback/${feedbackId}`, config);
};

// admin delete feedback
export const deleteFeedback = (feedbackId, token) => {
	const config = {
		method: "DELETE",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	};

	fetch(`${API}/deleteFeedback/${feedbackId}`, config);
};

// admin get faq
export const getFaq = async () => {
	const res = await axios.get(`${API}/faq`);
	return res;
};

// admin add faq
export const addFaq = async (title, content) => {
	const body = {
		title,
		content,
	};

	await axios.post(`${API}/faq`, body);
};

// admin update faq
export const updateFaq = async (faq) => {
	const { key, title, content } = faq;

	const data = {
		title,
		content,
	};

	await axios.patch(`${API}/faq/${key}`, data);
};

// admin delete faq
export const deleteFaq = async (id) => {
	await axios.delete(`${API}/faq/${id}`);
};

// admin update feedback by id
export const updateById = async (id, values) => {
	const res = await axios.patch(`${API}/admin/adminFeedback/${id}`, {
		content: values.content,
		status: values.status,
	});

	return res.data;
};

export const changeBg = (user, token, background) => {
	return fetch(`${API}/changeBg/${user}`, {
		method: "PUT",
		headers: {
			Accept: "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: background,
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const removeBg = (user, token) => {
	return fetch(`${API}/removeBg/${user}`, {
		method: "DELETE",
		headers: {
			Accept: "application/json",
			Authorization: `Bearer ${token}`,
		},
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};
