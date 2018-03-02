var mongoose = require('mongoose'),
    moment = require('moment'),
    Validations = require('../utils/Validations'),
    Yasser = mongoose.model('Yasser');

module.exports.getProduct = function(req, res, next) {
    if (!Validations.isObjectId(req.params.productId)) {
        return res.status(422).json({
            err: null,
            msg: 'productId parameter must be a valid ObjectId.',
            data: null
        });
    }
    Yasser.findById(req.params.productId).exec(function(err, Yasser) {
        if (err) {
            return next(err);
        }
        if (!Yasser) {
            return res
                .status(404)
                .json({ err: null, msg: 'Product not found.', data: null });
        }
        res.status(200).json({
            err: null,
            msg: 'Product retrieved successfully.',
            data: Yasser
        });
    });
};

module.exports.getProducts = function(req, res, next) {
    Yasser.find({}).exec(function(err, Yasser) {
        if (err) {
            return next(err);
        }
        res.status(200).json({
            err: null,
            msg: 'Products retrieved successfully.',
            data: Yasser
        });
    });
};

module.exports.getProductsBelowPrice = function(req, res, next) {
    if (!Validations.isNumber(req.params.price)) {
        return res.status(422).json({
            err: null,
            msg: 'price parameter must be a valid number.',
            data: null
        });
    }
    Yasser.find({
        price: {
            $lt: req.params.price
        }
    }).exec(function(err, Yasser) {
        if (err) {
            return next(err);
        }
        res.status(200).json({
            err: null,
            msg:
            'Products priced below ' +
            req.params.price +
            ' retrieved successfully.',
            data: Yasser
        });
    });
};

module.exports.createProduct = function(req, res, next) {
    var valid =
        req.body.name &&
        Validations.isString(req.body.name) &&
        req.body.price &&
        Validations.isNumber(req.body.price);
    if (!valid) {
        return res.status(422).json({
            err: null,
            msg: 'name(String) and price(Number) are required fields.',
            data: null
        });
    }
    // Security Check
    delete req.body.createdAt;
    delete req.body.updatedAt;

    Yasser.create(req.body, function(err, Yasser) {
        if (err) {
            return next(err);
        }
        res.status(201).json({
            err: null,
            msg: 'Product was created successfully.',
            data: Yasser
        });
    });
};

module.exports.updateProduct = function(req, res, next) {
    if (!Validations.isObjectId(req.params.productId)) {
        return res.status(422).json({
            err: null,
            msg: 'productId parameter must be a valid ObjectId.',
            data: null
        });
    }
    var valid =
        req.body.name &&
        Validations.isString(req.body.name) &&
        req.body.price &&
        Validations.isNumber(req.body.price);
    if (!valid) {
        return res.status(422).json({
            err: null,
            msg: 'name(String) and price(Number) are required fields.',
            data: null
        });
    }
    // Security Check
    delete req.body.createdAt;
    req.body.updatedAt = moment().toDate();

    Yasser.findByIdAndUpdate(
        req.params.productId,
        {
            $set: req.body
        },
        { new: true }
    ).exec(function(err, updatedProduct) {
        if (err) {
            return next(err);
        }
        if (!updatedProduct) {
            return res
                .status(404)
                .json({ err: null, msg: 'Product not found.', data: null });
        }
        res.status(200).json({
            err: null,
            msg: 'Product was updated successfully.',
            data: updatedProduct
        });
    });
};

module.exports.deleteProduct = function(req, res, next) {
    if (!Validations.isObjectId(req.params.productId)) {
        return res.status(422).json({
            err: null,
            msg: 'productId parameter must be a valid ObjectId.',
            data: null
        });
    }
    Yasser.findByIdAndRemove(req.params.productId).exec(function(
        err,
        deletedProduct
    ) {
        if (err) {
            return next(err);
        }
        if (!deletedProduct) {
            return res
                .status(404)
                .json({ err: null, msg: 'Product not found.', data: null });
        }
        res.status(200).json({
            err: null,
            msg: 'Product was deleted successfully.',
            data: deletedProduct
        });
    });
};
