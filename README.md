# User Service

## Overview
The User Service is a microservice responsible for managing user data in the Mini E-Commerce application. It provides a RESTful API for creating and retrieving user information, with proper error handling and data validation.

## Project Structure

```
user-service/
├── .env                 # Environment variables
├── .gitignore           # Git ignore file
├── package.json         # Project dependencies and scripts
├── node_modules/        # Node.js dependencies
├── prisma/              # Database models and migrations
│   ├── schema.prisma    # Database schema definition
│   └── migrations/      # Database migrations
└── src/                 # Source code
    ├── index.js         # Application entry point
    ├── Routes/          # API route definitions
    │   └── userRoutes.js
    ├── Controllers/     # Request handlers
    │   └── userController.js
    └── Services/        # Business logic
        └── userService.js
```

## Technologies Used

- **Node.js & Express**: Backend framework
- **Prisma ORM**: Database access and management
- **PostgreSQL**: Relational database
- **Consul**: Service discovery and registration
- **Morgan**: HTTP request logger

## API Endpoints

### User Management

| Method | Endpoint       | Description                | Request Body Example           | Response Example                            |
|--------|----------------|----------------------------|--------------------------------|--------------------------------------------|
| POST   | `/users`       | Create a new user          | `{ "name": "John", "email": "john@example.com" }` | `{ "id": 1, "name": "John", "email": "john@example.com", "created_at": "..." }` |
| GET    | `/users/:id`   | Get user by ID             | N/A                            | `{ "id": 1, "name": "John", "email": "john@example.com", "created_at": "..." }` |

### Health Checks

| Method | Endpoint       | Description                | Response Example               |
|--------|----------------|----------------------------|--------------------------------|
| GET    | `/health`      | Service health check       | `OK`                           |
| GET    | `/users/health`| User route health check    | `{ "status": "OK", "service": "users-service" }` |

## Error Handling

The API implements comprehensive error handling:

- **400 Bad Request**: For invalid input data or parameters
- **404 Not Found**: For resources that don't exist
- **500 Internal Server Error**: For unexpected server errors

Error responses follow this format:
```json
{
  "message": "Error description",
  "error": "Detailed error information (development only)"
}
```

## Configuration

The service is configured via environment variables in the `.env` file:

```
PORT=3001                 # Service port
CONSUL_HOST=localhost     # Consul service host
CONSUL_PORT=8500          # Consul service port
DATABASE_URL=...          # PostgreSQL connection string
```

## Service Discovery

The service registers itself with Consul for service discovery on startup, with the following details:
- **Service Name**: `user-service`
- **Service ID**: Dynamically generated UUID
- **Health Check**: HTTP endpoint at `/health`

## Getting Started

### Prerequisites
- Node.js (v14+)
- PostgreSQL database
- Consul (for service discovery)

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Configure `.env` file with your environment variables
4. Apply database migrations:
   ```
   npx prisma migrate dev
   ```
5. Start the service:
   ```
   npm start
   ```

## Development

- **Start development server**: `npm run dev`
- **Generate Prisma client**: `npx prisma generate`
- **Create migration**: `npx prisma migrate dev --name <migration_name>`
