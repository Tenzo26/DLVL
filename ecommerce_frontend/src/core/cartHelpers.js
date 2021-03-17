import { API } from "../config";
import { read } from "./apiCore";
import moment from "moment";
export const addItem = (item, next) => {
    let cart = [];
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'));
        }
        cart.push({
            ...item, 
            count: 1
        });
        cart = Array.from(new Set(cart.map((p) => (p._id)))).map(id => {
            return cart.find(p => p._id === id);
        });

        localStorage.setItem('cart', JSON.stringify(cart));
        next(); 
    }
}; 

export const itemTotal = () => {
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {
            return JSON.parse(localStorage.getItem('cart')).length;
        }
        return 0;
    }
};

export const getCart = () => {
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {
            return JSON.parse(localStorage.getItem('cart'));
        }
        return [];
    }
};

export const updateItem = (productId, count) => {
    let cart = [];
    if (typeof window != 'undefined') {
        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'));
        }
    }

    cart.map((product,i) => {
        if (product._id === productId) {
            cart[i].count = count;
        }
    });

    localStorage.setItem('cart', JSON.stringify(cart));
};

export const updateSize = (productId, size) => {
    let cart = [];
    if (typeof window != 'undefined') {
        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'));
        }
    }

    cart.map((product,i) => {
        if (product._id === productId) {
            cart[i].size = size;
        }
    });

    localStorage.setItem('cart', JSON.stringify(cart));
};

export const removeItem = (productId) => {
    let cart = [];
    if (typeof window != 'undefined') {
        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'));
        }
    }

    cart.map((product,i) => {
        if (product._id === productId) {
            cart.splice(i, 1);
        }
    });

    localStorage.setItem('cart', JSON.stringify(cart));
    return cart;
};

export const emptyCart = (userId, token, next) => {
    if (typeof window != 'undefined') {
        localStorage.removeItem('cart');
        next();

        return fetch(`${API}/user/${userId}`, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                cart: []
                }
            ),
        })
            .then((response) => {
                return response.json();
            })
            .catch((error) => {
                console.log(error);
            });
    }
};

export const saveCart = (userId, token) => {
	let cart = [];
    if (typeof window != 'undefined') {
        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'));
                return fetch(`${API}/user/${userId}`, {
                    method: "PUT",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        cart: cart
                        }
                    ),
                })
                    .then((response) => {
                        return response.json();
                    })
                    .catch((error) => {
                        console.log(error);
                    });
        }

        
    }
};

export const storeSavedCart = (cart) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('cart', JSON.stringify(cart));   
    }
}

export const syncCarttoCatalog = (next) => {
    let cart = [];
    if (typeof window != 'undefined') {
        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'));
        }
        cart.map((product,i) => {
            read(product._id)
                .then(data => {
                    if (data.error) {
                        alert(data.error);
                    }
                    else {
                        if (!moment(cart[i].updatedAt).isSame(data.updatedAt)) {
                            cart[i].name = data.name;
                            cart[i].description = data.description;
                            cart[i].price = data.price;
                            cart[i].quantitySmall = data.quantitySmall;
                            cart[i].quantityMed = data.quantityMed;
                            cart[i].quantityLarge = data.quantityLarge;
                            cart[i].quantityFree = data.quantityFree;
                            cart[i].shipping = data.shipping;
                            cart[i].sizeSmall = data.sizeSmall;
                            cart[i].sizeMed = data.sizeMed;
                            cart[i].sizeLarge = data.sizeLarge;
                            cart[i].sizeFree = data.sizeFree;
                            cart[i].soldSmall = data.soldSmall;
                            cart[i].soldMed = data.soldMed;
                            cart[i].soldLarge = data.soldLarge;
                            cart[i].soldFree = data.soldFree;
                            cart[i].updatedAt = data.updatedAt;
                            localStorage.setItem('cart', JSON.stringify(cart));
                            window.location.reload();
                        }
                    }
                });
        });
    }
}
