import express from 'express'
import expressAsyncHandler from "express-async-handler"
import Mentees from "../models/menteeModel.js"
import mongoose from "mongoose"
import { generateToken } from "../utils/util.js"
import { isAuthorisedMentee } from "../middleware/authMiddleware.js"

const menteeRoute = express.Router()


// @desc Auth mentee and get token
// @route post /api/mentee/login
// @access public

menteeRoute.post("/login", expressAsyncHandler(async (req, res) =>
{
    const { email, password } = req.body
    const mentee = await Mentees.findOne({ email })
    if (mentee && (await mentee.matchPassword(password)))
    {
      const maxAge = 3 * 24 * 60 * 60;
      const token = generateToken(mentee._id);
      res.cookie("access_token", token, {
        httpOnly: true,
        maxAge: maxAge * 1000,
      });
      res.json({
        _id: mentee._id,
        name: mentee.name,
        email: mentee.email,
      });
    } else
    {
        res.status(401)
        throw new Error("Invalid email or password")
    }
}))

// @desc get mentee profile
// @route get /api/mentees/profile
// @access private

menteeRoute.get('/profile',isAuthorisedMentee, expressAsyncHandler(async (req, res) =>
{
  const mentee = await Mentees.findById(req.mentee.id).select("-password")
  if (mentee)
  {
    res.json({
      data:mentee
    })
  } else
  {
    res.status(404)
    throw new Error("User not found")
    }
}))












export default menteeRoute
