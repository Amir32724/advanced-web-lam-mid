
const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

router.get('/', async (req, res) => {
  const author = req.query.author;
  const filter = author ? { author: new RegExp(author, 'i') } : {};
  const books = await Book.find(filter);
  res.json(books);
});

router.post('/', async (req, res) => {
  const newBook = new Book(req.body);
  await newBook.save();
  res.status(201).json(newBook);
});

module.exports = router;
