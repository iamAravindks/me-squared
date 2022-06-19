import express from "express";
import expressAsyncHandler from "express-async-handler";
import { mentors } from "../data.js";
import Mentors from '../models/mentorModle.js'
export const mentorRouter = express.Router()

// @desc getting all mentor list
// @route get /
// @access private(curr public)
mentorRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    try {
      const mentors = await Mentors.find({});
      if (!mentors) {
        res.json({
          message: "No transactions found",
          data: [],
        });
      } else
        res.json({
          data: mentors,
        });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  })
);


// @desc create a new mentor
// @route /api/mentors
// @access private

mentorRouter.post('/', expressAsyncHandler(async (req, res) =>
{
  try {
    const newMentor = {
      name: req.body.name,
      designation: req.body.designation,
      yearNdClass: req.body.yearNdClass,
      respondIn: req.body.respondIn,
      about: req.body.about,
      tags: req.body.tags,
      socialLinks: req.body.socialLinks,
      watNum: req.body.watNum,
      eMail:req.body.eMail
    }
    const createdMentor = Mentors.create(newMentor)
    if (createdMentor)
    {
      res.status(201).json({
        message: "mentor created",
        data:newMentor
      })
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}))

