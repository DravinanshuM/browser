import React, { useState, useContext, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { MyContext } from '../../App'; 
import { showMessage } from './ImpFunctions';

const Login = ({ setUserAuthentication }) => {

  const navigate = useNavigate();
  const myEmail = useRef();
  const myPassword = useRef();

  const [loginFormData, setLoginFormData] = useState({
    email:"",
    password:""
  })
   

  const registrationData = useContext(MyContext);
  console.log(registrationData);

  useEffect(() => {
    // Check if user is already authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated) {
      setUserAuthentication(true);
      navigate('/browser');
    }
  }, [setUserAuthentication, navigate]);

  //9 for get the form Data.
  const handleChange = (e) => {
    // console.log(e.target.value);
    const { name, value } = e.target;

    setLoginFormData({
      ...loginFormData,
      [name]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(registrationData);


   // 1. validation check. 
    if(loginFormData.email.trim() === "") {
        showMessage("Please enter your email");
        myEmail.current.focus();
        myEmail.current.style.border = "2px solid red";
        return;
    } else if (!/\S+@\S+\.\S+/.test(loginFormData.email)) {
        showMessage("Please enter a valid email");
        myEmail.current.focus();
        myEmail.current.style.border = "2px solid red";
        return;
    } else {
      myEmail.current.blur();
      myEmail.current.style.border = "";
    }

    if(loginFormData.password.trim() === "") {
       showMessage("Please enter your password");
       myPassword.current.focus();
       myPassword.current.style.border = "2px solid red";
       return;
    } else {
      myPassword.current.blur();
      myPassword.current.style.border = "";
    }

    // Get the user data from localStorage using the email as the key
    const userData = localStorage.getItem(loginFormData.email);

    if(userData !== null) {
      // json string to convert JS OBJ.
      const user = JSON.parse(userData);

      // console.log(user);

      if(user.password === loginFormData.password) {
        localStorage.setItem('isAuthenticated', true);
        localStorage.setItem('email', loginFormData.email); 
        localStorage.setItem('name', user.name); 
        setUserAuthentication(true);
        navigate("/browser");
      } else {
        showMessage("Incorrect email or password");
      }

    } else {
      showMessage("User with provided email not found");
    }


    // // Retrieve users data from localStorage
    // const usersData = JSON.parse(localStorage.getItem('users'));

    // // Check if any user matches both email and password
    // const matchedUser = usersData.find(user => user.email === loginFormData.email && user.password === loginFormData.password);

    // if (matchedUser) {
    //   localStorage.setItem('isAuthenticated', true); // Store authentication state
    //   setUserAuthentication(true);
    //   navigate("/browser", {
    //     state: {
    //       email: loginFormData.email,
    //       name: matchedUser.name
    //     }
    //   });

    // } else {
    //   showMessage("Incorrect email or password");
    // }
}


  return (
     <div className='container mt-5'>
        <div className='row justify-content-center p-4'>
           <div className='col-lg-6 col-md-8 col-12 bg-white p-4 border rounded'>
              <form onSubmit={handleSubmit} >
                <h3 className='text-center'>Login</h3>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input type="email" className="form-control shadow-none" id="email" name='email' aria-describedby="emailHelp" placeholder='example@gmail.com' onChange={handleChange} ref={myEmail}/>
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input type="password" className="form-control shadow-none" id="password" name='password' aria-describedby="passwordHelp" placeholder='********' onChange={handleChange} ref={myPassword}/>
                </div>
                <div className='d-grid'>
                    <button type="submit" className="btn btn-primary">Submit</button>
                    <p className='mt-2'>if you have already account then 
                      <Link to='/' className='mx-2'>Registration</Link>
                    </p>
                </div>
              </form>
           </div>
        </div>
     </div>
  )
}

export default Login