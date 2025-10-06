import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';

// Import routes
import userRoutes from './modules/user/routes/user.routes';
import merchantRoutes from './modules/merchant/routes/merchant.routes';
import productRoutes from './modules/product/routes/product.routes';
import orderRoutes from './modules/order/routes/order.routes';
import inventoryRoutes from './modules/inventory/routes/inventory.routes';
import deliveryRoutes from './modules/delivery/routes/delivery.routes';
import paymentRoutes from './modules/payment/routes/payment.routes';
import notificationRoutes from './modules/notification/routes/notification.routes';

export const createApp = (): Application => {
  const app = express();

  // Middleware
  app.use(helmet());
  app.use(cors());
  app.use(morgan('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // API Version
  const API_VERSION = process.env.API_VERSION || 'v1';

  // Health check endpoint
  app.get('/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // Swagger documentation
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // API Routes
  app.use(`/api/${API_VERSION}`, userRoutes);
  app.use(`/api/${API_VERSION}`, merchantRoutes);
  app.use(`/api/${API_VERSION}`, productRoutes);
  app.use(`/api/${API_VERSION}`, orderRoutes);
  app.use(`/api/${API_VERSION}`, inventoryRoutes);
  app.use(`/api/${API_VERSION}`, deliveryRoutes);
  app.use(`/api/${API_VERSION}`, paymentRoutes);
  app.use(`/api/${API_VERSION}`, notificationRoutes);

  // Error handlers
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
};
