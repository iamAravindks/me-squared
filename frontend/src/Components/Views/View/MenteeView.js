import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ReqCard from "../Dashboard/ReqCard";
import { MenteeContext } from "../../../context/menteeContext/MenteeContext";
import { CloudinaryContext, Image } from "cloudinary-react";
import styles from "./menteeView.module.css";
import { v1 as uuid } from "uuid";
import { stringAvatar } from "../../../utils/utils";

const MenteeView = () => {
  const {userID} = useParams();
  const { getMenteeView, menteeState } =
    useContext(MenteeContext);

  const { menteeData, following } = menteeState;
  useEffect(() => {
    getMenteeView(userID);
  }, []);
console.log(menteeData.following);
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
  if (menteeData)
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
                  <Image publicId={menteeData.profileImg} width="50" />
                </div>
              </CloudinaryContext>
              <h3>{menteeData.name}</h3>
              <h4>{menteeData.designation}</h4>
              <p>
              <i className="fa-solid fa-envelope" style={{marginRight:'5px'}}></i>
                {menteeData.email}
              </p>
            </div>

            {skills && (
              <div className={`${styles.skillsContainer} ${styles.tabs}`}>
                  <h4
                    style={{
                      borderColor: stringAvatar(menteeData.skillLooksFor),
                      color: stringAvatar(menteeData.skillLooksFor),
                    }}
                    key={uuid()}
                  >
                    {menteeData.skillLooksFor}
                  </h4>
              </div>
            )}
            {about && (
              <div className={`${styles.aboutContainer} ${styles.tabs}`}>
                <p>{menteeData.about}</p>
              </div>
            )}
            {connect && (
              <div className={`${styles.connectContainer} ${styles.tabs}`}>
                <div className={styles.connectTxt}>
                  <p>
                    Studying in: {menteeData.yearNdClass} <br />
                    {menteeData.name} {menteeData.respondIn}
                  </p>
                </div>

                <div className={styles.socialBtns}>
                  <a
                    href={menteeData.socialLinks.facebook}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className="fa-brands fa-facebook-f"></i>
                  </a>
                  <a
                    href={menteeData.socialLinks.twitter}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className="fa-brands fa-twitter"></i>
                  </a>
                  <a
                    href={menteeData.socialLinks.github}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className="fa-brands fa-github"></i>
                  </a>
                  <a
                    href={menteeData.socialLinks.instagram}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className="fa-brands fa-instagram"></i>
                  </a>
                  <p>
                    <i className="fa-brands fa-whatsapp"></i>{" "}
                    {menteeData.watNum}
                  </p>
                </div>
              </div>
            )}
            {followersTab &&<div className={`${styles.followContainer} ${styles.tabs}`}>
                            { following.map(follower => <Link to={`/browsementor/${follower._id}`} style={{ textDecoration: "none", color: "black" }} key={uuid()}><h4><CloudinaryContext cloudName="dlgosw3g3">
                            <div className={styles.followProfImg}>
                                <Image publicId={follower.profileImg} width="50"  />
                            </div>
                        </CloudinaryContext> {follower.name}</h4></Link>)}
                        </div>}
          </div>
        </div>
      </div>
    );
};

export default MenteeView;
