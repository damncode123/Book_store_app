import { Link } from 'react-router-dom'
import React from 'react'
import { BsArrowLeft } from 'react-icons/bs'
const ButtonBack = () => {
  return (
    <div className='flex'>
      <Link to="/" className='bg-sky-800 text-white px-4 py-1 rounded-lg w-fit'>
        <BsArrowLeft className='text-3xl'/>
      </Link>
    </div>
  )
}

export default ButtonBack;
