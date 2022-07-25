import React from 'react';
import styles from './reqcard.module.css';
import { CloudinaryContext, Image } from 'cloudinary-react';

const ReqCard = ({ follower }) => {
  return (
    <div className={styles.container}>
      <a href={'/mentees/' + follower._id}>
        <div className={styles.reqCard}>
        <CloudinaryContext cloudName="dlgosw3g3">
          <div className={styles.profImg}>
            <Image publicId={follower.profileImg} width="50" />
          </div>
        </CloudinaryContext>
        {/* <img src={follower.profileImg} alt="blaah" /> */}
        <p>{follower.name}</p>
        </div>
      </a>
      </div>
    
  );
};

export default ReqCard;
