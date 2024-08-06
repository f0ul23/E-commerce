import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Nav from './components/Nav'
import Bottom from './components/Bottom'
import SignUp from './components/SignUp'
import PrivateCom from './components/PrivateCom'
import Login from './components/Login'
import Addprod from './components/Addprod'
import Products from './components/Products'
import Update from './components/Update'
import Profile from './components/Profile'


function App() {
  return (
    <>
    <div className="App">
      <BrowserRouter>
      <Nav />
      <Routes>
        <Route element={<PrivateCom/>}>
        <Route path='/' element={<Products/>}/>
        <Route path='/addproduct' element={<Addprod/>}/>
        <Route path='/update/:id' element={<Update/>}/>
        <Route path='/logout' element={<h1>LogOut</h1>}/>
        <Route path='/profile' element={<Profile/>}/>
        </Route>
        <Route path='/signUp' element={<SignUp/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
      </BrowserRouter>
      <Bottom></Bottom>
    </div>
    </>
  )
}

export default App
