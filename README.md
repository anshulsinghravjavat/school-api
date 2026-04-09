# School Management API

A Node.js API for managing school data using Express.js and PostgreSQL.

## Features

- Add new schools with location data
- List schools sorted by proximity to user location
- Input validation
- Distance calculation using Haversine formula

## Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/anshulsinghravjavat/school-api.git
   cd school-api
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Database Setup:**
   - Install MongoDB and MongoDB Compass
   - Start MongoDB service
   - The database will be created automatically when you run the app

4. **Environment Variables:**
   - Copy `.env.example` to `.env`
   - Update the MongoDB URI in `.env` (default: mongodb://localhost:27017/school_db)

5. **Run the server:**
   ```bash
   npm start
   ```
   For development:
   ```bash
   npm run dev
   ```

## API Endpoints

### POST /api/addSchool
Add a new school.

**Request Body:**
```json
{
  "name": "School Name",
  "address": "School Address",
  "latitude": 12.3456,
  "longitude": 78.9012
}
```

**Response:**
```json
{
  "message": "School added successfully",
  "school": {
    "id": 1,
    "name": "School Name",
    "address": "School Address",
    "latitude": 12.3456,
    "longitude": 78.9012
  }
}
```

### GET /api/listSchools?lat={latitude}&lng={longitude}
Get list of schools sorted by distance from user location.

**Query Parameters:**
- `lat`: User's latitude (required)
- `lng`: User's longitude (required)

**Response:**
```json
{
  "schools": [
    {
      "id": 1,
      "name": "School Name",
      "address": "School Address",
      "latitude": 12.3456,
      "longitude": 78.9012,
      "distance": 0.5
    }
  ]
}
```

## Postman Collection

Import the following collection into Postman:

```json
{
  "info": {
    "name": "School API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Add School",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\"name\":\"Test School\",\"address\":\"123 Test St\",\"latitude\":12.3456,\"longitude\":78.9012}"
        },
        "url": {
          "raw": "http://localhost:3000/api/addSchool",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3000",
          "path": ["api", "addSchool"]
        }
      }
    },
    {
      "name": "List Schools",
      "request": {
        "method": "GET",
        "url": {
          "raw": "http://localhost:3000/api/listSchools?lat=12.3456&lng=78.9012",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3000",
          "path": ["api", "listSchools"],
          "query": [
            {
              "key": "lat",
              "value": "12.3456"
            },
            {
              "key": "lng",
              "value": "78.9012"
            }
          ]
        }
      }
    }
  ]
}
```

## Hosting

Deploy to Heroku, Vercel, or any Node.js hosting service. Update the database connection for production.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- CORS
- dotenv
