import React from 'react'
import { useContext, useEffect } from 'react'

import { MentorContext } from "../../context/mentorContext/Context";

import styles from './mentorProfile.module.css'

const MentorProfile = () => {

    const { getFollowRequests } = useContext(MentorContext);
    useEffect(()=>{
        getFollowRequests ()
    },[])

    return (
        <div>
            <div className={styles.banner}>
                <p></p>
            </div>
            <div className={styles.left}>
                <div className={styles.profContainer}>
                    <div className={styles.profCard}>
                        <h2>Benjamin Hoppe</h2>
                    </div>
                </div>
            </div>
            <div className={styles.right}>
                <div className={styles.requestCard}>

                </div>
            </div>

        </div>
    )
}

export default MentorProfile