import express from 'express'
const router = express.Router()
import { createOrganisation, getOrganisations } from '../controllers/orgController.js'
import { protect, admin } from '../middleware/authMiddleware.js'


/*

router.route('/').get(getProducts)
.post(protect, admin, createProduct)

router.get('/top', getTopProducts)

router.route('/:id/reviews').post(protect, createProductReview)

router.route('/:id').get(getProductById)
.delete(protect, admin, deleteProduct)
.put(protect, admin, updateProduct)

*/

router.route('/').get(getOrganisations)
.post(createOrganisation)

export default router