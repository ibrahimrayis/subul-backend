# Subul Backend Architecture

## Overview
Subul Backend is a modular e-commerce platform backend built with Node.js, TypeScript, PostgreSQL (transactional data), and MongoDB (analytics/logs).

## Technology Stack

### Runtime & Language
- **Node.js**: 18.x
- **TypeScript**: Strict mode with comprehensive type checking
- **Express.js**: RESTful API framework

### Databases
- **PostgreSQL**: Primary database for transactional data
  - Users, Merchants, Products, Orders, Payments, Deliveries, Inventory, Notifications
- **MongoDB**: Secondary database for analytics and logs
  - API logs, User activities, Order analytics

### Authentication & Security
- **JWT**: JSON Web Tokens for stateless authentication
- **bcryptjs**: Password hashing
- **Helmet**: Security headers
- **CORS**: Cross-origin resource sharing

### Documentation
- **Swagger/OpenAPI**: Interactive API documentation

### DevOps
- **Docker**: Containerization
- **Docker Compose**: Multi-container orchestration

## Project Structure

```
subul-backend/
├── src/
│   ├── config/              # Configuration files
│   │   ├── database.ts      # PostgreSQL & MongoDB setup
│   │   ├── mongoModels.ts   # MongoDB schemas
│   │   └── swagger.ts       # API documentation config
│   │
│   ├── middleware/          # Express middleware
│   │   ├── auth.ts          # JWT authentication & authorization
│   │   └── errorHandler.ts # Error handling
│   │
│   ├── utils/               # Utility functions
│   │   ├── hash.ts          # Password hashing utilities
│   │   └── jwt.ts           # JWT token generation
│   │
│   ├── modules/             # Feature modules
│   │   ├── user/            # User management & authentication
│   │   ├── merchant/        # Merchant management
│   │   ├── product/         # Product catalog
│   │   ├── inventory/       # Stock management
│   │   ├── order/           # Order processing
│   │   ├── delivery/        # Shipping & tracking
│   │   ├── payment/         # Payment processing
│   │   └── notification/    # User notifications
│   │
│   ├── app.ts               # Express application setup
│   └── index.ts             # Application entry point
│
├── dist/                    # Compiled JavaScript (generated)
├── node_modules/            # Dependencies (generated)
├── .env.example             # Environment variables template
├── Dockerfile               # Docker image definition
├── docker-compose.yml       # Multi-container setup
├── package.json             # NPM dependencies & scripts
├── tsconfig.json            # TypeScript configuration
└── README.md                # Project documentation
```

## Module Architecture

Each module follows a consistent structure:

```
module/
├── models/          # Data models & database queries
├── controllers/     # Request handlers
├── services/        # Business logic (optional)
└── routes/          # API route definitions
```

### Module Responsibilities

1. **User Module**
   - User registration and authentication
   - JWT token generation
   - Profile management
   - Role-based access control

2. **Merchant Module**
   - Business registration
   - Merchant verification
   - Business information management

3. **Product Module**
   - Product creation and management
   - Product catalog
   - Category management

4. **Inventory Module**
   - Stock tracking
   - Warehouse management
   - Quantity updates

5. **Order Module**
   - Order creation
   - Order tracking
   - Order history

6. **Delivery Module**
   - Shipping management
   - Tracking numbers
   - Delivery status updates

7. **Payment Module**
   - Payment processing
   - Transaction records
   - Payment status tracking

8. **Notification Module**
   - User notifications
   - Notification management
   - Read/unread status

## Database Schema

### PostgreSQL Tables

#### users
- User accounts and authentication
- Stores: email, password (hashed), profile info, role

#### merchants
- Merchant business information
- Links to user account
- Stores: business details, verification status

#### products
- Product catalog
- Links to merchant
- Stores: name, description, price, category

#### inventory
- Stock management
- Links to product
- Stores: quantity, reserved quantity, location

#### orders
- Order records
- Links to user and merchant
- Stores: total amount, status, shipping address

#### order_items
- Order line items
- Links to order and product
- Stores: quantity, price per item

#### deliveries
- Shipping information
- Links to order
- Stores: tracking, carrier, delivery status

#### payments
- Payment transactions
- Links to order
- Stores: amount, method, status, transaction ID

#### notifications
- User notifications
- Links to user
- Stores: title, message, type, read status

### MongoDB Collections

#### apilogs
- API request/response logs
- For monitoring and analytics

#### useractivities
- User action tracking
- For analytics and audit

#### orderanalytics
- Order metrics and statistics
- For business intelligence

## API Design

### Authentication Flow

1. **Register**: `POST /api/v1/auth/register`
   - Creates user account with hashed password
   - Returns user info and JWT token

2. **Login**: `POST /api/v1/auth/login`
   - Validates credentials
   - Returns user info and JWT token

3. **Protected Routes**: Require `Authorization: Bearer <token>` header

### Authorization Roles

- **customer**: Default role, can place orders
- **merchant**: Can manage products and inventory
- **admin**: Full system access

### API Versioning

All endpoints are prefixed with `/api/v1` for version 1.

### Error Handling

- Consistent error response format
- Appropriate HTTP status codes
- Development vs production error details

## Security Considerations

1. **Password Security**
   - Passwords hashed with bcrypt (10 rounds)
   - Never stored or transmitted in plain text

2. **JWT Security**
   - Configurable secret key
   - Configurable expiration time
   - Stateless authentication

3. **Input Validation**
   - Type checking via TypeScript
   - Runtime validation (to be enhanced)

4. **SQL Injection Prevention**
   - Parameterized queries with pg library

5. **Security Headers**
   - Helmet middleware for security headers

## Development Workflow

### Local Development
```bash
npm install          # Install dependencies
npm run dev          # Start development server with hot reload
```

### Building
```bash
npm run build        # Compile TypeScript to JavaScript
npm start            # Run production build
```

### Docker Development
```bash
docker-compose up -d           # Start all services
docker-compose logs -f api     # View API logs
docker-compose down            # Stop all services
```

## Environment Variables

Key environment variables (see `.env.example`):

- `NODE_ENV`: Environment (development/production)
- `PORT`: Server port
- `POSTGRES_*`: PostgreSQL connection details
- `MONGO_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT signing
- `JWT_EXPIRES_IN`: Token expiration time

## Future Enhancements

1. **Testing**
   - Unit tests with Jest
   - Integration tests
   - E2E tests

2. **Validation**
   - Request body validation (e.g., joi, yup)
   - Enhanced error messages

3. **Logging**
   - Structured logging (e.g., winston, pino)
   - Log rotation

4. **Monitoring**
   - Performance monitoring
   - Error tracking (e.g., Sentry)

5. **Rate Limiting**
   - API rate limiting
   - DDoS protection

6. **Caching**
   - Redis for caching
   - Query result caching

7. **File Upload**
   - Product images
   - Document uploads

8. **Email/SMS**
   - Notification delivery
   - OTP verification

9. **Payment Integration**
   - Stripe, PayPal integration
   - Webhook handling

10. **Search**
    - Full-text search
    - Elasticsearch integration
