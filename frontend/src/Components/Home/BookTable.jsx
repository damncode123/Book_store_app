import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { MdOutlineDelete, MdOutlineAddBox } from 'react-icons/md';

const BookTable = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        setError('');
        const response = await axios.get('http://localhost:8000/bookroute/book');
        setBooks(response.data.data);
      } catch (err) {
        console.error('Error fetching data from API:', err);
        setError('Unable to fetch the data from the API');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className='p-4'>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl my-8'>Books List</h1>
        <Link to='/books/create'>
          <MdOutlineAddBox className='text-sky-800 text-4xl' />
        </Link>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <table className='w-full border-separate border-spacing-2'>
          <thead>
            <tr>
              <th className='border border-slate-600 rounded-md'>No</th>
              <th className='border border-slate-600 rounded-md'>Title</th>
              <th className='border border-slate-600 rounded-md max-md:hidden'>Author</th>
              <th className='border border-slate-600 rounded-md max-md:hidden'>Publish Year</th>
              <th className='border border-slate-600 rounded-md'>Operations</th>
            </tr>
          </thead>
          <tbody>
            {books.length === 0 ? (
              <tr>
                <td colSpan='5' className='text-center'>
                  No books available.
                </td>
              </tr>
            ) : (
              books.map((book, index) => (
                <tr key={book._id} className='h-8'>
                  <td className='border border-slate-700 rounded-md text-center'>
                    {index + 1}
                  </td>
                  <td className='border border-slate-700 rounded-md text-center'>
                    {book.title}
                  </td>
                  <td className='border border-slate-700 rounded-md text-center'>
                    {book.author}
                  </td>
                  <td className='border border-slate-700 rounded-md text-center'>
                    {book.publishYear}
                  </td>
                  <td className='border border-slate-700 rounded-md text-center'>
                    <div className='flex justify-center gap-x-4'>
                      <Link to={`/books/details/${book._id}`}>
                        <BsInfoCircle className='text-2xl text-green-800' />
                      </Link>
                      <Link to={`/books/edit/${book._id}`}>
                        <AiOutlineEdit className='text-2xl text-green-800' />
                      </Link>
                      <Link to={`/books/delete/${book._id}`}>
                        <MdOutlineDelete className='text-2xl text-green-800' />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BookTable;
