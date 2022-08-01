import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ReqCard from "./ReqCard";
import { MenteeContext } from "../../context/menteeContext/MenteeContext";
import { CloudinaryContext, Image } from "cloudinary-react";
import styles from "./mentorProfile.module.css";
import { v1 as uuid } from "uuid";
import { stringAvatar } from "../../utils/utils";

const MentorProfile = () => {
  const { getProfileMentee, menteeState } =
    useContext(MenteeContext);

  const { userMentee, followReqs } = menteeState;
  console.log(followReqs);
  useEffect(() => {
    getProfileMentee();
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
  if (userMentee)
    return (
      <div className={styles.viewContainer}>
        <div className={styles.backgroundColor}></div>
        <div className={styles.profile}>
          <div className={styles.tabsContainer}>
            <div className={styles.menuBar}>
              <button autoFocus onClick={displayAbout}>
                About
              </button>
              <button onClick={displaySkills}>Interests</button>
              <button onClick={displayConnect}>Connect</button>
            </div>
            <div className={styles.profileCard}>
              <CloudinaryContext cloudName="dlgosw3g3">
                <div className={styles.profImg}>
                  <Image publicId={userMentee.profileImg} width="50" />
                </div>
              </CloudinaryContext>
              <h3>{userMentee.name}</h3>
              <h4>{userMentee.designation}</h4>
              <p>
              <i className="fa-solid fa-envelope" style={{marginRight:'5px'}}></i>
                {userMentee.email}
              </p>
            </div>

            {skills && (
              <div className={`${styles.skillsContainer} ${styles.tabs}`}>
                  <h4
                    style={{
                      borderColor: stringAvatar(userMentee.skillLooksFor),
                      color: stringAvatar(userMentee.skillLooksFor),
                    }}
                    key={uuid()}
                  >
                    {userMentee.skillLooksFor}
                  </h4>
              </div>
            )}
            {about && (
              <div className={`${styles.aboutContainer} ${styles.tabs}`}>
                <p>{userMentee.about}</p>
              </div>
            )}
            {connect && (
              <div className={`${styles.connectContainer} ${styles.tabs}`}>
                <div className={styles.connectTxt}>
                  <p>
                    Studying in: {userMentee.yearNdClass} <br />
                    {userMentee.name} {userMentee.respondIn}
                  </p>
                </div>

                <div className={styles.socialBtns}>
                  <a
                    href={userMentee.socialLinks.facebook}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className="fa-brands fa-facebook-f"></i>
                  </a>
                  <a
                    href={userMentee.socialLinks.twitter}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className="fa-brands fa-twitter"></i>
                  </a>
                  <a
                    href={userMentee.socialLinks.github}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className="fa-brands fa-github"></i>
                  </a>
                  <a
                    href={userMentee.socialLinks.instagram}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className="fa-brands fa-instagram"></i>
                  </a>
                  <p>
                    <i className="fa-brands fa-whatsapp"></i>{" "}
                    {userMentee.watNum}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
};

export default MentorProfile;
