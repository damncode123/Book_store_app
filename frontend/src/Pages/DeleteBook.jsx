import React, { useState } from 'react';
import BackButton from '../Components/ButtonBack.jsx';
import Spinner from '../Components/Spinner.jsx';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteBook = async () => {
    try {
      setLoading(true);
      await axios.delete(`http://localhost:8000/bookroute/book/${id}`);
      setLoading(false);
      enqueueSnackbar('Book Deleted successfully', { variant: 'success' });
      // After performing some operation we will naviagte to this url
      navigate('/');
    } catch (error) {
      setLoading(false);
      enqueueSnackbar('Error', { variant: 'error' });
      console.error(error);
    }
  };
  
  
  return (
    <div className='p-4'>
      <h1 className='text-3xl my-4'>Delete Book</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
        <h3 className='text-2xl'>Are You Sure You want to delete this book?</h3>

        <button
          className='p-4 bg-red-600 text-white m-8 w-full'
          onClick={handleDeleteBook}
        >
          Yes, Delete it.
        </button>
      </div>
      <div className="mt-4">
      <BackButton/>
      </div>
    </div>
  );
};

export default DeleteBook;
