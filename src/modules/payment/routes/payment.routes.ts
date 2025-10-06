import { Router } from 'express';
import { Response } from 'express';
import { pgPool } from '../../../config/database';
import { authenticate, AuthRequest } from '../../../middleware/auth';

const router = Router();

/**
 * @swagger
 * /payments:
 *   post:
 *     tags: [Payment]
 *     summary: Create payment
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Payment created
 */
router.post('/payments', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { order_id, amount, payment_method, transaction_id } = req.body;
    const query = `
      INSERT INTO payments (order_id, amount, payment_method, transaction_id, payment_status)
      VALUES ($1, $2, $3, $4, 'pending')
      RETURNING *
    `;
    const result = await pgPool.query(query, [order_id, amount, payment_method, transaction_id]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

/**
 * @swagger
 * /payments/{order_id}:
 *   get:
 *     tags: [Payment]
 *     summary: Get payment by order ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: order_id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Payment details
 */
router.get('/payments/:order_id', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const query = 'SELECT * FROM payments WHERE order_id = $1';
    const result = await pgPool.query(query, [req.params.order_id]);
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Payment not found' });
      return;
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

/**
 * @swagger
 * /payments/{id}:
 *   put:
 *     tags: [Payment]
 *     summary: Update payment status
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
 *         description: Payment updated
 */
router.put('/payments/:id', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { payment_status } = req.body;
    const query = `
      UPDATE payments
      SET payment_status = $1, updated_at = CURRENT_TIMESTAMP
      WHERE id = $2
      RETURNING *
    `;
    const result = await pgPool.query(query, [payment_status, req.params.id]);
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Payment not found' });
      return;
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

export default router;
