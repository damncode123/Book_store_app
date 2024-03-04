import React, { useState } from 'react';
import Spinner from '../Components/Spinner.jsx';
import BookTable from '../Components/Home/BookTable.jsx';
import BookCard from '../Components/Home/BookCard.jsx';

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState('table');
  return (
    <div className='p-4'>
      <div className='flex justify-center items-center gap-x-4'>
        <button
          className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'
          onClick={() => setShowType('table')}
        >
          Table
        </button>
        <button
          className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'
          onClick={() => setShowType('card')}
        >
          Card
        </button>
      </div>
      {loading ? (
        <Spinner />
      ) : showType === 'table' ? (
        <BookTable />
      ) : (
        <BookCard/>
      )}
    </div>
  );
};

export default Home;

