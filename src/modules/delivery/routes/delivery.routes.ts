import { Router } from 'express';
import { Response } from 'express';
import { pgPool } from '../../../config/database';
import { authenticate, authorize, AuthRequest } from '../../../middleware/auth';

const router = Router();

/**
 * @swagger
 * /deliveries:
 *   post:
 *     tags: [Delivery]
 *     summary: Create delivery
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Delivery created
 */
router.post('/deliveries', authenticate, authorize('merchant', 'admin'), async (req: AuthRequest, res: Response) => {
  try {
    const { order_id, delivery_address, carrier, tracking_number } = req.body;
    const query = `
      INSERT INTO deliveries (order_id, delivery_address, carrier, tracking_number)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;
    const result = await pgPool.query(query, [order_id, delivery_address, carrier, tracking_number]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

/**
 * @swagger
 * /deliveries/{order_id}:
 *   get:
 *     tags: [Delivery]
 *     summary: Get delivery by order ID
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
 *         description: Delivery details
 */
router.get('/deliveries/:order_id', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const query = 'SELECT * FROM deliveries WHERE order_id = $1';
    const result = await pgPool.query(query, [req.params.order_id]);
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Delivery not found' });
      return;
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

/**
 * @swagger
 * /deliveries/{id}:
 *   put:
 *     tags: [Delivery]
 *     summary: Update delivery status
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
 *         description: Delivery updated
 */
router.put('/deliveries/:id', authenticate, authorize('merchant', 'admin'), async (req: AuthRequest, res: Response) => {
  try {
    const { delivery_status, actual_delivery_date } = req.body;
    const query = `
      UPDATE deliveries
      SET delivery_status = COALESCE($1, delivery_status),
          actual_delivery_date = COALESCE($2, actual_delivery_date),
          updated_at = CURRENT_TIMESTAMP
      WHERE id = $3
      RETURNING *
    `;
    const result = await pgPool.query(query, [delivery_status, actual_delivery_date, req.params.id]);
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Delivery not found' });
      return;
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

export default router;
