import asyncHandler from 'express-async-handler'
import Organisation from '../models/orgModel.js'

// @desc Fetch all products
// @route GET /api/products
// @access Public (Public does not require a token to access)
const getOrganisations = asyncHandler(async (req, res) => {
    const pageSize = 4
    const page = Number(req.query.pageNumber) || 1


    const keyword =req.query.keyword ? {
        name: {
            $regex: req.query.keyword, //regex to make search exact-word insensitive
            $options: 'i' //case insensitive
        }
    } : {}

    const count = await Organisation.countDocuments({ ...keyword })
    const organisations = await Organisation.find({ ...keyword }).limit(pageSize).skip(pageSize * (page -1))
    
    res.json({organisations, page, pages: Math.ceil(count / pageSize )})

})

// @desc Fetch all products
// @route GET /api/products
// @access Public (Public does not require a token to access)
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

        if(product) {
            res.json(product)
        } else {
            //set the status first
            // if you skip line re.status(404) it will be error 500 by default
            res.status(404)
            //then throw in the new Error
            throw new Error('Product not found')
        }

})

// @desc Delete a product
// @route Delete /api/products
// @access Private/ Admin
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

        if(product) {
            await product.remove()
            res.json({ message: 'Product Removed'})
        } else {
            //set the status first
            // if you skip line re.status(404) it will be error 500 by default
            res.status(404)
            //then throw in the new Error
            throw new Error('Product not found')
        }

})

// @desc Create a product
// @route POST /api/products
// @access Private/ Admin
const createOrganisation = asyncHandler(async (req, res) => {

    const { name, address,town, country, phone, email, segment, orgtype, size, rating } = req.body

    const organisation = await Organisation.create ({
            name,
            address,
            town,
            country,
            phone,
            email,    
            segment,
            orgtype,
            size,
            rating
                   
    }) 
    if(organisation) {
        res.status(201).json({
            _id: organisation._id,
            name: organisation.name,
            address: organisation.address,
            town: organisation.town,
            country: organisation.country ,
            phone: organisation.phone,
            email: organisation.email,    
            segment: organisation.segment,
            orgtype: organisation.orgtype,
            size: organisation.size,
            rating: organisation.rating
        })
    }

    const createdOrganisation = await organisation.save()
    res.status(201).json(createdOrganisation)
})

// @desc Update a product
// @route PUT /api/products/:id
// @access Private/ Admin
const updateProduct = asyncHandler(async (req, res) => {
    const {name, price, description, image, brand, category, countInStock} = req.body

    const product = await Product.findById(req.params.id)

    if(product) {
        product.name = name
        product.price = price
        product.description = description
        product.image = image
        product.brand = brand
        product.category = category
        product.countInStock = countInStock

        const updatedProduct = await product.save()
        res.json(updatedProduct)

    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

// @desc Create review
// @route PUT /api/products/:id/reviews
// @access Private
const createProductReview = asyncHandler(async (req, res) => {
    const {rating, comment} = req.body

    const product = await Product.findById(req.params.id)

    if(product) {
        const alreadyReviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString())
        if(alreadyReviewed) {
            res.status(400)
            throw new Error('Product already reviewed')
        }
            //else
        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id
        }

        product.reviews.push(review)

        product.numReviews = product.reviews.length

        product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length

        await product.save()
        res.status(201).json({ message: 'Review added' })
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

// @desc Get top rated product
// @route Get /api/products/toprated
// @access Private
const getTopProducts = asyncHandler(async (req, res) => {

    const products = await Product.find({}).sort({ rating: -1 }).limit(3)

    res.json(products)

})



export { getOrganisations, createOrganisation }