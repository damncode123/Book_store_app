import React from 'react'
import {Routes,Route} from 'react-router-dom'
import CreateBook from './Pages/CreateBooks.jsx'
import DeleteBook from './Pages/DeleteBook.jsx'
import EditBook from './Pages/EditBook.jsx'
import Home from './Pages/Home.jsx'
import ShowBook from './Pages/ShowBooks.jsx'
const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/books/create' element={<CreateBook/>}></Route>
      <Route path='/books/details/:id' element={<ShowBook/>}></Route>
      <Route path='/books/edit/:id' element={<EditBook/>}></Route>
      <Route path='/books/delete/:id' element={<DeleteBook/>}></Route>
    </Routes>
  )
}

export default App
