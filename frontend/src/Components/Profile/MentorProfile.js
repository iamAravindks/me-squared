/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useContext, useEffect } from 'react';

import { MentorContext } from '../../context/mentorContext/Context';

import ReqCard from './ReqCard'

import styles from './mentorProfile.module.css';

const MentorProfile = () => {
  const { getFollowRequests, getProfileMentor, mentorsState } =
    useContext(MentorContext);

  const { userMentor, followReqs } = mentorsState;

  console.log(followReqs)
  useEffect(() => {
    getProfileMentor();
    getFollowRequests();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.banner}>
        <p></p>
      </div>

      <div className={styles.bContainer}>
        <div className={styles.left}>
          <div className={styles.profContainer}>
            <div className={styles.profCard}>
              <img src={userMentor.profileImage} alt="blaah" />
              <h2>{userMentor.name}</h2>
              <p>{userMentor.designation}</p>
            </div>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.reqContainer}>
          {/* {followReqs && followReqs[0].name} */}
          {followReqs !== [] && 
            followReqs.map(follower=> <ReqCard follower={follower} />)
          }
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorProfile;
