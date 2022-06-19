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

