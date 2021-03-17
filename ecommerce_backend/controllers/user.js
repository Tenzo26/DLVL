const User = require('../models/user');
const {Order} = require('../models/order');
const { errorHandler } = require('../helpers/dbErrorHandler');


exports.userById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User not found'
            });
        }

        req.profile = user;
        next();
    });
};

exports.read = (req, res) => {
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    return res.json(req.profile);
};

exports.getCart = (req, res) => {
    return res.json(req.profile.cart)
};

exports.update = (req, res) => {
    User.findOneAndUpdate(
        {_id: req.profile._id},
        {$set: req.body}, 
        {new: true},
        (err, user) => {
            if (err) {
                return res.status(400).json({
                    error: 'You are not authorized to perform this action'
                });
            }
            user.hashed_password = undefined;
            user.salt = undefined;
            res.json(user);
        }
    );
};

exports.addOrderToUserHistory = (req, res, next) => {
    let history = [];
    req.body.order.products.forEach((item) => {
        history.push({
            _id: item._id,
            name: item.name,
            description: item.description,
            category: item.category,
            collection: item._collection,
            quantity: item.count,
            size: item.size,
            amount: req.body.order.amount
        });
    });
    User.findOneAndUpdate({_id: req.profile._id}, 
        {$push: {history: history}},
        {new:true}, (error, data) => {
            if (error) {
                return res.status(400).json({
                    error: 'Could not update user purchase history'
                })
            }
            next();
        }
    );
};


exports.purchaseHistory = (req, res) => {
    Order.find({user: req.profile._id})
        .populate('user', '_id name')
        .sort('-created')
        .exec((error, orders) => {
            if (error) {
                return res.status(400).json({
                    error: errorHandler(error)
                });
            }
            res.json(orders);
        });
};