import React from 'react'
import styles from './browseMentor.module.css'
import image from '../../assets/humanlogo.png'
import { CloudinaryContext, Image } from "cloudinary-react";
const Mentor = ({ mentor }) => {
  return (
    <li className={styles.mentor} key={mentor.id}>
      <CloudinaryContext cloudName="dlgosw3g3" >
        <div className={styles.profImg}>
          <Image publicId={mentor.profileImg} width="50"  />
        </div>
      </CloudinaryContext>
      <h3>{mentor.name}</h3>
      <p>{mentor.designation}</p>
      <button>More</button>
    </li>
  );
}

export default Mentor
