import React,{useContext, useEffect} from 'react'
import './App.css'
import { MentorContext } from "./context/mentorContext/Context"
const App = () =>
{
  const { getMentors, mentorInfoState } = useContext(MentorContext);
  useEffect(() =>
  {
   getMentors()
 },[])
  return (
    <div>Hello world
      {mentorInfoState.length>0 && mentorInfoState.map(mentor => (
        <div key={ Number(mentor._id) * 23}>
          <p>name: {mentor.name}</p>
          <p>designation : {mentor.designation}</p>
          <p>Student of { mentor.yearNdClass}</p>
          <p>respond in :{mentor.respondIn}</p>
          <p>Contact no : { mentor.watNum}</p>
      <hr/>
      </div>
      ))}
    </div>
  )
}

export default App  