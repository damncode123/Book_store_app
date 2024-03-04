import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Spinner from "../Components/Spinner.jsx";
import BackButton from "../Components/ButtonBack.jsx";
const ShowBooks = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        setError("");
        const response = await axios.get(
          `http://localhost:8000/bookroute/book/${id}`
        );
        // single data is present so only [ response.data ]
        setBook(response.data);
      } catch (err) {
        console.error("Error fetching data from API:", err);
        setError("Unable to fetch the data from the API");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div className="p-4">
      <h1 className="text-3xl my-4">Show Book</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4">
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray=500'>Id</span>
            <span>{book._id}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray=500'>Title</span>
            <span>{book.title}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray=500'>Author</span>
            <span>{book.author}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray=500'>Publish Year</span>
            <span>{book.publishYear}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray=500'>Create time</span>
            <span>{new Date(book.createdAt).toString()}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray=500'>Last Updated Time</span>
            <span>{new Date(book.updatedAt).toString()}</span>
          </div>
        </div>
      )}
      <div className="mt-4">
      <BackButton/>
      </div>
    </div>
  );
};

export default ShowBooks; 
