// src/routes/productRoutes.ts
import { Router } from 'express';
import { ProductController } from '../controllers/productController';
import { validateRequest } from '../middleware/validateRequest';
// import { ProductValidator } from '../validators/productValidator';
// import { protect, restrictTo } from '../middleware/authMiddleware';

const router = Router();
const productController = new ProductController();

// Public routes
router.get('/', productController.getAllProducts.bind(productController));
router.get('/search', productController.searchProducts.bind(productController));
router.get('/:id', productController.getProductById.bind(productController));

// Admin-only routes
router.post(
  '/',
  protect,
  restrictTo('admin'),
  validateRequest(ProductValidator.createProductSchema),
  productController.createProduct.bind(productController)
);

router.patch(
  '/:id',
  protect,
  restrictTo('admin'),
  validateRequest(ProductValidator.updateProductSchema),
  productController.updateProduct.bind(productController)
);

router.delete(
  '/:id',
  protect,
  restrictTo('admin'),
  productController.deleteProduct.bind(productController)
);

const productRoutes = router;
export default productRoutes;