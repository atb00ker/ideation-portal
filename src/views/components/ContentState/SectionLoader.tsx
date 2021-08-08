import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import './loaders.scss';

const SectionLoader: React.FC<{ height?: string; width?: string }> = ({ height, width }) => {
  return (
    <div className='position-relative' style={{ height: height, width: width }}>
      <Spinner className='round-loader-center position-absolute' animation='border' role='status'>
        <span data-testid='section-loading' className='visually-hidden'>
          Loading...
        </span>
      </Spinner>
    </div>
  );
};

export default SectionLoader;
