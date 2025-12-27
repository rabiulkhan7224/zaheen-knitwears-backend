import { Router } from 'express';
import { CategoryController } from './models/categoryController';
import { protect, restrictTo } from '../../middleware/authMiddleware';
import { validateRequest } from '../../middleware/validateRequest';
import { CategoryValidator } from '../../validators/categoryValidator';

const router = Router();
const ctrl = new CategoryController();

router.get('/', ctrl.getAll);

// Admin only
router.post('/', protect, restrictTo('admin'), validateRequest(CategoryValidator.createSchema), ctrl.create);

export default router;