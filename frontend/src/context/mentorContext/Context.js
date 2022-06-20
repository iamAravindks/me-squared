import axios from 'axios'
import { createContext, useState } from "react";


const mentorInfo = JSON.parse(localStorage.getItem("mentorInfo")) || [];

const initialState = {
  loading: false,
  mentorInfo: mentorInfo,
};

export const MentorContext = createContext(initialState)

const Provider = ({ children }) =>
{
    const [mentorInfoState,setMentorInfoState]=useState({})
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
    const getMentors = async () =>
    {
        try {
            const res = await axios.get('/api/mentors', config)
            setMentorInfoState(res.data.data)
            console.log(res.data)
            

        } catch (error) {
             const err =
               error.response && error.response.data.message
                 ? error.response.data.message
                     : error.message;
            console.log(err)
        }
    }
    return (
        <MentorContext.Provider
            value={{
                mentorInfoState,
                getMentors
            }}>
            {children}
        </MentorContext.Provider>
    )
}
export default Provider