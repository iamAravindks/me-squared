import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { MentorContext } from '../../context/mentorContext/Context'
import { CloudinaryContext, Image } from "cloudinary-react";
import styles from './mentorView.module.css'

const MentorView = () => {
    const { userID } = useParams()
    const { mentorsState, getMentor } = useContext(MentorContext)
    const { mentor } = mentorsState
    useEffect(() => {
        getMentor(userID)
    },[])

    const [tab,setTab]=useState({
        about:true,
        skills:false,
        connect:false
    })

    const displayAbout = () => {
        setTab({
            about: true,
            skills: false,
            connect: false
        })
    }

    const displaySkills = () => {
        setTab({
            about: false,
            skills: true,
            connect: false
        })
    }

    const displayConnect = () => {
        setTab({
            about: false,
            skills: false,
            connect: true
        })
    }

    const { about, skills, connect } = tab

    return (
        <div className={styles.viewContainer}>
            <div className={styles.backgroundColor}></div>
            <div className={styles.menuBar}>
                <button autoFocus onClick={displayAbout}>About</button>
                <button onClick={displaySkills}>Skills</button>
                <button onClick={displayConnect}>Connect</button>
            </div>
            <div className={styles.profileCard}>
                <CloudinaryContext cloudName="dlgosw3g3" >
                    <div className={styles.profImg}>
                        <Image publicId={mentor.profileImg} width="50"  />
                    </div>
                </CloudinaryContext>
                <h3>{mentor.name}</h3>
                <h4>{mentor.designation}</h4>
                <p><i className="fa-solid fa-users"></i> {mentor.followersCount !== 1 ? `${mentor.followersCount} Followers` :  '1 Follower'}</p>
            </div>
            <div className={styles.contentContainer}>
                <div className={styles.skillsContainer}>{skills && mentor.tags.map(tag => <h4>{tag}</h4>)}</div>
                <div className={styles.aboutContainer}>
                    {about && <p>{mentor.about}</p>}
                </div>
                {connect && 
                    <div className={styles.connectContainer}>
                        <p>{mentor.name} {mentor.respondIn}</p>
                        <a href={mentor.socialLinks.facebook} target='_blank'><i className="fa-brands fa-facebook-f"></i></a>
                        <a href={mentor.socialLinks.twitter} target='_blank'><i className="fa-brands fa-twitter"></i></a>
                        <a href={mentor.socialLinks.github} target='_blank'><i className="fa-brands fa-github"></i></a>
                        <a href={mentor.socialLinks.instagram} target='_blank'><i className="fa-brands fa-instagram"></i></a>
                        <p><i className="fa-brands fa-whatsapp"></i> {mentor.watNum}</p>
                    </div>
                }
            </div>
        </div>
    )
}

export default MentorView