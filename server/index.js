require('dotenv').config();
const express = require('express');
const app = express();
const pool = require('./db');

const cors = require('cors'); 
app.use(cors()); 


app.use(express.json());

app.get("/Search", async (req, res) => {
    try {
        const { bookTitle } = req.query;

        if (!bookTitle || bookTitle.trim() === '') {
            return res.status(400).json({ message: 'Please provide a valid book title' });
        }

        const searchBook = await pool.query(
            'SELECT * FROM books WHERE title ILIKE $1',
            [`%${bookTitle.trim()}%`]
        );

        if (searchBook.rows.length === 0) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.status(200).json({
            message: 'Books retrieved successfully',
            books: searchBook.rows
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
      }
});
app.post("/Create", async (req, res) => {
    try {
        const { bookTitle, bookAuthor, imageUrl } = req.body;

        if (!bookTitle || !bookAuthor || bookTitle.trim() === '' || bookAuthor.trim() === '') {
            return res.status(400).json({ message: 'Please provide all required book details before submitting the form.' });
        }

        const title = bookTitle.trim();
        const author = bookAuthor.trim();
        const image_url = imageUrl?.trim() || "https://via.placeholder.com/150"; // Default image if not provided

        const newBook = await pool.query(
            'INSERT INTO books (title, author, image_url) VALUES ($1, $2, $3) RETURNING *',
            [title, author, image_url]
        );

        res.status(201).json({
            message: 'Book created successfully.',
            book: newBook.rows[0]
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});


app.delete("/DeleteBook", async (req, res) => {
    try {
        const {bookID} = req.query;
        if (!bookID || bookID.trim() === ''){
            return res.status(401).json({message:'Please be sure to input a book ID before you try to delete.'})
        }

        const bookIdSearch = await pool.query(
            'SELECT * FROM books WHERE book_id = $1',
            [bookID]
        );

        if(bookIdSearch.rows.length === 0){
            return res.status(401).json('Book does not exist in database. Please choose one that exists to be able to delete it.')            
        }

        await pool.query(
            'DELETE FROM books WHERE book_id = $1 RETURNING *',
            [bookID]
        )

        res.status(200).json({message: 'Book deleted successfully.'});

    } catch (err) {
        console.error(err)
        return res.status(500).json({message: 'Internal Server Error'})
      }
  });

  app.put("/EditBook", async (req, res) => {
    try {
        const { oldBookID, newBookID } = req.body; 

        if(!oldBookID || !newBookID || newBookID.trim() === '' || oldBookID.trim() === ''){
            return res.status(401).json({message: 'Both old book id and new book id is required'});
        }

          const bookIDUpdate = await pool.query(
            'UPDATE books SET book_id = $1 WHERE book_id = $2 RETURNING *', 
            [newBookID, oldBookID]
        );

        if(bookIDUpdate.rows.length===0){
            return res.status(404).json("book id not found in the database");
        }

        res.status(200).json(
            {
                message: 'book id updated successfully'
            }
        );
        
    } catch (err) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  });


app.get("/ReadAllBooks", async (req, res) => {
    try {
        const books = await pool.query("SELECT book_id, title, author, image_url FROM books");
        res.status(200).json(books.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

