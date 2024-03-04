import React, { useState, useEffect } from "react";
import BackButton from "../Components/ButtonBack";
import Spinner from "../Components/Spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const EditBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  // withe help of get request first we accessing the data from the database by the unique id and then making the value of all the  input equal to e.target.value; 
  useEffect(() => {
    const edit = async () => {
      try {
        setLoading(true);
        setError('');
        const res = await axios.get(`http://localhost:8000/bookroute/book/${id}`);
        if (!res) {
          console.log("No data in response fix it");
          setError("No data in response fix it");
        } else {
          setTitle(res.data.title);
          setAuthor(res.data.author);
          setPublishYear(res.data.publishYear);
        }
      } catch (err) {
        console.error(err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    edit();
  }, [id]);

  const handleUpdateBook = async () => {
    try {
      setLoading(true);
      if (!title || !author || !publishYear) {
        console.log("All the required information is not present");
        setError("All the required information is not present");
        setLoading(false);
      } else {
        setError("");
        // put is used to update : -
        await axios.put(`http://localhost:8000/bookroute/book/${id}`, {
          title,
          author,
          publishYear,
        });
        setLoading(false);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      setError(error.message || "An error occurred");
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl my-4">Edit Book</h1>
      {error && <div className="text-red-600">Error: {error}</div>}
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2  w-full "
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Publish Year</label>
          <input
            type="number"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2  w-full "
          />
        </div>
        <button className="p-2 bg-sky-300 m-8" onClick={handleUpdateBook}>
          Save
        </button>
      </div>
      <div className="mt-4">
      <BackButton/>
      </div>
    </div>
  );
};

export default EditBook;
