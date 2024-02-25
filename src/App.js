import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Registration from './components/Authentication/Registration.jsx';
import Login from './components/Authentication/Login.jsx';
import PageNotFound from './components/Authentication/PageNotFound.jsx';
import Browser from './components/Browser.jsx';
import { useState, createContext } from 'react';

// Create context.
const MyContext = createContext();

function App() {
  const [registrationData, setRegistrationData] = useState('');
  const [userAuthentication, setUserAuthentication] = useState(false);
  
  // For registration data.
  const handleFromRegistration = (data) => {
      // console.log(data);
      setRegistrationData(data);
  }

  return (
    <BrowserRouter>
      <MyContext.Provider value={registrationData}>
        <Routes>
          <Route path="/" element={<Registration registrationForm={handleFromRegistration} />} />
          <Route path="/login" element={<Login setUserAuthentication={setUserAuthentication} />} /> 
          <Route path="/browser" element={userAuthentication ? <Browser setUserAuthentication={setUserAuthentication} /> : <Navigate to="/login" />} />
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
      </MyContext.Provider>
    </BrowserRouter>
  );
}

export default App;
export { MyContext };
