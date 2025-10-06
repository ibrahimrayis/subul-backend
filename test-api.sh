#!/bin/bash

# API Test Script for Subul Backend
# This script demonstrates the API endpoints without requiring database connections

echo "=========================================="
echo "Subul Backend API Test Script"
echo "=========================================="
echo ""

BASE_URL="http://localhost:3000"

echo "1. Testing Health Check Endpoint..."
echo "GET $BASE_URL/health"
echo ""

echo "2. Testing API Documentation..."
echo "GET $BASE_URL/api-docs"
echo ""

echo "3. API Endpoints Structure:"
echo ""
echo "Authentication & Users:"
echo "  POST   /api/v1/auth/register      - Register a new user"
echo "  POST   /api/v1/auth/login         - Login user"
echo "  GET    /api/v1/users/profile      - Get user profile (authenticated)"
echo "  GET    /api/v1/users              - Get all users (admin only)"
echo "  PUT    /api/v1/users/:id          - Update user (admin only)"
echo "  DELETE /api/v1/users/:id          - Delete user (admin only)"
echo ""

echo "Merchants:"
echo "  POST   /api/v1/merchants          - Create merchant (admin only)"
echo "  GET    /api/v1/merchants          - Get all merchants"
echo "  GET    /api/v1/merchants/:id      - Get merchant by ID"
echo "  PUT    /api/v1/merchants/:id      - Update merchant (admin only)"
echo ""

echo "Products:"
echo "  POST   /api/v1/products           - Create product (merchant/admin)"
echo "  GET    /api/v1/products           - Get all products"
echo "  GET    /api/v1/products/:id       - Get product by ID"
echo "  PUT    /api/v1/products/:id       - Update product (merchant/admin)"
echo "  DELETE /api/v1/products/:id       - Delete product (merchant/admin)"
echo ""

echo "Orders:"
echo "  POST   /api/v1/orders             - Create order"
echo "  GET    /api/v1/orders             - Get user orders"
echo "  GET    /api/v1/orders/:id         - Get order by ID"
echo ""

echo "Inventory:"
echo "  POST   /api/v1/inventory          - Create inventory record (merchant/admin)"
echo "  GET    /api/v1/inventory/:product_id - Get inventory by product"
echo "  PUT    /api/v1/inventory/:id      - Update inventory (merchant/admin)"
echo ""

echo "Deliveries:"
echo "  POST   /api/v1/deliveries         - Create delivery (merchant/admin)"
echo "  GET    /api/v1/deliveries/:order_id - Get delivery by order"
echo "  PUT    /api/v1/deliveries/:id     - Update delivery status (merchant/admin)"
echo ""

echo "Payments:"
echo "  POST   /api/v1/payments           - Create payment"
echo "  GET    /api/v1/payments/:order_id - Get payment by order"
echo "  PUT    /api/v1/payments/:id       - Update payment status"
echo ""

echo "Notifications:"
echo "  POST   /api/v1/notifications      - Create notification"
echo "  GET    /api/v1/notifications      - Get user notifications"
echo "  PUT    /api/v1/notifications/:id/read - Mark notification as read"
echo ""

echo "=========================================="
echo "To start the server:"
echo "  npm run dev          - Development mode"
echo "  npm run build        - Build for production"
echo "  npm start            - Production mode"
echo "  docker-compose up -d - Run with Docker"
echo "=========================================="
