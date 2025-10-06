# Subul Backend MVP

A modular e-commerce platform backend built with Node.js, TypeScript, PostgreSQL, and MongoDB.

## 🏗️ Architecture

This backend follows a modular architecture with the following components:

- **User Module**: Authentication, authorization, and user management
- **Merchant Module**: Business/merchant account management
- **Product Module**: Product catalog management
- **Inventory Module**: Stock and warehouse management
- **Order Module**: Order processing and management
- **Delivery Module**: Shipping and tracking
- **Payment Module**: Payment processing and transactions
- **Notification Module**: User notifications

## 🛠️ Technology Stack

- **Runtime**: Node.js 18+
- **Language**: TypeScript
- **Primary Database**: PostgreSQL (transactional data)
- **Analytics Database**: MongoDB (logs and analytics)
- **API Framework**: Express.js
- **Authentication**: JWT (JSON Web Tokens)
- **Documentation**: Swagger/OpenAPI
- **Containerization**: Docker

## 📋 Prerequisites

- Node.js 18 or higher
- PostgreSQL 15 or higher
- MongoDB 6 or higher
- Docker and Docker Compose (optional, for containerized setup)

## 🚀 Getting Started

### Option 1: Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/ibrahimrayis/subul-backend.git
   cd subul-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and configure your database connections and JWT secret.

4. **Start PostgreSQL and MongoDB**
   
   Make sure PostgreSQL and MongoDB are running on your local machine.

5. **Run the development server**
   ```bash
   npm run dev
   ```

   The server will start on `http://localhost:3000`

### Option 2: Docker (Recommended)

1. **Clone the repository**
   ```bash
   git clone https://github.com/ibrahimrayis/subul-backend.git
   cd subul-backend
   ```

2. **Start all services with Docker Compose**
   ```bash
   docker-compose up -d
   ```

   This will start:
   - PostgreSQL database
   - MongoDB database
   - Backend API server

3. **Check the logs**
   ```bash
   docker-compose logs -f api
   ```

4. **Stop all services**
   ```bash
   docker-compose down
   ```

## 📚 API Documentation

Once the server is running, you can access the interactive API documentation at:

- **Swagger UI**: `http://localhost:3000/api-docs`
- **Health Check**: `http://localhost:3000/health`

### API Endpoints

All API endpoints are prefixed with `/api/v1`:

#### Authentication & Users
- `POST /api/v1/auth/register` - Register a new user
- `POST /api/v1/auth/login` - Login user
- `GET /api/v1/users/profile` - Get user profile (authenticated)
- `GET /api/v1/users` - Get all users (admin only)
- `PUT /api/v1/users/:id` - Update user (admin only)
- `DELETE /api/v1/users/:id` - Delete user (admin only)

#### Merchants
- `POST /api/v1/merchants` - Create merchant (admin only)
- `GET /api/v1/merchants` - Get all merchants
- `GET /api/v1/merchants/:id` - Get merchant by ID
- `PUT /api/v1/merchants/:id` - Update merchant (admin only)

#### Products
- `POST /api/v1/products` - Create product (merchant/admin)
- `GET /api/v1/products` - Get all products
- `GET /api/v1/products/:id` - Get product by ID
- `PUT /api/v1/products/:id` - Update product (merchant/admin)
- `DELETE /api/v1/products/:id` - Delete product (merchant/admin)

#### Orders
- `POST /api/v1/orders` - Create order
- `GET /api/v1/orders` - Get user orders
- `GET /api/v1/orders/:id` - Get order by ID

#### Inventory
- `POST /api/v1/inventory` - Create inventory record (merchant/admin)
- `GET /api/v1/inventory/:product_id` - Get inventory by product
- `PUT /api/v1/inventory/:id` - Update inventory (merchant/admin)

#### Deliveries
- `POST /api/v1/deliveries` - Create delivery (merchant/admin)
- `GET /api/v1/deliveries/:order_id` - Get delivery by order
- `PUT /api/v1/deliveries/:id` - Update delivery status (merchant/admin)

#### Payments
- `POST /api/v1/payments` - Create payment
- `GET /api/v1/payments/:order_id` - Get payment by order
- `PUT /api/v1/payments/:id` - Update payment status

#### Notifications
- `POST /api/v1/notifications` - Create notification
- `GET /api/v1/notifications` - Get user notifications
- `PUT /api/v1/notifications/:id/read` - Mark notification as read

## 🔐 Authentication

This API uses JWT (JSON Web Tokens) for authentication. To access protected endpoints:

1. Register or login to get a JWT token
2. Include the token in the Authorization header:
   ```
   Authorization: Bearer <your-token>
   ```

### User Roles

- **customer**: Default role for registered users
- **merchant**: Can manage products and inventory
- **admin**: Full access to all endpoints

## 🗄️ Database Schema

### PostgreSQL Tables

- **users**: User accounts and authentication
- **merchants**: Merchant/business information
- **products**: Product catalog
- **inventory**: Stock management
- **orders**: Order records
- **order_items**: Order line items
- **deliveries**: Shipping and tracking
- **payments**: Payment transactions
- **notifications**: User notifications

### MongoDB Collections

- **apilogs**: API request/response logs
- **useractivities**: User activity tracking
- **orderanalytics**: Order analytics data

## 🔧 Build and Deploy

### Build for production

```bash
npm run build
```

This compiles TypeScript to JavaScript in the `dist` directory.

### Start production server

```bash
npm start
```

### Build Docker image

```bash
docker build -t subul-backend .
```

## 📝 Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Start production server
- `npm test` - Run tests (to be implemented)

## 🌍 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment (development/production) | `development` |
| `PORT` | Server port | `3000` |
| `HOST` | Server host | `localhost` |
| `POSTGRES_HOST` | PostgreSQL host | `localhost` |
| `POSTGRES_PORT` | PostgreSQL port | `5432` |
| `POSTGRES_DB` | PostgreSQL database name | `subul_db` |
| `POSTGRES_USER` | PostgreSQL username | `postgres` |
| `POSTGRES_PASSWORD` | PostgreSQL password | `postgres` |
| `MONGO_URI` | MongoDB connection URI | `mongodb://localhost:27017/subul_analytics` |
| `JWT_SECRET` | Secret key for JWT signing | (required) |
| `JWT_EXPIRES_IN` | JWT expiration time | `24h` |
| `API_VERSION` | API version prefix | `v1` |

## 🧪 Testing

API testing can be done using:
- Swagger UI at `/api-docs`
- Postman or similar API testing tools
- cURL commands

Example cURL request:
```bash
# Register a user
curl -X POST http://localhost:3000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123","first_name":"Test","last_name":"User"}'

# Login
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

ISC

## 👥 Support

For support, email support@subul.com or open an issue in the repository.