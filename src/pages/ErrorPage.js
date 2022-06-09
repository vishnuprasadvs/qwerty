import React from 'react';
import { Link } from 'react-router-dom';
const ErrorPage = () => {
  return (
    <section className='page_not_found'>
      <div className="container">
        <div className="pageNot_found_wrap">
          <span>404</span>
          <h2>Oops!</h2>
          <p>The page you requested does not exist. Navigate back to Homepage</p>
          <Link to='/' className='btn btn-red'>Homepage</Link>
        </div>
      </div>
    </section>
  )
};

export default ErrorPage;
