import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from './pages/Login';
import Home from "./pages/Home";
import AlbumPage from "./pages/AlbumPage";
import MainLayout from "./pages/MainLayout";

import useStore from "./store/useStore";
import { useEffect } from "react";
import AdminPage from "./pages/admin/AdminPage";
import {Toaster} from 'react-hot-toast'
import SearchPage from "./pages/SearchPage";
import ProfileUser from "./pages/ProfileUser";
function App() {
  const {fetchUser} = useStore()

  useEffect(()=>{
    fetchUser()
  },[fetchUser])
  return (
    <>
     <Router>
      <Routes>
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/admin" element={<AdminPage/>} />

      <Route element={<MainLayout/>}>
      <Route path="/" element={<Home/>} />
      <Route path="/albums/:albumId" element={<AlbumPage/>}></Route>
      <Route path="/search" element={<SearchPage/>} />
      <Route path="/profile/:userId" element={<ProfileUser/>}/>
      </Route>
      </Routes>
      </Router>
      <Toaster/>
    </>
  )
}

export default App
