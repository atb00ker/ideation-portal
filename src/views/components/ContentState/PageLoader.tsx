import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import './loaders.scss';

const PageLoader: React.FC = () => {
  return (
    <div className='h-100 w-100 position-fixed'>
      <Spinner className='round-loader-center position-relative' animation='border' role='status'>
        <span data-testid='page-loading' className='visually-hidden'>
          Loading...
        </span>
      </Spinner>
    </div>
  );
};

export default PageLoader;
