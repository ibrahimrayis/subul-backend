import { pgPool } from '../../../config/database';

export interface Merchant {
  id?: number;
  user_id: number;
  business_name: string;
  business_address?: string;
  business_phone?: string;
  business_email?: string;
  tax_id?: string;
  is_verified?: boolean;
  created_at?: Date;
  updated_at?: Date;
}

export class MerchantModel {
  static async create(merchant: Merchant): Promise<Merchant> {
    const query = `
      INSERT INTO merchants (user_id, business_name, business_address, business_phone, business_email, tax_id)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;
    const values = [
      merchant.user_id,
      merchant.business_name,
      merchant.business_address,
      merchant.business_phone,
      merchant.business_email,
      merchant.tax_id,
    ];
    const result = await pgPool.query(query, values);
    return result.rows[0];
  }

  static async findById(id: number): Promise<Merchant | null> {
    const query = 'SELECT * FROM merchants WHERE id = $1';
    const result = await pgPool.query(query, [id]);
    return result.rows[0] || null;
  }

  static async getAll(limit = 100, offset = 0): Promise<Merchant[]> {
    const query = 'SELECT * FROM merchants ORDER BY created_at DESC LIMIT $1 OFFSET $2';
    const result = await pgPool.query(query, [limit, offset]);
    return result.rows;
  }

  static async update(id: number, updates: Partial<Merchant>): Promise<Merchant | null> {
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
      UPDATE merchants
      SET ${fields.join(', ')}
      WHERE id = $${paramIndex}
      RETURNING *
    `;

    const result = await pgPool.query(query, values);
    return result.rows[0] || null;
  }
}
