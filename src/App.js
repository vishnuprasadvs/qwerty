import React , {useState} from 'react';
import "./styles/css/app.css"
import { BrowserRouter, Routes, Route  ,Navigate , Outlet} from "react-router-dom";
import Signup from './pages/Signup';
import Nav from './pages/Nav';
import Login from './pages/Login';
import Homepage from './pages/Homepage';
import {auth} from "./credentials/firebase"
import Account from './pages/Account';
import ForgotPassword from './pages/ForgotPassword';
import {signInWithEmailAndPassword , onAuthStateChanged} from "firebase/auth"
import NewsAndUpdates from './pages/NewsAndUpdates';
import ResetPassword from './pages/ResetPassword';
import Players from './pages/Players';
import ContactUs from './pages/ContactUs';
import Footer from './components/Footer';
import ErrorPage from './pages/ErrorPage';
import Gallery from './pages/Gallery';
import NewPassword from './pages/NewPassword';
import SampleComponent from './components/SampleComponent';
import { userContext } from './credentials/NewContext';
import Press from './components/Press';
import PressDetail from './components/PressDetail';
import GoogleAuth from './components/GoogleAuth';
const App = () => {
  const [user, setuser] = useState({})

  onAuthStateChanged(auth , (currentUser)=>{
    setuser(currentUser)
  })
  return (
    <BrowserRouter>
      <div className='my-app'>
        <Nav />
        <userContext.Provider value={userContext}>
        <Routes>
          <Route  path="/" element={<Homepage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/players-page" element={<Players />} />
          <Route path="/edit-password" element={<NewPassword />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/login" element={ <ProtectedPage />} > 
            <Route path="/login" element={ <Login />}/>
          </Route>

          <Route path="/news-and-updates" element={<NewsAndUpdates />} />
          <Route path="/forgot-password" element={<ProtectedPage />} >
            <Route path="/forgot-password" element={<ForgotPassword />}  />

          </Route>

            <Route path="/press" element={<Press />}  />
            <Route path="/press-detail/:data" element={<PressDetail />}  />



          <Route path="/reset-password" element={ <ResetPassword />} />
          <Route path="/sample-comp" element={ <SampleComponent />} />
          <Route path="/google-auth" element={ <GoogleAuth />} />


          <Route path="/account" element={ <ProtectedRoute />} >
            <Route path="/account" element={ <Account />} />
          </Route>
          <Route path="*" element={ <ErrorPage />} />

        </Routes>
        </userContext.Provider>
        <Footer />
      </div>
    </BrowserRouter>
  )
  function ProtectedRoute(props){
  return user? <Outlet /> : <Navigate to={{pathname:'/login' , state: {from : props.path}}} />
  }
  function ProtectedPage(props){
    return user? <Navigate to={{pathname:'/account' , state: {from : props.path}}} /> :  <Outlet /> 
    }
}

export default App;
