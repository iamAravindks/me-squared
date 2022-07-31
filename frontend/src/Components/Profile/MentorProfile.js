/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext, useEffect } from 'react';
import { CloudinaryContext, Image } from 'cloudinary-react';


import { MentorContext } from '../../context/mentorContext/Context';

import ReqCard from './ReqCard';

import styles from './mentorProfile.module.css';

const ReadMore = ({ children }) => {
  const text = children || [];
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  return (
    <p className="text">
      {isReadMore ? text.slice(0, 150) : text}
      <span onClick={toggleReadMore} className="read-or-hide">
        {isReadMore ? '...read more' : ' show less'}
      </span>
    </p>
  );
};

const MentorProfile = () => {
  const { getFollowRequests, getProfileMentor, mentorsState } =
    useContext(MentorContext);

  const { userMentor, followReqs } = mentorsState;

  console.log(followReqs);
  useEffect(() => {
    getProfileMentor();
    getFollowRequests();
  }, []);

  if (userMentor)
    return (
      <div className={styles.container}>
        <div className={styles.banner}>
          <p></p>
        </div>

        <div className={styles.bContainer}>
          <div className={styles.left}>
            <div className={styles.profContainer}>
              <div className={styles.profCard}>
                <CloudinaryContext cloudName="dlgosw3g3">
                  <Image
                    publicId={userMentor.profileImg}
                    class={userMentor.profileImage}
                    alt="blaah"
                  />
                </CloudinaryContext>
                <h2>{userMentor.name}</h2>
                <p>{userMentor.designation}</p>
              </div>
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles.profileTag}>
              <div className={styles.about}>
                <h2>About</h2>
                <p>
                  <ReadMore class="text">
                    {userMentor.about !== [] && userMentor.about}
                  </ReadMore>
                </p>
              </div>
            </div>
            <div className={styles.reqContainer}>
              {followReqs.length > 0 &&
                followReqs.map((follower) => <ReqCard follower={follower} />)}
            </div>
          </div>
        </div>
      </div>
    );
};

export default MentorProfile;
