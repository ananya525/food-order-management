# Food Order Management

A full-stack food ordering assignment built with React + Vite + TypeScript on the frontend and Node.js + Express + TypeScript on the backend.

## Features
- Menu display with image, description and price
- Add/remove items and change quantities
- Checkout with name, address and phone validation
- REST API for menu and orders
- CRUD operations for orders
- Order status simulation: Order Received → Preparing → Out for Delivery → Delivered
- Backend validation with Zod
- API tests with Vitest + Supertest
- UI tests with Vitest + React Testing Library

## Run

### Backend
```bash
cd backend
npm install
npm run dev
```

API: http://localhost:4000

### Frontend
```bash
cd frontend
npm install
npm run dev
```

UI: http://localhost:5173

## Test
```bash
cd backend
npm test
```

```bash
cd frontend
npm test
```

## Architecture

Browser → React UI → REST API → Express service → Repository → in-memory data store.

The repository layer keeps storage separate from HTTP/business logic, making it easy to replace the in-memory store with PostgreSQL/SQLite later.

## AI usage
AI was used as a development assistant for scaffolding, test-case brainstorming, debugging ideas, validation edge cases and documentation review. All generated code should be reviewed and tested before submission.

## Deployment
Deploy the frontend to Vercel/Netlify and the backend to Render/Railway. Set `VITE_API_URL` in the frontend to the deployed backend URL.
