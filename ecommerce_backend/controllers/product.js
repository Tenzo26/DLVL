const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const Product = require("../models/product");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.productById = (req, res, next, id) => {
	Product.findById(id)
		.populate("category")
		.exec((err, product) => {
			if (err || !product) {
				return res.status(400).json({
					error: "Product not found",
				});
			}

			req.product = product;
			next();
		});
};

exports.read = (req, res) => {
	req.product.photo = undefined;
	return res.json(req.product);
};

exports.create = (req, res) => {
	let form = new formidable.IncomingForm();
	form.keepExtensions = true;
	form.parse(req, (err, fields, files) => {
		if (err) {
			return res.status(400).json({
				error: "Image could not be uploaded",
			});
		}

		const {
			name,
			description,
			price,
			category,
			_collection,
			quantitySmall,
			quantityMed,
			quantityLarge,
			quantityFree,
			shipping,
			sizeSmall,
			sizeMed,
			sizeLarge,
			sizeFree
		} = fields;

		//console.log(fields, req.body);
		if (
			!name ||
			!description ||
			!price ||
			!category ||
			!_collection ||
			!shipping 
		) {
			return res.status(400).json({
				error: "Insufficient Data. All fields are required.",
			});
		}

		let product = new Product(fields);
		if (files.photo) {
			if (files.photo.size > 5000000) {
				return res.status(400).json({
					error: "Image should be less than 5MB in size",
				});
			}
			product.photo.data = fs.readFileSync(files.photo.path);
			product.photo.contentType = files.photo.type;
		}
		product.save((err, result) => {
			if (err) {
				return res.status(400).json({
					error: errorHandler(err),
				});
			}
			res.json(result);
		});
	});
};

exports.remove = (req, res) => {
	let product = req.product;
	product.remove((err, deletedProduct) => {
		if (err) {
			return res.status(400).json({
				error: errorHandler(err),
			});
		}
		res.json({
			message: "Product deleted successfully",
		});
	});
};

exports.update = (req, res) => {
	let form = new formidable.IncomingForm();
	form.keepExtensions = true;
	form.parse(req, (err, fields, files) => {
		if (err) {
			return res.status(400).json({
				error: "Image could not be uploaded",
			});
		}

		console.log(req);

		/*
        const {name, description, price, category, quantity, shipping} = fields;
        if (!name || !description || !price || !category || !quantity || !shipping) {
            return res.status(400).json({
                error: 'Insufficient Data. All fields are required.'
            });
        }*/

		let product = req.product;
		product = _.extend(product, fields);

		if (files.photo) {
			if (files.photo.size > 5000000) {
				return res.status(400).json({
					error: "Image should be less than 5MB in size",
				});
			}
			product.photo.data = fs.readFileSync(files.photo.path);
			product.photo.contentType = files.photo.type;
		}
		product.save((err, result) => {
			if (err) {
				return res.status(400).json({
					error: errorHandler(err),
				});
			}
			res.json(result);
		});
	});
};

/*
/products?sortBy=sold&order=desc&limit=4
/products?sortBy=createdAt&order=desc&limit=4
*/

exports.list = (req, res) => {
	let order = req.query.order ? req.query.order : "asc";
	let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
	let limit = req.query.limit ? parseInt(req.query.limit) : 6;

	Product.find()
		.select("-photo")
		.populate("category")
		.populate("_collection")
		.sort([[sortBy, order]])
		.limit(limit)
		.exec((err, products) => {
			if (err) {
				return res.status(400).json({
					error: "Products not found",
				});
			}

			res.json(products);
		});
};

/*


*/

exports.listRelated = (req, res) => {
	let limit = req.query.limit ? parseInt(req.query.limit) : 6;

	Product.find({ _id: { $ne: req.product }, category: req.product.category, _collection: req.product._collection })
		.limit(limit)
		.populate("category", "_ id name")
		.populate("_collection", "_ id name")
		.exec((err, products) => {
			if (err) {
				return res.status(400).json({
					error: "Products not found",
				});
			}

			res.json(products);
		});
};

exports.listCategories = (req, res) => {
	Product.distinct("category", {}, (err, categories) => {
		if (err) {
			return res.status(400).json({
				error: "Categories not found",
			});
		}

		res.json(categories);
	});
};

exports.listBySearch = (req, res) => {
	let order = req.body.order ? req.body.order : "desc";
	let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
	let limit = req.body.limit ? parseInt(req.body.limit) : 100;
	let skip = parseInt(req.body.skip);
	let findArgs = {};

	for (let key in req.body.filters) {
		if (req.body.filters[key].length > 0) {
			if (key === "price") {
				findArgs[key] = {
					$gte: req.body.filters[key][0],
					$lte: req.body.filters[key][1],
				};
			} else {
				findArgs[key] = req.body.filters[key];
			}
		}
	}

	Product.find(findArgs)
		.select("-photo")
		.populate("category")
		.populate("_collection")
		.sort([[sortBy, order]])
		.skip(skip)
		.limit(limit)
		.exec((err, data) => {
			if (err) {
				return res.status(400).json({
					error: "Products not found",
				});
			}
			res.json({
				size: data.length,
				data,
			});
		});
};

exports.photo = (req, res, next) => {
	if (req.product.photo.data) {
		res.set("Content-Type", req.product.photo.contentType);
		return res.send(req.product.photo.data);
	}

	next();
};

exports.listSearch = (req, res) => {
	const query = {};
	if (req.query.search) {
		query.name = { $regex: req.query.search, $options: "i" };
		if (req.query.category && req.query.category != "All") {
			query.category = req.query.category;
		}
		Product.find(query, (err, products) => {
			if (err) {
				return res.status(400).json({
					error: errorHandler(err),
				});
			}
			res.json(products);
		})
			.select("-photo")
			.populate("category")
			.populate("_collection");
	}
};

exports.decreaseQuantity = (req, res, next) => {

		let bulkOps = req.body.order.products.map((item) => {
			/*
			if (item.quantitySmall < item.count) {
				return res.status(400).json({
					error: "Your desired quantity doesn\'t meet our stocks! Please try again.",
				});
			}*/
			
			if (item.size == "Small") {
				return {
					updateOne: {
						filter: { _id: item._id },
						update: { $inc: { quantitySmall: -item.count, soldSmall: +item.count } },
					},
				};
			}
	
			else if (item.size == "Medium") {
				return {
					updateOne: {
						filter: { _id: item._id },
						update: { $inc: { quantityMed: -item.count, soldMed: +item.count } },
					},
				};
			}
	
			else if (item.size == "Large") {
				return {
					updateOne: {
						filter: { _id: item._id },
						update: { $inc: { quantityLarge: -item.count, soldLarge: +item.count } },
					},
				};
			}
	
			else if (item.size == "Free Size") {
				return {
					updateOne: {
						filter: { _id: item._id },
						update: { $inc: { quantityFree: -item.count, soldFree: +item.count } },
					},
				};
			}
			
			else {
				return res.status(400).json({
					error: "No size specified",
				});
			}
		});
		Product.bulkWrite(bulkOps, {}, (error, products) => {
			if (error) {
				return res.status(400).json({
					error: "Could not update product",
				});
			}
			next();
		});
	
};
