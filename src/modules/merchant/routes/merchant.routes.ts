import { Router } from 'express';
import { MerchantController } from '../controllers/merchant.controller';
import { authenticate, authorize } from '../../../middleware/auth';

const router = Router();

/**
 * @swagger
 * /merchants:
 *   post:
 *     tags: [Merchant]
 *     summary: Create a new merchant
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - business_name
 *     responses:
 *       201:
 *         description: Merchant created
 */
router.post('/merchants', authenticate, authorize('admin'), MerchantController.create);

/**
 * @swagger
 * /merchants:
 *   get:
 *     tags: [Merchant]
 *     summary: Get all merchants
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of merchants
 */
router.get('/merchants', authenticate, MerchantController.getAll);

/**
 * @swagger
 * /merchants/{id}:
 *   get:
 *     tags: [Merchant]
 *     summary: Get merchant by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Merchant details
 */
router.get('/merchants/:id', authenticate, MerchantController.getById);

/**
 * @swagger
 * /merchants/{id}:
 *   put:
 *     tags: [Merchant]
 *     summary: Update merchant
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Merchant updated
 */
router.put('/merchants/:id', authenticate, authorize('admin'), MerchantController.update);

export default router;
