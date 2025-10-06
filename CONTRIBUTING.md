# Contributing to Subul Backend

Thank you for your interest in contributing to Subul Backend! This document provides guidelines and instructions for contributing.

## Getting Started

1. **Fork the repository**
   ```bash
   # Fork on GitHub, then clone your fork
   git clone https://github.com/YOUR_USERNAME/subul-backend.git
   cd subul-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment**
   ```bash
   cp .env.example .env
   # Edit .env with your local database credentials
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

## Development Guidelines

### Code Style

- **TypeScript**: Use TypeScript for all new code
- **Naming Conventions**:
  - Files: camelCase for regular files, PascalCase for classes
  - Variables/Functions: camelCase
  - Classes/Interfaces: PascalCase
  - Constants: UPPER_SNAKE_CASE
- **Formatting**: Follow existing code style
- **Comments**: Add comments for complex logic only

### Module Structure

When creating a new module, follow this structure:

```
modules/
└── your-module/
    ├── models/
    │   └── your-module.model.ts
    ├── controllers/
    │   └── your-module.controller.ts
    ├── services/
    │   └── your-module.service.ts
    └── routes/
        └── your-module.routes.ts
```

### Adding New Features

1. **Create a new branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Implement your feature**
   - Write code following the existing patterns
   - Add Swagger documentation to routes
   - Update README if needed

3. **Test your changes**
   ```bash
   npm run build  # Ensure TypeScript compiles
   npm run dev    # Test locally
   ```

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

5. **Push and create a Pull Request**
   ```bash
   git push origin feature/your-feature-name
   ```

### Commit Message Convention

Follow conventional commits:

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

Examples:
```
feat: add user profile picture upload
fix: resolve JWT token expiration issue
docs: update API documentation for products
```

## API Guidelines

### RESTful Principles

- Use appropriate HTTP methods (GET, POST, PUT, DELETE)
- Use plural nouns for resource names (`/products`, not `/product`)
- Return appropriate status codes
- Use query parameters for filtering and pagination

### Swagger Documentation

Always add Swagger documentation for new endpoints:

```typescript
/**
 * @swagger
 * /api/v1/your-endpoint:
 *   post:
 *     tags: [YourModule]
 *     summary: Brief description
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               field1:
 *                 type: string
 *     responses:
 *       201:
 *         description: Success message
 */
```

### Error Handling

Use consistent error responses:

```typescript
res.status(400).json({ error: 'Error message here' });
```

Common status codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error

## Database Guidelines

### PostgreSQL

- Use parameterized queries to prevent SQL injection
- Follow existing model patterns
- Add indexes for frequently queried columns

Example:
```typescript
const query = 'SELECT * FROM table WHERE id = $1';
const result = await pgPool.query(query, [id]);
```

### MongoDB

- Use existing schema patterns
- Keep analytics data separate from transactional data
- Add indexes for query performance

## Security Guidelines

1. **Never commit sensitive data**
   - No API keys, passwords, or secrets in code
   - Use environment variables

2. **Input Validation**
   - Validate all user inputs
   - Sanitize data before database operations

3. **Authentication**
   - Always verify JWT tokens for protected routes
   - Check user permissions for authorized actions

4. **Passwords**
   - Always hash passwords (bcrypt)
   - Never log or expose passwords

## Testing

### Manual Testing

1. Test all new endpoints with:
   - Valid inputs
   - Invalid inputs
   - Edge cases
   - Authentication/authorization

2. Use Swagger UI or Postman for testing

### Automated Testing (Future)

- Write unit tests for business logic
- Write integration tests for API endpoints
- Maintain test coverage

## Pull Request Process

1. **Before submitting**:
   - Ensure code compiles without errors
   - Test all changed functionality
   - Update documentation if needed
   - Follow the code style guidelines

2. **PR Description**:
   - Describe what changes you made
   - Explain why the changes are needed
   - Reference any related issues

3. **Review Process**:
   - Address reviewer comments
   - Make requested changes
   - Keep the PR focused and manageable

## Questions or Need Help?

- Open an issue for bugs or feature requests
- Use discussions for questions
- Check existing issues before creating new ones

## License

By contributing, you agree that your contributions will be licensed under the project's ISC License.

Thank you for contributing to Subul Backend! 🎉
