import { Response } from 'express';
import { MerchantModel } from '../models/merchant.model';
import { AuthRequest } from '../../../middleware/auth';

export class MerchantController {
  static async create(req: AuthRequest, res: Response): Promise<void> {
    try {
      const merchant = await MerchantModel.create(req.body);
      res.status(201).json(merchant);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  static async getById(req: AuthRequest, res: Response): Promise<void> {
    try {
      const merchantId = parseInt(req.params.id);
      const merchant = await MerchantModel.findById(merchantId);
      
      if (!merchant) {
        res.status(404).json({ error: 'Merchant not found' });
        return;
      }

      res.json(merchant);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  static async getAll(req: AuthRequest, res: Response): Promise<void> {
    try {
      const limit = parseInt(req.query.limit as string) || 100;
      const offset = parseInt(req.query.offset as string) || 0;
      
      const merchants = await MerchantModel.getAll(limit, offset);
      res.json(merchants);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  static async update(req: AuthRequest, res: Response): Promise<void> {
    try {
      const merchantId = parseInt(req.params.id);
      const merchant = await MerchantModel.update(merchantId, req.body);
      
      if (!merchant) {
        res.status(404).json({ error: 'Merchant not found' });
        return;
      }

      res.json(merchant);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }
}
