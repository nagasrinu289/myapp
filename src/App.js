import React, { useEffect, useState } from 'react';

const App = () => {
    const [books, setBooks] = useState([{"title":"old man","author":"srinu","published_year":2024,"genre":"action","id":1}]);
    const [newBook, setNewBook] = useState({ title: '', author: '' });
    const [selectedBook, setSelectedBook] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        temp();
    }, []);

    const temp = async()=>{
      try {
        const res = await fetch('http://127.0.0.1:8000');
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    }

    const fetchBooks = async() => {
      try {
        const response = await fetch('http://127.0.0.1:8000/books');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
      }
    };
const addBook = async() => {
  
      try {
        const res = await fetch('http://127.0.0.1:8000/books', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newBook),
    redirect: 'follow',
      });
      setNewBook({ title: '', author: '' });
    fetchBooks();
      } catch (error) {
        console.log(error)
      }
  };

  const updateBook = async() => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/books/${selectedBook.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(selectedBook),
    });
    setIsEditing(false);
    setSelectedBook(null);
    fetchBooks();
    } catch (error) {
      console.error('Error updating book:', error);
    }
    };

    const viewBookDetails = (book) => {
        setSelectedBook(book);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (isEditing) {
            setSelectedBook({ ...selectedBook, [name]: value });
        } else {
            setNewBook({ ...newBook, [name]: value });
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold text-center mb-8">Bookstore</h1>

            <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">{isEditing ? 'Update Book' : 'Add New Book'}</h2>
                <div className="space-y-4">
                    <input
                        type="text"
                        name="title"
                        value={isEditing ? selectedBook.title : newBook.title}
                        onChange={handleInputChange}
                        placeholder="Book Title"
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                    <input
                        type="text"
                        name="author"
                        value={isEditing ? selectedBook.author : newBook.author}
                      onChange={handleInputChange}
                        placeholder="Author"
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                    <button
                        onClick={isEditing ? updateBook : addBook}
                        className="w-full p-2 bg-blue-500 text-white rounded-md"
                    >
                        {isEditing ? 'Update Book' : 'Add Book'}
                    </button>
                </div>
            </div>

            <h2 className="text-2xl font-semibold mb-4">Books List</h2>
            <ul className="space-y-4">
                {books.map((book, index) => (
                    <li
                        key={index}
                        className="p-4 border border-gray-200 rounded-md shadow-sm cursor-pointer hover:bg-gray-100"
                        onClick={() => viewBookDetails(book)}
                    >
                        <h2 className="text-xl font-semibold text-gray-800">{book.title}</h2>
                        <p className="text-gray-600">by {book.author}</p>
                    </li>
                ))}
            </ul>

            {selectedBook && (
                <div className="mt-8 p-4 border border-gray-300 rounded-md">
                    <h2 className="text-2xl font-semibold mb-4">Book Details</h2>
                    <p><strong>Title:</strong> {selectedBook.title}</p>
                    <p><strong>Author:</strong> {selectedBook.author}</p>
                    <button
                        onClick={() => setIsEditing(true)}
                        className="mt-4 p-2 bg-yellow-500 text-white rounded-md"
                    >
                        Edit Book
                    </button>
                </div>
            )}
        </div>
    );
};

export default App;
