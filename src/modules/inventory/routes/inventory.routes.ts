import { Router } from 'express';
import { Response } from 'express';
import { pgPool } from '../../../config/database';
import { authenticate, authorize, AuthRequest } from '../../../middleware/auth';

const router = Router();

/**
 * @swagger
 * /inventory:
 *   post:
 *     tags: [Inventory]
 *     summary: Create inventory record
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Inventory created
 */
router.post('/inventory', authenticate, authorize('merchant', 'admin'), async (req: AuthRequest, res: Response) => {
  try {
    const { product_id, quantity, warehouse_location } = req.body;
    const query = `
      INSERT INTO inventory (product_id, quantity, warehouse_location)
      VALUES ($1, $2, $3)
      RETURNING *
    `;
    const result = await pgPool.query(query, [product_id, quantity, warehouse_location]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

/**
 * @swagger
 * /inventory/{product_id}:
 *   get:
 *     tags: [Inventory]
 *     summary: Get inventory by product ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: product_id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Inventory details
 */
router.get('/inventory/:product_id', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const query = 'SELECT * FROM inventory WHERE product_id = $1';
    const result = await pgPool.query(query, [req.params.product_id]);
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Inventory not found' });
      return;
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

/**
 * @swagger
 * /inventory/{id}:
 *   put:
 *     tags: [Inventory]
 *     summary: Update inventory
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
 *         description: Inventory updated
 */
router.put('/inventory/:id', authenticate, authorize('merchant', 'admin'), async (req: AuthRequest, res: Response) => {
  try {
    const { quantity, reserved_quantity } = req.body;
    const query = `
      UPDATE inventory
      SET quantity = COALESCE($1, quantity), 
          reserved_quantity = COALESCE($2, reserved_quantity),
          updated_at = CURRENT_TIMESTAMP
      WHERE id = $3
      RETURNING *
    `;
    const result = await pgPool.query(query, [quantity, reserved_quantity, req.params.id]);
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Inventory not found' });
      return;
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

export default router;
