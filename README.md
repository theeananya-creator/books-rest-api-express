# Books REST API (Node.js + Express)

A small REST API with GET and POST endpoints, using an in-memory store.

## Run locally

```bash
npm install
npm start
```

Server starts at http://localhost:3000

## Endpoints

| Method | Route        | Description                              |
|--------|--------------|------------------------------------------|
| GET    | /books       | List all books (optional `?author=`)     |
| GET    | /books/:id   | Get a single book                        |
| POST   | /books       | Create a book (`title`, `author` in JSON)|

## Examples

```bash
curl http://localhost:3000/books

curl -X POST http://localhost:3000/books \
  -H "Content-Type: application/json" \
  -d '{"title":"Refactoring","author":"Martin Fowler"}'
```
