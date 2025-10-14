# Catastro Local API

A NestJS API server for the Catastro Local application, providing REST endpoints for restaurants and operators management.

## Features

- **NestJS Framework**: Modern, scalable Node.js framework
- **Prisma ORM**: Type-safe database access with PostgreSQL
- **Docker Compose**: Easy database setup with PostgreSQL container
- **Environment Configuration**: Configurable via .env file
- **RESTful API**: Full CRUD operations for restaurants and operators

## Prerequisites

- Node.js (v18 or higher)
- Docker and Docker Compose
- npm or yarn

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Start the Database

```bash
docker-compose up -d
```

### 3. Run Database Migrations

```bash
npx prisma migrate dev
```

### 4. Generate Prisma Client

```bash
npx prisma generate
```

### 5. Start the Development Server

```bash
npm run start:dev
```

The API will be available at `http://localhost:3300`

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
PORT=3300
NODE_ENV=development

# Database Configuration
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/catastro_local?schema=public"

# Database Connection Details
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=catastro_local
```

## API Endpoints

### Restaurants

- `GET /restaurants` - Get all restaurants
- `GET /restaurants/:id` - Get restaurant by ID
- `POST /restaurants` - Create new restaurant
- `PATCH /restaurants/:id` - Update restaurant
- `DELETE /restaurants/:id` - Delete restaurant

### Operators

- `GET /operators` - Get all operators
- `GET /operators/:id` - Get operator by ID
- `POST /operators` - Create new operator
- `PATCH /operators/:id` - Update operator
- `DELETE /operators/:id` - Delete operator

## Database Schema

### Restaurant Model
- `id`: String (Primary Key)
- `name`: String
- `description`: String (Optional)
- `address`: String
- `latitude`: Float
- `longitude`: Float
- `phone`: String (Optional)
- `email`: String (Optional)
- `website`: String (Optional)
- `imageUrl`: String (Optional)
- `createdAt`: DateTime
- `updatedAt`: DateTime

### Operator Model
- `id`: String (Primary Key)
- `name`: String
- `email`: String (Unique)
- `phone`: String (Optional)
- `createdAt`: DateTime
- `updatedAt`: DateTime

## Development

### Available Scripts

- `npm run start` - Start the application
- `npm run start:dev` - Start in development mode with hot reload
- `npm run start:debug` - Start in debug mode
- `npm run build` - Build the application
- `npm run test` - Run tests
- `npm run test:e2e` - Run end-to-end tests
- `npm run test:cov` - Run tests with coverage

### Database Commands

- `npx prisma studio` - Open Prisma Studio (database GUI)
- `npx prisma migrate dev` - Create and apply migrations
- `npx prisma migrate reset` - Reset database and apply all migrations
- `npx prisma generate` - Generate Prisma client

## Project Structure

```
src/
├── app.module.ts          # Main application module
├── main.ts                 # Application entry point
├── prisma/
│   └── prisma.service.ts  # Prisma database service
├── restaurants/            # Restaurant module
│   ├── restaurants.controller.ts
│   ├── restaurants.service.ts
│   └── restaurants.module.ts
└── operators/             # Operator module
    ├── operators.controller.ts
    ├── operators.service.ts
    └── operators.module.ts
```

## Docker

The application uses Docker Compose for the PostgreSQL database:

```yaml
services:
  postgres:
    image: postgres:15-alpine
    container_name: catastro-local-postgres
    environment:
      POSTGRES_DB: catastro_local
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
    ports:
      - "5432:5432"
```

## Contributing

1. Follow the existing code style
2. Write tests for new features
3. Update documentation as needed
4. Use conventional commit messages

## License

This project is part of the Catastro Local application.