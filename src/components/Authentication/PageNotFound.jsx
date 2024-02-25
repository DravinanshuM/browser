import React from 'react';
import Lottie from 'lottie-react';
import NotFound  from '../../assets/Animation - 1708763978685.json';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  const style = {
    width: "72%",
    height: "auto",
  }
  return (
    <>
        <div className="container text-center">
          <Lottie animationData={NotFound} style={style} loop={true}/>
          <Link to='/' className='btn btn-primary btn-sm'>Go To Home</Link>
        </div>
       
    </>
  )
}

export default PageNotFound;