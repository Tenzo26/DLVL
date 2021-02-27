import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { getProducts, getBg } from "./apiCore";
import Card from "./Card";
import Search from "./Search";

const Home = () => {
	const [productsBySell, setProductsBySell] = useState([]);
	const [productsByArrival, setProductsByArrival] = useState([]);
	const [error, setError] = useState(false);

	const loadProductsBySell = () => {
		getProducts("sold").then((data) => {
			if (data.error) {
				setError(data.error);
			} else {
				setProductsBySell(data);
			}
		});
	};

	const loadProductsByArrival = () => {
		getProducts("createdAt").then((data) => {
			if (data.error) {
				setError(data.error);
			} else {
				setProductsByArrival(data);
			}
		});
	};

	useEffect(() => {
		getBg().then((res) => {
			console.log(res);
		});
		loadProductsByArrival();
		loadProductsBySell();
	}, []);

	return (
		<Layout
			title="Home Page"
			description="DLVL Studios Official Website"
			className="container"
			hasBg={true}
			imgSrc="http://localhost:8000/api/getBg"
		>
			<Search />
			<div>
				<h2 className="mb-4">New Arrivals</h2>
				<div className="row">
					{productsByArrival.map((product, i) => (
						<div key={i} className="col-4 mb-3">
							<Card product={product} />
						</div>
					))}
				</div>

				<h2 className="mb-4">Best Sellers</h2>
				<div className="row">
					{productsBySell.map((product, i) => (
						<div key={i} className="col-4 mb-3">
							<Card product={product} />
						</div>
					))}
				</div>
			</div>
		</Layout>
	);
};

export default Home;
