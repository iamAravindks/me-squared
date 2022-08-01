import React from 'react'
import styles from './browseMentor.module.css'
import { CloudinaryContext, Image ,} from "cloudinary-react";
import { Link } from 'react-router-dom'
const Mentor = ({ mentor }) => {
  return (
    <li className={styles.mentor} key={mentor._id}>
      <CloudinaryContext cloudName="dlgosw3g3" >
        <div className={styles.profImg}>
          <Image publicId={mentor.profileImg}   />
        </div>
      </CloudinaryContext>
      <h3>{mentor.name}</h3>
      <p>{mentor.designation}</p>
      <Link to={`/browsementor/${mentor._id}`}><button>More</button></Link>
    </li>
  );
}

export default Mentor
