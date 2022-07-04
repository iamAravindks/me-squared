import express from "express";
import expressAsyncHandler from "express-async-handler";
import { idValidator } from "../middleware/idValidator.js";
import Mentors from "../models/mentorModle.js";
import { generateToken } from "../utils/util.js";

export const mentorRouter = express.Router();

mentorRouter.param("id", idValidator);

// @desc getting all mentor list
// @route get /
// @access private(curr public)
mentorRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const mentors = await Mentors.find({}).select("-password");
    if (!mentors) {
      res.json({
        message: "No transactions found",
        data: [],
      });
    } else
      res.json({
        data: mentors,
      });
  })
);

// @desc get a single mentor
// @route /api/mentors/:id
// @access private

mentorRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const mentorWithID = await Mentors.findOne({ _id: req.params.id }).select(
      "-password"
    );
    res.status(200).json({
      data: mentorWithID,
    });
  })
);

// @desc get all mentors with a specific tag/tags
// @route /api/transaction/:tag
// @access public

mentorRouter.get(
  "/tag/:tag",
  expressAsyncHandler(async (req, res) => {
    const query = req.query.tag
      ? [...req.query.tag, req.params.tag]
      : [req.params.tag];
    const users = await Mentors.find({ tags: { $in: query } }).select(
      "-password"
    );
    res.json({
      data: users,
    });
  })
);

// @desc login a new mentor
// @route POST /api/mentors/login
// @access private

mentorRouter.post(
  "/login",
  expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const mentor = await Mentors.findOne({ email });
    if (mentor && (await mentor.matchPassword(password))) {
      const maxAge = 3 * 24 * 60 * 60; // expires in 3day
      const token = generateToken(mentor._id);
      res.cookie("access_token", token, {
        httpOnly: true,
        maxAge: maxAge * 1000,
      });
      res.json({
        message: "successfully logs in",
        data: {
          _id: mentor._id,
          ...mentor._doc,
        },
      });
    } else {
      res.status(401);
      throw new Error("Invalid email or password");
    }
  })
);

// @desc create a new mentor
// @route /api/mentors
// @access private

mentorRouter.post(
  "/signup",
  expressAsyncHandler(async (req, res) => {
    const newMentor = {
      name: req.body.name,
      designation: req.body.designation,
      yearNdClass: req.body.yearNdClass,
      respondIn: req.body.respondIn,
      about: req.body.about,
      tags: req.body.tags,
      watNum: req.body.watNum,
      email: req.body.email,
      password: req.body.password,
    };
    const isAlreadyExist = await Mentors.findOne({ email: req.body.email });
    if (isAlreadyExist)
      return res.status(400).json({ message: "User already exists" });
    const createdMentor = await Mentors.create(newMentor);
    const maxAge = 3 * 24 * 60 * 60;
    const token = generateToken(createdMentor._id);
    res.cookie("access_token", token, {
      httpOnly: true,
      maxAge: maxAge * 1000,
    });
    if (createdMentor) {
      res.status(201).json({
        message: "mentor created",
        data: newMentor,
      });
    }
  })
);

// @desc update a single mentor info
// @route put /api/mentors/:id
// @access private

mentorRouter.put(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const userWithId = await Mentors.findById(req.params.id);
    if (userWithId) {
      userWithId.name = req.body.name || userWithId.name;
      userWithId.designation = req.body.designation || userWithId.designation;
      userWithId.yearNdClass = req.body.yearNdClass || userWithId.yearNdClass;
      userWithId.respondIn = req.body.respondIn || userWithId.respondIn;
      userWithId.about = req.body.about || userWithId.about;
      userWithId.watNum = req.body.watNum || userWithId.watNum;
      userWithId.email = req.body.email || userWithId.email;
      userWithId.tags = req.body.tags || userWithId.tags;
      userWithId.socialLinks = req.body.socialLinks || userWithId.socialLinks;

      const updatedUser = await userWithId.save();

      res.status(201).json({
        message: "user updated",
        data: updatedUser,
      });
    }
  })
);

// @desc delete a mentor with id
// @route delete /api/mentors/:id
// @access private

mentorRouter.delete(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    await Mentors.deleteOne({ _id: req.params.id });

    res.status(204);
    res.json({
      message: "user deleted",
    });
  })
);
