import dotenv from 'dotenv';
import { createApp } from './app';
import { connectMongoDB, initializePostgresDB } from './config/database';

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';

const startServer = async (): Promise<void> => {
  try {
    // Initialize databases
    console.log('🔄 Initializing databases...');
    await initializePostgresDB();
    await connectMongoDB();

    // Create and start the Express app
    const app = createApp();
    
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://${HOST}:${PORT}`);
      console.log(`📚 API Documentation: http://${HOST}:${PORT}/api-docs`);
      console.log(`💚 Health check: http://${HOST}:${PORT}/health`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
