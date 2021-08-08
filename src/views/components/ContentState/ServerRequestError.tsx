import React from 'react';
import ServerDownSvg from '../../assets/illustrations/server-down-1.svg';
import IContentStateImages from './IContentStateImages';

const ServerRequestError: React.FC<IContentStateImages> = ({ height, width, imgHeight }) => {
  return (
    <>
      <div className='text-center d-flex' style={{ height: height }}>
        <div className='text-center m-auto'>
          <img style={{ height: imgHeight, width: width }} src={ServerDownSvg} alt='Server Down' />
          <div data-testid='page-error-message' className='mt-5'>
            Something went wrong while communicating with the server, contact your friendly workplace
            engineer.
          </div>
        </div>
      </div>
    </>
  );
};

export default ServerRequestError;
