const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/catchAsyncError");
const ApiFeatures = require("../utils/apiFeatures");

// Create Product -- Admin
exports.createProduct = catchAsyncError(async (req, res, next) => {

    req.body.user = req.user.id;

    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        result: product
    })

})


// Get All Products
exports.getAllProducts = catchAsyncError(async (req, res) => {

    const resultPerPage = 4;
    const productCount = await Product.countDocuments();

    let products = await new ApiFeatures(Product.find(), req.query)
        .search()
        .filter()
        .query;

    const filteredProductsCount = products.length;

    products = await new ApiFeatures(Product.find(), req.query)
        .search()
        .filter()
        .pagination(resultPerPage)
        .query;

    res.status(200).json({
        success: true,
        count: productCount,
        resultPerPage,
        filteredProductsCount,
        results: products
    })

})


// Get Product Details
exports.getProductDetails = catchAsyncError(async (req, res, next) => {

    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product not found.", 404));
    }

    res.status(200).json({
        success: true,
        result: product
    })

})



// Update Product -- Admin
exports.updateProduct = catchAsyncError(async (req, res, next) => {

    let product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product not found.", 404));
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        result: product
    })

})


// Delete Product
exports.deleteProduct = catchAsyncError(async (req, res, next) => {

    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product not found.", 404));
    }

    await product.remove();

    res.status(200).json({
        success: true,
        message: "Product deleted successfully."
    })

})


// Create or Update Review
exports.createProductReview = catchAsyncError(async (req, res, next) => {

    const { rating, comment, productId } = req.body;

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment
    }

    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find(doc => doc.user.toString() === req.user._id.toString());

    if (isReviewed) {

        product.reviews.forEach(doc => {

            if (doc.user.toString() === req.user._id.toString())
                (doc.rating = rating), (doc.comment = comment);

        })

    }
    else {

        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;

    }

    let total = 0;
    product.reviews.forEach(doc => {
        total += doc.rating;
    })
    product.ratings = total / product.reviews.length;

    await product.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
        message: "Review saved successfully."
    })

})


// Get All Reviews of a Product
exports.getProductReviews = catchAsyncError(async (req, res, next) => {

    const product = await Product.findById(req.query.id);

    if (!product) {
        return next(new ErrorHandler("Product not found.", 404));
    }

    res.status(200).json({
        success: true,
        count: product.reviews.length,
        results: product.reviews
    })

})


// Delete Review
exports.deleteReview = catchAsyncError(async (req, res, next) => {

    const product = await Product.findById(req.query.productId);

    if (!product) {
        return next(new ErrorHandler("Product not found.", 404));
    }

    const reviews = product.reviews.filter(doc => doc._id.toString() !== req.query.id.toString());

    let total = 0;
    reviews.forEach(doc => {
        total += doc.rating;
    })
    const ratings = total / reviews.length;
    const numOfReviews = reviews.length;

    await Product.findByIdAndUpdate(req.query.productId,
        {
            reviews,
            ratings,
            numOfReviews
        },
        {
            new: true,
            runValidators: true,
            useFindAndModify: false
        })

    res.status(200).json({
        success: true,
        message: "Review deleted successfully."
    })

})