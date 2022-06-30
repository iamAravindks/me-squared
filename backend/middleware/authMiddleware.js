import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import config from "../config.js";
import Mentees from "../models/menteeModel.js";

const isAuthorisedMentee = expressAsyncHandler(async (req, res, next) => {
    const token = req.cookies.access_token;
  if (token) {
    try {
        const decodedObj = jwt.verify(token, config.JWT_SECRET);
        const { id } = decodedObj

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
    res.status(401);
    res.status(401).json({ message: "Invalid login credentials!" });
  }
});

export {isAuthorisedMentee}
