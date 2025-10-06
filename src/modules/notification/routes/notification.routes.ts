import { Router } from 'express';
import { Response } from 'express';
import { pgPool } from '../../../config/database';
import { authenticate, AuthRequest } from '../../../middleware/auth';

const router = Router();

/**
 * @swagger
 * /notifications:
 *   post:
 *     tags: [Notification]
 *     summary: Create notification
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Notification created
 */
router.post('/notifications', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { user_id, title, message, type } = req.body;
    const query = `
      INSERT INTO notifications (user_id, title, message, type)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;
    const result = await pgPool.query(query, [user_id, title, message, type]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

/**
 * @swagger
 * /notifications:
 *   get:
 *     tags: [Notification]
 *     summary: Get user notifications
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of notifications
 */
router.get('/notifications', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const query = 'SELECT * FROM notifications WHERE user_id = $1 ORDER BY created_at DESC';
    const result = await pgPool.query(query, [req.user!.id]);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

/**
 * @swagger
 * /notifications/{id}/read:
 *   put:
 *     tags: [Notification]
 *     summary: Mark notification as read
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
 *         description: Notification marked as read
 */
router.put('/notifications/:id/read', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const query = `
      UPDATE notifications
      SET is_read = true
      WHERE id = $1 AND user_id = $2
      RETURNING *
    `;
    const result = await pgPool.query(query, [req.params.id, req.user!.id]);
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Notification not found' });
      return;
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

export default router;
