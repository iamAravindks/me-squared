import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import config from "../config.js";
import Mentees from "../models/menteeModel.js";
import Mentors from "../models/mentorModle.js";

const isAuthorisedMentee = expressAsyncHandler(async (req, res, next) => {
  const token = req.cookies.access_token;
  if (token) {
    try {
      const decodedObj = jwt.verify(token, config.JWT_SECRET);
      const { id } = decodedObj;

      const mentee = await Mentees.findById(id).select("-password");
      if (mentee) {
        req.mentee = await Mentees.findById(id).select("-password");
        next();
      } else {
        res.status(404);
        next(new Error("No user found"));
      }
    } catch (error) {
      res.status(401);
      throw new Error("Session expired! try to login again");
    }
  } else {
    res.status(401).json({ message: "Invalid login credentials!" });
  }
});

const isAuthorisedMentor = expressAsyncHandler(async (req, res,next) =>
{
  
  const token = req.cookies.access_token;
  if (token) {
    try {
      const decodedObj = jwt.verify(token, config.JWT_SECRET);
      // console.log(decodedObj)
      const { id } = decodedObj;

      const mentor = await Mentors.findById(id).select("-password");
      if (mentor) {
        req.mentor = mentor;
        next();
      } else
      {
                res.status(404);
                next(new Error("No user found"));
      }
    } catch (error)
    {
      console.log(error)
            res.status(401);
            throw new Error("Session expired! try to login again");
    }
  } else {
    res.status(401)
    throw new Error("Invalid login credentials!");
  }

});

const isAuthorisedMenteeOrMentor = expressAsyncHandler(async (req, res,next) =>
{
  const token = req.cookies.access_token;
  
  if (token)
  {
    try {
      const decodedObj = jwt.verify(token, config.JWT_SECRET);
      const { id, role } = decodedObj
      let user=null
      if (role === "mentor")
      {
        user = await Mentors.findById(id).select("-password");
       if(user) req.mentor = user
      } else if (role === "mentee")
      {
        user = await Mentees.findById(id).select("-password");
        if (user) req.mentee = user
      }

      if (user)
      {
        // console.log("user here",user)
        next()
      } else {
        res.status(404);
        next(new Error("No user found"));
      }

    } catch (error) {
          {
            console.log(error);
            res.status(401);
            throw new Error("Session expired! try to login again");
          }
    }
  } else
  {
    res.status(401);
    throw new Error("Invalid login credentials!");
  }
  
})

export { isAuthorisedMentee,isAuthorisedMentor,isAuthorisedMenteeOrMentor };
