import React from 'react';
import NoRecordsFoundSvg from '../../assets/illustrations/no-records-found-1.svg';
import IContentStateImages from './IContentStateImages';

const NoRecordsFound: React.FC<IContentStateImages> = ({ height, width, imgHeight }) => {
  return (
    <>
      <div className='text-center' style={{ display: 'flex', height: height }}>
        <div className='text-center' style={{ margin: 'auto' }}>
          <img style={{ height: imgHeight, width: width }} src={NoRecordsFoundSvg} alt='Server Down' />
          <div className='mt-5'>Found nothing! Get the ball rolling and share...</div>
        </div>
      </div>
    </>
  );
};

export default NoRecordsFound;
