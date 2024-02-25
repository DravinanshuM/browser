import React, { useState, useRef } from 'react';
import './Registration.css';
import { Link, useNavigate } from 'react-router-dom'; 
import { showMessage } from './ImpFunctions';

const Registration = ({ registrationForm }) => {

  const navigate = useNavigate();

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const cpasswordRef = useRef();

  const [formData, setFormData] = useState({
    name:'',
    email:'',
    password:'',
    cpassword:''
  });


  // for get input value.
  const handleChange = (e) => {
    const { name, value } = e.target;
  
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };
  

  // for when we submit data.
  const submitHandler = (e) => {
    e.preventDefault();

    if (formData.name.trim() === "") {
        nameRef.current.focus();
        nameRef.current.style.border = '2px solid red';
        showMessage("Please Enter Your Name");
        return;
    } else {
        nameRef.current.blur();
        nameRef.current.style.border = '';
    }

    if (formData.email.trim() === "") {
        emailRef.current.focus();
        emailRef.current.style.border = "2px solid red";
        showMessage("Please Enter Your Email");
        return;
    } else {
        emailRef.current.blur();
        emailRef.current.style.border = '';
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
        emailRef.current.focus();
        emailRef.current.style.border = "2px solid red";
        showMessage('Please enter a valid email address');
        return;
    } else {
        emailRef.current.blur();
        emailRef.current.style.border = '';
    }

    if (formData.password.trim() === "") {
        passwordRef.current.focus();
        passwordRef.current.style.border = "2px solid red";
        showMessage("please enter your password");
        return;
    } else {
        passwordRef.current.blur();
        passwordRef.current.style.border = "";
    }

    if (formData.password.trim() !== formData.cpassword.trim()) {
        cpasswordRef.current.focus();
        cpasswordRef.current.style.border = "2px solid red";
        showMessage('Passwords do not match', 'danger');
        return;
    } else {
        cpasswordRef.current.blur();
        cpasswordRef.current.style.border = "";
    }

    // // localstorage set items.
    // const newUser = {
    //   name: formData.name,
    //   email: formData.email,
    //   password: formData.password,
    // };

    // //  Get existing users data from localStorage.
    // const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

    //  // Add the new user to the existing users array
    //  existingUsers.push(newUser.email);

    //   // Save the updated users array back to localStorage
    // localStorage.setItem('users', JSON.stringify(existingUsers));


    // 2.0 localstorage.
    const newUser = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    };
    
    // Convert the newUser object to a JSON string
    const newUserJSON = JSON.stringify(newUser);
    
    // Use the email as the key to store the user data in localStorage
    localStorage.setItem(newUser.email, newUserJSON);
    
    // Clear the form fields or reset the formData state if needed
    setFormData({
      name: '',
      email: '',
      password: '',
      cpassword: ''
  });

  // Redirect or show a success message to the user
  // console.log("formData", formData);
  registrationForm(formData);
  navigate("/login"); 
}

  return (
      <div className='container mt-3 mb-5'>
         <div className='row mb-3'>
            <div className='col-lg-12 col-md-12 col-12 text-center'>
                <h2 className='text-white'>
                   <span className="badge text-bg-secondary mx-3 fs-2">OpenBrowser</span>
                </h2>
                <p className='text-white fs-6'>This is a Search Engine openBrowser</p>
            </div>
         </div>
         <div className='row '>
            <div className='col-lg-6 col-md-4 col-12'>
              <div id="box"></div>
            </div>
            <div className='col-lg-6 col-md-8 col-12 custom p-4'>
              <form onSubmit={submitHandler}>
                <h3 className='text-center'>User Registration</h3>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input type="text" className="form-control shadow-none" id="name" name="name" nmaria-describedby="nameHelp" placeholder='Enter Name' onChange={handleChange} ref={nameRef}/>
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input type="email" className="form-control shadow-none" id="email" name="email" aria-describedby="emailHelp" placeholder='example@gmail.com' onChange={handleChange} ref={emailRef}/>
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input type="password" className="form-control shadow-none" id="password" name="password" aria-describedby="passwordHelp" placeholder='********' onChange={handleChange} ref={passwordRef}/>
                </div>
                <div className="mb-3">
                  <label htmlFor="cpasword" className="form-label">Confirm Password</label>
                  <input type="password" className="form-control shadow-none" id="cpassword" name="cpassword" aria-describedby="cpasswordHelp" placeholder='re-password' onChange={handleChange} ref={cpasswordRef}/>
                </div>
                
                <div className='d-grid'>
                    <button type="submit" className="btn btn-primary">Submit</button>
                    <p className='mt-2'>if you have already account then 
                      <Link to='/login' className='mx-2'>login</Link>
                    </p>
                </div>
              </form>
            </div>
         </div>
      </div>
  )
}

export default Registration;