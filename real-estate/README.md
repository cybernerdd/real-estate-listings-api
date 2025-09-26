# Real Estate Listings API

Node.js (Express) API with MySQL CRUD and MongoDB aggregation, plus a Laravel mini-route.

## Prerequisites
- Node.js 18+
- MySQL 8+ (or compatible)
- MongoDB 6+
- PHP 8.2 + Composer (for Laravel mini-task)

## Setup
1) Clone and install deps
```bash
cd real-estate
npm install
```

2) Import MySQL schema and seed data
- Download SQL dump: `https://s3.us-central-1.wasabisys.com/mashvisor-cdn/mashvisor_dump_db.sql`
- Create database and import:
```bash
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS real_estate;"
mysql -u root -p real_estate < mashvisor_dump_db.sql
```

3) Environment
Copy and adjust `.env` as needed:
```ini
PORT=3000
NODE_ENV=development
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=
MYSQL_DATABASE=real_estate
MONGO_URI=mongodb://127.0.0.1:27017/real_estate
```

4) Seed MongoDB from provided JSONs
Download JSONs:
- `https://s3.us-central-1.wasabisys.com/mashvisor-cdn/views.json`
- `https://s3.us-central-1.wasabisys.com/mashvisor-cdn/listings.json`
- `https://s3.us-central-1.wasabisys.com/mashvisor-cdn/agents.json`

Import (adjust file paths):
```bash
mongoimport --uri "mongodb://127.0.0.1:27017/real_estate" --collection agents --file agents.json --jsonArray
mongoimport --uri "mongodb://127.0.0.1:27017/real_estate" --collection listings --file listings.json --jsonArray
mongoimport --uri "mongodb://127.0.0.1:27017/real_estate" --collection views --file views.json --jsonArray
```

5) Run
```bash
npm start
```
Server listens on `http://localhost:3000`.

## API
### Listings (MySQL)
- GET `/listings` – list all
- GET `/listings/:id` – get one
- POST `/listings` – create
- PUT `/listings/:id` – update
- DELETE `/listings/:id` – delete

Behavior:
- `price` is returned as string with 2 decimals.
- `city` stored lowercase in DB, returned Capitalized.
- Errors format: `{ "error": true, "message": "..." }`.

Example create:
```bash
curl -X POST http://localhost:3000/listings \
  -H 'Content-Type: application/json' \
  -d '{"title":"Nice Home","city":"MIAMI","price":350000,"bedrooms":3,"agentId":1}'
```

### Stats (MongoDB)
- GET `/stats/active-agents`

Returns active agents with:
- `agent`, `listings` (priced > 300000), `totalViews` across their listings
- Includes agents with 0 listings/views; sorted by `totalViews` desc

### Health
- GET `/health`

## Laravel Mini-Task
Laravel project under `laravel-mini/` adds:
- GET `/laravel/listings`

Run it:
```bash
cd ../laravel-mini
cp .env.example .env # set DB_* to the same MySQL used above
php artisan key:generate
php artisan serve
```
Visit `http://127.0.0.1:8000/laravel/listings`.

Response includes `source: "laravel"`, with price formatted and city capitalized.

## Postman
Import `../RealEstate.postman_collection.json` from repository root.

## Choices and Decisions Made
- Used Express.js for Node.js API due to simplicity and wide adoption
- Implemented modular structure with separate controllers, services, and routes
- Used mysql2 for MySQL connection with connection pooling
- Chose mongoose for MongoDB operations for schema validation
- Implemented consistent error handling middleware
- Used environment variables for configuration management

## What I Would Improve With More Time
- Add comprehensive input validation and sanitization
- Implement authentication and authorization
- Add pagination for listings endpoints
- Create database migrations instead of relying on SQL dump
- Add comprehensive unit and integration tests
- Implement logging with structured logs
- Add API rate limiting and caching
- Create Docker containerization for easier deployment


