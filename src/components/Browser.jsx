import React, { useState, useEffect } from 'react';
import LOGO from '../assets/logo-2.png';
import { Link,  useNavigate} from 'react-router-dom';

const Browser = ({ setUserAuthentication, ParentQuery }) => {

    const navigate = useNavigate();
    const name = localStorage.getItem('name');
    const email = localStorage.getItem('email');
    const [inputData, setInputData] = useState(null);

    const handleLogout = () => {
        // Remove isAuthenticated flag from localStorage
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('email');
        localStorage.removeItem('name');
        // Set user authentication state to false
        setUserAuthentication(false);
        // Navigate to the login page or any other appropriate page
        navigate('/login');
    };

    useEffect(() => {
        // Check if user is already authenticated
        const isAuthenticated = localStorage.getItem('isAuthenticated');
        if (isAuthenticated) {
          setUserAuthentication(true);
          navigate('/browser');
        }
      }, [setUserAuthentication, navigate]);

    // for input handle change.
    const handleChange = (e) => {
        setInputData(e.target.value);
    }

    // for click function.
    const handleClick = () => {
        ParentQuery(inputData);
        if(inputData) {
            navigate('/search');
        }
    }

    return (
        <div className='container-fluid mt-5'>
            <div className='row'>
                <div className='col-lg-12 col-md-12 col-12 d-flex justify-content-end'>
                    <div className="dropdown">
                        <button className="btn btn-sm" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="fa-solid fa-bars text-dark mx-2 fs-3"></i>
                        </button>
                        <ul className="dropdown-menu">
                            <li>
                                <Link className="dropdown-item" to="https://translator-dravinanshu.netlify.app/">
                                    <i className="fa-solid fa-globe"></i> Translator
                                </Link>
                            </li>
                            <li>
                                <Link className="dropdown-item" to="https://weather-dravinanshu.netlify.app">
                                    <i className="fa-solid fa-cloud"></i> Weather
                                </Link>
                            </li>
                            <li>
                                <Link className="dropdown-item" to="https://dravinanshu-currency.netlify.app/">
                                    <i className="fa-solid fa-indian-rupee-sign"></i> Currency Converter
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="dropdown">
                        <button className="btn btn-sm" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="fa-solid fa-address-card text-dark mx-2 fs-3"></i>
                        </button>
                        <ul className="dropdown-menu">
                            <li className='p-2'>{name}</li>
                            <li className='p-2'>{email}</li>
                            <li>
                                <button className='btn btn-link mx-2' onClick={handleLogout}>Log Out</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className='row'>
                <div className='col-lg-12 col-md-12 col-12 text-center mb-3 mt-5'>
                    <div>
                        <img src={LOGO} alt='error' />
                    </div>
                </div>
            </div>
            <div className='row d-flex justify-content-center'>
                <div className='col-lg-6 col-md-6 col-12'>
                    <div className='input-group'> 
                        <input className="form-control me-2 shadow-none" type="search" placeholder="Search" aria-label="Search" onChange={handleChange}/>
                        <button className="btn btn-success" type="submit" onClick={handleClick}>Search</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Browser;
