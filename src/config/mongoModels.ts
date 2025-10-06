import mongoose, { Schema, Document } from 'mongoose';

// API Log Schema for analytics
export interface IApiLog extends Document {
  method: string;
  url: string;
  statusCode: number;
  responseTime: number;
  userId?: number;
  ip: string;
  userAgent: string;
  timestamp: Date;
}

const ApiLogSchema: Schema = new Schema({
  method: { type: String, required: true },
  url: { type: String, required: true },
  statusCode: { type: Number, required: true },
  responseTime: { type: Number, required: true },
  userId: { type: Number },
  ip: { type: String, required: true },
  userAgent: { type: String },
  timestamp: { type: Date, default: Date.now },
});

// User Activity Log Schema
export interface IUserActivity extends Document {
  userId: number;
  action: string;
  details: any;
  timestamp: Date;
}

const UserActivitySchema: Schema = new Schema({
  userId: { type: Number, required: true },
  action: { type: String, required: true },
  details: { type: Schema.Types.Mixed },
  timestamp: { type: Date, default: Date.now },
});

// Order Analytics Schema
export interface IOrderAnalytics extends Document {
  orderId: number;
  merchantId: number;
  totalAmount: number;
  status: string;
  itemCount: number;
  timestamp: Date;
}

const OrderAnalyticsSchema: Schema = new Schema({
  orderId: { type: Number, required: true },
  merchantId: { type: Number, required: true },
  totalAmount: { type: Number, required: true },
  status: { type: String, required: true },
  itemCount: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
});

export const ApiLog = mongoose.model<IApiLog>('ApiLog', ApiLogSchema);
export const UserActivity = mongoose.model<IUserActivity>('UserActivity', UserActivitySchema);
export const OrderAnalytics = mongoose.model<IOrderAnalytics>('OrderAnalytics', OrderAnalyticsSchema);
