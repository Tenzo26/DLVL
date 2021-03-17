const { errorHandler } = require('../helpers/dbErrorHandler');
const Collection = require('../models/collection');

exports.collectionById = (req, res, next,id) => {
    Collection.findById(id).exec((err,collection) => {
        if (err || !collection) {
            return res.status(400).json({
                error: 'Category not found'
            });
        }
        req.category = category;
        next();
    });
};

exports.read = (req, res) => {
    return res.json(req.collection);
}

exports.update = (req, res) => {
    const collection = req.collection
    collection.name = req.body.name;
    collection.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json(data);
    });
    
}

exports.remove = (req, res) => {
    const collection = req.collection
    collection.remove((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json({
            message: 'Collection deleted'
        });
    });
}

exports.list = (req, res) => {
    Collection.find().exec((err,data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json(data);
    });
}



exports.create = (req, res) => {
    const collection = new Collection(req.body);
    collection.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json({data});
    });
};

