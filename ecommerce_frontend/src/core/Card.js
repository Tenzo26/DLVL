import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import ShowImage from "./ShowImage";
import moment from "moment";
import { addItem, updateItem, removeItem} from "./cartHelpers";
import { isAuthenticated } from "../auth";

const Card = ({
	product,
	showViewProductButton = true,
	showAddToCartButton = true,
	cartUpdate = false,
	showRemoveProductButton = false,
	setRun = (f) => f,
	run = undefined,
}) => {
	const [redirect, setRedirect] = useState(false);
	const [count, setCount] = useState(product.count);

	const showViewButton = (showViewProductButton) => {
		return (
			showViewProductButton && (
				<Link to={`/product/${product._id}`} className="mr-2">
					<button className="btn btn-outline-primary mt-2 mb-2 card-btn-1">
						View Product
					</button>
				</Link>
			)
		);
	};

	const shouldRedirect = (redirect) => {
		if (redirect) {
			if (isAuthenticated()) {
				return <Redirect to="/cart" />;
			}
			else {
				return <Redirect to="/signin" />;
			}
		}
	};

	const AddToCart = () => {
		if (isAuthenticated()) {
			addItem(product, () => {
				setRedirect(true);
			});
		}
		setRedirect(true);
	};

	const isOutofStock = (qSmall, qMed, qLarge, qFree) => {
		return qSmall > 0 || qMed > 0 || qLarge > 0 || qFree > 0;
	};

	const showAddToCart = (showAddToCartButton) => {
		return (
			showAddToCartButton &&
			isOutofStock(product.quantitySmall,product.quantityMed,product.quantityLarge,product.quantityFree) && (
				<button
					onClick={AddToCart}
					className="btn btn-outline-warning mt-2 mb-2 card-btn-1"
				>
					Add to cart
				</button>
			)
		);
	};

	const showRemoveButton = (showRemoveProductButton) => {
		return (
			showRemoveProductButton && (
				<button
					onClick={() => {
						removeItem(product._id);
						setRun(!run);
					}}
					className="btn btn-outline-danger mt-2 mb-2 card-btn-1  "
				>
					Remove from Cart
				</button>
			)
		);
	};

	const showStock = (qSmall, qMed, qLarge, qFree) => {
		return qSmall > 0 || qMed  > 0 || qLarge > 0 || qFree > 0 ? (
			<span className="badge badge-primary badge-pill">In Stock </span>
		) : (
			<span className="badge badge-danger badge-pill">Out of Stock </span>
		);
	};

	const handleChange = (productId) => (event) => {
		setRun(!run);
		if (event.target.value > 5) event.target.value = 5
		setCount(event.target.value < 1 ? 1 : event.target.value);
		if (event.target.value >= 1) {
			updateItem(productId, event.target.value);
		}
	};


	const showCartUpdateOptions = (cartUpdate) => {
		return (
			cartUpdate && (
				<div>
					<div className="input-group mb-3">
						<div className="input-group-prepend">
							<span className="input-group-text">
								Adjust Quantity
							</span>
						</div>
						<input
							type="number"
							className="form-control"
							value={count}
							onChange={handleChange(product._id)}
						/>
					</div>
				</div>
			)
		);
	};

	return (
		<div className="card">
			<div className="card-header card-header-1 ">{product.name}</div>
			<div className="card-body">
				{shouldRedirect(redirect)}
				<ShowImage item={product} url="product" />
				<p className="card-p  mt-2">
					{product.description.substring(0, 100)}{" "}
				</p>
				<p className="card-p black-10">&#8369; {product.price}</p>
				<p className="black-9">
					Category: {product.category && product.category.name}
				</p>
				<p className="black-8" style = {{display: product._collection && product._collection.name == "None" ? 'none' : ''}}>
					Collection: {product._collection && product._collection.name}
				</p>
				<p className="black-7">
					Added on {moment(product.createdAt).fromNow()}
				</p>
				{showStock(product.quantitySmall,product.quantityMed,product.quantityLarge,product.quantityFree)}
				<br />
				{showViewButton(showViewProductButton)}
				{showAddToCart(showAddToCartButton)}
				{showRemoveButton(showRemoveProductButton)}
				{showCartUpdateOptions(cartUpdate)}
				
				<br />
			</div>
		</div>
	);
};

export default Card;
