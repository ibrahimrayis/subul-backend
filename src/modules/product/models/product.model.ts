import { pgPool } from '../../../config/database';

export interface Product {
  id?: number;
  merchant_id: number;
  name: string;
  description?: string;
  price: number;
  category?: string;
  image_url?: string;
  is_active?: boolean;
  created_at?: Date;
  updated_at?: Date;
}

export class ProductModel {
  static async create(product: Product): Promise<Product> {
    const query = `
      INSERT INTO products (merchant_id, name, description, price, category, image_url)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;
    const values = [
      product.merchant_id,
      product.name,
      product.description,
      product.price,
      product.category,
      product.image_url,
    ];
    const result = await pgPool.query(query, values);
    return result.rows[0];
  }

  static async findById(id: number): Promise<Product | null> {
    const query = 'SELECT * FROM products WHERE id = $1';
    const result = await pgPool.query(query, [id]);
    return result.rows[0] || null;
  }

  static async getAll(limit = 100, offset = 0, merchantId?: number): Promise<Product[]> {
    let query = 'SELECT * FROM products WHERE 1=1';
    const values: any[] = [];
    let paramIndex = 1;

    if (merchantId) {
      query += ` AND merchant_id = $${paramIndex}`;
      values.push(merchantId);
      paramIndex++;
    }

    query += ` ORDER BY created_at DESC LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`;
    values.push(limit, offset);

    const result = await pgPool.query(query, values);
    return result.rows;
  }

  static async update(id: number, updates: Partial<Product>): Promise<Product | null> {
    const fields = [];
    const values = [];
    let paramIndex = 1;

    for (const [key, value] of Object.entries(updates)) {
      if (key !== 'id' && key !== 'created_at') {
        fields.push(`${key} = $${paramIndex}`);
        values.push(value);
        paramIndex++;
      }
    }

    if (fields.length === 0) return null;

    fields.push(`updated_at = CURRENT_TIMESTAMP`);
    values.push(id);

    const query = `
      UPDATE products
      SET ${fields.join(', ')}
      WHERE id = $${paramIndex}
      RETURNING *
    `;

    const result = await pgPool.query(query, values);
    return result.rows[0] || null;
  }

  static async delete(id: number): Promise<boolean> {
    const query = 'DELETE FROM products WHERE id = $1';
    const result = await pgPool.query(query, [id]);
    return (result.rowCount || 0) > 0;
  }
}
