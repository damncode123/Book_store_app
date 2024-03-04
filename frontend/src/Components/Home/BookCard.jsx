import React,{useState,useEffect} from 'react';
import axios from 'axios';
import BookSingleCard from './BookSingleCard';

const BooksCard = () => {
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
    <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      {books.map((item) => (
        <BookSingleCard key={item._id} book={item} />
      ))}
    </div>
  );
};

export default BooksCard;