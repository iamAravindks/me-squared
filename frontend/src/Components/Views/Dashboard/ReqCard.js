import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styles from './reqcard.module.css';
import { CloudinaryContext, Image } from 'cloudinary-react';
import { MentorContext } from '../../../context/mentorContext/Context';

const ReqCard = ({ follower }) => {
  const mentorContext = useContext(MentorContext);
  const { acceptFollowRequests, rejectFollowRequests } = mentorContext;
  const handleAcceptReq = () => {
    acceptFollowRequests(follower._id);
    window.location.reload();
  };
  const handleRejectReq = () => {
    rejectFollowRequests(follower._id);
  }

  return (
    <div className={styles.container}>
      <div className={styles.reqCard}>
        <Link className={styles.menteeInfo} to={`/mentees/${follower._id}`}>
          <div className={styles.menteeInfo}>
            <CloudinaryContext cloudName="dlgosw3g3">
              <div className={styles.profImg}>
                <Image publicId={follower.profileImg} width="50" />
              </div>
            </CloudinaryContext>
            <div className={styles.flwrName}><p>{follower.name}</p></div>
          </div>
        </Link>
        <div className={styles.actionArea}>
        <div className={styles.reject} onClick={handleRejectReq}>
            <p>reject</p>
          </div>
          <div className={styles.accept} onClick={handleAcceptReq}>
            <p>accept</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReqCard;
