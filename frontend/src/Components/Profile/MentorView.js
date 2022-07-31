import React, { useContext, useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { MentorContext } from '../../context/mentorContext/Context'
import { CloudinaryContext, Image } from "cloudinary-react";
import styles from './mentorView.module.css'
import { v1 as uuid } from 'uuid'

const MentorView = () => {
    const { userID } = useParams()
    const { mentorsState, getMentor } = useContext(MentorContext)
    const { mentorData } = mentorsState
    const { mentor } = mentorData
    useEffect(() => {
        getMentor(userID)
    },[])

    const [tab,setTab]=useState({
        about:true,
        skills:false,
        connect:false,
        followersTab: false
    })

    const displayAbout = () => {
        setTab({
            about: true,
            skills: false,
            connect: false,
            followersTab: false
        })
    }

    const displaySkills = () => {
        setTab({
            about: false,
            skills: true,
            connect: false,
            followersTab: false
        })
    }

    const displayConnect = () => {
        setTab({
            about: false,
            skills: false,
            connect: true,
            followersTab: false
        })
    }

    const displayFollowers = () => {
        setTab({
            about: false,
            skills: false,
            connect: false,
            followersTab: true
        })
    }

    const { about, skills, connect, followersTab } = tab
    if(mentor)
    return (
        <div className={styles.viewContainer}>
            <div className={styles.backgroundColor}></div>
            { mentorData && mentorData.following ?
                <>
                    <div className={styles.menuBar}>
                        <button autoFocus onClick={displayAbout}>About</button>
                        <button onClick={displaySkills}>Skills</button>
                        <button onClick={displayConnect}>Connect</button>
                        <button onClick={displayFollowers}>Followers</button>
                    </div>
                    <div className={styles.profileCard}>
                        <CloudinaryContext cloudName="dlgosw3g3" >
                            <div className={styles.profImg}>
                                <Image publicId={mentor.profileImg} width="50"  />
                            </div>
                        </CloudinaryContext>
                        <h3>{mentor.name}</h3>
                        <h4>{mentor.designation}</h4>
                        <p><i className="fa-solid fa-users"></i> {mentorData.followers.length !== 1 ? `${mentorData.followers.length} Followers` :  '1 Follower'}</p>
                    </div>
                    <div className={styles.contentContainer}>
                        <div className={styles.skillsContainer}>{skills && mentor.tags.map(tag => <h4>{tag}</h4>)}</div>
                        <div className={styles.aboutContainer}>
                            {about && <p>{mentor.about}</p>}
                        </div>
                        { connect && 
                            <div className={styles.connectContainer}>
                                <p>Studying in: {mentor.yearNdClass}</p>
                                <p>{mentor.name} {mentor.respondIn}</p>
                                <a href={mentor.socialLinks.facebook} target='_blank' rel='noreferrer'><i className="fa-brands fa-facebook-f"></i></a>
                                <a href={mentor.socialLinks.twitter} target='_blank' rel='noreferrer'><i className="fa-brands fa-twitter"></i></a>
                                <a href={mentor.socialLinks.github} target='_blank' rel='noreferrer'><i className="fa-brands fa-github"></i></a>
                                <a href={mentor.socialLinks.instagram} target='_blank' rel='noreferrer'><i className="fa-brands fa-instagram"></i></a>
                                <p><i className="fa-brands fa-whatsapp"></i> {mentor.watNum}</p>
                            </div>
                        }
                        <div className={styles.followContainer}>
                            {followersTab && mentorData.followers.map(follower => <Link to={`/browsementor/${userID}/${follower._id}`} style={{ textDecoration: "none", color: "black" }}><p>{follower.name}</p></Link>)}
                        </div>
                    </div>
                </> : 
                <>
                    <div className={styles.menuBar}>
                        <button autoFocus onClick={displayAbout}>About</button>
                        <button onClick={displaySkills}>Skills</button>
                    </div>
                    <div className={styles.profileCard}>
                        <CloudinaryContext cloudName="dlgosw3g3" >
                            <div className={styles.profImg}>
                                <Image publicId={mentor.profileImg} width="50"  />
                            </div>
                        </CloudinaryContext>
                        <h3>{mentor.name}</h3>
                        <h4>{mentor.designation}</h4>
                        <p><i className="fa-solid fa-users"></i> {mentorData.followersCount !== 1 ? `${mentorData.followersCount} Followers` :  '1 Follower'}</p>
                    </div>
                    <div className={styles.contentContainer}>
                        <div className={styles.skillsContainer}>{skills && mentor.tags.map(tag => <h4 key={uuid()}>{tag}</h4>)}</div>
                        <div className={styles.aboutContainer}>
                            {about && <p>{mentor.about}</p>}
                        </div>
                    </div>
                </>
            }
        </div>
    )
}

export default MentorView