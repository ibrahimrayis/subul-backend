import { Response } from 'express';
import { ProductModel } from '../models/product.model';
import { AuthRequest } from '../../../middleware/auth';

export class ProductController {
  static async create(req: AuthRequest, res: Response): Promise<void> {
    try {
      const product = await ProductModel.create(req.body);
      res.status(201).json(product);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  static async getById(req: AuthRequest, res: Response): Promise<void> {
    try {
      const productId = parseInt(req.params.id);
      const product = await ProductModel.findById(productId);
      
      if (!product) {
        res.status(404).json({ error: 'Product not found' });
        return;
      }

      res.json(product);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  static async getAll(req: AuthRequest, res: Response): Promise<void> {
    try {
      const limit = parseInt(req.query.limit as string) || 100;
      const offset = parseInt(req.query.offset as string) || 0;
      const merchantId = req.query.merchant_id ? parseInt(req.query.merchant_id as string) : undefined;
      
      const products = await ProductModel.getAll(limit, offset, merchantId);
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  static async update(req: AuthRequest, res: Response): Promise<void> {
    try {
      const productId = parseInt(req.params.id);
      const product = await ProductModel.update(productId, req.body);
      
      if (!product) {
        res.status(404).json({ error: 'Product not found' });
        return;
      }

      res.json(product);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  static async delete(req: AuthRequest, res: Response): Promise<void> {
    try {
      const productId = parseInt(req.params.id);
      const success = await ProductModel.delete(productId);
      
      if (!success) {
        res.status(404).json({ error: 'Product not found' });
        return;
      }

      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }
}
