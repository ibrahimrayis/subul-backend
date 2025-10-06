import { Router } from 'express';
import { Response } from 'express';
import { pgPool } from '../../../config/database';
import { authenticate, AuthRequest } from '../../../middleware/auth';

const router = Router();

/**
 * @swagger
 * /orders:
 *   post:
 *     tags: [Order]
 *     summary: Create a new order
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Order created
 */
router.post('/orders', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { merchant_id, total_amount, shipping_address } = req.body;
    const query = `
      INSERT INTO orders (user_id, merchant_id, total_amount, shipping_address)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;
    const result = await pgPool.query(query, [req.user!.id, merchant_id, total_amount, shipping_address]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

/**
 * @swagger
 * /orders:
 *   get:
 *     tags: [Order]
 *     summary: Get all orders
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of orders
 */
router.get('/orders', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const query = 'SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC';
    const result = await pgPool.query(query, [req.user!.id]);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     tags: [Order]
 *     summary: Get order by ID
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
 *         description: Order details
 */
router.get('/orders/:id', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const query = 'SELECT * FROM orders WHERE id = $1';
    const result = await pgPool.query(query, [req.params.id]);
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Order not found' });
      return;
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

export default router;
