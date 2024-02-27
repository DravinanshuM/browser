import React, { useEffect, useState } from 'react';
import LOGO from '../assets/logo-2.png';
import OPEN from '../assets/open.png';
import './style.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Search = ({searchQuery, setUserAuthentication}) => {
  const [inputSearch, setInputSearch] = useState(searchQuery);
  const navigate = useNavigate();
  const name = localStorage.getItem('name');
  const email = localStorage.getItem('email');
  const [aboutData, setAboutData] = useState(null);
  const api_key = process.env.REACT_APP_GOOGLE_API_KEY;
  const id = process.env.REACT_APP_GOOGLE_SEARCH_ENGINE_ID;

  // for handleChange.
  const handleChange = (e) => {
    setInputSearch(e.target.value);
  }

  // handle logout.
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


// for when we click search button get data.
const searchFunction = async() => {
    try {
     const result =  await axios.get(`https://www.googleapis.com/customsearch/v1?key=${api_key}&cx=${id}&q=${inputSearch}`);
     console.log(result.data);
     setAboutData(result.data);
    //  console.log(result)
    } catch (error) {
      console.log("ERROR :: ", error.message);
    }
}

const Search = () => {
  searchFunction();
}

// useEffcet.
useEffect(() => {
  if (searchQuery) {
    axios.get(`https://www.googleapis.com/customsearch/v1?key=${api_key}&cx=${id}&q=${searchQuery}`)
      .then((response) => {
        console.log(response.data);
        setAboutData(response.data);
      })
      .catch((error) => {
        console.log("ERROR :: ", error.message);
      });
  }
}, [searchQuery, api_key, id]);

    

  return (
    <>
      <div className='container-fluid'>
        <div className='row align-items-center shadow-sm p-4'>
          <div className="col-lg-2 col-md-2 col-12 text-center align-items-center mb-3">
            <img src={LOGO} alt='Logo' style={{ maxWidth: '100%', height: 'auto' }} />
          </div>
          <div className='col-lg-6 col-md-6 col-12 d-flex align-items-center mb-3'>
            <input className="form-control shadow-none px-2" type="search" placeholder="SEARCH" aria-label="Search" value={inputSearch} onChange={handleChange}/>
            <i className="fa-solid fa-magnifying-glass font-icons" onClick={Search}></i>
            <i className="fa-solid fa-microphone font-icons2"></i>
          </div>
          <div className='col-lg-4 col-md-4 col-12 text-end d-flex justify-content-end mb-3'>
              <div className="dropdown mx-2">
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
              <div className="dropdown mx-2">
                  <button className="btn btn-sm" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                      <i className="fa-solid fa-address-card text-dark mx-2 fs-3"></i>
                  </button>
                  <ul className="dropdown-menu mx-2">
                      <li className='p-2'>{name}</li>
                      <li className='p-2'>{email}</li>
                      <li>
                          <button className='btn btn-link mx-2' onClick={handleLogout}>Log Out</button>
                      </li>
                  </ul>
              </div>
          </div>
        </div>
        <div className='row text-center'>
          <div className='col-lg-8 col-md-8 col-12 p-4'>
            <p className='fs-6'> 
              {aboutData ? `${aboutData.context.title.toUpperCase()}, About ${aboutData.searchInformation.formattedTotalResults} Results (${aboutData.searchInformation.formattedSearchTime} seconds)` : ''}
            </p>
          </div>
        </div>
      </div>
      
      <div className='container'>
          <div className='row'>
              <div className="col-lg-8 col-md-8 col-12">
                {aboutData && (
                    <div className="search-result">
                        {aboutData.items.map((value, index)=>(
                           <div key={index} className='seperate-result'>
                               <div className="row align-items-center mb-2">
                                  <div className="col-lg-1 col-md-1 col-12">
                                      <img src={value.pagemap && value.pagemap.cse_image && value.pagemap.cse_image[0] && value.pagemap.cse_image[0].src ? value.pagemap && value.pagemap.cse_image && value.pagemap.cse_image[0] && value.pagemap.cse_image[0].src : OPEN} alt="National Portal of India" 
                                      className="result-thumbnail img-fluid rounded mx-2" />
                                  </div>
                                  <div className="col-lg-5 col-md-5 col-12">
                                      <div className="result-title">{value.title}</div>
                                      <Link to={value.formattedUrl} className="result-url text-decoration-none" target='_blank'>{value.displayLink}</Link>
                                  </div>
                               </div>
                              <div className="row">
                                  <div className="col-lg-12 col-md-12 col-12">
                                      <h5 className='text-justify'>
                                        <Link to={value.formattedUrl} target='_blank'>{value.formattedUrl}</Link>
                                        </h5>
                                  </div>
                                  <div className="col-lg-12 col-md-12 col-12">
                                      <p className="result-description">
                                          {value.snippet}
                                      </p>
                                  </div>
                              </div>
                           </div>
                        ))}
                    </div>
                )}  
              </div>
          </div>
      </div>
    </>
  )
}

export default Search;