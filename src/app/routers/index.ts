// src/routes/index.ts
import { Router } from 'express';
import productRoutes from '../modules/product/productRoutes';
import authRoutes from '../modules/auth/authRoutes';
// import authRoutes from './authRoutes';
// import productRoutes from './productRoutes';
// import cartRoutes from './cartRoutes';
// ... others

// import { protect, restrictTo } from '../middleware/authMiddleware';

interface AppRoute {
  path: string;
  route: Router;
  middlewares?: any[];
}

const routes: AppRoute[] = [
  { path: '/auth', route: authRoutes },
  { path: '/products', route: productRoutes },
//   { path: '/categories', route: categoryRoutes },
//   { path: '/cart', route: cartRoutes, middlewares: [protect] },
//   { path: '/orders', route: orderRoutes, middlewares: [protect] },
//   { path: '/payment', route: paymentRoutes, middlewares: [protect] },
//   { path: '/admin/products', route: productRoutes, middlewares: [protect, restrictTo('admin')] },
];

const router = Router();

routes.forEach(({ path, route, middlewares = [] }) => {
  router.use(path, ...middlewares, route);
});

export default router;