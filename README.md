# Catastro Local API

A NestJS API server for the Catastro Local application, providing REST endpoints for restaurants and operators management.

## Features

- **NestJS Framework**: Modern, scalable Node.js framework
- **Prisma ORM**: Type-safe database access with PostgreSQL
- **Docker Compose**: Easy database setup with PostgreSQL container
- **Environment Configuration**: Configurable via .env file
- **RESTful API**: Full CRUD operations for restaurants and operators
- **Swagger Documentation**: Interactive API documentation with DTOs
- **Health Monitoring**: Comprehensive health check endpoints

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

### 6. Access API Documentation

Visit `http://localhost:3300/api/docs` to access the interactive Swagger documentation.

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

- `GET /restaurants` - Get all restaurants (with owner and recipes)
- `GET /restaurants/:id` - Get restaurant by ID (with owner and recipes)
- `POST /restaurants` - Create new restaurant
- `POST /restaurants/with-owner` - Create restaurant and owner together
- `POST /restaurants/complete` - Create restaurant, owner, and recipes in one request
- `PATCH /restaurants/:id` - Update restaurant
- `DELETE /restaurants/:id` - Delete restaurant
- `POST /restaurants/:id/recipes/:recipeId` - Add recipe to restaurant
- `DELETE /restaurants/:id/recipes/:recipeId` - Remove recipe from restaurant

### Owners

- `GET /owners` - Get all owners (with their restaurants)
- `GET /owners/:id` - Get owner by ID (with their restaurants)
- `GET /owners/:id/restaurants` - Get all restaurants owned by specific owner
- `POST /owners` - Create new owner
- `PATCH /owners/:id` - Update owner
- `DELETE /owners/:id` - Delete owner

### Recipes

- `GET /recipes` - Get all recipes (with associated restaurants)
- `GET /recipes/:id` - Get recipe by ID (with associated restaurants)
- `GET /recipes/restaurant/:restaurantId` - Get all recipes for a specific restaurant
- `POST /recipes` - Create new recipe
- `POST /recipes/:recipeId/restaurant/:restaurantId` - Add recipe to restaurant
- `DELETE /recipes/:recipeId/restaurant/:restaurantId` - Remove recipe from restaurant
- `PATCH /recipes/:id` - Update recipe
- `DELETE /recipes/:id` - Delete recipe

### Operators

- `GET /operators` - Get all operators
- `GET /operators/:id` - Get operator by ID
- `POST /operators` - Create new operator
- `PATCH /operators/:id` - Update operator
- `DELETE /operators/:id` - Delete operator

### Health Check

- `GET /health` - Basic health status with database connection
- `GET /health/detailed` - Detailed health status with database stats
- `GET /health/ready` - Readiness probe for Kubernetes/Docker
- `GET /health/live` - Liveness probe for Kubernetes/Docker

## Database Schema

### Restaurant Model
- `id`: String (Primary Key)
- `name`: String
- `description`: String (Optional) - Short description
- `history`: String (Optional) - Detailed history/description for web presentation
- `address`: String
- `latitude`: Float
- `longitude`: Float
- `phone`: String (Optional)
- `email`: String (Optional)
- `website`: String (Optional)
- `principalImage`: String (Optional) - Main restaurant image
- `images`: String[] - Array of additional image URLs
- `identificationNumber`: String (Optional) - Business identification number
- `ownerId`: String (Optional) - Foreign key to Owner
- `createdAt`: DateTime
- `updatedAt`: DateTime

### Owner Model
- `id`: String (Primary Key)
- `name`: String
- `email`: String (Unique)
- `phone`: String (Optional)
- `address`: String (Optional)
- `createdAt`: DateTime
- `updatedAt`: DateTime

### Recipe Model
- `id`: String (Primary Key)
- `name`: String
- `description`: String (Optional)
- `createdAt`: DateTime
- `updatedAt`: DateTime

### RestaurantRecipe Model (Junction Table)
- `id`: String (Primary Key)
- `restaurantId`: String (Foreign key to Restaurant)
- `recipeId`: String (Foreign key to Recipe)
- `createdAt`: DateTime

### Operator Model
- `id`: String (Primary Key)
- `name`: String
- `email`: String (Unique)
- `phone`: String (Optional)
- `createdAt`: DateTime
- `updatedAt`: DateTime

## Relationships

- **Owner ↔ Restaurant**: One-to-Many (One owner can have multiple restaurants)
- **Restaurant ↔ Recipe**: Many-to-Many (Restaurants can have multiple recipes, recipes can belong to multiple restaurants)
- **RestaurantRecipe**: Junction table for Restaurant-Recipe relationship

## API Usage Examples

### Create Restaurant with Owner and Recipes

**Endpoint:** `POST /restaurants/complete`

**Request Body:**
```json
{
  "restaurant": {
    "name": "El Buen Sabor",
    "description": "Restaurante familiar con comida tradicional",
    "history": "Fundado en 1985 por la familia González, El Buen Sabor ha sido durante más de tres décadas el lugar de encuentro preferido de los portovejenses. Nuestra tradición culinaria se remonta a las recetas ancestrales de la abuela María, quien transmitió sus secretos gastronómicos de generación en generación. Especializados en comida ecuatoriana auténtica, cada plato cuenta una historia de sabor y tradición que nos conecta con nuestras raíces. Nuestro compromiso es mantener viva la cocina tradicional mientras innovamos con ingredientes frescos y técnicas modernas.",
    "address": "Av. Principal 123, Portoviejo",
    "latitude": -1.0547,
    "longitude": -80.4545,
    "phone": "(05) 2638-1234",
    "email": "contacto@elbuensabor.ec",
    "website": "https://elbuensabor.ec",
    "principalImage": "https://example.com/restaurant-main.jpg",
    "images": [
      "https://example.com/restaurant-1.jpg",
      "https://example.com/restaurant-2.jpg",
      "https://example.com/restaurant-3.jpg"
    ],
    "identificationNumber": "1234567890"
  },
  "owner": {
    "name": "María González",
    "email": "maria.gonzalez@email.com",
    "phone": "(05) 2638-5678",
    "address": "Calle Secundaria 456, Portoviejo"
  },
  "recipeIds": [
    "recipe-id-1",
    "recipe-id-2",
    "recipe-id-3"
  ]
}
```

**Response:**
```json
{
  "id": "restaurant-id",
  "name": "El Buen Sabor",
  "description": "Restaurante familiar con comida tradicional",
  "address": "Av. Principal 123, Portoviejo",
  "latitude": -1.0547,
  "longitude": -80.4545,
  "phone": "(05) 2638-1234",
  "email": "contacto@elbuensabor.ec",
  "website": "https://elbuensabor.ec",
  "principalImage": "https://example.com/restaurant-main.jpg",
  "images": [
    "https://example.com/restaurant-1.jpg",
    "https://example.com/restaurant-2.jpg",
    "https://example.com/restaurant-3.jpg"
  ],
  "identificationNumber": "1234567890",
  "ownerId": "owner-id",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z",
  "owner": {
    "id": "owner-id",
    "name": "María González",
    "email": "maria.gonzalez@email.com",
    "phone": "(05) 2638-5678",
    "address": "Calle Secundaria 456, Portoviejo",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  },
  "restaurantRecipes": [
    {
      "id": "restaurant-recipe-1",
      "restaurantId": "restaurant-id",
      "recipeId": "recipe-1",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "recipe": {
        "id": "recipe-1",
        "name": "Ceviche de Camarón",
        "description": "Ceviche fresco con camarones del día",
        "createdAt": "2024-01-15T10:30:00.000Z",
        "updatedAt": "2024-01-15T10:30:00.000Z"
      }
    },
    {
      "id": "restaurant-recipe-2",
      "restaurantId": "restaurant-id",
      "recipeId": "recipe-2",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "recipe": {
        "id": "recipe-2",
        "name": "Arroz con Pollo",
        "description": "Arroz tradicional con pollo y verduras",
        "createdAt": "2024-01-15T10:30:00.000Z",
        "updatedAt": "2024-01-15T10:30:00.000Z"
      }
    }
  ]
}
```

### Recipe Management

**Create Recipe:**
```json
POST /recipes
{
  "name": "Encebollado",
  "description": "Sopa tradicional ecuatoriana con pescado"
}
```

**Add Recipe to Restaurant:**
```
POST /restaurants/{restaurantId}/recipes/{recipeId}
```

**Get Recipes by Restaurant:**
```
GET /recipes/restaurant/{restaurantId}
```

### Health Check Examples

**Basic Health Check:**
```
GET /health
```

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "uptime": 3600.123,
  "database": {
    "status": "connected",
    "responseTime": "15ms"
  },
  "memory": {
    "used": 45,
    "total": 128,
    "unit": "MB"
  },
  "environment": "development",
  "version": "1.0.0"
}
```

**Detailed Health Check:**
```
GET /health/detailed
```

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "uptime": 3600.123,
  "database": {
    "status": "connected",
    "responseTime": "15ms",
    "stats": {
      "restaurants": 25,
      "owners": 12,
      "recipes": 150,
      "operators": 5
    }
  },
  "memory": {
    "used": 45,
    "total": 128,
    "external": 8,
    "rss": 65,
    "unit": "MB"
  },
  "system": {
    "platform": "darwin",
    "arch": "x64",
    "nodeVersion": "v18.17.0",
    "pid": 12345
  },
  "environment": "development",
  "version": "1.0.0"
}
```

**Readiness Probe:**
```
GET /health/ready
```

**Response:**
```json
{
  "ready": true,
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

**Liveness Probe:**
```
GET /health/live
```

**Response:**
```json
{
  "alive": true,
  "timestamp": "2024-01-15T10:30:00.000Z",
  "uptime": 3600.123
}
```

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