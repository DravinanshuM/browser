# code Help.
# browser code old.
```JAVASCRIPT
import React, { useState } from 'react';
import LOGO from '../assets/logo-2.png';
import { Link,  useNavigate} from 'react-router-dom';
import axios from 'axios';

const Browser = ({ setUserAuthentication }) => {

    const navigate = useNavigate();
    const name = localStorage.getItem('name');
    const email = localStorage.getItem('email');
    const [search, setSearch] = useState(null);
    const [searchData, setSearcData] = useState(null);

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

    const api_key = process.env.REACT_APP_GOOGLE_API_KEY;
    const id = process.env.REACT_APP_GOOGLE_SEARCH_ENGINE_ID;

    const SearchFunction = async () => {
        try {
            const result = await axios.get(`https://www.googleapis.com/customsearch/v1?key=${api_key}&cx=${id}&q=${search}`);
            // console.log(result);
            // console.log(result.data); 
            setSearcData(result.data);
            // console.log(result.data.items);
        } catch (error) {
            console.error("Error occurred:", error);
        }
    }

    const Search = () => {
        SearchFunction();
    }

    // for SearchHandle.
    const handleChange = (e) => {
        // console.log(e.target.value);
        setSearch(e.target.value);
    }

    return (
        <div className='container-fluid mt-5'>
            <div className='row'>
                <div className='col-lg-12 col-md-12 col-12 d-flex justify-content-end'>
                    <div className="dropdown">
                        <button className="btn btn-sm" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="fa-solid fa-bars text-white mx-2 fs-3"></i>
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
                            <i className="fa-solid fa-address-card text-white mx-2 fs-3"></i>
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
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={handleChange}/>
                        <button className="btn btn-outline-success" type="submit" onClick={Search}>Search</button>
                    </div>
                </div>
            </div>
            <div className='row'>
                <div className='col-lg-12 col-md-12 col-12'>
                    <hr style={{color: "white"}}/>
                    {searchData && (
                        <>
                            <h5 className='text-white text-center'>
                                {searchData ? `${searchData.context.title.toUpperCase()}, About ${searchData.searchInformation.formattedTotalResults} Results (${searchData.searchInformation.formattedSearchTime} seconds)` : ''}
                            </h5>
                            <div className='container mt-4'>
                                {searchData.items.map((item, index) => (
                                    <div className='card mb-3' key={index}>
                                        <div className='card-body bg-transparent'>
                                            <h5 className='card-title'>
                                                <Link to={item.formattedUrl} className='text-decoration-none text-dark fs-5'>{item.displayLink}</Link>
                                            </h5>
                                            <p className='card-text'>{item.htmlSnippet}</p>
                                            <p className='card-text font-weight-bold'>{item.htmlTitle}</p>
                                            <Link to={item.link} className='card-link'>{item.link}</Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Browser;

```