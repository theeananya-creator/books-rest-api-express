const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// In-memory data store (resets when the server restarts)
let books = [
  { id: 1, title: "Clean Code", author: "Robert C. Martin" },
  { id: 2, title: "The Pragmatic Programmer", author: "Andrew Hunt" },
];
let nextId = 3;

// Health check
app.get("/", (req, res) => {
  res.json({ message: "Books API is running", endpoints: ["/books", "/books/:id"] });
});

// GET all books (optional ?author= filter)
app.get("/books", (req, res) => {
  const { author } = req.query;
  const result = author
    ? books.filter((b) => b.author.toLowerCase().includes(author.toLowerCase()))
    : books;
  res.json(result);
});

// GET one book by id
app.get("/books/:id", (req, res) => {
  const book = books.find((b) => b.id === Number(req.params.id));
  if (!book) return res.status(404).json({ error: "Book not found" });
  res.json(book);
});

// POST create a book
app.post("/books", (req, res) => {
  const { title, author } = req.body;
  if (!title || !author) {
    return res.status(400).json({ error: "Both 'title' and 'author' are required" });
  }
  const book = { id: nextId++, title, author };
  books.push(book);
  res.status(201).json(book);
});

// 404 fallback
app.use((req, res) => res.status(404).json({ error: "Route not found" }));

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
