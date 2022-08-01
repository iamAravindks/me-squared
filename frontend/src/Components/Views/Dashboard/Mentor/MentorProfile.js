import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ReqCard from "../ReqCard";
import { MentorContext } from "../../../../context/mentorContext/Context";
import { CloudinaryContext, Image } from "cloudinary-react";
import styles from "./mentorProfile.module.css";
import { v1 as uuid } from "uuid";
import { stringAvatar } from "../../../../utils/utils";

const MentorProfile = () => {
  const { getFollowRequests, getProfileMentor, mentorsState } =
    useContext(MentorContext);

  const { userMentor, followReqs } = mentorsState;
  console.log(followReqs);
  useEffect(() => {
    getProfileMentor();
    getFollowRequests();
  }, []);

  const [tab, setTab] = useState({
    about: true,
    skills: false,
    connect: false,
    followersTab: false,
  });

  const displayAbout = () => {
    setTab({
      about: true,
      skills: false,
      connect: false,
      followersTab: false,
    });
  };

  const displaySkills = () => {
    setTab({
      about: false,
      skills: true,
      connect: false,
      followersTab: false,
    });
  };

  const displayConnect = () => {
    setTab({
      about: false,
      skills: false,
      connect: true,
      followersTab: false,
    });
  };

  const displayFollowers = () => {
    setTab({
      about: false,
      skills: false,
      connect: false,
      followersTab: true,
    });
  };

  const { about, skills, connect, followersTab } = tab;
  if (userMentor)
    return (
      <div className={styles.viewContainer}>
        <div className={styles.backgroundColor}></div>
        <div className={styles.profile}>
          <div className={styles.tabsContainer}>
            <div className={styles.menuBar}>
              <button autoFocus onClick={displayAbout}>
                About
              </button>
              <button onClick={displaySkills}>Skills</button>
              <button onClick={displayConnect}>Connect</button>
            </div>
            <div className={styles.profileCard}>
              <CloudinaryContext cloudName="dlgosw3g3">
                <div className={styles.profImg}>
                  <Image publicId={userMentor.profileImg} width="50" />
                </div>
              </CloudinaryContext>
              <h3>{userMentor.name}</h3>
              <h4>{userMentor.designation}</h4>
              <p>
                <i className="fa-solid fa-users"></i>{" "}
                {userMentor.followers && userMentor.followers.length !== 1
                  ? `${userMentor.followers.length} Followers`
                  : "1 Follower"}
              </p>
            </div>

            {skills && (
              <div className={`${styles.skillsContainer} ${styles.tabs}`}>
                {userMentor.tags.map((tag) => (
                  <h4
                    style={{
                      borderColor: stringAvatar(tag),
                      color: stringAvatar(tag),
                    }}
                    key={uuid()}
                  >
                    {tag}
                  </h4>
                ))}
              </div>
            )}
            {about && (
              <div className={`${styles.aboutContainer} ${styles.tabs}`}>
                <p>{userMentor.about}</p>
              </div>
            )}
            {connect && (
              <div className={`${styles.connectContainer} ${styles.tabs}`}>
                <div className={styles.connectTxt}>
                  <p>
                    Studying in: {userMentor.yearNdClass} <br />
                    {userMentor.name} {userMentor.respondIn}
                  </p>
                </div>

                <div className={styles.socialBtns}>
                  <a
                    href={userMentor.socialLinks.facebook}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className="fa-brands fa-facebook-f"></i>
                  </a>
                  <a
                    href={userMentor.socialLinks.twitter}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className="fa-brands fa-twitter"></i>
                  </a>
                  <a
                    href={userMentor.socialLinks.github}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className="fa-brands fa-github"></i>
                  </a>
                  <a
                    href={userMentor.socialLinks.instagram}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className="fa-brands fa-instagram"></i>
                  </a>
                  <p>
                    <i className="fa-brands fa-whatsapp"></i>{" "}
                    {userMentor.watNum}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className={styles.rightBox}>
          <div className={styles.reqContainer}>
            {followReqs.length > 0 &&
              followReqs.map((follower) => <ReqCard follower={follower} />)}
          </div>
        </div>
      </div>
    );
};

export default MentorProfile;
